<script lang="ts">
  import Header from "$lib/components/Header.svelte";
  import Footer from "$lib/components/Footer.svelte";

  // Screenshots borrowed from the Feature Spotlight news post for now.
  const shots = Array.from({ length: 9 }, (_, i) => ({
    src: `/art/news/hearthstone/hs_${i + 1}.webp`,
    alt: `Hearthstone screenshot ${i + 1}`,
  }));

  const modes = [
    {
      kicker: "NIGHT WATCH ARENA",
      name: "Draft. Duel. Cash in.",
      copy: "Choose one of three classes, then build a deck of 30 cards by picking one out of three, again and again. Win your way up to ten victories for the best prizes. You can pause a run and come back later.",
    },
    {
      kicker: "THE LADDER",
      name: "Take the last chair.",
      copy: "Take a seat at a ladder chair and fight your way up the ranks against the ladder's roster of opponents. Reach the very top and unlock new hero portraits for your classes.",
    },
    {
      kicker: "AND MORE",
      name: "Not every game is played at a table.",
      copy: "Some challenges are hidden. Keep your eyes open, listen to what your Hearsthone Master says, and you may find different challenges.",
    },
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
  <title>Hearthstone - Windrunner</title>
  <meta
    name="description"
    content="Collect cards, build decks and duel the people of Azeroth in a single-player card game, right inside the world."
  />
</svelte:head>

<svelte:window on:keydown={(e) => e.key === 'Escape' && closeShot()} />

<Header />
<main>
  <section
    class="hero"
    style="--hero-image: url('/art/roadmap/hearthstone.webp'); --hero-position: 70% 45%; --hero-size: cover"
  >
    <div class="content">
      <div class="kicker">MINIGAMES</div>
      <h1>Hearthstone</h1>
      <p>
        Sit down at the table and play. Collect cards, build decks and duel the
        people of Azeroth in a single-player card game, right inside the world.
        No PvP, no queue, no pressure.
      </p>
    </div>
  </section>

  <section class="body">
    <div>
      <div class="kicker">YOUR FIRST HAND</div>
      <h2>Take<br /><em>a seat.</em></h2>
    </div>
    <div class="copy">
      <p>
        Find a Hearthstone Master in your capital city (Ezra Chatterton for the
        Horde, Ibelin Redmoore for the Alliance) and learn the rules in a short
        introduction questline.
      </p>
      <p>
        After that, talk to a Hearthstone Master again whenever you want a game.
        They will find an opponent for you, so you can pick a deck and start the
        match.
      </p>
    </div>
  </section>

  <section class="shots">
    <div class="section-heading">
      <div class="kicker">AT THE TABLE</div>
      <h2>The board<br /><em>is set.</em></h2>
    </div>
    <div class="shot-grid">
      {#each shots as shot}
        <button
          type="button"
          class="shot"
          aria-label="Enlarge: {shot.alt}"
          on:click={() => openShot(shot.src, shot.alt)}
        >
          <img src={shot.src} alt={shot.alt} loading="lazy" />
        </button>
      {/each}
    </div>
  </section>

  <section class="block">
    <div class="kicker">CARDS &amp; PACKS</div>
    <h2 class="block-title">Open. Collect.<br /><em>Craft.</em></h2>
    <p class="block-copy">
      Play matches and quests to earn coins, and spend them on booster packs
      from the vendors. Every pack holds five cards, and the odds work like the
      original: Commons, Rares, Epics and the occasional Legendary. A Legendary
      is guaranteed if you go too long without one. Your collection is shared by every character on your account.
    </p>
    <p class="block-copy">
      Don't need a duplicate? Take it to the crafting NPC, scrap it for dust and
      craft the card you are actually missing.
    </p>
  </section>

  <section class="block">
    <div class="kicker">DECK BUILDING</div>
    <h2 class="block-title">Find the teacher,<br /><em>learn the class.</em></h2>
    <p class="block-copy">
      Your starting class is available right away. Every other class has a
      teacher somewhere in the world. Find them, and they may help you learn
      how that class plays.
    </p>
  </section>

  <section class="modes">
    <div class="section-heading">
      <div class="kicker">GAME MODES</div>
      <h2>Pick a table,<br /><em>pick a fight.</em></h2>
    </div>
    <div class="modes-grid">
      {#each modes as mode}
        <article>
          <div class="kicker">{mode.kicker}</div>
          <h3>{mode.name}</h3>
          <p>{mode.copy}</p>
        </article>
      {/each}
    </div>
  </section>

  <section class="closing">
    <a class="cta" href="/features/systems">Back to systems →</a>
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
    <img src={lightbox.src} alt="Enlarged {lightbox.alt}" />
  </div>
{/if}

<style>
  .body {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    padding: 100px clamp(24px, 8vw, 130px);
    background: #090b0c;
    border-top: 1px solid #17130f;
  }
  .section-heading h2,
  .body h2,
  .closing h2 {
    font-size: clamp(38px, 5vw, 68px);
    line-height: 0.95;
    text-transform: uppercase;
    color: #d9cdb5;
    margin: 12px 0;
  }
  .section-heading em,
  .body em,
  .closing em {
    font-style: normal;
    color: #ad884b;
  }
  .copy {
    max-width: 640px;
  }
  .copy p {
    margin: 0 0 18px;
    color: #9c9487;
    font-family: var(--font-body);
    font-size: 17px;
    line-height: 1.9;
  }
  .shots,
  .modes {
    padding: 40px clamp(24px, 8vw, 130px) 100px;
    background: #090b0c;
    border-top: 1px solid #17130f;
  }
  .shot-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 18px;
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
    height: auto;
    transition: 0.35s;
  }
  .shot:hover img {
    transform: scale(1.03);
    filter: brightness(1.08);
  }
  .modes-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
  .modes-grid article {
    padding: 30px 26px;
    border: 1px solid #3a3124;
    background: linear-gradient(180deg, #14110d, #0d0c0a);
  }
  .modes-grid .kicker {
    margin-bottom: 12px;
  }
  .modes-grid h3 {
    margin: 0 0 12px;
    font-size: 20px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: #d9cdb5;
  }
  .modes-grid p {
    margin: 0;
    color: #9c9487;
    font: 16px / 1.75 var(--font-body);
  }
  .block {
    padding: 88px clamp(24px, 8vw, 130px);
    border-top: 1px solid #17130f;
    background: #090b0c;
  }
  .block-title {
    font-size: clamp(34px, 4.5vw, 60px);
    line-height: 0.98;
    text-transform: uppercase;
    color: #d9cdb5;
    margin: 0 0 28px;
  }
  .block-title em {
    font-style: normal;
    color: #ad884b;
  }
  .block-copy {
    max-width: 920px;
    margin: 0 0 18px;
    color: #a39a8c;
    font: 17px / 1.8 var(--font-body);
  }
  .block-list {
    max-width: 920px;
    margin: 24px 0 0;
    padding: 0;
    list-style: none;
  }
  .block-list li {
    position: relative;
    padding: 0 0 12px 24px;
    color: #a39a8c;
    font: 17px / 1.8 var(--font-body);
  }
  .block-list li:before {
    content: "◆";
    position: absolute;
    left: 0;
    top: 4px;
    color: #a78348;
    font-size: 9px;
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
  .section-heading {
    max-width: 720px;
    margin-bottom: 48px;
  }
  .closing {
    padding: 90px clamp(24px, 8vw, 130px) 120px;
    border-top: 1px solid #17130f;
    background: #090b0c;
  }
  .closing h2 {
    max-width: 820px;
  }
  .closing .block-list {
    margin-top: 28px;
  }
  .cta {
    display: inline-block;
    margin-top: 40px;
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
  @media (max-width: 900px) {
    .shot-grid,
    .modes-grid {
      grid-template-columns: 1fr;
    }
  }
  @media (max-width: 800px) {
    .body {
      grid-template-columns: 1fr;
      gap: 30px;
      padding-left: 22px;
      padding-right: 22px;
    }
    .shots,
    .modes,
    .block,
    .closing {
      padding-left: 22px;
      padding-right: 22px;
    }
  }
</style>
