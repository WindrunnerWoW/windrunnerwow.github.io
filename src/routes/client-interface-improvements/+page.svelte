<script lang="ts">
  import StoryPage from '$lib/components/StoryPage.svelte';

  const improvements = [
    {
      title: 'Improved Profession UI',
      copy: 'The profession UI is now larger, with extra options such as Have materials and Provides skill-up. A search bar along the bottom of the recipe list saves you from endless scrolling.',
      src: '/art/client-ui/tradeskill.webp',
      alt: 'Expanded profession window with recipe search, Have materials, and Provides skill-up filters'
    },
    {
      title: 'Items Sent to the Winner',
      copy: "Items won through group loot will no longer become free-for-all if the roll winner's bags are full. Any rare or higher quality items still unlooted when the corpse despawns are mailed to the winner instead of being lost forever.",
      src: '/art/client-ui/postman.webp',
      alt: 'A mailbox with loot mailed to the roll winner after bags were full'
    },
    {
      title: 'Minimized World Map',
      copy: 'Your world map can now be minimized by clicking the arrow button next to the close button, for a more streamlined experience.',
      src: '/art/client-ui/world-map.webp',
      alt: 'World map minimized with the arrow control next to the close button'
    },
    {
      title: 'Hardcore Channel',
      copy: "Hardcore players can open the hardcore channel with /h. The channel is disabled at level 60 if you are not an Inferno Mode player - and therefore immortal again.",
      src: '/art/client-ui/hc-chat.webp',
      alt: 'Hardcore chat channel opened with the /h command'
    },
    {
      title: 'LFT - Looking For Turtles',
      copy: "Looking for group? Look for Turtles. A queue-formation bulletin board helps players form groups more easily. It will not teleport you to the dungeon - it only helps you assemble the party.",
      src: '/art/client-ui/lft.webp',
      alt: 'Looking For Turtles bulletin board for forming groups'
    },
    {
      title: 'Extended Quest Log',
      copy: 'The quest log is now larger, so you can see all of your quests at once. This does not bypass the 20 quest limit, which we plan to change in a later update.',
      src: '/art/client-ui/quest-log.webp',
      alt: 'Expanded quest log showing more quests at once'
    },
    {
      title: "XP Gain Toggle on Player's Portrait",
      copy: 'Experience can now be toggled on and off by right-clicking your character portrait.',
      src: '/art/client-ui/xp-toggle.webp',
      alt: 'Right-click menu on the player portrait with Experience Gain toggle'
    },
    {
      title: 'Pet & Mount Collections',
      copy: 'Pets no longer have to wait at the bank. A collection tab keeps them with you on the road. There is also a mount tab in the spellbook - pull a horse out of the book instead of a rabbit out of a hat.',
      src: '/art/client-ui/collections.webp',
      alt: 'Spellbook collection tabs for pets and mounts'
    },
    {
      title: 'Battleground Finder on the Minimap',
      copy: 'From the sands of the Blood Ring to the timeless conflicts of Sunnyglade Valley, there are many opportunities to earn fame and glory for your faction.',
      src: '/art/client-ui/battleground-finder.webp',
      alt: 'Battleground finder opened from the minimap'
    }
  ];

  let lightbox: { src: string; alt: string } | null = null;

  function closeShot() {
    lightbox = null;
  }
</script>

<svelte:head>
  <meta
    name="description"
    content="Vanilla-style UI improvements: profession search, mailed loot, minimizable map, collections, LFT, and more - no extra add-ons required."
  />
</svelte:head>

<svelte:window on:keydown={(e) => e.key === 'Escape' && closeShot()} />

<StoryPage
  title="Client Interface Improvements"
  eyebrow="QUALITY OF LIFE"
  intro="As we add more content, we want the interface to keep up. These updates stay in the familiar Vanilla style so you can navigate the changes without scouring the web for twenty-year-old add-ons."
  heroImage="/art/features/ui.webp"
  heroPosition="center"
  heroSize="cover"
  sectionEyebrow="CLIENT"
  sectionTitle="Useful tools, vanilla look."
  bullets={[
    'Profession search, mailed loot, and a minimizable world map are built into the client.',
    'Collections, LFT, and a larger quest log keep Vanilla windows without extra add-ons.',
    'XP toggle, hardcore chat, and a battleground finder sit where you already look.'
  ]}
>
  <section class="list">
    {#each improvements as item, i}
      <article class="row" class:flip={i % 2 === 1}>
        <button type="button" class="shot" on:click={() => (lightbox = { src: item.src, alt: item.alt })}>
          <img src={item.src} alt={item.alt} />
        </button>
        <div class="copy">
          <div class="kicker">0{i + 1}</div>
          <h3>{item.title}</h3>
          <p>{item.copy}</p>
        </div>
      </article>
    {/each}
  </section>
</StoryPage>

{#if lightbox}
  <div class="lightbox" on:click={closeShot} on:keydown={(e) => e.key === 'Enter' && closeShot()} role="dialog" aria-modal="true" tabindex="-1">
    <img src={lightbox.src} alt={lightbox.alt} />
  </div>
{/if}

<style>
  .list {
    padding: 90px clamp(24px, 8vw, 130px) 120px;
    background: #090b0c;
    border-top: 1px solid #17130f;
  }
  .row {
    display: grid;
    grid-template-columns: 1.15fr 0.85fr;
    gap: 56px;
    align-items: center;
    margin-bottom: 72px;
  }
  .row:last-child {
    margin-bottom: 0;
  }
  .row.flip {
    grid-template-columns: 0.85fr 1.15fr;
  }
  .row.flip .shot {
    order: 2;
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
    max-height: 420px;
    object-fit: cover;
    object-position: top;
    transition: 0.35s;
  }
  .shot:hover img {
    transform: scale(1.02);
    filter: brightness(1.08);
  }
  .copy h3 {
    margin: 10px 0 16px;
    font-size: clamp(26px, 3vw, 36px);
    letter-spacing: 0.02em;
    text-transform: uppercase;
    color: #d9cdb5;
  }
  .copy p {
    margin: 0;
    color: #9c9487;
    font: 17px / 1.85 var(--font-body);
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
    .list {
      padding: 60px 22px 80px;
    }
    .row,
    .row.flip {
      grid-template-columns: 1fr;
      gap: 22px;
      margin-bottom: 48px;
    }
    .row.flip .shot {
      order: 0;
    }
    .shot img {
      max-height: 280px;
    }
  }
</style>
