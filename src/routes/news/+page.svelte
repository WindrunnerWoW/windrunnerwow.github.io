<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import NewsTitle from '$lib/components/NewsTitle.svelte';
  import { formatNewsDate } from '$lib/news/posts';

  export let data;
</script>

<svelte:head>
  <title>News - Windrunner</title>
  <link rel="alternate" type="application/rss+xml" title="Windrunner News" href="/rss.xml" />
</svelte:head>

<Header />
<main class="inner">
  <div class="kicker">DEVELOPMENT JOURNAL</div>
  <div class="heading">
    <h1>News</h1>
  </div>
  <div class="list">
    {#if data.newsPosts.length === 0}
      <p class="empty">No news posts found.</p>
    {:else}
      {#each data.newsPosts as n}
        <a class="post" href="/news/{n.slug}">
          {#if n.image}
            <div class="thumb">
              <img src={n.image} alt="" />
            </div>
          {/if}
          <div class="copy">
            <div class="meta">{formatNewsDate(n.date)} · {n.category}</div>
            <h2>
              <NewsTitle title={n.title} path={n.slug} />
            </h2>
            <p>{n.description}</p>
          </div>
        </a>
      {/each}
    {/if}
  </div>
</main>
<Footer />

<style>
  .inner {
    padding: 150px clamp(24px, 8vw, 130px) 110px;
    min-height: 70vh;
  }

  .heading {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 24px;
    margin: 24px 0 80px;
  }

  .inner h1 {
    font-size: clamp(62px, 10vw, 130px);
    line-height: .8;
    text-transform: uppercase;
    color: #ddd2b9;
    margin: 0;
  }

  .rss {
    color: #b99554;
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: .14em;
    font-size: 10px;
    padding-bottom: 10px;
    white-space: nowrap;
  }

  .rss:hover {
    color: #d8b86c;
  }

  .list {
    max-width: 980px;
  }

  .post {
    display: grid;
    grid-template-columns: minmax(0, 220px) minmax(0, 1fr);
    gap: 28px;
    align-items: center;
    padding: 35px 0;
    border-top: 1px solid #29251d;
    text-decoration: none;
    color: inherit;
    contain: layout;
    position: relative;
  }

  .post:not(:has(.thumb)) {
    grid-template-columns: minmax(0, 1fr);
  }

  .thumb {
    overflow: hidden;
    border: 1px solid #342b1d;
    background: #14110d;
  }

  .copy {
    min-width: 0;
  }

  .list p {
    max-width: 700px;
    color: #90897d;
    line-height: 1.7;
    margin: 0;
  }

  .thumb img {
    display: block;
    width: 100%;
    aspect-ratio: 16 / 10;
    object-fit: cover;
  }

  .post:hover h2 {
    color: #e6d8b8;
  }

  .meta {
    font-size: 9px;
    letter-spacing: .15em;
    color: #9a7a42;
    text-transform: uppercase;
  }

  .list h2 {
    font-size: clamp(27px, 4vw, 44px);
    color: #d1c6ae;
    margin: 10px 0;
    line-height: 1.15;
    text-transform: uppercase;
  }

  .empty {
    color: #90897d;
    font-size: 18px;
  }

  @media (max-width: 700px) {
    .heading {
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;
      margin-bottom: 56px;
    }

    .rss {
      padding-bottom: 0;
    }

    .post {
      grid-template-columns: minmax(0, 1fr);
      gap: 16px;
      align-items: start;
      contain: none;
      padding: 28px 0 32px;
    }

    .list h2 {
      font-size: clamp(26px, 7.5vw, 34px);
      margin: 10px 0 12px;
    }
  }
</style>
