<script lang="ts">
  import StoryPage from "$lib/components/StoryPage.svelte";

  const highlights = [
    {
      title: "Native input",
      copy: "Xbox and DualSense controllers talk to the client directly. Movement, camera, and actions use the game's own input path, with no keyboard emulation in the world.",
    },
    {
      title: "The whole journey",
      copy: "The controller works on the login and character screens too, including an on-screen keyboard for your account name and password.",
    },
    {
      title: "Bars that fit a pad",
      copy: "Action pages, pet controls, stance bars, and visual button prompts sit where your thumbs expect them.",
    },
    {
      title: "Radial quick menu",
      copy: "Editable spell, item, and macro rings with search put the character sheet, bags, map, and social panels one press away.",
    },
    {
      title: "Type without a keyboard",
      copy: "An on-screen keyboard handles chat in the world, so you can talk to your party without reaching for the desk.",
    },
  ];

  const controls = [
    { input: "Left stick", action: "Move, navigate menus, choose a radial entry" },
    { input: "Right stick", action: "Camera, cursor, or radial selection" },
    { input: "R3", action: "Toggle camera and cursor mode" },
    { input: "A", action: "Jump in the world, confirm in menus" },
    { input: "X / Y / B", action: "Action slots or menu controls" },
    { input: "D-pad", action: "Menu navigation and action slots" },
    { input: "LB / RB", action: "Action slots or menu controls" },
    { input: "LT / RT", action: "Action pages 2 and 3. Press both for page 4" },
    { input: "Back / Start", action: "World map and radial quick menu" },
    { input: "Back + Start", action: "Pause or resume controller input" },
  ];

  const shots = [
    {
      src: "/art/features/controller_1.webp",
      alt: "The controller on-screen keyboard open on the World of Warcraft login screen",
      caption: "The native login keyboard, available before the addon loads.",
    },
    {
      src: "/art/features/controller_3.webp",
      alt: "The radial quick menu open in the world, with slots for character, inventory, spells, and quests",
      caption: "The radial quick menu, with menus and rings one press away.",
    },
    {
      src: "/art/features/controller_4.webp",
      alt: "Controller Setup bindings page with an action picker for a controller slot",
      caption: "Bindings, action picker, and slot layout in the setup panel.",
    },
  ];

  let lightbox: { src: string; alt: string } | null = null;

  function closeShot() {
    lightbox = null;
  }
</script>

<svelte:head>
  <meta
    name="description"
    content="Windrunner Controller turns the client into a controller-first game - native Xbox and DualSense input, a radial quick menu, action bars, and an on-screen keyboard."
  />
</svelte:head>

<svelte:window on:keydown={(e) => e.key === "Escape" && closeShot()} />

<StoryPage
  title="BETA: Controller Support"
  eyebrow="ADDON"
  intro="Windrunner Controller turns the game into a controller-first experience. Connect a controller and the interface appears; disconnect it and the normal UI comes back."
  heroImage="/art/features/controller_2.webp"
  heroPosition="70% 45%"
  heroSize="cover"
  sectionEyebrow="CONTROLLER-FIRST"
  sectionTitle="Pick it up and play."
  bullets={[
    "Xbox, DualSense, and DualSense Edge over USB or Bluetooth - no keyboard emulation in the world.",
    "The interface switches automatically, and the login screens work before the addon has loaded.",
    "Radial quick menu, action pages, menus, chat, profiles, and themes are all built in.",
  ]}
  ctaHref="/launcher"
  ctaLabel="Get it in the Launcher"
