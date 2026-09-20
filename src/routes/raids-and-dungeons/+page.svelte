<script lang="ts">
  import StoryPage from '$lib/components/StoryPage.svelte';

  type Entry = {
    name: string;
    meta: string;
    copy: string;
    images: string[];
  };

  const dungeons: Entry[] = [
    {
      name: 'Lower Karazhan Halls',
      meta: '10 MAN · LEVEL 60 · T1',
      copy: 'Karazhan, once the towering stronghold of the former Guardian of Tirisfal, now hums with magical energy as it perches atop a powerful leyline. In the dusty lower halls, Medivh’s loyal castellan Moroes remains a vigilant guardian. Impress him, and he may grant access to the upper floors.',
      images: ['/art/raids/lower-karazhan-01.webp', '/art/raids/lower-karazhan-02.webp', '/art/raids/lower-karazhan-03.webp']
    },
    {
      name: 'Emerald Sanctum',
      meta: '40 MAN · LEVEL 60 · T2',
      copy: 'A fog of corruption has descended upon the Emerald Dream, twisting the morals and intentions of even the noblest and purest. The corrupted Wakener is preparing a premature call of awakening; if not stopped, his kin will arise and go on a frenzied rampage across Azeroth.',
      images: ['/art/raids/emerald-sanctum-01.webp', '/art/raids/emerald-sanctum-02.webp', '/art/raids/emerald-sanctum-03.webp']
    },
    {
      name: 'Tower of Karazhan',
      meta: '40 MAN · LEVEL 60 · T3.5',
      copy: 'The spire holds immense, uncontrolled power, with numerous factions vying to claim it as their own. Face the arcane, liberate the tower, and venture forth towards Desolation.',
      images: ['/art/raids/tower-karazhan-01.webp', '/art/raids/tower-karazhan-02.webp']
    },
    {
      name: 'Black Morass',
      meta: '5 MAN · LEVEL 60 · DIRE MAUL+ · 1 HOUR',
      copy: 'Climb the spire that serves as the link between times past and present and prevent the Infinite Dragonflight from interfering with the one true timeline.',
      images: ['/art/raids/black-morass-01.webp', '/art/raids/black-morass-02.webp', '/art/raids/black-morass-03.webp']
    },
    {
      name: 'Karazhan Crypt',
      meta: '5 MAN · LEVEL 60 · DIRE MAUL+ · 1–1.5 HOURS',
      copy: 'Something is twisting the dead back to life in the forlorn catacombs. Find the source so the dead may rest again.',
      images: ['/art/raids/karazhan-crypt-01.webp', '/art/raids/karazhan-crypt-02.webp', '/art/raids/karazhan-crypt-03.webp']
    },
    {
      name: 'Stormwind Vault',
      meta: '5 MAN · LEVEL 60 · DIRE MAUL+ · 40 MINUTES',
      copy: 'The Vault’s runes of warding are weakening as the horrors within threaten Azeroth once again. Venture down and stop these fiends once and for all.',
      images: ['/art/raids/stormwind-vault-01.webp', '/art/raids/stormwind-vault-02.webp', '/art/raids/stormwind-vault-03.webp']
    },
    {
      name: 'Hateforge Quarry',
      meta: '5 MAN · LEVEL 52–60 · EARLY BRD · 1 HOUR',
      copy: 'Hidden at the northeastern walls of the Burning Steppes, this Dark Iron quarry hides an insidious cavern where the Shadowforge plot new schemes. Their plans cannot be allowed to come to fruition.',
      images: ['/art/raids/hateforge-01.webp', '/art/raids/hateforge-02.webp', '/art/raids/hateforge-03.webp']
    },
    {
      name: 'Gilneas City',
      meta: '5 MAN · LEVEL 43–49 · ZUL’FARRAK · 1 HOUR',
      copy: 'Once a bastion of hope, Gilneas City is now a shell of its former beauty. Distant howls echo through the streets - haunting reminders of its new occupants, and a chance that their accursed king may still live.',
      images: ['/art/raids/gilneas-01.webp', '/art/raids/gilneas-02.webp', '/art/raids/gilneas-03.webp']
    },
    {
      name: 'Stormwrought Ruins',
      meta: '5 MAN · LEVEL 35–42 · ULDAMAN · 2 HOURS',
      copy: 'Duke Balor’s abandoned castle on the wave-crashed cliffs of Balor has been claimed by the Stormreaver Clan and the Shadow Council. Ghosts, hulking demons and murmuring cultists stalk its pitch-black halls.',
      images: ['/art/raids/stormwrought-01.webp', '/art/raids/stormwrought-02.webp', '/art/raids/stormwrought-03.webp']
    },
    {
      name: 'The Crescent Grove',
      meta: '5 MAN · LEVEL 32–38 · SM: LIBRARY · 1 HOUR',
      copy: 'Step foot into a hidden grove under the trees and find and eradicate the source of corruption within.',
      images: ['/art/raids/crescent-grove-01.webp', '/art/raids/crescent-grove-02.webp', '/art/raids/crescent-grove-03.webp']
    }
  ];

  const classicUpdates = [
    ['Deadmines', 'Jared Vess', "A dangerous lab produces Zanzil’s Mixture before Rhah’nkzor. The optional route also awakens the Masterpiece Harvester in the Goblin Factory."],
    ['Wailing Caverns', 'Vangros & Zandara Windhoof', 'Two new areas bring an apex predator empowered by life magic and a Kolkar expedition threatening the Barrens.'],
    ['Shadowfang Keep', 'Prelate Ironmane', 'A spectral priest haunts the keep’s church, seeking peace in the old Gilnean faith.'],
    ['Scarlet Monastery - Graveyard', 'The Knight of Naxxramas', 'A Dread Citadel harbinger waits in the prison complex below the torture chambers.'],
    ['Scarlet Monastery - Library', 'Brother Steelfist', 'A masterful monk prepares initiates in hidden chambers beneath the Library.'],
    ['Scarlet Monastery - Armory', 'The Nameless Experiment & Master Smith Johana', 'A living blade and a zealous craftsman expand both the optional route and the original encounter.']
  ];

  const bosses: Entry[] = [
    {
      name: 'Concavius',
      meta: '20+ MAN · LEVEL 60 · WORLD BOSS',
      copy: 'In Shadowbreak Ravine the Twilight’s Hammer have summoned a voidwalker from the dark beyond. Concavius will not stop with the Shadow Council - it will devour all in its path unless stopped. Designed for new max-level characters, with a Void-Linked Satchel of Goods among the rewards.',
      images: ['/art/raids/concavius-01.webp', '/art/raids/concavius-02.webp', '/art/raids/concavius-03.webp']
    },
    {
      name: 'Ostarius of Uldum',
      meta: '40 MAN · LEVEL 60 · T2.5–T3',
      copy: 'Even with the discs of Uldum reformed, the facility’s security has locked down the entrance and deployed the first barrier to the journey below: Ostarius, a 40-man world boss for raiders in the Tier 2.5–Tier 3 range.',
      images: ['/art/raids/ostarius-01.webp', '/art/raids/ostarius-02.webp', '/art/raids/ostarius-03.webp']
    },
    {
      name: 'Nerubian Overseer',
      meta: '40 MAN · LEVEL 60 · T2–T2.5',
      copy: 'Commander of the crypt fiends that roam the Plaguelands, the Overseer patrols the webweaver tunnels. Bring it down and expect a nerubling companion plus a sizable Argent Dawn reputation reward.',
      images: ['/art/raids/nerubian-overseer.webp']
    },
    {
      name: 'Dark Reaver of Karazhan',
      meta: '40 MAN · LEVEL 60 · T1',
      copy: 'The Dark Reaver stands vigil at the entrance of Lower Karazhan Halls, preventing any intrusion into his master’s tower. If the secrets of Karazhan are to be unraveled, the way must be opened.',
      images: ['/art/raids/dark-reaver.webp']
    }
  ];

  let slides: Record<string, number> = Object.fromEntries(
    [...dungeons, ...bosses].map((item) => [item.name, 0])
  );
  let lightbox: { src: string; alt: string } | null = null;

  function step(name: string, delta: number, total: number) {
    slides[name] = (slides[name] + delta + total) % total;
    slides = slides;
  }

  function closeShot() {
    lightbox = null;
  }
