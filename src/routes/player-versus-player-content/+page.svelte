<script lang="ts">
  import StoryPage from '$lib/components/StoryPage.svelte';

  const brackets = [
    ['Warsong Gulch', 'Open in the 1–1 and 2–9 brackets.'],
    ['Arathi Basin', 'Queueable in the 21–29 bracket.'],
    ['XP toggle', 'Turn experience off to collect gear without leaving your bracket.'],
    ['Loser rewards', 'Losing specific battlegrounds still pays out, so queues stay healthy.'],
    ['Battleground XP', 'Selected battlegrounds grant experience under normal conditions.']
  ];

  const reputation = [
    [
      'Warsong Gulch',
      'Capturing a flag grants 108 reputation, up from 35 - 324 if you take all three flags to win.'
    ],
    [
      'Arathi Basin',
      'Resource ticks grant 25 reputation, up from 13 - 325 with 13 ticks on a winning game.'
    ],
    [
      'Rank decay',
      'RP decay and rank requirements scale from live data. Decay still happens, but Rank Points never fall below the minimum for your current rank.'
    ]
  ];

  const protectors = [
    { race: 'Humans', title: 'Protector of Stormwind' },
    { race: 'Orcs', title: 'Overlord of Orgrimmar' },
    { race: 'Dwarves', title: 'Thane of Ironforge' },
    { race: 'Night Elves', title: 'High Sentinel of Darnassus' },
    { race: 'Undead', title: 'Deathlord of the Undercity' },
    { race: 'Tauren', title: 'Chieftain of Thunder Bluff' },
    { race: 'Gnomes', title: 'Avenger of Gnomeregan' },
    { race: 'Trolls', title: "Voodoo Boss of Sen'jin" },
    { race: 'High Elves', title: "Avenger of Quel'thalas" },
    { race: 'Goblins', title: 'Bruiser of Sparkwater' }
  ];

  const ranks = ['Dishonored', 'Exiled', 'Outlaw', 'Pariah'];

  const shots = [
    {
      kicker: '3V3 UNRANKED',
      name: 'Blood Ring',
      meta: 'ARENA · STEAMWHEEDLE BLOOD RING',
      copy: 'Prove your worth in the bloody sands. Matches earn Steamwheedle Blood Ring reputation, with arena rewards and new PvP gear on the track.',
      src: '/art/pvp/blood-ring.webp',
      alt: 'The Blood Ring arena, a sandy pit ringed by stone walls, spikes, and banners'
    },
    {
      kicker: 'WORLD PVP',
      name: 'Bounty boards',
      meta: 'WEEKLY · SOLO KILL · WEDNESDAY RESET',
      copy: 'Kill the listed target yourself - group kills do not count. Each week, the active player with the most honorable kills from last week becomes the bounty for the opposite faction. Targets update every Wednesday for Horde and Alliance, and the quest is not repeatable.',
      src: '/art/pvp/bounty-boards.webp',
      alt: 'A PvP bounty board listing a hunted player'
    },
    {
      kicker: 'WEEKLY HONOR',
      name: 'City Protectors',
      meta: 'EIGHT PLAYERS · 60-MINUTE CITY TELEPORT',
      copy: 'If world PvP is active enough, eight players receive City Protector and are assigned to a major city. They are mailed a City Protector’s Medallion that teleports them home. Separately, the player with the most honorable kills from each playable race earns a racial title on top of their PvP rank.',
      src: '/art/pvp/city-protectors.webp',
      alt: 'A Night Elf City Protector standing in Darnassus'
    },
    {
      kicker: 'CONSEQUENCES',
      name: 'Dishonorable ranks',
      meta: 'LOW-LEVEL AND CIVILIAN KILLS',
      copy: 'Killing low-level players or civilians ranks you negatively. These four ranks sit below the usual ladder.',
      src: '/art/pvp/dishonorable.webp',
      alt: 'A character sheet showing a dishonorable PvP rank'
    }
  ];

  let lightbox: { src: string; alt: string } | null = null;

  function closeShot() {
    lightbox = null;
  }
</script>

<svelte:window on:keydown={(e) => e.key === 'Escape' && closeShot()} />

