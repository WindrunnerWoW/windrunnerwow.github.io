<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import { newZones, zoneAdditions, type Subzone } from '$lib/data/locations';

  let slides: Record<string, number> = Object.fromEntries(newZones.map((zone) => [zone.slug, 0]));
  let selected: Record<string, string | null> = Object.fromEntries(zoneAdditions.map((zone) => [zone.slug, null]));
  let lightbox: { src: string; alt: string } | null = null;

  function step(slug: string, delta: number, total: number) {
    slides[slug] = (slides[slug] + delta + total) % total;
    slides = slides;
  }

  function showMap(zoneSlug: string) {
    selected[zoneSlug] = null;
    selected = selected;
  }

  function toggleSubzone(zoneSlug: string, subzone: Subzone) {
    selected[zoneSlug] = subzone.slug;
    selected = selected;
  }

  function activeSubzone(zoneSlug: string): Subzone | null {
    const zone = zoneAdditions.find((item) => item.slug === zoneSlug);
    if (!zone) return null;
    return zone.subzones.find((item) => item.slug === selected[zoneSlug]) ?? null;
  }

  function closeMap() {
    lightbox = null;
  }
</script>

<svelte:head>
  <title>New Zones & World Changes - Windrunner</title>
  <meta name="description" content="New maps, locations and world changes across Azeroth - from Blackstone Island to Hyjal, plus additions inside classic zones." />
</svelte:head>

<svelte:window on:keydown={(e) => e.key === 'Escape' && closeMap()} />

