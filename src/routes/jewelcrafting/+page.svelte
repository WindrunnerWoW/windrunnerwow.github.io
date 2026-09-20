<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';

  const specializations = [
    {
      name: 'Goldsmith',
      copy: 'Craft equipment - necklaces, rings, bracers, and staves. The most powerful pieces, including epics, are exclusive to this path.'
    },
    {
      name: 'Gemology',
      copy: 'Cut unique gemstones that empower necklaces and rings with distinct effects. Almost all gemstones belong to this specialization.'
    }
  ];

  let lightbox = false;

  function openShot() {
    lightbox = true;
  }

  function closeShot() {
    lightbox = false;
  }
</script>

<svelte:head>
  <title>Jewelcrafting - Windrunner</title>
  <meta
    name="description"
    content="A new primary profession with over 200 crafts, Goldsmith and Gemology specializations, and gemstone deposits across Azeroth."
  />
</svelte:head>

<svelte:window on:keydown={(e) => e.key === 'Escape' && closeShot()} />

<Header />
<main class="jewel-page">
  <section class="intro">
    <div class="kicker">NEW PRIMARY PROFESSION</div>
    <h1>Jewelcrafting</h1>
    <p>
      A fully-fledged profession with over 200 new items to craft. Recipes come from trainers, the world, and exclusive
      Jewelcrafter questlines that reward a unique recipe on completion.
    </p>
    <button type="button" class="banner" aria-label="Enlarge Jewelcrafting screenshot" on:click={openShot}>
      <img
        src="/art/jewelcrafting/hero.webp"
        alt="A High Elf jewelcrafter at the workbench, with a crafted necklace and the profession window open"
      />
    </button>
  </section>

  <section class="body">
    <div>
      <div class="kicker">TRAINERS &amp; CRAFTS</div>
      <h2>Cut, set,<br /><em>and shine.</em></h2>
    </div>
    <div class="copy">
      <p>
        Begin in Stormwind, Ironforge, and Alah'Thalas for the Alliance, or Orgrimmar, Undercity, and Sparkwater Port for
        the Horde.
      </p>
      <p>
        Expect rings, necklaces, staves, trinkets, off-hand frills, helmets, and gemstones. Not every recipe is available
        at once - they unlock as you rank up. New trade goods include gritted papers, polishing oils, and jewels such as
        Amber Topaz and Pure Moonstone.
      </p>
      <p>
        Jewelcrafting is collaborative. Some materials need other professions, including Enchanted Gemstone Oils from
        Enchanters.
      </p>
    </div>
  </section>

  <section class="specs">
    <div class="section-heading">
      <div class="kicker">SUB-SPECIALIZATIONS</div>
      <h2>Choose your<br /><em>cut.</em></h2>
      <p>
        At skill 225 and character level 40, complete a questline and pick one path - the same structure as other
        profession specializations.
      </p>
    </div>
    <div class="specs-grid">
      {#each specializations as spec}
        <article>
          <h3>{spec.name}</h3>
          <p>{spec.copy}</p>
        </article>
      {/each}
    </div>
  </section>

  <section class="body deposits">
    <div>
      <div class="kicker">MATERIALS</div>
      <h2>Gems from<br /><em>the earth.</em></h2>
    </div>
    <div class="copy">
      <p>
        Every Jewelcrafter can craft Gemstone Clusters - recycle materials into more jewels than mining
        usually provides.
      </p>
      <p>
        Rare Gemstone Deposits can replace thorium veins and need Mining 310. They yield gems from several tiers and
        always drop an Imperial Topaz, a key material for both specializations - as scarce and vital as Black Lotus for
        high-level crafts.
      </p>
      <a class="cta" href="/features/professions">EXPLORE PROFESSIONS →</a>
    </div>
  </section>
</main>
<Footer />

{#if lightbox}
  <div class="lightbox" on:click={closeShot} on:keydown={(e) => e.key === 'Escape' && closeShot()} role="dialog" aria-modal="true" tabindex="-1">
    <img src="/art/jewelcrafting/hero.webp" alt="Enlarged Jewelcrafting screenshot" />
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
  .body {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    padding: 100px clamp(24px, 8vw, 130px);
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
  .body em,
  .specs em {
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
  .specs {
    padding: 40px clamp(24px, 8vw, 130px) 100px;
    background: radial-gradient(circle at 18% 20%, rgba(102, 76, 38, 0.1), transparent 32%), #090b0c;
  }
  .section-heading {
    max-width: 720px;
    margin-bottom: 48px;
  }
  .section-heading h2 {
    font-size: clamp(40px, 6vw, 78px);
    line-height: 0.9;
    text-transform: uppercase;
    color: #ddd1b8;
    margin: 12px 0 20px;
  }
  .section-heading p {
    max-width: 640px;
    margin: 0;
    color: #a0988b;
    font: 17px / 1.8 var(--font-body);
  }
  .specs-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 28px;
  }
  .specs-grid article {
    padding: 32px 28px;
    border: 1px solid #3a3124;
    background: linear-gradient(180deg, #14110d, #0d0c0a);
  }
  .specs-grid h3 {
    margin: 0 0 12px;
    font-size: 22px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: #d9cdb5;
  }
  .specs-grid p {
    margin: 0;
    color: #9c9487;
    font: 17px / 1.8 var(--font-body);
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
    .body,
    .specs-grid {
      grid-template-columns: 1fr;
      gap: 30px;
    }
    .intro {
      padding: 120px 22px 36px;
    }
    .body,
    .specs {
      padding-left: 22px;
      padding-right: 22px;
    }
  }
</style>
