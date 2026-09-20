<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import { knowledgeBase, knowledgeCategories, knowledgeEntryText } from '$lib/data/knowledgeBase';

  let query = '';

  $: needle = query.trim().toLowerCase();
  $: matches = needle
    ? knowledgeBase.filter((entry) => knowledgeEntryText(entry).includes(needle))
    : knowledgeBase;
  $: sections = knowledgeCategories
    .map((category) => ({
      category,
      entries: matches.filter((entry) => entry.category === category)
    }))
    .filter((section) => section.entries.length);
</script>

<svelte:head>
  <title>knowledge Base - Windrunner</title>
  <meta
    name="description"
    content="A short knowledgebase of Windrunner features, from Marks of the Ranger General to professions, challenges, and class work."
  />
</svelte:head>

<Header />
<main>
  <section class="intro">
    <div class="kicker">knowledge Base</div>
    <h1>Feature knowledgebase.</h1>
    <p>Short notes on how Windrunner systems work — including things that do not have their own page yet.</p>
    <label class="search">
      <span class="kicker">Search</span>
      <input type="search" bind:value={query} placeholder="Marks, donation points, jewelcrafting…" />
    </label>
  </section>

  {#if !sections.length}
    <section class="list">
      <p class="empty">No entries match “{query.trim()}”.</p>
    </section>
  {:else}
    {#each sections as section}
      <section class="list">
        <h2>{section.category}</h2>
        <ul>
          {#each section.entries as entry}
            <li>
              {#if entry.href}
                <a class="name" href={entry.href}>{entry.title}</a>
              {:else}
                <span class="name">{entry.title}</span>
              {/if}
              <p>{entry.summary}</p>
            </li>
          {/each}
        </ul>
      </section>
    {/each}
  {/if}
</main>
<Footer />

<style>
  .intro {
    padding: 140px clamp(24px, 8vw, 130px) 36px;
    background: #090b0c;
  }
  .intro h1 {
    font-size: clamp(42px, 7vw, 88px);
    line-height: 0.86;
    text-transform: uppercase;
    color: #ded3bb;
    margin: 12px 0 18px;
  }
  .intro > p {
    max-width: 640px;
    font-family: var(--font-body);
    font-size: 18px;
    line-height: 1.8;
    color: #b1a898;
    margin: 0 0 28px;
  }
  .search {
    display: block;
    max-width: 520px;
    position: sticky;
    top: 88px;
    z-index: 4;
  }
  .search input {
    width: 100%;
    margin-top: 10px;
    padding: 14px 16px;
    border: 1px solid #3d3321;
    background: #0c0f10;
    color: #ddd2bb;
    font-family: var(--font-ui);
    font-size: 15px;
    letter-spacing: 0.02em;
  }
  .search input::placeholder {
    color: #7d7568;
  }
  .list {
    padding: 28px clamp(24px, 8vw, 130px);
    background: #090b0c;
  }
  .list:last-of-type {
    padding-bottom: 120px;
  }
  .list h2 {
    margin: 0 0 8px;
    color: #a78348;
    font: 12px/1 var(--font-ui);
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    border-top: 1px solid #27231b;
  }
  li {
    padding: 16px 0;
    border-bottom: 1px solid #27231b;
  }
  .name {
    display: inline-block;
    color: #dfd4bc;
    font-family: var(--font-heading);
    font-size: 22px;
    line-height: 1.15;
    text-decoration: none;
  }
  a.name:hover {
    color: #d8b86c;
  }
  li p {
    margin: 8px 0 0;
    max-width: 820px;
    font-family: var(--font-body);
    font-size: 17px;
    line-height: 1.7;
    color: #aba293;
  }
  .empty {
    font-family: var(--font-body);
    font-size: 18px;
    color: #aba293;
    margin: 0;
  }
  @media (max-width: 800px) {
    .search {
      top: 12px;
    }
    .name {
      font-size: 19px;
    }
  }
</style>
