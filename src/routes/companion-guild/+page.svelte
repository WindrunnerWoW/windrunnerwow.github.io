<script lang="ts">
  import Header from "$lib/components/Header.svelte";
  import Footer from "$lib/components/Footer.svelte";

  const notes = [
    {
      name: "Everywhere",
      copy: "Recruiters wait in each inn across Azeroth, so hiring help never means a long trip.",
    },
    {
      name: "Hired company",
      copy: "Companions join you for some money. With the right money, maybe forever?",
    },
  ];

  const shots = [
    {
      src: "/art/news/companion_recruiter_1.webp",
      alt: "The Companion Recruitment window with Temporary Recruitment selected, offering Fill Group and Class & Spec options",
    },
    {
      src: "/art/news/companion_recruiter_2.webp",
      alt: "The Permanent Recruitment window for choosing a companion's class, race, and specialization",
    },
    {
      src: "/art/news/companion_recruiter_3.webp",
      alt: "Companion Management, listing recruited companions with their class, specialization, and Invite buttons",
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
  <title>Companion Guild - Windrunner</title>
  <meta
    name="description"
    content="Find companion recruiters in any inn and hire allies to travel with you."
  />
</svelte:head>

<svelte:window on:keydown={(e) => e.key === 'Escape' && closeShot()} />

<Header />
<main>
  <section
    class="hero"
    style="--hero-image: url('/art/roadmap/companion_guild.webp'); --hero-position: 70% 55%; --hero-size: cover"
  >
    <div class="content">
      <div class="kicker">SYSTEMS</div>
      <h1>Companion Guild</h1>
      <p>
        The Companion Guild posts recruiters in every inn. Visit one when you
        want company on the road - for a few goldcoins they can find someone
        that will help with quests and dungeons.
      </p>
    </div>
  </section>

  <section class="body">
    <div>
      <div class="kicker">SYSTEMS</div>
      <h2>Help for the road,<br /><em>hired at the inn.</em></h2>
    </div>
    <div class="copy">
      <p>
        A recruiter stands in each inn throughout the world. Talk to them and
        they help with the Companion Guild: a roster of allies you can bring
        along when a solo path starts to feel thin.
      </p>
      <p>
        Hiring can be temporary or permanent. Browse who is available, choose a
        companion, and send them out with you. The guild handles the
        introduction. You handle the adventure.
      </p>
      <p>
        Companions are there for the stretches between dungeons, quests, and
        campfires - extra hands when the road is long and the party is just you.
      </p>
    </div>
  </section>

  <section class="shots">
    <div class="section-heading">
      <div class="kicker">AT THE INN</div>
      <h2>The guild<br /><em>is waiting.</em></h2>
    </div>
    <div class="shot-grid">
      {#each shots as shot}
        <button
          type="button"
          class="shot"
          aria-label="Enlarge: {shot.alt}"
          on:click={() => openShot(shot.src, shot.alt)}
        >
          <img src={shot.src} alt={shot.alt} />
        </button>
      {/each}
    </div>
  </section>

  <section class="notes">
    <div class="section-heading">
      <div class="kicker">HOW IT WORKS</div>
      <h2>A guild that<br /><em>travels with you.</em></h2>
    </div>
    <div class="notes-grid">
      {#each notes as note}
        <article>
          <h3>{note.name}</h3>
          <p>{note.copy}</p>
        </article>
      {/each}
    </div>
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
  .body h2,
  .shots h2,
  .notes h2 {
    font-size: clamp(38px, 5vw, 68px);
    line-height: 0.95;
    text-transform: uppercase;
    color: #d9cdb5;
    margin: 12px 0;
  }
  .body em,
  .shots em,
  .notes em {
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
  .shots {
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
  .notes {
    padding: 40px clamp(24px, 8vw, 130px) 120px;
    background: radial-gradient(
        circle at 18% 20%,
        rgba(102, 76, 38, 0.1),
        transparent 32%
      ),
      #090b0c;
  }
  .section-heading {
    max-width: 720px;
    margin-bottom: 48px;
  }
  .notes-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 28px;
  }
  .notes-grid article {
    padding: 32px 28px;
    border: 1px solid #3a3124;
    background: linear-gradient(180deg, #14110d, #0d0c0a);
  }
  .notes-grid h3 {
    margin: 0 0 12px;
    font-size: 22px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: #d9cdb5;
  }
  .notes-grid p {
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
  @media (max-width: 900px) {
    .notes-grid,
    .shot-grid {
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
    .notes {
      padding-left: 22px;
      padding-right: 22px;
    }
  }
</style>
