<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';

  let lightbox = false;

  function openShot() {
    lightbox = true;
  }

  function closeShot() {
    lightbox = false;
  }
</script>

<svelte:head>
  <title>Transmogrification - Windrunner</title>
  <meta name="description" content="Collect item appearances by equipping them, then apply those looks with Fashion Coins." />
</svelte:head>

<svelte:window on:keydown={(e) => e.key === 'Escape' && closeShot()} />

<Header />
<main>
  <section
    class="hero"
    style="--hero-image: url('/art/features/transmog.webp'); --hero-position: center; --hero-size: cover"
  >
    <div class="content">
      <div class="kicker">NEW FEATURE</div>
      <h1>Transmogrification</h1>
      <p>Collect item appearances by equipping them, then apply those appearances to your gear by using Fashion Coins, which can be acquired from fashionista quests, end-game bosses, and various events.</p>
    </div>
  </section>

  <section class="shot-section">
    <button type="button" class="banner" aria-label="Enlarge Transmogrify window" on:click={openShot}>
      <img src="/art/transmog/ui.webp" alt="The Transmogrify window, with a character preview and collected item appearances" />
    </button>
  </section>
</main>
<Footer />

{#if lightbox}
  <div class="lightbox" on:click={closeShot} role="dialog" aria-modal="true" tabindex="-1">
    <img src="/art/transmog/ui.webp" alt="Enlarged Transmogrify window" />
  </div>
{/if}

<style>
  .shot-section {
    padding: 0 clamp(24px, 8vw, 130px) 80px;
    background: #090b0c;
  }
  .banner {
    display: block;
    margin: 0 auto;
    max-width: 1100px;
    width: 100%;
    padding: 10px;
    border: 1px solid #3a3124;
    background: #11100d;
    cursor: zoom-in;
  }
  .banner img {
    display: block;
    width: 100%;
    height: auto;
  }
  .lightbox {
    position: fixed;
    inset: 0;
    z-index: 80;
    display: grid;
    place-items: center;
    padding: 40px;
    background: rgba(5, 7, 8, 0.88);
    cursor: zoom-out;
  }
  .lightbox img {
    max-width: min(1200px, 92vw);
    max-height: 90vh;
    width: auto;
    height: auto;
    border: 1px solid #6d5328;
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.55);
  }
  @media (max-width: 600px) {
    .shot-section {
      padding: 0 22px 48px;
    }
  }
</style>
