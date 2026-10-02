<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';

  const shot = {
    src: '/art/news/launcher_release.webp',
    alt: 'The Windrunner Launcher, with the realm destination, news from the realm, and an update button'
  };

  const notes = [
    {
      name: 'Setup',
      copy: 'The launcher installs the client and points it at Windrunner. No realmlist, patch folder, or server address to type in.'
    },
    {
      name: 'Updates',
      copy: 'When a new build is ready, the same window downloads it and tells you when you can play.'
    },
    {
      name: 'News',
      copy: 'Patch notes and announcements sit beside the play button, so you see what changed before you log in.'
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
  <title>Launcher - Windrunner</title>
  <meta
    name="description"
    content="The Windrunner Launcher installs the game, points it at the server, and handles updates and news from one window."
  />
</svelte:head>

<svelte:window on:keydown={(e) => e.key === 'Escape' && closeShot()} />

<Header />
<main>
  <section class="intro">
    <div class="kicker">TOOLS</div>
    <h1>Launcher</h1>
    <p>
      The Windrunner Launcher sets up the game, points it at the server, and keeps it current. You open one window. It
      handles the rest.
    </p>
    <button type="button" class="banner" aria-label="Enlarge Launcher screenshot" on:click={openShot}>
      <img src={shot.src} alt={shot.alt} />
    </button>
  </section>

  <section class="body">
    <div>
      <div class="kicker">ONE WINDOW</div>
      <h2>Install it,<br /><em>then play.</em></h2>
    </div>
    <div class="copy">
      <p>
        Setup is a button. The launcher fetches the client, wires it to the Windrunner realm, and leaves you with a
        destination you can launch. You do not have to know where the files live or which patch you are on.
      </p>
      <p>
        Status sits under the destination: what is installed, whether an update is waiting, and when the client is
        ready. Client, server, and settings stay in the top bar for the times you need them.
      </p>
      <p>
        News from the realm is listed in the same window. Updates, fixes, and stories from the team are there before
        you press play, instead of living on a separate page you have to remember to check.
      </p>
    </div>
  </section>

  <section class="notes">
    <div class="section-heading">
      <div class="kicker">WHAT IT COVERS</div>
      <h2>Game, server,<br /><em>and the news.</em></h2>
    </div>
    <div class="notes-grid">
      {#each notes as note}
        <article>
          <h3>{note.name}</h3>
          <p>{note.copy}</p>
        </article>
      {/each}
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
    <img src={shot.src} alt="Enlarged Launcher screenshot" />
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
    width: min(980px, 100%);
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
    padding: 80px clamp(24px, 8vw, 130px) 40px;
    background: #090b0c;
    border-top: 1px solid #17130f;
  }
  .body h2,
  .notes h2 {
    font-size: clamp(38px, 5vw, 68px);
    line-height: 0.95;
    text-transform: uppercase;
    color: #d9cdb5;
    margin: 12px 0;
  }
  .body em,
  .notes em {
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
  .notes {
    padding: 40px clamp(24px, 8vw, 130px) 120px;
    background: radial-gradient(circle at 18% 20%, rgba(102, 76, 38, 0.1), transparent 32%), #090b0c;
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
  @media (max-width: 900px) {
    .notes-grid {
      grid-template-columns: 1fr;
    }
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
    .notes {
      padding-left: 22px;
      padding-right: 22px;
    }
  }
</style>
