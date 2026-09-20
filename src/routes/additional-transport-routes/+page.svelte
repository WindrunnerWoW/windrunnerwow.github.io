<script lang="ts">
  import StoryPage from '$lib/components/StoryPage.svelte';

  type Faction = 'alliance' | 'horde' | 'both';

  const flightPaths: { name: string; faction: Faction; copy: string }[] = [
    {
      name: 'Gnomeregan Reclamation Facility',
      faction: 'alliance',
      copy: 'Located in Dun Morogh, it serves as the new home for the Gnomeregan Exiles. This Alliance town offers familiar amenities like an auction house and bank, as well as general goods vendors.'
    },
    {
      name: 'Steepcliff Port',
      faction: 'alliance',
      copy: 'Ruins of a once-thriving port, now bound-alongside Glenshire-to the will of the Banshee Queen. Aid Duke Nargelas in culling the remaining Scourge and those who still fly the banner of Lordaeron in the name of Othmar Garithos.'
    },
    {
      name: 'Dun Agrath',
      faction: 'alliance',
      copy: 'A quaint farming village nestled in the high ridges of the Wetlands. Unlocked by discovering Menethil Harbor.'
    },
    {
      name: "Mosh'ogg Refuge",
      faction: 'horde',
      copy: "The ogre clan of Mosh’ogg is home to Gilijim’s Isle and locked in an eternal conflict with the remaining troll tribes, struggling for dominance on the island. Unlocked by discovering Booty Bay."
    },
    {
      name: 'Ironforge Airfield',
      faction: 'alliance',
      copy: 'Vital for many supply lines within Alliance territories, this icy plateau overlooks Dun Morogh and acts as a base for Ironforge’s mountaineers. Unlocked by discovering Ironforge.'
    },
    {
      name: "Alah'thalas",
      faction: 'alliance',
      copy: 'Newly established city in the Northern Eastern Kingdoms that the High Elves now call their home.'
    },
    {
      name: "Caelan's Rest",
      faction: 'alliance',
      copy: 'Shipwrecked on the shores of Lapidis Isle, these stout survivors from Kul Tiras fight tooth and nail on this hostile island surrounded by foes and traitors alike. Unlocked by discovering Booty Bay.'
    },
    {
      name: 'Medivh',
      faction: 'both',
      copy: 'As Nordrassil heals from demonic corruption, new threats emerge from the shadows. Druids of Hyjal have gathered in the ancient shrine of Medivh and lead the efforts to stop the Emerald Nightmare.'
    },
    {
      name: 'Ravenshire, Gilneas',
      faction: 'alliance',
      copy: 'The heart of the Ravenwood Rebellion, last bastion of resistance against tyranny of the Greymane dynasty.'
    },
    {
      name: 'Stillward Church',
      faction: 'horde',
      copy: 'Ravaged by the Greymane forces in the past, this abandoned church now serves as a main military base for the Forsaken in Gilneas.'
    },
    {
      name: 'Bael Hardul',
      faction: 'alliance',
      copy: "Dwarven outpost in Stonetalon Mountains established during the events of Warcraft 3, now reclaimed by the Explorers' League."
    }
  ];

  const boats = [
    { from: 'Stormwind Harbor', to: 'Auberdine', faction: 'alliance' as Faction },
    { from: 'Sparkwater Port', to: 'Revantusk Village', faction: 'horde' as Faction }
  ];

  const zeppelins = [
    { from: 'Orgrimmar', to: 'Thunder Bluff', faction: 'horde' as Faction },
    { from: 'Orgrimmar', to: 'Kargath', faction: 'horde' as Faction }
  ];

  const galleries = {
    flights: ['/art/transport/fp1.webp', '/art/transport/fp2.webp', '/art/transport/fp3.webp'],
    boats: ['/art/transport/boat1.webp', '/art/transport/boat2.webp', '/art/transport/boat3.webp'],
    zeps: ['/art/transport/zep1.webp', '/art/transport/zep2.webp', '/art/transport/zep3.webp']
  };

  let slides = { flights: 0, boats: 0, zeps: 0 };
  let lightbox: { src: string; alt: string } | null = null;

  function step(key: keyof typeof slides, delta: number, total: number) {
    slides[key] = (slides[key] + delta + total) % total;
    slides = slides;
  }

  function closeShot() {
    lightbox = null;
  }

  const allianceFlights = flightPaths.filter((stop) => stop.faction === 'alliance');
  const hordeFlights = flightPaths.filter((stop) => stop.faction === 'horde');
  const sharedFlights = flightPaths.filter((stop) => stop.faction === 'both');
</script>

<svelte:window on:keydown={(e) => e.key === 'Escape' && closeShot()} />