<StoryPage
  title="Player vs Player"
  eyebrow="ARENA & BATTLEGROUNDS"
  intro="From the sands of the Blood Ring to the timeless conflicts of Sunnyglade Valley, there are many opportunities to earn fame and glory for your faction."
  heroImage="/art/features/arena.webp"
  heroPosition="center"
  heroSize="cover"
  sectionEyebrow="PVP SYSTEMS"
  sectionTitle="Compete without the grind tax."
  bullets={[
    'Ranks never drop below the floor of your current standing.',
    'Sunnyglade Valley is a new 10v10 domination battleground.',
    'Blood Ring is unranked 3v3 with Steamwheedle reputation and gear.',
    'Bounty boards, City Protectors, and dishonorable ranks shape world PvP.'
  ]}
  ctaHref=""
  ctaLabel=""
>
  <section class="pvp-section">
    <div class="section-heading">
      <div class="kicker">BATTLEGROUNDS</div>
      <h2>Brackets, rewards,<br /><em>and a rank you can keep.</em></h2>
      <p class="lead">
        Decay still ticks, but it cannot push you under the Rank Points required for the rank you already earned. Take a
        break without climbing the same ladder twice.
      </p>
    </div>
    <div class="rule-grid">
      <div>
        <div class="col-kicker">QUEUES</div>
        <ul>
          {#each brackets as row}
            <li><strong>{row[0]}</strong>{row[1]}</li>
          {/each}
        </ul>
      </div>
      <div>
        <div class="col-kicker">REPUTATION &amp; RANKS</div>
        <ul>
          {#each reputation as row}
            <li><strong>{row[0]}</strong>{row[1]}</li>
          {/each}
        </ul>
      </div>
    </div>
  </section>

  <section class="pvp-section alt">
    <div class="sunny">
      <div>
        <div class="kicker">NEW BATTLEGROUND</div>
        <div class="meta">10V10 · DOMINATION · FIRST WAR</div>
        <h2>Sunnyglade<br /><em>Valley</em></h2>
      </div>
      <p>
        One of the largest clashes between the old Kingdom of Azeroth and the Horde. Fight over the field while
        uncovering the mystery of shifting time in the woodlands and mines, acting at the behest of the bronze dragon
        Vairozdormu as the flight tries to stop a crisis that threatens the fabric of history.
      </p>
    </div>
  </section>

  <section class="pvp-section">
    <div class="section-heading">
      <div class="kicker">ARENA &amp; WORLD PVP</div>
      <h2>Sands, bounties,<br /><em>and city walls.</em></h2>
    </div>
    <div class="entry-list">
      {#each shots as shot, index}
        <article class="entry" class:flip={index % 2 === 1}>
          <div class="entry-copy">
            <span class="index">{String(index + 1).padStart(2, '0')}</span>
            <div class="kicker">{shot.kicker}</div>
            <div class="meta">{shot.meta}</div>
            <h3>{shot.name}</h3>
            <p>{shot.copy}</p>
            {#if shot.name === 'Dishonorable ranks'}
              <ol class="rank-list">
                {#each ranks as rank, i}
                  <li><span>{String(i + 1).padStart(2, '0')}</span>{rank}</li>
                {/each}
              </ol>
            {/if}
          </div>
          <figure>
            <button class="shot" type="button" on:click={() => (lightbox = { src: shot.src, alt: shot.alt })}>
              <img src={shot.src} alt={shot.alt} />
            </button>
          </figure>
        </article>
      {/each}
    </div>
  </section>

  <section class="pvp-section alt">
    <div class="section-heading">
      <div class="kicker">RACIAL TITLES</div>
      <h2>Highest honorable kills,<br /><em>each race, each week.</em></h2>
    </div>
    <div class="title-rows">
      {#each protectors as protector, index}
        <div class="title-row">
          <span class="index">{String(index + 1).padStart(2, '0')}</span>
          <span class="race">{protector.race}</span>
          <strong>{protector.title}</strong>
        </div>
      {/each}
    </div>
  </section>

  <section class="pvp-section">
    <div class="sunny">
      <div>
        <div class="kicker">LEVELING CHALLENGE</div>
        <div class="meta">GLYPH · PERMANENT PVP FLAG</div>
        <h2>War Mode</h2>
      </div>
      <p>
        Permanently flags you for PvP in return for +20% experience from all sources. You can opt out once at the glyph
        master in the starting zone, or again at level 60.
      </p>
    </div>
  </section>
</StoryPage>

{#if lightbox}
  <div
    class="lightbox"
    on:click={closeShot}
    on:keydown={(e) => e.key === 'Enter' && closeShot()}
    role="dialog"
    aria-modal="true"
    tabindex="-1"
  >
    <img src={lightbox.src} alt={lightbox.alt} />
  </div>
{/if}

<style>
  .pvp-section {
    padding: 100px clamp(24px, 8vw, 130px);
    background: #080a0b;
    border-top: 1px solid #17130f;
  }
  .pvp-section.alt {
    background: #0b0d0e;
  }
  .section-heading {
    max-width: 920px;
    margin-bottom: 48px;
  }
  h2 {
    font-size: clamp(38px, 5.4vw, 72px);
    line-height: 0.9;
    text-transform: uppercase;
    color: #ddd1b8;
    margin: 12px 0 18px;
  }
  em {
    font-style: normal;
    color: #a78348;
  }
  .lead,
  .sunny p,
  .entry p {
    margin: 0;
    color: #938b7f;
    font: 16px / 1.75 var(--font-body);
  }
  .lead {
    max-width: 720px;
  }
  .meta {
    color: #a78348;
    font: 9px / 1.4 var(--font-ui);
    letter-spacing: 0.14em;
  }
  .rule-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 48px 64px;
    max-width: 1100px;
  }
  .col-kicker {
    margin-bottom: 8px;
    color: #a78348;
    font: 10px var(--font-ui);
    letter-spacing: 0.16em;
  }
  .rule-grid ul {
    margin: 0;
    padding: 0;
    list-style: none;
    border-top: 1px solid #382e20;
  }
  .rule-grid li {
    padding: 18px 0;
    border-bottom: 1px solid #2a241b;
    color: #9c9487;
    font: 16px / 1.65 var(--font-body);
  }
  .rule-grid strong {
    display: block;
    margin-bottom: 6px;
    color: #d8cbb1;
    font: 11px var(--font-ui);
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }
  .sunny {
    display: grid;
    grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
    gap: 48px;
    align-items: start;
    max-width: 1100px;
  }
  .sunny p {
    padding-top: 42px;
    max-width: none;
  }
  .entry-list {
    display: grid;
    gap: 72px;
  }
  .entry {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr);
    gap: 48px;
    align-items: center;
  }
  .entry.flip {
    grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr);
  }
  .entry.flip .entry-copy {
    order: 2;
  }
  .entry-copy {
    position: relative;
    padding-right: 48px;
  }
  .index {
    color: #625034;
    font: 11px var(--font-ui);
    letter-spacing: 0.12em;
  }
  .entry-copy .index {
    position: absolute;
    right: 0;
    top: 0;
  }
  .entry h3 {
    font-size: clamp(28px, 3.4vw, 42px);
    line-height: 1;
    text-transform: uppercase;
    color: #d8cbb1;
    margin: 12px 0 16px;
  }
  .entry .kicker {
    margin-bottom: 8px;
  }
  figure {
    margin: 0;
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
    aspect-ratio: 16 / 10;
    object-fit: cover;
  }
  .rank-list {
    margin: 22px 0 0;
    padding: 0;
    list-style: none;
  }
  .rank-list li {
    display: flex;
    gap: 16px;
    padding: 10px 0;
    border-bottom: 1px solid #2a241b;
    color: #d8cbb1;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    font-size: 18px;
  }
  .rank-list span {
    color: #765a32;
    font: 11px / 1.8 var(--font-ui);
    letter-spacing: 0.15em;
  }
  .title-rows {
    max-width: 920px;
    border-top: 1px solid #382e20;
  }
  .title-row {
    display: grid;
    grid-template-columns: 48px minmax(110px, 180px) 1fr;
    gap: 16px;
    align-items: baseline;
    padding: 18px 0;
    border-bottom: 1px solid #2a241b;
  }
  .race {
    color: #ad884c;
    font: 10px var(--font-ui);
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }
  .title-row strong {
    color: #d8cbb1;
    font-size: clamp(18px, 2.2vw, 26px);
    font-weight: 400;
    letter-spacing: 0.04em;
    text-transform: uppercase;
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
    .rule-grid,
    .sunny,
    .entry,
    .entry.flip {
      grid-template-columns: 1fr;
    }
    .entry.flip .entry-copy {
      order: 0;
    }
    .entry-copy {
      padding-right: 36px;
    }
    .sunny p {
      padding-top: 0;
    }
    .title-row {
      grid-template-columns: 36px 1fr;
    }
    .title-row strong {
      grid-column: 2;
    }
  }
  @media (max-width: 600px) {
    .pvp-section {
      padding: 72px 22px;
    }
  }
</style>
