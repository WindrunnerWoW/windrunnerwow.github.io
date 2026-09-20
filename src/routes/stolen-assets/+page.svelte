<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import { discordInviteUrl } from '$lib/data/community';
  import { creatorHref, creatorName, stolenAssetGroups, type StolenAssetGroup } from '$lib/data/stolenAssets';

  let active = 'all';

  $: groups = (
    active === 'all'
      ? stolenAssetGroups
      : stolenAssetGroups.filter((group) => group.id === active)
  ) as StolenAssetGroup[];
</script>

<svelte:head>
  <title>Stolen Assets - Windrunner</title>
  <meta
    name="description"
    content="Art used on the Windrunner site. If something here is yours, get in touch for a takedown or so I can credit you."
  />
</svelte:head>

<Header />
<main>
  <section class="intro">
    <div class="kicker">CREDITS, SORT OF</div>
    <h1>Stolen assets.</h1>
    <p>
      Stolen might be too harsh. This site is full of art I found, borrowed, or pulled from the world
      this project lives in. If you spot something that is yours and you want it gone, give me a call.
      If you would rather keep it up with a proper credit, just hit me up.
    </p>
    <a class="cta" href={discordInviteUrl} target="_blank" rel="noopener noreferrer">Ping me on Discord</a>
  </section>

  <nav class="filters" aria-label="Creators">
    <button class:active={active === 'all'} on:click={() => (active = 'all')}>All</button>
    {#each stolenAssetGroups as group}
      <button class:active={active === group.id} on:click={() => (active = group.id)}>{group.title}</button>
    {/each}
  </nav>

  {#each groups as group}
    <section class="group" id={group.id}>
      <header>
        <div class="kicker">Creator</div>
        {#if group.href}
          <h2><a href={group.href} target="_blank" rel="noopener noreferrer">{group.title}</a></h2>
        {:else}
          <h2>{group.title}</h2>
        {/if}
        {#if group.note}
          <p>{group.note}</p>
        {/if}
      </header>
      <ul>
        {#each group.items as asset}
          <li class="card">
            <a class="thumb" href={asset.src} target="_blank" rel="noopener noreferrer">
              <img src={asset.src} alt={asset.title} loading="lazy" />
            </a>
            <div class="meta">
              {#if creatorHref(asset)}
                <a
                  class="author"
                  href={creatorHref(asset)}
                  target="_blank"
                  rel="noopener noreferrer"
                >{creatorName(asset)}</a>
              {:else}
                <span class="author">{creatorName(asset)}</span>
              {/if}
              {#if asset.usedOn}
                <a class="used" href={asset.usedOn.href}>Used on {asset.usedOn.label}</a>
              {/if}
            </div>
          </li>
        {/each}
      </ul>
    </section>
  {/each}

  <p class="aside">
    Talent icons, UI chrome, and in-game screenshots are from World of Warcraft /
    Turtle WoW and are not listed here. Same deal if any of that needs a credit or a takedown.
  </p>
</main>
<Footer />

<style>
  main {
    background:
      radial-gradient(circle at 18% 0%, rgba(122, 88, 39, 0.12), transparent 28rem),
      #090b0c;
  }

  .intro {
    padding: 154px clamp(24px, 8vw, 130px) 48px;
    max-width: 920px;
  }

  .intro h1 {
    margin: 18px 0 28px;
    color: #ddd2b9;
    font-size: clamp(52px, 9vw, 118px);
    line-height: 0.8;
    text-transform: uppercase;
  }

  .intro p {
    max-width: 640px;
    margin: 0 0 34px;
    color: #9e9587;
    font: 18px / 1.85 var(--font-body);
  }

  .cta {
    display: inline-block;
    padding: 14px 18px;
    border: 1px solid #80663a;
    color: #c7b382;
    text-decoration: none;
    text-transform: uppercase;
    font-size: 10px;
    letter-spacing: 0.14em;
  }

  .cta:hover {
    color: #e7d6a4;
    border-color: #c4a05a;
  }

  .filters {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    padding: 0 clamp(24px, 8vw, 130px) 56px;
  }

  .filters button {
    padding: 8px 12px;
    border: 1px solid #3a3325;
    background: transparent;
    color: #aaa18f;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    font: 10px / 1 var(--font-ui);
    cursor: pointer;
  }

  .filters button:hover,
  .filters button.active {
    border-color: #80663a;
    color: #d5b46c;
  }

  .group {
    padding: 0 clamp(24px, 8vw, 130px) 72px;
  }

  .group header {
    max-width: 720px;
    margin-bottom: 28px;
  }

  .group h2 {
    margin: 10px 0 12px;
    color: #d9cdb5;
    font-size: clamp(32px, 5vw, 58px);
    line-height: 0.95;
    text-transform: uppercase;
  }

  .group h2 a {
    color: inherit;
    text-decoration: none;
  }

  .group h2 a:hover {
    color: #d5b46c;
  }

  .group header p {
    margin: 0;
    color: #8f877b;
    font: 16px / 1.7 var(--font-body);
  }

  ul {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 16px;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .card {
    display: flex;
    flex-direction: column;
    min-height: 100%;
    overflow: hidden;
    border: 1px solid #2a241b;
    background: linear-gradient(180deg, #121413, #0c0f10);
  }

  .card:hover {
    border-color: #80663a;
  }

  .thumb {
    display: block;
    aspect-ratio: 16 / 10;
    overflow: hidden;
    background: #0a0c0d;
  }

  .author {
    color: #ddd2b9;
    font: 16px / 1.25 var(--font-heading);
    text-decoration: none;
  }

  a.author:hover {
    color: #d5b46c;
  }

  .used {
    color: #8a8276;
    text-decoration: none;
    font: 13px / 1.45 var(--font-body);
  }

  .used:hover {
    color: #d5b46c;
  }

  .thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.4s ease;
  }

  .card:hover img {
    transform: scale(1.04);
  }

  .meta {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 16px 16px 18px;
  }

  .aside {
    max-width: 720px;
    margin: 0;
    padding: 0 clamp(24px, 8vw, 130px) 110px;
    color: #7d766b;
    font: 16px / 1.75 var(--font-body);
  }

  @media (max-width: 980px) {
    ul {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (max-width: 640px) {
    .intro {
      padding-top: 120px;
    }

    ul {
      display: block;
    }
  }
</style>