<StoryPage
  title="Additional Transport Routes"
  eyebrow="NEW TRANSPORT"
  intro="By creating new transport routes and flight paths, the Horde and Alliance can now access even the farthest corners of the world. Including those undeservedly forgotten."
  heroImage="/art/features/transport.webp"
  heroPosition="center"
  heroSize="cover"
  sectionEyebrow="TRAVEL"
  sectionTitle="Reach farther."
  bullets={[
    'New flight paths open towns, islands and forgotten corners of both continents.',
    'Boat lines connect Stormwind Harbor to Auberdine and Sparkwater Port to Revantusk Village.',
    'Zeppelins now run from Orgrimmar to Thunder Bluff and Kargath.'
  ]}
>
  <section class="block">
    <div class="section-heading"><div class="kicker">NEW FLIGHT PATHS</div><h2>Gryphons, wyverns,<br /><em>new roosts.</em></h2></div>
    <figure class="wide">
      <button class="shot" type="button" on:click={() => (lightbox = { src: galleries.flights[slides.flights], alt: 'New flight paths' })}>
        <img src={galleries.flights[slides.flights]} alt="New flight paths" />
      </button>
      <div class="gallery-nav">
        <button type="button" aria-label="Previous screenshot" on:click={() => step('flights', -1, galleries.flights.length)}>‹</button>
        <div class="dots">
          {#each galleries.flights as _, i}
            <button type="button" class:on={slides.flights === i} aria-label="Show screenshot {i + 1}" on:click={() => { slides.flights = i; slides = slides; }}></button>
          {/each}
        </div>
        <button type="button" aria-label="Next screenshot" on:click={() => step('flights', 1, galleries.flights.length)}>›</button>
      </div>
    </figure>
    <div class="faction-board">
      <div class="faction-col">
        <header>
          <img src="/art/transport/icon-alliance.webp" alt="" />
          <div>
            <div class="kicker">ALLIANCE</div>
            <h3>{allianceFlights.length} new roosts</h3>
          </div>
        </header>
        <ul>
          {#each allianceFlights as stop}
            <li>
              <h4>{stop.name}</h4>
              <p>{stop.copy}</p>
            </li>
          {/each}
        </ul>
      </div>
      <div class="faction-stack">
        <div class="faction-col">
          <header>
            <img src="/art/transport/icon-horde.webp" alt="" />
            <div>
              <div class="kicker">HORDE</div>
              <h3>{hordeFlights.length} new roosts</h3>
            </div>
          </header>
          <ul>
            {#each hordeFlights as stop}
              <li>
                <h4>{stop.name}</h4>
                <p>{stop.copy}</p>
              </li>
            {/each}
          </ul>
        </div>
        <div class="faction-col">
          <header>
            <div class="factions">
              <img src="/art/transport/icon-alliance.webp" alt="" />
              <img src="/art/transport/icon-horde.webp" alt="" />
            </div>
            <div>
              <div class="kicker">NEUTRAL</div>
              <h3>{sharedFlights.length} shared roost{sharedFlights.length === 1 ? '' : 's'}</h3>
            </div>
          </header>
          <ul>
            {#each sharedFlights as stop}
              <li>
                <h4>{stop.name}</h4>
                <p>{stop.copy}</p>
              </li>
            {/each}
          </ul>
        </div>
      </div>
    </div>
  </section>

  <section class="block alt">
    <div class="section-heading"><div class="kicker">NEW BOAT ROUTES</div><h2>Across the sea.</h2></div>
    <div class="layout flip">
      <ul class="routes">
        {#each boats as route}
          <li>
            <div class="factions">
              {#if route.faction === 'alliance'}<img src="/art/transport/icon-alliance.webp" alt="Alliance" />{/if}
              {#if route.faction === 'horde'}<img src="/art/transport/icon-horde.webp" alt="Horde" />{/if}
            </div>
            <h3>{route.from} <span>→</span> {route.to}</h3>
          </li>
        {/each}
      </ul>
      <figure>
        <button class="shot" type="button" on:click={() => (lightbox = { src: galleries.boats[slides.boats], alt: 'New boat routes' })}>
          <img src={galleries.boats[slides.boats]} alt="New boat routes" />
        </button>
        <div class="gallery-nav">
          <button type="button" aria-label="Previous screenshot" on:click={() => step('boats', -1, galleries.boats.length)}>‹</button>
          <div class="dots">
            {#each galleries.boats as _, i}
              <button type="button" class:on={slides.boats === i} aria-label="Show screenshot {i + 1}" on:click={() => { slides.boats = i; slides = slides; }}></button>
            {/each}
          </div>
          <button type="button" aria-label="Next screenshot" on:click={() => step('boats', 1, galleries.boats.length)}>›</button>
        </div>
      </figure>
    </div>
  </section>

  <section class="block">
    <div class="section-heading"><div class="kicker">NEW ZEPPELIN ROUTES</div><h2>Horde skies.</h2></div>
    <div class="layout">
      <ul class="routes">
        {#each zeppelins as route}
          <li>
            <div class="factions"><img src="/art/transport/icon-horde.webp" alt="Horde" /></div>
            <h3>{route.from} <span>→</span> {route.to}</h3>
          </li>
        {/each}
      </ul>
      <figure>
        <button class="shot" type="button" on:click={() => (lightbox = { src: galleries.zeps[slides.zeps], alt: 'New zeppelin routes' })}>
          <img src={galleries.zeps[slides.zeps]} alt="New zeppelin routes" />
        </button>
        <div class="gallery-nav">
          <button type="button" aria-label="Previous screenshot" on:click={() => step('zeps', -1, galleries.zeps.length)}>‹</button>
          <div class="dots">
            {#each galleries.zeps as _, i}
              <button type="button" class:on={slides.zeps === i} aria-label="Show screenshot {i + 1}" on:click={() => { slides.zeps = i; slides = slides; }}></button>
            {/each}
          </div>
          <button type="button" aria-label="Next screenshot" on:click={() => step('zeps', 1, galleries.zeps.length)}>›</button>
        </div>
      </figure>
    </div>
  </section>
</StoryPage>

{#if lightbox}
  <div class="lightbox" on:click={closeShot} on:keydown={(e) => e.key === 'Enter' && closeShot()} role="dialog" aria-modal="true" tabindex="-1">
    <img src={lightbox.src} alt={lightbox.alt} />
  </div>
{/if}

<style>
  .block { padding: 120px clamp(24px, 8vw, 130px); background: #080a0b; border-top: 1px solid #17130f; }
  .block.alt { background: #0b0d0e; }
  .section-heading { margin-bottom: 44px; }
  .section-heading h2 { font-size: clamp(42px, 6vw, 78px); line-height: .88; text-transform: uppercase; color: #ddd1b8; margin: 12px 0; }
  .section-heading em { font-style: normal; color: #a78348; }
  .layout { display: grid; grid-template-columns: minmax(0, 1.05fr) minmax(0, .95fr); gap: 56px; align-items: start; }
  .layout.flip { grid-template-columns: minmax(0, .95fr) minmax(0, 1.05fr); }
  .layout.flip figure { order: -1; }
  .faction-board { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; margin-top: 48px; align-items: start; }
  .faction-stack { display: grid; gap: 28px; align-content: start; }
  .faction-col { padding: 28px 28px 8px; border: 1px solid #30281c; background: #0c0e0f; }
  .faction-col header { display: flex; align-items: center; gap: 14px; margin-bottom: 8px; padding-bottom: 18px; border-bottom: 1px solid #2a241b; }
  .faction-col header > img, .faction-col header .factions img { width: 42px; height: 42px; object-fit: contain; }
  .faction-col header h3 { margin: 6px 0 0; font-size: 22px; line-height: 1; text-transform: uppercase; color: #d8cbb1; }
  .faction-col ul { margin: 0; padding: 0; list-style: none; }
  .faction-col li { padding: 20px 0; border-bottom: 1px solid #231e16; }
  .faction-col li:last-child { border-bottom: 0; }
  .faction-col h4 { margin: 0 0 8px; font-size: 18px; line-height: 1.15; text-transform: uppercase; color: #d8cbb1; }
  .faction-col p { margin: 0; color: #938b7f; font: 15px / 1.65 var(--font-body); }
  .factions { display: flex; gap: 6px; align-items: center; }
  .factions img { height: 22px; width: auto; display: block; }
  .routes h3 { font-size: 22px; line-height: 1.1; text-transform: uppercase; color: #d8cbb1; margin: 8px 0 10px; }
  .routes { margin: 0; padding: 0; list-style: none; display: grid; gap: 22px; }
  .routes li { padding: 22px 0; border-bottom: 1px solid #2a241b; }
  .routes span { color: #a78348; }
  figure { margin: 0; padding: 10px; border: 1px solid #30281c; background: #11100d; }
  figure.wide { max-width: 1100px; }
  .shot { display: block; width: 100%; padding: 0; border: 0; background: none; cursor: zoom-in; }
  .shot img { display: block; width: 100%; aspect-ratio: 16 / 10; object-fit: cover; }
  .gallery-nav { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 12px 4px 2px; }
  .gallery-nav > button { width: 36px; height: 32px; border: 1px solid #5c4a2e; background: transparent; color: #c7b382; font-size: 22px; line-height: 1; cursor: pointer; }
  .gallery-nav > button:hover { background: rgba(128, 102, 58, .13); }
  .dots { display: flex; gap: 8px; }
  .dots button { width: 9px; height: 9px; padding: 0; border: 1px solid #6a5736; background: transparent; border-radius: 50%; cursor: pointer; }
  .dots button.on { background: #b89454; }
  .lightbox { position: fixed; inset: 0; z-index: 80; display: grid; place-items: center; padding: 24px; background: rgba(5, 6, 7, .92); cursor: zoom-out; }
  .lightbox img { max-width: min(1400px, 94vw); max-height: 90vh; object-fit: contain; border: 1px solid #3a3124; }
  @media (max-width: 980px) {
    .layout, .layout.flip, .faction-board { grid-template-columns: 1fr; }
    .layout.flip figure { order: 0; }
  }
</style>
