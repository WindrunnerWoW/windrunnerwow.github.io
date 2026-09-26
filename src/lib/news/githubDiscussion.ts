import { env } from '$env/dynamic/public';

const OWNER = 'WindrunnerWoW';
const REPO = 'windrunnerwow.github.io';
const API_BASE = `https://api.github.com/repos/${OWNER}/${REPO}`;
const GRAPHQL_URL = 'https://api.github.com/graphql';
const LIST_CACHE_MS = 5 * 60 * 1000;

export type DiscussionUser = {
  login: string;
  avatar_url: string;
  html_url: string;
};

export type DiscussionComment = {
  id: number;
  parent_id: number | null;
  body: string;
  html_url: string;
  created_at: string;
  user: DiscussionUser | null;
};

export type DiscussionThread = {
  number: number;
  title: string;
  body: string;
  html_url: string;
  created_at: string;
  user: DiscussionUser | null;
  comments: DiscussionComment[];
};

export type DiscussionCommentNode = DiscussionComment & {
  replies: DiscussionCommentNode[];
};

type ApiDiscussion = {
  number: number;
  title: string;
  body: string | null;
  html_url: string;
  created_at: string;
  user: DiscussionUser | null;
};

type ApiComment = {
  id: number;
  parent_id: number | null;
  body: string | null;
  html_url: string;
  created_at: string;
  user: DiscussionUser | null;
};

type GqlAuthor = {
  login: string;
  avatarUrl: string;
  url: string;
} | null;

type GqlComment = {
  databaseId: number;
  body: string;
  url: string;
  createdAt: string;
  replyTo: { databaseId: number } | null;
  author: GqlAuthor;
  replies?: { nodes: GqlComment[] };
};

type GqlDiscussion = {
  number: number;
  title: string;
  body: string;
  url: string;
  createdAt: string;
  author: GqlAuthor;
  comments: { nodes: GqlComment[] };
};

type ListCache = {
  fetchedAt: number;
  discussions: ApiDiscussion[];
};

let listCache: ListCache | null = null;
let listInflight: Promise<ApiDiscussion[]> | null = null;

function githubToken(): string | null {
  // Prefer SvelteKit public env (build + .env). Fall back to Vite for local edge cases.
  const fromKit = env.PUBLIC_GITHUB_TOKEN;
  const fromVite = import.meta.env.PUBLIC_GITHUB_TOKEN;
  const token = (typeof fromKit === 'string' && fromKit) || (typeof fromVite === 'string' && fromVite) || '';
  return token.trim() || null;
}

function apiHeaders(json = true): HeadersInit {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'windrunner-website'
  };
  if (json) headers['Content-Type'] = 'application/json';

  const token = githubToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  return headers;
}

/** Unauthenticated Discussion REST calls often replace org members with ghost. */
function normalizeUser(user: DiscussionUser | null | undefined): DiscussionUser | null {
  if (!user?.login || user.login === 'ghost') return null;
  return {
    login: user.login,
    avatar_url: user.avatar_url,
    html_url: user.html_url
  };
}

function userFromGql(author: GqlAuthor): DiscussionUser | null {
  if (!author?.login || author.login === 'ghost') return null;
  return {
    login: author.login,
    avatar_url: author.avatarUrl,
    html_url: author.url
  };
}

async function githubFetch<T>(url: string): Promise<T> {
  const response = await fetch(url, { headers: apiHeaders(false) });
  if (!response.ok) {
    throw new Error(`GitHub API ${response.status}`);
  }
  return (await response.json()) as T;
}

async function githubGraphql<T>(query: string, variables: Record<string, unknown>): Promise<T> {
  const token = githubToken();
  if (!token) throw new Error('GitHub token required for GraphQL');

  const response = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: apiHeaders(true),
    body: JSON.stringify({ query, variables })
  });
  if (!response.ok) {
    throw new Error(`GitHub GraphQL ${response.status}`);
  }

  const payload = (await response.json()) as { data?: T; errors?: { message: string }[] };
  if (payload.errors?.length) {
    throw new Error(payload.errors.map((e) => e.message).join('; '));
  }
  if (!payload.data) throw new Error('GitHub GraphQL returned no data');
  return payload.data;
}

function nextPageUrl(linkHeader: string | null): string | null {
  if (!linkHeader) return null;
  for (const part of linkHeader.split(',')) {
    const match = part.match(/<([^>]+)>;\s*rel="next"/);
    if (match) return match[1];
  }
  return null;
}

function flattenGqlComments(nodes: GqlComment[]): DiscussionComment[] {
  const comments: DiscussionComment[] = [];

  const walk = (node: GqlComment, parentId: number | null) => {
    comments.push({
      id: node.databaseId,
      parent_id: parentId ?? node.replyTo?.databaseId ?? null,
      body: node.body ?? '',
      html_url: node.url,
      created_at: node.createdAt,
      user: userFromGql(node.author)
    });
    for (const reply of node.replies?.nodes ?? []) {
      walk(reply, node.databaseId);
    }
  };

  for (const node of nodes) walk(node, null);
  return comments;
}

function threadFromGql(discussion: GqlDiscussion): DiscussionThread {
  return {
    number: discussion.number,
    title: discussion.title,
    body: discussion.body ?? '',
    html_url: discussion.url,
    created_at: discussion.createdAt,
    user: userFromGql(discussion.author),
    comments: flattenGqlComments(discussion.comments.nodes)
  };
}