</script>

<svelte:window on:keydown={(e) => e.key === 'Escape' && closeShot()} />

<StoryPage
  title="Raids & Dungeons"
  eyebrow="CLASSIC CONTENT, REIMAGINED"
  intro="From the depths of Karazhan Crypt to the corrupted wilds of Crescent Grove, new foes arise to threaten the world. Familiar Vanilla dungeons also grow outward with optional rooms, bosses and rewards."
  heroImage="/art/features/raids.webp"
  heroPosition="center"
  heroSize="cover"
  sectionEyebrow="OPTIONAL ENCOUNTERS"
  sectionTitle="The road goes deeper."
  bullets={['New locations and encounters are optional.', 'Classic dungeons gain optional rooms, bosses and horizontal rewards.', 'Dungeon tiers create a horizontal path through level 60.', 'World bosses reward coordinated solo-server communities.']}
>
  <section class="dungeon-section">
    <div class="section-heading"><div class="kicker">NEW INSTANCES</div><h2>Familiar doors.<br /><em>New threats.</em></h2></div>
    <div class="entry-list">
      {#each dungeons as dungeon, index}
        {@const src = dungeon.images[slides[dungeon.name]]}
        <article class="entry" class:flip={index % 2 === 1}>
          <div class="entry-copy">
            <span class="index">{String(index + 1).padStart(2, '0')}</span>
            <div class="dungeon-meta">{dungeon.meta}</div>
            <h3>{dungeon.name}</h3>
            <p>{dungeon.copy}</p>
          </div>
          <figure>
            <button class="shot" type="button" on:click={() => (lightbox = { src, alt: dungeon.name })}>
              <img src={src} alt={dungeon.name} />
            </button>
            {#if dungeon.images.length > 1}
              <div class="gallery-nav">
                <button type="button" aria-label="Previous screenshot" on:click={() => step(dungeon.name, -1, dungeon.images.length)}>‹</button>
                <div class="dots">
                  {#each dungeon.images as _, i}
                    <button type="button" class:on={slides[dungeon.name] === i} aria-label="Show screenshot {i + 1}" on:click={() => { slides[dungeon.name] = i; slides = slides; }}></button>
                  {/each}
                </div>
                <button type="button" aria-label="Next screenshot" on:click={() => step(dungeon.name, 1, dungeon.images.length)}>›</button>
              </div>
            {/if}
          </figure>
        </article>
      {/each}
    </div>
  </section>

  <section id="classic-updates" class="update-section">
    <div class="section-heading"><div class="kicker">CLASSIC DUNGEON UPDATES</div><h2>New corners.<br /><em>New encounters.</em></h2></div>
    <div class="update-list">
      {#each classicUpdates as update, index}
        <article>
          <span class="update-number">{String(index + 1).padStart(2, '0')}</span>
          <div>
            <div class="update-label">{update[0]}</div>
            <h3>{update[1]}</h3>
            <p>{update[2]}</p>
          </div>
        </article>
      {/each}
    </div>
  </section>

  <section class="boss-section">
    <div class="section-heading"><div class="kicker">WORLD BOSSES</div><h2>Threats across Azeroth.</h2></div>
    <div class="entry-list">
      {#each bosses as boss, index}
        {@const src = boss.images[slides[boss.name]]}
        <article class="entry" class:flip={index % 2 === 1}>
          <div class="entry-copy">
            <span class="index">{String(index + 1).padStart(2, '0')}</span>
            <div class="dungeon-meta">{boss.meta}</div>
            <h3>{boss.name}</h3>
            <p>{boss.copy}</p>
          </div>
          <figure>
            <button class="shot" type="button" on:click={() => (lightbox = { src, alt: boss.name })}>
              <img src={src} alt={boss.name} />
            </button>
            {#if boss.images.length > 1}
              <div class="gallery-nav">
                <button type="button" aria-label="Previous screenshot" on:click={() => step(boss.name, -1, boss.images.length)}>‹</button>
                <div class="dots">
                  {#each boss.images as _, i}
                    <button type="button" class:on={slides[boss.name] === i} aria-label="Show screenshot {i + 1}" on:click={() => { slides[boss.name] = i; slides = slides; }}></button>
                  {/each}
                </div>
                <button type="button" aria-label="Next screenshot" on:click={() => step(boss.name, 1, boss.images.length)}>›</button>
              </div>
            {/if}
          </figure>
        </article>
      {/each}
    </div>
  </section>
</StoryPage>

{#if lightbox}
  <div class="lightbox" on:click={closeShot} on:keydown={(e) => e.key === 'Enter' && closeShot()} role="dialog" aria-modal="true" tabindex="-1">
    <img src={lightbox.src} alt={lightbox.alt} />
  </div>
{/if}

<style>
  .dungeon-section, .boss-section, .update-section { padding: 120px clamp(24px, 8vw, 130px); background: #080a0b; border-top: 1px solid #17130f; }
  .update-section { scroll-margin-top: 90px; }
  .boss-section { background: #0b0d0e; }
  .update-list { max-width: 1050px; border-top: 1px solid #382e20; }
  .update-list article { display: grid; grid-template-columns: 70px 1fr; gap: 20px; padding: 28px 0; border-bottom: 1px solid #2a241b; }
  .update-number { color: #826439; font: 11px var(--font-ui); letter-spacing: .15em; padding-top: 4px; }
  .update-label { font: 10px var(--font-ui); text-transform: uppercase; letter-spacing: .17em; color: #aa8346; }
  .update-list h3 { font-size: 30px; line-height: 1.05; text-transform: uppercase; color: #d8cbb1; margin: 12px 0; }
  .update-list p { max-width: 800px; margin: 0; color: #938b7f; font: 16px / 1.75 var(--font-body); }
  .section-heading { margin-bottom: 44px; }
  .section-heading h2 { font-size: clamp(42px, 6vw, 78px); line-height: .88; text-transform: uppercase; color: #ddd1b8; margin: 12px 0; }
  .section-heading em { font-style: normal; color: #a78348; }
  .entry-list { display: grid; gap: 72px; }
  .entry { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr); gap: 48px; align-items: center; }
  .entry.flip { grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr); }
  .entry.flip .entry-copy { order: 2; }
  .entry-copy { position: relative; padding-right: 48px; }
  .index { position: absolute; right: 0; top: 0; color: #625034; font: 11px var(--font-ui); letter-spacing: .12em; }
  .dungeon-meta { color: #a78348; font: 9px/1.4 var(--font-ui); letter-spacing: .14em; }
  .entry h3 { font-size: clamp(28px, 3.4vw, 42px); line-height: 1; text-transform: uppercase; color: #d8cbb1; margin: 18px 0 16px; }
  .entry p { max-width: 590px; margin: 0; color: #938b7f; font: 16px/1.7 var(--font-body); }
  figure { margin: 0; padding: 10px; border: 1px solid #30281c; background: #11100d; }
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
  @media (max-width: 900px) {
    .entry, .entry.flip { grid-template-columns: 1fr; }
    .entry.flip .entry-copy { order: 0; }
    .entry-copy { padding-right: 36px; }
  }
  @media (max-width: 600px) {
    .update-list article { grid-template-columns: 42px 1fr; }
    .update-list h3 { font-size: 25px; }
  }
</style>
