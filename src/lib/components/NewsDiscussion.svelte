<script lang="ts">
  import { onMount } from 'svelte';
  import NewsDiscussionComment from '$lib/components/NewsDiscussionComment.svelte';
  import { renderDiscussionBody } from '$lib/news/renderDiscussionBody';
  import {
    buildCommentTree,
    loadDiscussionThread,
    type DiscussionCommentNode,
    type DiscussionThread
  } from '$lib/news/githubDiscussion';

  export let discussion: string;

  let thread: DiscussionThread | null = null;
  let tree: DiscussionCommentNode[] = [];
  let loaded = false;

  onMount(() => {
    let cancelled = false;

    (async () => {
      const result = await loadDiscussionThread(discussion);
      if (cancelled) return;
      thread = result;
      tree = result ? buildCommentTree(result.comments) : [];
      loaded = true;
    })();

    return () => {
      cancelled = true;
    };
  });

  function formatCommentDate(value: string): string {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
</script>

{#if loaded && thread}
  <section class="discussion" aria-labelledby="news-discussion-heading">
    <div class="discussion-header">
      <h2 id="news-discussion-heading">Discussion</h2>
      <a class="reply" href={thread.html_url} target="_blank" rel="noopener noreferrer">
        Reply on GitHub →
      </a>
    </div>

    {#if thread.body.trim()}
      <article class="comment opener">
        <header class="comment-meta">
          {#if thread.user}
            <img
              class="avatar"
              src={thread.user.avatar_url}
              alt=""
              width="36"
              height="36"
              loading="lazy"
            />
            <a
              class="author"
              href={thread.user.html_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {thread.user.login}
            </a>
          {:else}
            <span class="avatar placeholder" aria-hidden="true"></span>
            <span class="author">Original post</span>
          {/if}
          <time datetime={thread.created_at}>{formatCommentDate(thread.created_at)}</time>
        </header>
        <div class="comment-body">
          {@html renderDiscussionBody(thread.body)}
        </div>
      </article>
    {/if}

    {#if tree.length === 0}
      <p class="empty">No comments yet. Be the first to reply on GitHub.</p>
    {:else}
      <ul class="thread">
        {#each tree as node (node.id)}
          <li>
            <NewsDiscussionComment {node} />
          </li>
        {/each}
      </ul>
    {/if}

    <div class="discussion-footer">
      <a class="reply" href={thread.html_url} target="_blank" rel="noopener noreferrer">
        Reply on GitHub →
      </a>
    </div>
  </section>
{/if}

<style>
  .discussion {
    margin-top: 2.5rem;
    padding-top: 2rem;
    border-top: 1px solid #29251d;
  }

  .discussion-header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 1.75rem;
  }

  .discussion-header h2 {
    margin: 0;
    font-family: var(--font-heading);
    text-transform: uppercase;
    color: #d9cdb5;
    font-size: clamp(24px, 3vw, 34px);
    letter-spacing: -.01em;
  }

  .reply {
    color: #b99554;
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: .14em;
    font-size: 10px;
    white-space: nowrap;
  }

  .reply:hover {
    color: #d8b86c;
  }

  .comment {
    margin: 0 0 1.75rem;
  }

  .comment-meta {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
  }

  .avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 1px solid #342b1d;
    background: #14110d;
    flex-shrink: 0;
  }

  .avatar.placeholder {
    display: inline-block;
  }

  .author {
    color: #d8ccb5;
    text-decoration: none;
    font-family: var(--font-heading);
    text-transform: uppercase;
    letter-spacing: .06em;
    font-size: 12px;
  }

  a.author:hover {
    color: #e6d8b8;
  }

  time {
    margin-left: auto;
    color: #6f675c;
    font-size: 12px;
    letter-spacing: .04em;
  }

  .comment-body {
    font-family: var(--font-body);
    color: #b1a898;
    font-size: 16px;
    line-height: 1.7;
  }

  .comment-body :global(p) {
    margin: 0 0 .9rem;
  }

  .comment-body :global(p:last-child) {
    margin-bottom: 0;
  }

  .comment-body :global(a) {
    color: #c6a366;
  }

  .comment-body :global(a:hover) {
    color: #e0c27a;
  }

  .empty {
    margin: 0 0 1.5rem;
    color: #858076;
    font-family: Georgia, serif;
    font-size: 15px;
    line-height: 1.6;
  }

  .thread {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: 1.75rem;
  }

  .discussion-footer {
    margin-top: 2rem;
    padding-top: 1.5rem;
    border-top: 1px solid #29251d;
  }

  @media (max-width: 600px) {
    .discussion-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
    }
  }
</style>
