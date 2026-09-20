<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import { history, intro, newLoot, principles, sets, tunings } from '$lib/data/itemization';

  const banner = '/art/itemization/banner.webp';
  const reputationShot = '/art/itemization/reputation-rewards.webp';
  const icons = '/art/itemization/new-icons.webp';

  let lightbox: { src: string; alt: string } | null = null;

  function closeShot() {
    lightbox = null;
  }
</script>

<svelte:head>
  <title>Itemization - Windrunner</title>
  <meta
    name="description"
    content="Rewards with purpose: loot from Mysteries of Azeroth through Scars of the Past, sets with a reason to exist, and older pieces retuned without retiring classic drops."
  />
</svelte:head>

<svelte:window on:keydown={(e) => e.key === 'Escape' && closeShot()} />

<Header />
<main>
  <section class="intro">
    <div class="kicker">ITEMIZATION</div>
    <h1>Rewards with purpose.</h1>
    <p>{intro}</p>
    <button
      type="button"
      class="banner"
      aria-label="Enlarge itemization screenshot"
      on:click={() => (lightbox = { src: banner, alt: 'Item tooltip collage from the latest itemization pass' })}
    >
      <img src={banner} alt="New and updated item tooltips from the latest itemization pass" />
    </button>
  </section>

  <section class="body">
    <div>
      <div class="kicker">DESIGN</div>
      <h2>Built to feel<br /><em>native to Vanilla.</em></h2>
    </div>
    <div class="copy">
      <p>
        New zones should drop loot that belongs there. Older dungeons should still be worth running. The work is less
        about flooding the world with upgrades and more about giving every bracket a reason to care what you equip.
      </p>
      <ul>
        {#each principles as item}
          <li>{item}</li>
        {/each}
      </ul>
    </div>
  </section>

  <section class="sets">
    <div class="section-heading">
      <div class="kicker">THE LONG PASS</div>
      <h2>Every patch left<br /><em>new choices.</em></h2>
      <p>
        Itemization did not start with Scars of the Past. Each Mysteries of Azeroth patch added tables for new zones and
        dungeons, then went back to classic raids so Spirit, padding, and leftover greens did not linger forever.
      </p>
    </div>
    <div class="card-grid">
      {#each history as item}
        <article>
          <div class="kicker">{item.patch}</div>
          <h3>{item.name}</h3>
          <p>{item.copy}</p>
        </article>
      {/each}
    </div>
  </section>

  <section class="body">
    <div>
      <div class="kicker">1.18.0 · NEW LOOT</div>
      <h2>Fill the gaps<br /><em>the world opened.</em></h2>
    </div>
    <div class="copy">
      <p>
        Grim Reaches, Balor, Northwind, and the new dungeons needed rewards of their own - not leftover greens from
        somewhere else. The same pass reached dungeon extensions, Molten Core, crafts, and a handful of secrets.
      </p>
      <ul>
        {#each newLoot as item}
          <li>{item}</li>
        {/each}
      </ul>
    </div>
  </section>

  <section class="sets">
    <div class="section-heading">
      <div class="kicker">NEW SETS</div>
      <h2>A fantasy,<br /><em>not a ladder.</em></h2>
      <p>
        Earlier patches added Hateforge plate, Red Dragon Mail, Blood Ring gladiator, and spec-specific Tier 3.5. Scars
        of the Past continues that idea: Stormreaver and Dragonmaw sell a playstyle from the new story; Arms of
        Thaurissan is a rumor made real in Blackrock.
      </p>
      <img class="icons" src={icons} alt="New item icons from the 1.18.0 itemization pass" />
    </div>
    <div class="card-grid three">
      {#each sets as set}
        <article>
          <h3>{set.name}</h3>
          <p>{set.copy}</p>
        </article>
      {/each}
    </div>
  </section>

  <section class="body reputation">
    <div>
      <div class="kicker">REPUTATION</div>
      <h2>Standing worth<br /><em>the grind.</em></h2>
      <p class="copy-p">
        Hateforge already put Sentinel glaives on the Darnassus vendor and blues on Dalaran. Scars of the Past does the
        same for Shen’dralar, Thorium Brotherhood, Argent Dawn, and Wildhammer Clan - new stock, and new ways to earn
        favor.
      </p>
    </div>
    <button
      type="button"
      class="shot"
      aria-label="Enlarge reputation vendor screenshot"
      on:click={() =>
        (lightbox = {
          src: reputationShot,
          alt: 'Reputation vendor windows for Shen’dralar, Thorium Brotherhood, Argent Dawn, and Wildhammer Clan'
        })}
    >
      <img
        src={reputationShot}
        alt="New reputation rewards for Shen’dralar, Thorium Brotherhood, Argent Dawn, and Wildhammer Clan"
      />
    </button>
  </section>

  <section class="sets last">
    <div class="section-heading">
      <div class="kicker">RETUNES</div>
      <h2>Keep last year’s<br /><em>loot honest.</em></h2>
      <p>
        Hateforge already started swapping raid Spirit for power. Scars of the Past keeps that work going - Vampirism,
        dungeon capstones, Molten Core, and a catch-up of one-off rewards since Tower of Karazhan.
      </p>
    </div>
    <div class="card-grid">
      {#each tunings as item}
        <article>
          <h3>{item.name}</h3>
          <p>{item.copy}</p>
        </article>
      {/each}
    </div>
    <a class="cta" href="/features/classes">SEE CLASS DESIGN →</a>
  </section>
</main>
<Footer />

{#if lightbox}
  <div class="lightbox" on:click={closeShot} role="dialog" aria-modal="true" tabindex="-1">
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
  .banner,
  .shot {
    display: block;
    width: 100%;
    max-width: 1100px;
    margin: 0 auto;
    padding: 10px;
    border: 1px solid #3a3124;
    background: #11100d;
    cursor: zoom-in;
  }
  .banner img {
    display: block;
    width: 100%;
    max-height: 560px;
    object-fit: cover;
    object-position: top center;
  }
  .shot {
    max-width: none;
    margin: 0;
    align-self: center;
  }
  .shot img {
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
  .body h2,
  .sets h2 {
    font-size: clamp(38px, 5vw, 68px);
    line-height: 0.95;
    text-transform: uppercase;
    color: #d9cdb5;
    margin: 12px 0;
  }
  .body em,
  .sets em {
    font-style: normal;
    color: #ad884b;
  }
  .copy {
    max-width: 640px;
  }
  .copy p,
  .copy-p {
    margin: 0 0 18px;
    color: #9c9487;
    font-family: var(--font-body);
    font-size: 17px;
    line-height: 1.9;
  }
  .copy ul {
    margin: 8px 0 0;
    padding-left: 18px;
    color: #9c9487;
    font: 17px / 1.9 var(--font-body);
  }
  .copy li {
    margin: 0 0 8px;
  }
  .sets {
    padding: 40px clamp(24px, 8vw, 130px) 80px;
    background: radial-gradient(circle at 18% 20%, rgba(102, 76, 38, 0.1), transparent 32%), #090b0c;
  }
  .last {
    padding-bottom: 120px;
  }
  .section-heading {
    max-width: 720px;
    margin-bottom: 48px;
  }
  .section-heading p {
    max-width: 640px;
    margin: 20px 0 0;
    color: #a0988b;
    font: 17px / 1.8 var(--font-body);
  }
  .icons {
    display: block;
    margin-top: 28px;
    max-width: 440px;
    width: 100%;
    height: auto;
    border: 1px solid #3a3124;
    background: #11100d;
    padding: 8px;
  }
  article .kicker {
    margin-bottom: 8px;
  }
  .card-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 28px;
  }
  .card-grid.three {
    grid-template-columns: repeat(3, 1fr);
  }
  article {
    padding: 32px 28px;
    border: 1px solid #3a3124;
    background: linear-gradient(180deg, #14110d, #0d0c0a);
  }
  article h3 {
    margin: 0 0 12px;
    font-size: 22px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: #d9cdb5;
  }
  article p {
    margin: 0;
    color: #9c9487;
    font: 17px / 1.8 var(--font-body);
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
  .lightbox {
    position: fixed;
    inset: 0;
    z-index: 80;
    display: grid;
    place-items: center;
    padding: 40px;
    overflow: auto;
    background: rgba(5, 7, 8, 0.88);
    cursor: zoom-out;
  }
  .lightbox img {
    max-width: min(1400px, 92vw);
    width: auto;
    height: auto;
    border: 1px solid #6d5328;
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.55);
  }
  @media (max-width: 900px) {
    .card-grid,
    .card-grid.three {
      grid-template-columns: 1fr;
    }
  }
  @media (max-width: 800px) {
    .intro {
      padding: 120px 22px 36px;
    }
    .body,
    .sets {
      padding-left: 22px;
      padding-right: 22px;
    }
    .body {
      grid-template-columns: 1fr;
      gap: 30px;
    }
    .banner img {
      max-height: 360px;
    }
  }
</style>
