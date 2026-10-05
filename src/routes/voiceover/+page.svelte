<script lang="ts">
  import StoryPage from "$lib/components/StoryPage.svelte";

  const highlights = [
    {
      title: "Fixed multi-giver quests",
      copy: "The base addon only kept one voiceline per quest. Mage quests from multiple questgivers played the wrong voice. Windrunner Voiceover handles every giver correctly.",
    },
    {
      title: "Restyled, Windrunner-ready",
      copy: "A lightly reworked look, forked from MrThingers Voiceover, with support for Windrunner and all Turtle WoW servers out of the box.",
    },
    {
      title: "Complete voice data",
      copy: "Voice data generated for all Turtle WoW quests — and every new Windrunner quest gets voiced too. Keep it fresh via the Windrunner Launcher.",
    },
  ];

  const links = [
    {
      label: "Windrunner-Voiceover",
      href: "https://github.com/WindrunnerWoW/windrunner-voiceover",
    },
    {
      label: "Voiceover data",
      href: "https://github.com/WindrunnerWoW/windrunner-voiceover-data",
    },
    {
      label: "Upstream: MrThingers Voiceover",
      href: "https://github.com/mrthinger/wow-voiceover",
    },
  ];

  let lightbox = false;
  function closeShot() {
    lightbox = false;
  }
</script>

<svelte:head>
  <meta
    name="description"
    content="Windrunner Voiceover reads quest text aloud — multi-giver fix, restyled UI, full Turtle WoW voice data, updated via the Launcher."
  />
</svelte:head>

<svelte:window on:keydown={(e) => e.key === "Escape" && closeShot()} />

<StoryPage
  title="Windrunner Voiceover"
  eyebrow="ADDON"
  intro="A new version of a great addon. Quest text read aloud, generated for every Turtle WoW quest — with a fix for quests shared across multiple questgivers."
  heroImage="/art/news/vo_addon.webp"
  heroPosition="center"
  heroSize="cover"
  sectionEyebrow="INTERFACE"
  sectionTitle="Stay a while and listen."
  bullets={[
    "Forked from MrThingers Voiceover, restyled and tuned for Windrunner and all Turtle WoW servers.",
    "Fixes wrong voicelines for quests offered by multiple questgivers — e.g. Mage quests.",
    "Full Turtle WoW voice data included; new Windrunner quests get voiced too. Update via the Launcher.",
  ]}
  ctaHref="/news/a_new_addon"
  ctaLabel="Read the announcement"
>
  <section class="block">
    <div class="section-heading">
      <div class="kicker">HOW IT WORKS</div>
      <h2>Quests you can <em>hear.</em></h2>
      <p>
        Use Windrunner-Voiceover with the Windrunenr-voiceover-data pack. Voices
        play as you pick up and turn in quests.
      </p>
    </div>
    <figure>
      <button
        class="shot"
        type="button"
        aria-label="Enlarge screenshot"
        on:click={() => (lightbox = true)}
      >
        <img
          src="/art/news/vo_addon.webp"
          alt="Windrunner Voiceover addon showing voiced quest text in-game"
        />
      </button>
      <figcaption>
        Windrunner Voiceover in-game — voiced quest text with a restyled frame.
      </figcaption>
    </figure>
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
      <div class="kicker">GET IT</div>
      <h2>Addon, data <em>& updates.</em></h2>
      <p>
        Install the addon plus its data pack. Easiest way to stay current is the
        Windrunner Launcher. Also check out Upsteam and give it a star!
      </p>
    </div>
    <div class="links">
      {#each links as link}
        <a href={link.href} target="_blank" rel="noreferrer">{link.label} ↗</a>
      {/each}
    </div>
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
    <img
      src="/art/news/vo_addon.webp"
      alt="Enlarged Windrunner Voiceover screenshot"
    />
  </div>
{/if}

<style>
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
  .section-heading strong {
    color: #d9cdb5;
  }
  figure {
    margin: 0 0 48px;
    max-width: 1100px;
    padding: 10px;
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
  }
  .shot img {
    display: block;
    width: 100%;
    height: auto;
    max-height: 560px;
    object-fit: cover;
    object-position: top;
  }
  figcaption {
    padding: 12px 4px 2px;
    color: #7d7669;
    font: 13px / 1.6 var(--font-body);
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
  @media (max-width: 900px) {
    .grid {
      grid-template-columns: 1fr;
    }
    .block,
    .block.alt {
      padding: 60px 22px 80px;
    }
  }
</style>
