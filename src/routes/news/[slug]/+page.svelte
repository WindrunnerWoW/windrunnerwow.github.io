<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import NewsTitle from '$lib/components/NewsTitle.svelte';
  import NewsToc from '$lib/components/NewsToc.svelte';
  import { formatNewsDate } from '$lib/news/posts';

  export let data;

  $: heroStyle = data.post.image
    ? `--hero-image: url('${data.post.image}'); --hero-position: center; --hero-size: cover`
    : undefined;
</script>

<svelte:head>
  <title>{data.post.title} - Windrunner</title>
  <meta name="description" content={data.post.description} />
  {#if data.post.image}
    <meta property="og:image" content={data.post.image} />
  {/if}
</svelte:head>

<Header />
<main>
  <section class="hero news-hero" class:has-image={Boolean(data.post.image)} style={heroStyle}>
    {#if data.post.image}
      <div class="hero-art" aria-hidden="true"></div>
    {/if}
    <div class="content">
      <a class="back" href="/news">← Back to news</a>
      <div class="kicker">{formatNewsDate(data.post.date)} · {data.post.category}</div>
      <h1>
        <NewsTitle title={data.post.title} path={data.post.slug} />
      </h1>
      {#if data.post.description}
        <p class="lede">{data.post.description}</p>
      {/if}
    </div>
  </section>

  <NewsToc headings={data.post.headings} />

  <article id="news-article" class="post">
    <div class="post-content">
      {@html data.post.html}
    </div>
    <footer class="post-footer">
      <a class="back" href="/news">← Back to news</a>
    </footer>
  </article>
</main>
<Footer />

<style>
  .news-hero {
    background: #090b0c;
    background-image: none;
    justify-content: center;
    padding-left: 0;
    padding-right: 0;
    padding-bottom: 36px;
    min-height: 760px;
  }

  .news-hero:not(.has-image) {
    min-height: 0;
    padding-bottom: 48px;
  }

  .hero-art {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(180deg, rgba(5, 7, 8, .2), rgba(5, 7, 8, .86) 75%, #090b0c),
      linear-gradient(90deg, rgba(5, 7, 8, .45), transparent 35%, transparent 65%, rgba(5, 7, 8, .45)),
      var(--hero-image);
    background-position: var(--hero-position, center);
    background-size: var(--hero-size, cover);
    background-repeat: no-repeat;
    pointer-events: none;
    transform-origin: center;
  }

  :global(main > .hero.news-hero) .content {
    position: relative;
    z-index: 1;
    width: 50%;
    max-width: none;
  }

  .back {
    display: inline-block;
    margin-bottom: 28px;
    color: #b99554;
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: .14em;
    font-size: 10px;
  }

  .back:hover {
    color: #d8b86c;
  }

  .news-hero .back,
  .news-hero .kicker {
    color: #f3deb4;
    text-shadow:
      0 0 1px rgba(18, 12, 6, 0.9),
      0.4px 0 0.8px rgba(18, 12, 6, 0.55),
      -0.4px 0 0.8px rgba(18, 12, 6, 0.55),
      0 0.4px 0.8px rgba(18, 12, 6, 0.55),
      0 -0.4px 0.8px rgba(18, 12, 6, 0.55),
      0 0 8px rgba(12, 8, 4, 0.35);
  }

  .news-hero .back:hover {
    color: #fff6e4;
  }

  .lede {
    max-width: none;
    margin: 2px 0 0;
    font-style: italic;
    font-size: 18px;
    line-height: 1.55;
    color: #eadcc4;
    text-shadow:
      0 1px 2px rgba(8, 6, 4, 0.7),
      0 0 14px rgba(8, 6, 4, 0.4);
  }

  .post {
    width: 50%;
    margin: 0 auto;
    padding: 32px 0 110px;
  }

  .post-content {
    font-family: var(--font-body);
    color: #b1a898;
    font-size: 18px;
    line-height: 1.85;
  }

  .post-content :global(h2),
  .post-content :global(h3),
  .post-content :global(h4) {
    font-family: var(--font-heading);
    text-transform: uppercase;
    color: #d9cdb5;
    line-height: 1.15;
    margin: 2.4rem 0 .8rem;
    scroll-margin-top: 96px;
  }

  .post-content :global(h2) {
    font-size: clamp(28px, 4vw, 44px);
  }

  .post-content :global(h3) {
    font-size: clamp(22px, 3vw, 30px);
    color: #c7b382;
  }

  .post-content :global(h4) {
    font-size: 1.15rem;
    color: #c7b382;
  }

  .post-content :global(p) {
    margin: 0 0 1.4rem;
  }

  .post-content :global(a) {
    color: #c6a366;
  }

  .post-content :global(a:hover) {
    color: #e0c27a;
  }

  .post-content :global(ul),
  .post-content :global(ol) {
    margin: 0 0 1.5rem;
    padding-left: 1.25rem;
    color: #a39a8c;
  }

  .post-content :global(li) {
    margin: 0 0 .45rem;
  }

  .post-content :global(strong) {
    color: #d8ccb5;
    font-weight: 600;
  }

  .post-content :global(em) {
    color: #c7b382;
  }

  .post-content :global(blockquote) {
    margin: 0 0 1.5rem;
    padding: .2rem 0 .2rem 1.1rem;
    border-left: 1px solid #80663a;
    color: #c7b382;
  }

  .post-content :global(img) {
    display: block;
    max-width: 100%;
    height: auto;
    margin: 2rem 0;
    border: 1px solid #342b1d;
  }

  .post-content :global(code) {
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: .86em;
    color: #ddd2b9;
    background: #14110d;
    border: 1px solid #2a241b;
    padding: .12rem .35rem;
  }

  .post-content :global(pre) {
    overflow-x: auto;
    margin: 0 0 1.5rem;
    padding: 1rem 1.1rem;
    background: #101112;
    border: 1px solid #2a241b;
  }

  .post-content :global(pre code) {
    padding: 0;
    border: 0;
    background: none;
  }

  .post-footer {
    margin-top: 3rem;
    padding-top: 2rem;
    border-top: 1px solid #29251d;
  }

  :global(html.news-title-transition) .hero-art,
  :global(html.news-title-transition) .back,
  :global(html.news-title-transition) .kicker,
  :global(html.news-title-transition) .lede {
    animation: news-hero-fade .55s cubic-bezier(.22, 1, .36, 1) both;
  }

  :global(html.news-title-transition) .hero-art {
    animation-name: news-hero-art-in;
  }

  @keyframes news-hero-fade {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes news-hero-art-in {
    from {
      opacity: 0;
      transform: scale(1.035);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }

  @media (max-width: 800px) {
    :global(main > .hero.news-hero) .content,
    .post {
      width: auto;
      margin: 0 24px 0 44px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    :global(html.news-title-transition) .hero-art,
    :global(html.news-title-transition) .back,
    :global(html.news-title-transition) .kicker,
    :global(html.news-title-transition) .lede {
      animation: none;
    }
  }
</style>
