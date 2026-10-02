<script lang="ts">
  import Header from "$lib/components/Header.svelte";
  import Footer from "$lib/components/Footer.svelte";

  const releasesUrl =
    "https://github.com/WindrunnerWoW/windrunner-launcher/releases";
  const repoUrl = "https://github.com/WindrunnerWoW/windrunner-launcher";
  const discussionUrl =
    "https://github.com/WindrunnerWoW/windrunnerwow.github.io/discussions/17";

  const shot = {
    src: "/art/news/launcher_release.webp",
    alt: "The Windrunner Launcher, with the realm destination, news from the realm, and an update button",
  };

  const notes = [
    {
      name: "Client",
      copy: "It downloads the game for you and keeps it patched afterwards. No hunting for a patch someone uploaded.",
    },
    {
      name: "Mods",
      copy: "Community mods and VanillaTweaks settings in one panel. Switch something off because it annoys you, it is still off next week.",
    },
    {
      name: "Addons",
      copy: "Install and update addons through the launcher, so you are not copying folders into Interface by hand.",
    },
    {
      name: "Server",
      copy: "Windrunner server, database and all, running on your machine. Start it, play on it, and it saves the world when you stop.",
    },
    {
      name: "Updates",
      copy: "Server, client and launcher updates come from one place. If an update goes wrong, it rolls back instead of leaving a broken install.",
    },
    {
      name: "Realms",
      copy: "Pick Windrunner and press play. Add a friend server (or other turtle wow forks) by putting their realm IP into the list and connect to that one too.",
    },
  ];

  const portable = [
    {
      name: "No system install",
      copy: "It does not install itself into Windows, touch the registry, or leave a service running after you close it.",
    },
    {
      name: "Easy management",
      copy: "Everything it needs sits in the folder you put it in. That folder can be pn a USB stick, a second drive, wherever. If you ever want it gone, you delete the folder.",
    },
    {
      name: "Nothing reported back",
      copy: "No telemetry. There is nothing to opt out of, because there is nothing being sent.",
    },
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
    content="The Windrunner Launcher downloads the client, manages mods and addons, runs a full server, and handles updates, all from one portable folder."
  />
</svelte:head>

<svelte:window on:keydown={(e) => e.key === "Escape" && closeShot()} />

<Header />
<main>
  <section class="intro">
    <div class="kicker">TOOLS</div>
    <h1>Launcher</h1>
    <span class="beta">Beta</span>
    <p>
      The client, your mods, the addons, the updates and a whole server, running
      on your own machine, without the troubles.
    </p>
    <div class="actions">
      <a
        class="cta primary"
        href={releasesUrl}
        target="_blank"
        rel="noopener noreferrer">Download</a
      >
      <a class="cta" href={repoUrl} target="_blank" rel="noopener noreferrer"
        >Source</a
      >
      <a class="cta" href="/news/LauncherBeta">Release post</a>
      <a
        class="cta"
        href={discussionUrl}
        target="_blank"
        rel="noopener noreferrer">Discussion</a
      >
    </div>
    <button
      type="button"
      class="banner"
      aria-label="Enlarge Launcher screenshot"
      on:click={openShot}
    >
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
        Setup used to mean downloading files, getting the maps, dropping in a
        config, patching the client, and trusting that it all held together.
        Then doing it again three months later because a changelog said nothing
        more than "server files updated".
      </p>
      <p>
        The launcher takes that part away. It downloads the client, wires it to
        a realm, starts the server, and keeps everything current. It knows what
        the client is supposed to look like, where the mods go, and what a
        server update needs to touch. None of that is your job anymore.
      </p>
      <p>
        Updates are backed up before they happen. If one goes wrong, it puts
        everything back the way it was and tells you what happened, instead of
        costing you the evening. A damaged world database or client can be
        repaired from the same place.
      </p>
      <p>
        Your account is created in the launcher too. It is not installing a
        service and handing you an opaque black box that happens to be playable.
      </p>
    </div>
  </section>

  <section class="notes">
    <div class="section-heading">
      <div class="kicker">WHAT IT COVERS</div>
      <h2>Client, server,<br /><em>and everything in between.</em></h2>
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

  <section class="body">
    <div>
      <div class="kicker">PORTABLE</div>
      <h2>It stays<br /><em>where you put it.</em></h2>
    </div>
    <div class="copy">
      <p>
        The launcher does not install itself into Windows, does not write
        registry entries, and does not leave a service running behind your back.
        Everything it needs lives in the folder it sits in.
      </p>
      <p>
        That makes the whole installation movable. Put it on a USB stick, a
        second hard drive, or the desktop of a laptop you do not use that often,
        and it works the same way there.
      </p>
    </div>
  </section>

  <section class="notes">
    <div class="section-heading">
      <div class="kicker">NO FOOTPRINT</div>
      <h2>Nothing it does<br /><em>outlives it.</em></h2>
    </div>
    <div class="notes-grid">
      {#each portable as item}
        <article>
          <h3>{item.name}</h3>
          <p>{item.copy}</p>
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
    on:keydown={(e) => e.key === "Escape" && closeShot()}
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
    background: radial-gradient(
        circle at 50% 0%,
        rgba(92, 73, 42, 0.16),
        transparent 28rem
      ),
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
    margin: 0 0 32px;
    font-family: var(--font-body);
    font-size: 18px;
    line-height: 1.85;
    color: #b1a898;
  }
  .beta {
    display: inline-block;
    margin-bottom: 22px;
    padding: 5px 10px;
    border: 1px solid #80663a;
    color: #c7b382;
    font: 10px / 1 var(--font-body);
    letter-spacing: 0.22em;
    text-transform: uppercase;
  }
  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin: 0 0 48px;
  }
  .cta {
    display: inline-block;
    padding: 14px 18px;
    border: 1px solid #80663a;
    color: #c7b382;
    text-decoration: none;
    text-transform: uppercase;
    font-size: 10px;
    letter-spacing: 0.14em;
  }
  .cta:hover {
    border-color: #c7b382;
    color: #e3d3ab;
  }
  .cta.primary {
    background: #ad884b;
    border-color: #ad884b;
    color: #0d0c0a;
  }
  .cta.primary:hover {
    background: #c7b382;
    border-color: #c7b382;
    color: #0d0c0a;
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
  .copy .link {
    color: #c7b382;
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
