const OWNER = 'WindrunnerWoW';
const REPO = 'windrunnerwow.github.io';
const API_BASE = `https://api.github.com/repos/${OWNER}/${REPO}`;
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

type ListCache = {
  fetchedAt: number;
  discussions: ApiDiscussion[];
};

let listCache: ListCache | null = null;
let listInflight: Promise<ApiDiscussion[]> | null = null;

function apiHeaders(): HeadersInit {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'windrunner-website'
  };

  const token = import.meta.env.PUBLIC_GITHUB_TOKEN;
  if (typeof token === 'string' && token.trim()) {
    headers.Authorization = `Bearer ${token.trim()}`;
  }

  return headers;
}

function normalizeUser(user: DiscussionUser | null | undefined): DiscussionUser | null {
  if (!user?.login || user.login === 'ghost') return null;
  return {
    login: user.login,
    avatar_url: user.avatar_url,
    html_url: user.html_url
  };
}

async function githubFetch<T>(url: string): Promise<T> {
  const response = await fetch(url, { headers: apiHeaders() });
  if (!response.ok) {
    throw new Error(`GitHub API ${response.status}`);
  }
  return (await response.json()) as T;
}

function nextPageUrl(linkHeader: string | null): string | null {
  if (!linkHeader) return null;
  for (const part of linkHeader.split(',')) {
    const match = part.match(/<([^>]+)>;\s*rel="next"/);
    if (match) return match[1];
  }
  return null;
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
      const response = await fetch(url, { headers: apiHeaders() });
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
    const response = await fetch(url, { headers: apiHeaders() });
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

export async function loadDiscussionThread(ref: string): Promise<DiscussionThread | null> {
  try {
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
