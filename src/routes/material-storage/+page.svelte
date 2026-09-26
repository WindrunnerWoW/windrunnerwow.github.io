<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';

  const shot = {
    src: '/art/material-storage/hero.webp',
    alt: 'The Material Storage window, with crafting reagents grouped and a Deposit All Materials button'
  };

  let lightbox = false;

  function openShot() {
    lightbox = true;
  }

  function closeShot() {
    lightbox = false;
  }
</script>

<svelte:head>
  <title>Material Storage - Windrunner</title>
  <meta
    name="description"
    content="Unlock Material Storage at a banker for 250 gold and keep nearly unlimited crafting materials out of your bags and bank."
  />
</svelte:head>

<svelte:window on:keydown={(e) => e.key === 'Escape' && closeShot()} />

<Header />
<main>
  <section class="intro">
    <div class="kicker">PROFESSIONS</div>
    <h1>Material Storage</h1>
    <p>
      Buy the Crafting Material Storage Box from a banker for 250 gold. Once you have it, nearly unlimited crafting
      materials live in their own window - so they no longer eat your bags or your regular bank tabs.
    </p>
    <button type="button" class="banner" aria-label="Enlarge Material Storage screenshot" on:click={openShot}>
      <img src={shot.src} alt={shot.alt} />
    </button>
  </section>

  <section class="body">
    <div>
      <div class="kicker">UNLOCK</div>
      <h2>Pay the banker,<br /><em>empty the bags.</em></h2>
    </div>
    <div class="copy">
      <p>
        Any banker sells the box. The 250 gold is a one-time unlock. After that, the storage is yours: dump reagents
        into it instead of spreading stacks across bags, bank slots, and alt characters.
      </p>
      <p>
        Capacity is nearly unlimited for crafting materials. Cloth, leather, ore, herbs, and the rest of your
        trade goods can sit here, ready when you craft, without competing with gear, quest items, or gold.
      </p>
      <p>
        Deposit stacks one at a time, or use Deposit All Materials to send every eligible reagent in at once.
      </p>
      <a class="cta" href="/features/professions">Back to professions →</a>
      <a class="cta" href="/news/FS_materialStorage">More about the Material Storage →</a>
    </div>
  </section>
</main>
<Footer />

{#if lightbox}
  <div
    class="lightbox"
    on:click={closeShot}
    on:keydown={(e) => e.key === 'Escape' && closeShot()}
    role="dialog"
    aria-modal="true"
    tabindex="-1"
  >
    <img src={shot.src} alt="Enlarged Material Storage screenshot" />
  </div>
{/if}

<style>
  .intro {
    padding: 150px clamp(24px, 8vw, 130px) 40px;
    background:
      radial-gradient(circle at 50% 0%, rgba(92, 73, 42, 0.16), transparent 28rem),
      #090b0c;
  }
  .intro h1 {
    font-family: var(--font-heading);
    font-size: clamp(54px, 9vw, 112px);
    line-height: 0.84;
    text-transform: uppercase;
    color: #ded3bb;
    margin: 14px 0 24px;
  }
  .intro p {
    max-width: 760px;
    margin: 0 0 48px;
    font-family: var(--font-body);
    font-size: 18px;
    line-height: 1.85;
    color: #b1a898;
  }
  .banner {
    display: block;
    width: min(640px, 100%);
    margin: 0;
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
  .body {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    padding: 80px clamp(24px, 8vw, 130px) 120px;
    background: #090b0c;
    border-top: 1px solid #17130f;
  }
  .body h2 {
    font-size: clamp(38px, 5vw, 68px);
    line-height: 0.95;
    text-transform: uppercase;
    color: #d9cdb5;
    margin: 12px 0;
  }
  .body em {
    font-style: normal;
    color: #ad884b;
  }
  .copy p {
    margin: 0 0 18px;
    color: #9c9487;
    font-family: var(--font-body);
    font-size: 17px;
    line-height: 1.9;
  }
  .cta {
    display: inline-block;
    margin-top: 16px;
    padding: 14px 18px;
    border: 1px solid #80663a;
    color: #c7b382;
    text-decoration: none;
    text-transform: uppercase;
    font-size: 10px;
    letter-spacing: 0.14em;
  }
  .cta:hover {
    background: rgba(128, 102, 58, 0.13);
    border-color: #b89454;
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
    max-width: min(1400px, 92vw);
    max-height: 90vh;
    width: auto;
    height: auto;
    border: 1px solid #6d5328;
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.55);
  }
  @media (max-width: 800px) {
    .intro {
      padding: 120px 22px 36px;
    }
    .body {
      grid-template-columns: 1fr;
      gap: 30px;
      padding-left: 22px;
      padding-right: 22px;
    }
  }
</style>