<div class="detail-page locations-page">
  <Header />
  <main>
    <section class="zones-hero">
      <div class="zones-hero-art" aria-hidden="true"></div>
      <div class="zones-hero-overlay" aria-hidden="true"></div>
      <div class="zones-hero-copy">
        <div class="kicker">NEW ZONES</div>
        <h1>Zones &amp; World Changes</h1>
        <p>Whether you are a seasoned adventurer or a new one, Windrunner offers a ton of new maps and locations to explore. From the war-torn lands of Lordaeron to the harsh yet beautiful shores of Durotar, travel around the world and experience never-before-seen places.</p>
      </div>
      <div class="scroll-mark" aria-hidden="true">◆<span>SCROLL TO EXPLORE</span></div>
    </section>

    {#each newZones as zone, index}
      <section class="zone-block" class:flip={index % 2 === 1}>
        <div class="zone-copy">
          <h2>{zone.name}</h2>
          <div class="zone-level"><span>Zone Level:</span> {zone.level}</div>
          <p>{zone.copy}</p>
        </div>
        <div class="zone-gallery">
          <figure>
            <button class="shot" type="button" on:click={() => (lightbox = { src: zone.images[slides[zone.slug]], alt: zone.name })}>
              <img src={zone.images[slides[zone.slug]]} alt={zone.name} />
            </button>
            {#if zone.images.length > 1}
              <div class="gallery-nav">
                <button type="button" aria-label="Previous screenshot" on:click={() => step(zone.slug, -1, zone.images.length)}>‹</button>
                <div class="dots">
                  {#each zone.images as _, i}
                    <button type="button" class:on={slides[zone.slug] === i} aria-label="Show screenshot {i + 1}" on:click={() => { slides[zone.slug] = i; slides = slides; }}></button>
                  {/each}
                </div>
                <button type="button" aria-label="Next screenshot" on:click={() => step(zone.slug, 1, zone.images.length)}>›</button>
              </div>
            {/if}
          </figure>
        </div>
      </section>
    {/each}

    <section class="additions">
      <div class="section-heading">
        <div class="kicker">WORLD CHANGES</div>
        <h2>Zone<br /><em>additions.</em></h2>
        <p>Classic zones receive new camps, harbors, ruins and story hooks. Select a location to see it in the world.</p>
      </div>
      <div class="additions-grid">
        {#each zoneAdditions as zone}
          {@const current = activeSubzone(zone.slug)}
          <article>
            <button class="map-shot" type="button" on:click={() => (lightbox = { src: current?.image ?? zone.map, alt: current?.name ?? zone.name })}>
              <img src={current?.image ?? zone.map} alt={current?.name ?? zone.name} />
              {#if current}
                <span class="map-caption">{current.copy}</span>
              {/if}
            </button>
            <h3>
              <button type="button" class:on={!current} on:click={() => showMap(zone.slug)}>
                {zone.name}
              </button>
            </h3>
            <ul>
              {#each zone.subzones as subzone}
                <li>
                  <button type="button" class:on={selected[zone.slug] === subzone.slug} on:click={() => toggleSubzone(zone.slug, subzone)}>
                    {subzone.name}
                  </button>
                </li>
              {/each}
            </ul>
          </article>
        {/each}
      </div>
    </section>
  </main>
  <Footer />
</div>

{#if lightbox}
  <div class="lightbox" on:click={closeMap} role="dialog" aria-modal="true" tabindex="-1">
    <img src={lightbox.src} alt={lightbox.alt} />
  </div>
{/if}

<style>
  .locations-page { background: #090b0c; }
  .zones-hero {
    position: relative;
    min-height: 760px;
    display: flex;
    align-items: end;
    padding: 150px clamp(24px, 8vw, 130px) 110px;
    overflow: hidden;
    background: #090b0c;
  }
  .zones-hero-art {
    position: absolute;
    inset: 0;
    background: url('/art/locations/zones_bg.webp') center 35% / cover no-repeat;
    filter: saturate(.82) brightness(.72);
  }
  .zones-hero-overlay {
    position: absolute;
    inset: 0;
    background:
      linear-gradient(90deg, rgba(5,7,8,.94), rgba(5,7,8,.52) 46%, rgba(5,7,8,.18)),
      linear-gradient(180deg, rgba(5,7,8,.08) 40%, #090b0c 98%);
  }
  .zones-hero-copy { position: relative; z-index: 1; max-width: 820px; }
  .zones-hero h1 {
    font-size: clamp(52px, 8vw, 108px);
    line-height: .86;
    color: #ded3bb;
    text-transform: uppercase;
    margin: 10px 0 24px;
  }
  .zones-hero p {
    max-width: 680px;
    margin: 0;
    color: #b2aa9e;
    font: 18px/1.85 var(--font-body);
  }
  .scroll-mark {
    position: absolute;
    z-index: 2;
    right: clamp(24px, 7vw, 110px);
    bottom: 45px;
    color: #a78348;
    font-size: 10px;
  }
  .scroll-mark span {
    display: block;
    margin-top: 12px;
    color: #847b6d;
    font: 9px var(--font-ui);
    letter-spacing: .18em;
    writing-mode: vertical-rl;
  }
  .zone-block {
    display: grid;
    grid-template-columns: .92fr 1.08fr;
    gap: 72px;
    align-items: center;
    padding: 92px clamp(24px, 8vw, 130px);
    border-top: 1px solid #17130f;
    background: #090b0c;
  }
  .zone-block.flip { grid-template-columns: 1.08fr .92fr; }
  .zone-block.flip .zone-copy { order: 2; }
  .zone-copy h2 {
    font-size: clamp(36px, 4.6vw, 64px);
    line-height: .9;
    text-transform: uppercase;
    color: #ddd1b8;
    margin: 0 0 16px;
  }
  .zone-level {
    margin-bottom: 22px;
    color: #e4d8c0;
    font: 16px var(--font-heading);
  }
  .zone-level span {
    margin-right: 8px;
    color: #a78348;
    font: 11px var(--font-ui);
    letter-spacing: .16em;
    text-transform: uppercase;
  }
  .zone-copy p {
    margin: 0;
    max-width: 560px;
    color: #9c9487;
    font: 17px/1.8 var(--font-body);
  }
  .zone-gallery figure {
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
  .gallery-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 12px 4px 2px;
  }
  .gallery-nav > button {
    width: 36px;
    height: 32px;
    border: 1px solid #5c4a2e;
    background: transparent;
    color: #c7b382;
    font-size: 22px;
    line-height: 1;
    cursor: pointer;
  }
  .gallery-nav > button:hover { background: rgba(128,102,58,.13); }
  .dots { display: flex; gap: 8px; }
  .dots button {
    width: 9px;
    height: 9px;
    padding: 0;
    border: 1px solid #6e542d;
    border-radius: 50%;
    background: transparent;
    cursor: pointer;
  }
  .dots button.on { background: #a78348; }
  .additions {
    padding: 120px clamp(24px, 8vw, 130px);
    border-top: 1px solid #17130f;
    background: radial-gradient(circle at 18% 8%, rgba(102,76,38,.1), transparent 32%), #080a0b;
  }
  .section-heading {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px 80px;
    margin-bottom: 56px;
    max-width: 1100px;
  }
  .section-heading h2 {
    grid-column: 1;
    font-size: clamp(42px, 6vw, 78px);
    line-height: .88;
    text-transform: uppercase;
    color: #ddd1b8;
    margin: 12px 0 0;
  }
  .section-heading em { font-style: normal; color: #a78348; }
  .section-heading p {
    grid-column: 2;
    align-self: end;
    margin: 0;
    max-width: 420px;
    color: #968e82;
    font: 16px/1.75 var(--font-body);
  }
  .additions-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 28px 48px;
  }
  .additions-grid article {
    padding-bottom: 18px;
    border-bottom: 1px solid #1c1812;
  }
  .map-shot {
    position: relative;
    display: block;
    width: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
    border: 1px solid #30281c;
    background: #11100d;
    cursor: zoom-in;
  }
  .map-shot img {
    display: block;
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
  }
  .map-caption {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 28px 16px 14px;
    background: linear-gradient(180deg, transparent, rgba(8,10,11,.92) 58%);
    color: #e4d8c0;
    font: 15px/1.55 var(--font-body);
    text-align: left;
    pointer-events: none;
  }
  .additions-grid h3 {
    margin: 18px 0 12px;
    font-size: 28px;
    text-transform: uppercase;
  }
  .additions-grid h3 button {
    padding: 0;
    border: 0;
    background: none;
    color: #c7b382;
    font: inherit;
    letter-spacing: inherit;
    text-transform: inherit;
    cursor: pointer;
  }
  .additions-grid h3 button:hover,
  .additions-grid h3 button.on { color: #ddd1b8; }
  .additions-grid ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .additions-grid li + li { margin-top: 6px; }
  .additions-grid ul button {
    padding: 0;
    border: 0;
    background: none;
    color: #c7b382;
    font: 15px/1.5 var(--font-body);
    text-align: left;
    cursor: pointer;
  }
  .additions-grid ul button:hover,
  .additions-grid ul button.on { color: #f0e2c4; }
  .lightbox {
    position: fixed;
    inset: 0;
    z-index: 80;
    display: grid;
    place-items: center;
    padding: 40px;
    background: rgba(5,7,8,.88);
    cursor: zoom-out;
  }
  .lightbox img {
    max-width: min(1100px, 92vw);
    max-height: 90vh;
    width: auto;
    height: auto;
    border: 1px solid #5c4a2e;
    box-shadow: 0 24px 60px rgba(0,0,0,.55);
  }
  @media (max-width: 980px) {
    .zone-block,
    .zone-block.flip { grid-template-columns: 1fr; gap: 28px; }
    .zone-block.flip .zone-copy { order: 0; }
    .section-heading,
    .additions-grid { grid-template-columns: 1fr; }
    .section-heading h2,
    .section-heading p { grid-column: 1; }
  }
  @media (max-width: 600px) {
    .zones-hero { min-height: 620px; padding-bottom: 80px; }
    .scroll-mark { display: none; }
    .zone-block,
    .additions { padding-left: 22px; padding-right: 22px; }
  }
</style>