const DISCUSSION_FIELDS = `
  number
  title
  body
  url
  createdAt
  author {
    login
    avatarUrl
    url
  }
  comments(first: 100) {
    nodes {
      databaseId
      body
      url
      createdAt
      replyTo { databaseId }
      author {
        login
        avatarUrl
        url
      }
      replies(first: 100) {
        nodes {
          databaseId
          body
          url
          createdAt
          replyTo { databaseId }
          author {
            login
            avatarUrl
            url
          }
        }
      }
    }
  }
`;

async function loadThreadViaGraphql(ref: string): Promise<DiscussionThread | null> {
  const trimmed = ref.trim();
  if (!trimmed) return null;

  if (/^\d+$/.test(trimmed)) {
    const data = await githubGraphql<{
      repository: { discussion: GqlDiscussion | null };
    }>(
      `query ($owner: String!, $name: String!, $number: Int!) {
        repository(owner: $owner, name: $name) {
          discussion(number: $number) { ${DISCUSSION_FIELDS} }
        }
      }`,
      { owner: OWNER, name: REPO, number: Number(trimmed) }
    );
    const discussion = data.repository.discussion;
    return discussion ? threadFromGql(discussion) : null;
  }

  const target = normalizeTitle(trimmed);
  const data = await githubGraphql<{
    repository: { discussions: { nodes: GqlDiscussion[] } };
  }>(
    `query ($owner: String!, $name: String!) {
      repository(owner: $owner, name: $name) {
        discussions(first: 100) {
          nodes { ${DISCUSSION_FIELDS} }
        }
      }
    }`,
    { owner: OWNER, name: REPO }
  );

  const discussion = data.repository.discussions.nodes.find(
    (d) => normalizeTitle(d.title) === target
  );
  return discussion ? threadFromGql(discussion) : null;
}

async function fetchAllDiscussions(): Promise<ApiDiscussion[]> {
  const now = Date.now();
  if (listCache && now - listCache.fetchedAt < LIST_CACHE_MS) {
    return listCache.discussions;
  }
  if (listInflight) return listInflight;

  listInflight = (async () => {
    const discussions: ApiDiscussion[] = [];
    let url: string | null = `${API_BASE}/discussions?per_page=100`;

    while (url) {
      const response = await fetch(url, { headers: apiHeaders(false) });
      if (!response.ok) {
        throw new Error(`GitHub API ${response.status}`);
      }
      const page = (await response.json()) as ApiDiscussion[];
      discussions.push(...page);
      url = nextPageUrl(response.headers.get('link'));
    }

    listCache = { fetchedAt: Date.now(), discussions };
    return discussions;
  })();

  try {
    return await listInflight;
  } finally {
    listInflight = null;
  }
}

function normalizeTitle(value: string): string {
  return value.trim().replace(/\s+/g, ' ');
}

async function findDiscussion(ref: string): Promise<ApiDiscussion | null> {
  const trimmed = ref.trim();
  if (!trimmed) return null;

  if (/^\d+$/.test(trimmed)) {
    try {
      return await githubFetch<ApiDiscussion>(`${API_BASE}/discussions/${trimmed}`);
    } catch {
      return null;
    }
  }

  const target = normalizeTitle(trimmed);
  const discussions = await fetchAllDiscussions();
  return discussions.find((d) => normalizeTitle(d.title) === target) ?? null;
}

async function fetchComments(number: number): Promise<DiscussionComment[]> {
  const comments: DiscussionComment[] = [];
  let url: string | null = `${API_BASE}/discussions/${number}/comments?per_page=100`;

  while (url) {
    const response = await fetch(url, { headers: apiHeaders(false) });
    if (!response.ok) {
      throw new Error(`GitHub API ${response.status}`);
    }
    const page = (await response.json()) as ApiComment[];
    for (const comment of page) {
      comments.push({
        id: comment.id,
        parent_id: comment.parent_id,
        body: comment.body ?? '',
        html_url: comment.html_url,
        created_at: comment.created_at,
        user: normalizeUser(comment.user)
      });
    }
    url = nextPageUrl(response.headers.get('link'));
  }

  return comments;
}

async function loadThreadViaRest(ref: string): Promise<DiscussionThread | null> {
  const discussion = await findDiscussion(ref);
  if (!discussion) return null;

  const comments = await fetchComments(discussion.number);

  return {
    number: discussion.number,
    title: discussion.title,
    body: discussion.body ?? '',
    html_url: discussion.html_url,
    created_at: discussion.created_at,
    user: normalizeUser(discussion.user),
    comments
  };
}

export async function loadDiscussionThread(ref: string): Promise<DiscussionThread | null> {
  try {
    // GraphQL with a token returns real org-member authors. REST often returns "ghost".
    if (githubToken()) {
      return await loadThreadViaGraphql(ref);
    }
    return await loadThreadViaRest(ref);
  } catch {
    return null;
  }
}

export function buildCommentTree(comments: DiscussionComment[]): DiscussionCommentNode[] {
  const nodes = new Map<number, DiscussionCommentNode>();
  const roots: DiscussionCommentNode[] = [];

  for (const comment of comments) {
    nodes.set(comment.id, { ...comment, replies: [] });
  }

  for (const comment of comments) {
    const node = nodes.get(comment.id);
    if (!node) continue;

    if (comment.parent_id != null && nodes.has(comment.parent_id)) {
      nodes.get(comment.parent_id)!.replies.push(node);
    } else {
      roots.push(node);
    }
  }

  return roots;
}
