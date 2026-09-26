<script lang="ts">
  import { renderDiscussionBody } from '$lib/news/renderDiscussionBody';
  import type { DiscussionCommentNode } from '$lib/news/githubDiscussion';

  export let node: DiscussionCommentNode;

  function formatCommentDate(value: string): string {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  $: author = node.user?.login ?? 'Commenter';
</script>

<article class="comment">
  <header class="comment-meta">
    {#if node.user}
      <img
        class="avatar"
        src={node.user.avatar_url}
        alt=""
        width="36"
        height="36"
        loading="lazy"
      />
      <a class="author" href={node.user.html_url} target="_blank" rel="noopener noreferrer">
        {author}
      </a>
    {:else}
      <span class="avatar placeholder" aria-hidden="true"></span>
      <span class="author">{author}</span>
    {/if}
    <time datetime={node.created_at}>{formatCommentDate(node.created_at)}</time>
  </header>
  <div class="comment-body">
    {@html renderDiscussionBody(node.body)}
  </div>
</article>

{#if node.replies.length > 0}
  <ul class="replies">
    {#each node.replies as reply (reply.id)}
      <li>
        <svelte:self node={reply} />
      </li>
    {/each}
  </ul>
{/if}

<style>
  .comment {
    margin: 0;
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

  .comment-body :global(ul),
  .comment-body :global(ol) {
    margin: 0 0 .9rem;
    padding-left: 1.2rem;
  }

  .comment-body :global(code) {
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: .86em;
    color: #ddd2b9;
    background: #14110d;
    border: 1px solid #2a241b;
    padding: .12rem .35rem;
  }

  .comment-body :global(pre) {
    overflow-x: auto;
    margin: 0 0 .9rem;
    padding: .85rem 1rem;
    background: #101112;
    border: 1px solid #2a241b;
  }

  .comment-body :global(blockquote) {
    margin: 0 0 .9rem;
    padding: .15rem 0 .15rem 1rem;
    border-left: 1px solid #80663a;
    color: #c7b382;
  }

  .replies {
    list-style: none;
    margin: 1.1rem 0 0;
    padding: 0 0 0 1.15rem;
    border-left: 1px solid #29251d;
    display: grid;
    gap: 1.25rem;
  }
</style>
