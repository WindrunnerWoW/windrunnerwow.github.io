<script lang="ts">
  import { wrapTitleWithViewTransitionNames } from '$lib/news/viewTransitionUtils';

  export let title = '';
  export let path = '';

  $: words = wrapTitleWithViewTransitionNames(title, path);
</script>

<span class="news-title">
  {#each words as word, index}
    <span
      class="word-span"
      style="view-transition-name: {word.viewTransitionName}; --word-index: {index};"
      aria-hidden="true"
    >{word.text}</span>
  {/each}
</span>
<span class="sr-only">{title}</span>

<style>
  .news-title {
    display: flex;
    flex-wrap: wrap;
    column-gap: 0.32em;
    row-gap: 0;
    max-width: 100%;
  }

  .word-span {
    display: block;
    white-space: nowrap;
    will-change: transform, opacity;
    backface-visibility: hidden;
  }

  :global(html:not(.news-title-transition)) .word-span {
    view-transition-name: none !important;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
</style>
