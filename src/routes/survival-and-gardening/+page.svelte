<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';

  const shots = [
    { src: '/art/survival/camp.webp', alt: 'A campfire and traveler’s tent in the wild' },
    { src: '/art/survival/boats.webp', alt: 'Fishing from a Survival boat at dusk' },
    { src: '/art/survival/gardening.webp', alt: 'A gardener among wooden planters of pumpkin and melon' },
    { src: '/art/survival/garden-01.webp', alt: 'A cottage garden beside a timber house' },
    { src: '/art/survival/garden-02.webp', alt: 'Harvesting pumpkin and watermelon from planters' },
    { src: '/art/survival/mulgore.webp', alt: 'A Tauren with a shovel at the Gardening quest in Mulgore' }
  ];

  const crafts = [
    {
      name: 'Dim Torch',
      copy: 'Brightens the night and grants +4 Spirit to you and your party while held.'
    },
    {
      name: 'Fishing Boat',
      copy: 'Fish from the middle of the lake with +50 Fishing. Boats last 60 minutes.'
    },
    {
      name: "Traveler's Tent",
      copy: 'Lasts 20 minutes and speeds rested experience while you are inside. Extra tents beside it stack the bonus, up to five.'
    },
    {
      name: 'Bright Campfire',
      copy: 'A fire for you and your party that provides +8 Spirit.'
    },
    {
      name: 'Iron Lantern',
      copy: 'Lights the darkest forests. Lantern oil not included.'
    },
    {
      name: "Murloc's Flippers",
      copy: 'Small bonuses to all stats and extra swimming speed while worn.'
    },
    {
      name: 'Repaired Electro-Lantern',
      copy: 'Never runs out of fuel. Grants +4 Spirit like the Dim Torch and adds a zap to melee attacks.'
    },
    {
      name: 'Simple Wooden Planter',
      copy: 'The start of Gardening - plant, water, and harvest your own crops.'
    }
  ];

  let lightbox: { src: string; alt: string } | null = null;

  function openShot(src: string, alt: string) {
    lightbox = { src, alt };
  }

  function closeShot() {
    lightbox = null;
  }
</script>

<svelte:head>
  <title>Survival &amp; Gardening - Windrunner</title>
  <meta
    name="description"
    content="Camp, fish, and grow crops with Survival and Gardening - tents, boats, campfires, and planters for the great outdoors."
  />
</svelte:head>

<svelte:window on:keydown={(e) => e.key === 'Escape' && closeShot()} />

<Header />
<main class="survival-page">
  <section class="intro">
    <div class="kicker">NEW SECONDARY PROFESSION</div>
    <h1>Survival &amp; Gardening</h1>
    <p>
      Make yourself at home with a camping tent, warm up with a cozy campfire, and fish from a sturdy boat - with bonuses
      on top. Collect seeds from around the world, tend your crops, and reap the harvest.
    </p>
    <div class="shot-grid">
      {#each shots as shot}
        <button type="button" class="shot" aria-label="Enlarge: {shot.alt}" on:click={() => openShot(shot.src, shot.alt)}>
          <img src={shot.src} alt={shot.alt} />
        </button>
      {/each}
    </div>
  </section>

  <section class="body">
    <div>
      <div class="kicker">SURVIVAL</div>
      <h2>The great<br /><em>outdoors.</em></h2>
    </div>
    <div class="copy">
      <p>
        Visit Stranglethorn Vale and speak to S. J. Erlgadin and Rufus Hardwick of Nesingwary's Expedition for intensive
        Survival training.
      </p>
      <p>You’ll learn how to camp, fish, light the dark, and set up a planter for Gardening.</p>
    </div>
  </section>

  <section class="specs">
    <div class="section-heading">
      <div class="kicker">WHAT YOU'LL LEARN</div>
      <h2>Kit for the<br /><em>trail.</em></h2>
    </div>
    <div class="specs-grid">
      {#each crafts as craft}
        <article>
          <h3>{craft.name}</h3>
          <p>{craft.copy}</p>
        </article>
      {/each}
    </div>
  </section>

  <section class="body deposits">
    <div>
      <div class="kicker">GARDENING</div>
      <h2>You reap<br /><em>what you sow.</em></h2>
    </div>
    <div class="copy">
      <p>Plant the seed, water it, foster it, and enjoy the results once it’s fully grown.</p>
      <p>
        Starting at level 20, take the quest “You Reap What You Sow” in Elwynn Forest or Mulgore. You’ll learn where to
        find four seed types with accelerated growth, receive a Shovel and your first Wooden Planter, and grow your first
        pumpkin.
      </p>
      <p>
        Bring Refreshing Spring Water, Un'Goro Soil, and Seeds. Place the soil and seeds in the planter, then wait. Every
        9 minutes you’ll need to water or fertilize the sproutling - then harvest.
      </p>
      <p>You need Survival skill 75 to start Gardening.</p>
      <a class="cta" href="/features/professions">EXPLORE PROFESSIONS →</a>
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
    <img src={lightbox.src} alt={lightbox.alt} />
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
  .shot-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 18px;
    max-width: 1100px;
    margin: 0 auto;
  }
  .shot {
    margin: 0;
    padding: 8px;
    border: 1px solid #3a3124;
    background: #11100d;
    cursor: zoom-in;
    overflow: hidden;
  }
  .shot img {
    display: block;
    width: 100%;
    height: 200px;
    object-fit: cover;
    transition: 0.35s;
  }
  .shot:hover img {
    transform: scale(1.03);
    filter: brightness(1.08);
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
    max-width: min(1200px, 92vw);
    max-height: 90vh;
    width: auto;
    height: auto;
    border: 1px solid #6d5328;
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.55);
  }
  @media (max-width: 800px) {
    .body,
    .specs-grid,
    .shot-grid {
      grid-template-columns: 1fr;
      gap: 18px;
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