>
  <section class="beta">
    <span class="beta-tag">Beta</span>
    <p>
      Windrunner Controller is in <strong>beta</strong>. It is ready to play,
      but expect the occasional rough edge while the remaining problems are
      ironed out.
    </p>
  </section>

  <section class="block">
    <div class="section-heading">
      <div class="kicker">HOW IT WORKS</div>
      <h2>Pick it up.<br /><em>Put it down.</em></h2>
      <p>
        The addon draws the interface, while a small native component reads the
        controller and passes input straight to the game. Pick up a pad and the
        console UI takes over. Put it down and the familiar bars return.
      </p>
    </div>
    <div class="grid">
      {#each highlights as item}
        <article>
          <h3>{item.title}</h3>
          <p>{item.copy}</p>
        </article>
      {/each}
    </div>
  </section>

  <section class="block alt">
    <div class="section-heading">
      <div class="kicker">CONTROLS</div>
      <h2>Built for<br /><em>your thumbs.</em></h2>
      <p>
        Xbox labels are shown by default. DualSense players can switch the
        button prompts from the addon settings.
      </p>
    </div>
    <ul class="control-list">
      {#each controls as control}
        <li>
          <span>{control.input}</span>
          <p>{control.action}</p>
        </li>
      {/each}
    </ul>
  </section>

  <section class="block">
    <div class="section-heading">
      <div class="kicker">A CLOSER LOOK</div>
      <h2>Keyboard, rings,<br /><em>and bindings.</em></h2>
    </div>
    <div class="gallery">
      {#each shots as shot}
        <figure>
          <button
            type="button"
            class="shot"
            aria-label="Enlarge: {shot.alt}"
            on:click={() => (lightbox = shot)}
          >
            <img src={shot.src} alt={shot.alt} />
          </button>
          <figcaption>{shot.caption}</figcaption>
        </figure>
      {/each}
    </div>
  </section>

  <section class="block alt">
    <div class="section-heading">
      <div class="kicker">GET IT</div>
      <h2>One install,<br /><em>ready to go.</em></h2>
      <p>
        Windrunner Controller is available through the Windrunner Launcher,
        which keeps the addon and its native component up to date. Set it up
        once, then play from the couch.
      </p>
    </div>
    <div class="links">
      <a href="/launcher">Windrunner Launcher</a>
      <a href="/discord">Ask on Discord</a>
    </div>
    <p class="note">
      Profiles and layouts can be saved, imported, and exported, so a fresh
      install does not mean setting everything up again.
    </p>
  </section>
</StoryPage>

{#if lightbox}
  <div
    class="lightbox"
    on:click={closeShot}
    on:keydown={(e) => e.key === "Enter" && closeShot()}
    role="dialog"
    aria-modal="true"
    tabindex="-1"
  >
    <img src={lightbox.src} alt={lightbox.alt} />
  </div>
{/if}

<style>
  .beta {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 22px clamp(24px, 8vw, 130px);
    border-top: 1px solid #17130f;
    border-bottom: 1px solid #2a241a;
    background: #12100c;
  }
  .beta-tag {
    flex: none;
    padding: 8px 12px;
    border: 1px solid #80663a;
    color: #c9b27d;
    text-transform: uppercase;
    font: 10px var(--font-ui);
    letter-spacing: 0.14em;
  }
  .beta p {
    max-width: 900px;
    margin: 0;
    color: #a39a8c;
    font: 16px / 1.7 var(--font-body);
  }
  .beta strong {
    color: #d9cdb5;
    font-weight: 400;
  }
  .block {
    padding: 90px clamp(24px, 8vw, 130px) 100px;
    background: #090b0c;
    border-top: 1px solid #17130f;
  }
  .block.alt {
    background: #0b0d0e;
    padding-bottom: 120px;
  }
  .section-heading {
    max-width: 860px;
    margin-bottom: 44px;
  }
  .section-heading h2 {
    font-size: clamp(42px, 6vw, 78px);
    line-height: 0.88;
    text-transform: uppercase;
    color: #ddd1b8;
    margin: 12px 0 18px;
  }
  .section-heading em {
    font-style: normal;
    color: #a78348;
  }
  .section-heading p {
    margin: 0;
    color: #9c9487;
    font: 17px / 1.85 var(--font-body);
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 22px;
  }
  .grid article {
    padding: 32px 28px;
    border: 1px solid #3a3124;
    background: linear-gradient(180deg, #14110d, #0d0c0a);
  }
  .grid h3 {
    margin: 0 0 12px;
    font-size: 22px;
    text-transform: uppercase;
    color: #d9cdb5;
  }
  .grid p {
    margin: 0;
    color: #9c9487;
    font: 16px / 1.8 var(--font-body);
  }
  .control-list {
    max-width: 1100px;
    margin: 0;
    padding: 0;
    list-style: none;
    border-top: 1px solid #2a241a;
  }
  .control-list li {
    display: grid;
    grid-template-columns: 170px 1fr;
    gap: 24px;
    align-items: baseline;
    padding: 16px 4px;
    border-bottom: 1px solid #221d16;
  }
  .control-list span {
    color: #c9b27d;
    font: 11px var(--font-ui);
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }
  .control-list p {
    margin: 0;
    color: #9c9487;
    font: 16px / 1.7 var(--font-body);
  }
  .gallery {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 18px;
  }
  .gallery figure {
    margin: 0;
    padding: 9px;
    border: 1px solid #30281c;
    background: #11100d;
  }
  .shot {
    display: block;
    width: 100%;
    padding: 0;
    border: 0;
    background: none;
    cursor: zoom-in;
    overflow: hidden;
  }
  .shot img {
    display: block;
    width: 100%;
    height: 260px;
    object-fit: cover;
    object-position: center;
    transition:
      filter 0.3s,
      transform 0.4s;
  }
  .shot:hover img {
    filter: brightness(1.06);
    transform: scale(1.015);
  }
  figcaption {
    padding: 12px 4px 2px;
    color: #7d7669;
    font: 13px / 1.6 var(--font-body);
  }
  .links {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-bottom: 26px;
  }
  .links a {
    padding: 14px 18px;
    border: 1px solid #6b522e;
    color: #c9b27d;
    text-decoration: none;
    text-transform: uppercase;
    font: 11px var(--font-ui);
    letter-spacing: 0.12em;
  }
  .links a:hover {
    background: rgba(116, 84, 35, 0.2);
  }
  .note {
    max-width: 760px;
    margin: 0;
    color: #938b7f;
    font: 16px / 1.8 var(--font-body);
  }
  .lightbox {
    position: fixed;
    inset: 0;
    z-index: 80;
    display: grid;
    place-items: center;
    padding: 24px;
    background: rgba(5, 6, 7, 0.92);
    cursor: zoom-out;
  }
  .lightbox img {
    max-width: min(1400px, 94vw);
    max-height: 90vh;
    object-fit: contain;
    border: 1px solid #3a3124;
  }
  @media (max-width: 1000px) {
    .grid {
      grid-template-columns: 1fr 1fr;
    }
    .gallery {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (max-width: 900px) {
    .grid {
      grid-template-columns: 1fr;
    }
    .block,
    .block.alt {
      padding-top: 76px;
      padding-bottom: 84px;
    }
  }
  @media (max-width: 700px) {
    .beta {
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;
    }
    .gallery {
      grid-template-columns: 1fr;
    }
    .shot img {
      height: auto;
    }
    .control-list li {
      grid-template-columns: 1fr;
      gap: 6px;
    }
  }
</style>
