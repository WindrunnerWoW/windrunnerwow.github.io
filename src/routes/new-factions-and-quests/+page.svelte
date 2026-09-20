<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';

  const factions = [
    {
      name: 'Wardens of Time',
      copy: 'This specific group of the Bronze Dragonflight will accept the aid of any mortal that have earned access to the Caverns of Time. Their goal is to undo the mysterious time anomalies that have recently begun to appear across the timeways.'
    },
    {
      name: 'Steamwheedle Blood Ring',
      copy: 'A grand arena tournament organized by the Steamwheedle Cartel. The strongest fighters are invited to compete in the bloody sands for fame and great rewards provided by the Arena Masters of the Cartel.'
    },
    {
      name: 'Kul Tiran',
      copy: "Remnants of Admiral Daelin Proudmoore's Exploratory Fleet, these few survivors that have not been killed by the Horde eke out a dangerous existence."
    },
    {
      name: 'Keepers of Outerend',
      copy: 'These stalwart servants have kept the relic Outerend safe for a dozen millenia. With the coming darkness, they now seek to guide mortals to fight for Azeroth.'
    },
    {
      name: 'Theramore',
      copy: 'Theramore, a human city led by Lady Jaina Proudmoore, stands as a beacon of peace and alliance amidst the turbulent waters of Dustwallow Marsh.'
    },
    {
      name: 'Dalaran',
      copy: 'Dalaran, a magical city hidden from the eyes of bystanders, serves as a sanctuary for the Kirin Tor, a powerful group of mages dedicated to the pursuit of knowledge and the protection of Azeroth.'
    },
    {
      name: 'Wildhammer Clan',
      copy: 'The Wildhammer Clan, a faction of dwarves residing in the Hinterlands, are known for their mastery of aerial combat and their alliance with the Alliance, providing crucial support in the ongoing battle against the Horde.'
    },
    {
      name: 'Gelkis and Magran Centaur',
      copy: 'The Gelkis and Magran Centaur tribes, residing in Desolace, are locked in a bitter conflict over resources and territory, caught in the crossfire of the ongoing war between the Alliance and the Horde.'
    },
    {
      name: 'Thorium Brotherhood',
      copy: 'The secretive Thorium Brotherhood, based in the Searing Gorge, harnesses the power of rare minerals to create powerful weapons and armor, serving as a vital source of support for the Alliance and the Horde alike in their ongoing battles.'
    }
  ];

  const shots = [
    { src: '/art/factions/caverns-01.webp', alt: 'Caverns of Time preview 1' },
    { src: '/art/factions/caverns-02.webp', alt: 'Caverns of Time preview 2' },
    { src: '/art/factions/goblin.webp', alt: 'Goblin preview' },
    { src: '/art/factions/highelf-tirisfal.webp', alt: 'High Elf in Tirisfal preview' },
    { src: '/art/factions/human-tirisfal.webp', alt: 'Human in Tirisfal preview' },
    { src: '/art/factions/kultiran-01.webp', alt: 'Kul Tiran preview 1' },
    { src: '/art/factions/kultiran-02.webp', alt: 'Kul Tiran preview 2' },
    { src: '/art/factions/morogal.webp', alt: 'Morogal preview' },
    { src: '/art/factions/troll-lapidis.webp', alt: 'Troll in Lapidis preview' }
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
  <title>New Factions &amp; Quests - Windrunner</title>
  <meta
    name="description"
    content="Meet new factions and characters across Azeroth. 1500 quests have been added all around the world."
  />
</svelte:head>

<svelte:window on:keydown={(e) => e.key === 'Escape' && closeShot()} />

<Header />
<main class="factions-page">
  <section class="intro">
    <div class="kicker">LORE &amp; FACTIONS</div>
    <h1>New Factions &amp; Quests</h1>
    <p>
      With the danger lurking around every corner, prepare to meet numerous new
      factions and characters that will no doubt need the help of an adventurer like you. 1500 quests have been added
      all around Azeroth!
    </p>
    <button type="button" class="banner" aria-label="Enlarge Caverns of Time screenshot" on:click={() => openShot(shots[0].src, shots[0].alt)}>
      <img src={shots[0].src} alt={shots[0].alt} />
    </button>
  </section>

  <section class="roster">
    <div class="section-heading">
      <div class="kicker">NEW REPUTATIONS</div>
      <h2>Allies across<br /><em>Azeroth.</em></h2>
      <p>Nine factions with their own stories, from the Caverns of Time to the Searing Gorge.</p>
    </div>
    <div class="faction-grid">
      {#each factions as faction}
        <article>
          <h3>{faction.name}</h3>
          <p>{faction.copy}</p>
        </article>
      {/each}
    </div>
  </section>

  <section class="gallery">
    <div class="section-heading">
      <div class="kicker">SCREENSHOTS</div>
      <h2>Scenes from<br /><em>the journey.</em></h2>
      <p>Caverns of Time, Kul Tiras, Tirisfal, Lapidis, and more - tap a shot to enlarge it.</p>
    </div>
    <div class="shot-grid">
      {#each shots as shot}
        <button type="button" class="shot" on:click={() => openShot(shot.src, shot.alt)}>
          <img src={shot.src} alt={shot.alt} />
        </button>
      {/each}
    </div>
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
    max-width: 780px;
    margin: 0 0 48px;
    font-family: var(--font-body);
    font-size: 18px;
    line-height: 1.85;
    color: #b1a898;
  }
  .banner {
    display: block;
    width: min(1100px, 100%);
    margin: 0 auto;
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
  .roster,
  .gallery {
    padding: 90px clamp(24px, 8vw, 130px);
    background: #080a0b;
    border-top: 1px solid #17130f;
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
  .section-heading em {
    font-style: normal;
    color: #a78348;
  }
  .section-heading p {
    max-width: 640px;
    margin: 0;
    color: #a0988b;
    font: 17px / 1.8 var(--font-body);
  }
  .faction-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 18px;
  }
  .faction-grid article {
    padding: 28px 24px;
    border-top: 1px solid #80663a;
    background: linear-gradient(145deg, rgba(92, 73, 42, 0.14), transparent 60%), #0d1011;
  }
  .faction-grid h3 {
    font-size: 22px;
    line-height: 1.1;
    text-transform: uppercase;
    color: #d8cbb1;
    margin: 0 0 14px;
  }
  .faction-grid p {
    color: #968e82;
    font: 15px / 1.7 var(--font-body);
    margin: 0;
  }
  .shot-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 18px;
  }
  .shot {
    margin: 0;
    padding: 0;
    border: 1px solid #3a3124;
    background: #11100d;
    cursor: zoom-in;
    overflow: hidden;
  }
  .shot img {
    display: block;
    width: 100%;
    height: 220px;
    object-fit: cover;
    transition: 0.35s;
  }
  .shot:hover img {
    transform: scale(1.03);
    filter: brightness(1.08);
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
  @media (max-width: 900px) {
    .faction-grid,
    .shot-grid {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (max-width: 600px) {
    .intro {
      padding: 120px 22px 28px;
    }
    .faction-grid,
    .shot-grid {
      grid-template-columns: 1fr;
    }
    .shot img {
      height: 200px;
    }
  }
</style>
