<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';

  export let data;
</script>

<svelte:head>
  <title>Changelog - Windrunner</title>
  <meta name="description" content="Windrunner release notes, fixes, and world updates." />
</svelte:head>

<Header />
<main class="inner">
  <header class="page-heading">
    <div class="kicker">PATCH ARCHIVE</div>
    <h1>Changelog</h1>
    <p>Release notes, fixes, and additions - one update at a time.</p>
  </header>

  {#if data.entries.length}
    <div class="release-grid">
      {#each data.entries as entry}
        <a class="release-card" href="/changelog/{entry.slug}" data-changelog-card={entry.slug}>
          <div class="card-top" data-changelog-part="meta">
            <span class="card-kind">Release notes</span>
            <span class="date">{entry.date}</span>
          </div>
          <div class="card-main">
            <h2 data-changelog-part="version">{entry.version}</h2>
            <p data-changelog-part="summary">{entry.summary}</p>
          </div>
          <div class="card-bottom">
            <span>Read release notes</span>
            <span class="arrow" aria-hidden="true">↗</span>
          </div>
        </a>
      {/each}
    </div>
  {:else}
    <p class="empty">No public patches yet. New releases appear here as they ship.</p>
  {/if}
</main>

<Footer />

<style>
  .inner {
    min-height: 72vh;
    padding: 154px clamp(24px, 8vw, 130px) 120px;
    background:
      radial-gradient(circle at 78% 8%, rgba(122, 88, 39, .1), transparent 31rem),
      #090b0c;
  }
  .page-heading { max-width: 900px; margin-bottom: 76px; }
  .page-heading h1 {
    margin: 22px 0 30px;
    color: #ddd2b9;
    font-size: clamp(62px, 10vw, 130px);
    line-height: .78;
    text-transform: uppercase;
  }
  .page-heading p {
    max-width: 620px;
    margin: 0;
    color: #9e9587;
    font: 18px/1.75 var(--font-body);
  }
  .release-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 18px;
    max-width: 1180px;
  }
  .release-card {
    min-height: 330px;
    display: flex;
    flex-direction: column;
    padding: 28px 30px 26px;
    position: relative;
    overflow: hidden;
    border: 1px solid #342c20;
    background:
      linear-gradient(145deg, rgba(118, 82, 34, .12), transparent 54%),
      #0d1011;
    color: inherit;
    text-decoration: none;
    transition: transform .25s ease, border-color .25s ease, background-color .25s ease;
  }
  .release-card::before {
    content: '';
    position: absolute;
    inset: 8px;
    border: 1px solid rgba(139, 105, 54, .13);
    pointer-events: none;
  }
  .release-card:hover {
    transform: translateY(-4px);
    border-color: #755b35;
    background-color: #111313;
  }
  .card-top,
  .card-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 22px;
    color: #776e60;
    text-transform: uppercase;
    font: 12px/1.2 var(--font-ui);
    letter-spacing: .12em;
  }
  .card-kind { color: #a78649; }
  .date { text-align: right; }
  .card-main { margin: 48px 0 38px; }
  .release-card h2 {
    margin: 0 0 18px;
    color: #ded2b9;
    font-size: clamp(38px, 5vw, 62px);
    line-height: .9;
    text-transform: uppercase;
  }
  .release-card p {
    max-width: 480px;
    margin: 0;
    color: #9e9587;
    font: 16px/1.65 var(--font-body);
  }
  .card-bottom {
    margin-top: auto;
    padding-top: 20px;
    border-top: 1px solid #2c271f;
    color: #a28d68;
  }
  .arrow { color: #b89556; font-size: 20px; transition: transform .2s ease; }
  .release-card:hover .arrow { transform: translate(3px, -3px); }
  .empty { max-width: 640px; margin: 0; color: #91897d; font: 18px/1.8 var(--font-body); }
  @media (max-width: 780px) {
    .inner { padding-top: 130px; padding-bottom: 90px; }
    .page-heading { margin-bottom: 54px; }
    .release-grid { grid-template-columns: 1fr; }
    .release-card { min-height: 315px; }
  }
  @media (max-width: 480px) {
    .release-card { min-height: 300px; padding: 24px 22px 22px; }
    .card-top { align-items: flex-start; }
    .date { max-width: 150px; }
    .card-main { margin: 40px 0 32px; }
  }
</style>
