<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import ClassIcons from '$lib/components/ClassIcons.svelte';

  const playableClasses = ['warrior', 'paladin', 'mage', 'hunter', 'rogue', 'priest', 'warlock'];

  const traits = [
    { image: '/art/high-elves/trait-swiftness.png', name: 'Swiftness of the Rangers', copy: 'Agility increased by 2%.' },
    { image: '/art/high-elves/trait-bow.png', name: 'Bow Specialization', copy: '+3 Bow skill.' },
    { image: '/art/high-elves/trait-meditation.png', name: "Quel'dorei Meditation", copy: 'Generates 10% of your maximum mana, 50 energy or 20 rage over 5 seconds. Warriors are considered in combat for the duration.' },
    { image: '/art/high-elves/trait-enchanting.png', name: 'Enchanting Specialization', copy: '+10 Enchanting.' }
  ];

  const gallery = [
    { image: '/art/high-elves/art-1.webp', label: 'Alah’thalas' },
    { image: '/art/high-elves/art-2.webp', label: 'The remnant endures' },
    { image: '/art/high-elves/art-3.webp', label: 'A new home' }
  ];

  const maps = [
    { image: '/art/high-elves/zone-1.webp', alt: "Map of Alah'thalas in the Thalassian Highlands", label: 'Alah’thalas · the first map' },
    { image: '/art/high-elves/zone-2.webp', alt: 'Map of the Thalassian Highlands', label: 'Thalassian Highlands · starting zone' }
  ];

  let lightbox: string | null = null;

  function openMap(src: string) {
    lightbox = src;
  }

  function closeMap() {
    lightbox = null;
  }

</script>

<svelte:head>
  <title>High Elves - Windrunner</title>
  <meta name="description" content="The High Elves of the Alliance and their starting zone in the Thalassian Highlands." />
</svelte:head>

<svelte:window on:keydown={(e) => e.key === 'Escape' && closeMap()} />
<div class="detail-page">
  <Header />
  <main>
    <section class="race-hero">
      <div class="race-hero-art" aria-hidden="true"></div>
      <div class="race-hero-overlay" aria-hidden="true"></div>
      <div class="race-hero-copy">
        <div class="kicker">SILVERMOON REMNANT</div>
        <h1>High Elves<br /><span>of the Alliance</span></h1>
      </div>
      <div class="scroll-mark" aria-hidden="true">◆<span>SCROLL TO EXPLORE</span></div>
    </section>
    <section class="lore-frame">
      <p><span class="drop">L</span>ong ago, the exiled high elves founded the magical city of Quel’thalas. Here they created a mystical fount called the Sunwell. Strengthened by its magic, the High Elves grew increasingly dependent on the powers provided by the well. For generations, the elves cultivated a prosperous and powerful country until the shadow of death fell upon them. Scourge attacked Quel’thalas and destroyed the Sunwell, at the same time reducing the population of the High Elves to an all-time low. Scattered and regretful, the refugees of this once proud race now seek a new place to call home and a way to fill the void inside them, left by the destruction of the Sunwell.</p>
    </section>

    <ClassIcons classes={playableClasses} />

    <section class="traits-section"><div class="section-heading"><div><div class="kicker">RACIAL TRAITS</div><h2>Power with<br /><em>purpose.</em></h2></div></div><div class="traits-grid">{#each traits as trait}<article><img src={trait.image} alt="" /><h3>{trait.name}</h3><p>{trait.copy}</p></article>{/each}</div></section>

    <section class="zone-section">
      <div class="zone-copy"><div class="kicker">STARTING ZONE · LEVEL 1–10</div><h2>Thalassian<br /><em>Highlands</em></h2><p>Located at the remote fringes of Quel’thalas, these lands were initially established as an outpost for Alah’thalas. Over time, with your assistance, it has developed into a thriving city, complete with its own dock. However, one must not be deceived by the beauty of these lands, for lurking in the shadows are sinister forces, even within the city walls. This zone now serves as the starting point for fledgling High Elves, providing a comprehensive level 1–10 experience.</p><a class="text-link" href="/new-locations-and-maps">VIEW ALL NEW LOCATIONS →</a></div>
      <div class="map-stack">
        {#each maps as map}
          <figure>
            <a href={map.image} target="_blank" rel="noopener noreferrer" on:click|preventDefault={() => openMap(map.image)}>
              <img src={map.image} alt={map.alt} />
            </a>
            <figcaption>{map.label}</figcaption>
          </figure>
        {/each}
      </div>
    </section>

    <section class="gallery-section"><div class="section-heading"><div><div class="kicker">ARTWORKS</div><h2>A remnant<br /><em>rebuilt.</em></h2></div><p>Scenes from the journey of the High Elves - from the first steps outside the city to the lands they now protect.</p></div><div class="gallery-grid">{#each gallery as item}<figure><img src={item.image} alt={item.label} /><figcaption>{item.label}</figcaption></figure>{/each}</div></section>

    <section class="soundtrack" style="background-image:linear-gradient(90deg,rgba(7,9,10,.95),rgba(7,9,10,.58)),url('/art/high-elves/soundtrack.webp')"><div class="kicker">SOUNDTRACK</div><h2>Hear the Highlands.</h2><p>Immerse yourself in the enchanting melodies of Thalassian Highlands’ early autumn warmth.</p><div class="music-links"><a href="https://open.spotify.com/album/4Bsid4jVJiAizt2az9a44c" target="_blank" rel="noreferrer">Spotify ↗</a><a href="https://classical.music.apple.com/us/album/1725262546" target="_blank" rel="noreferrer">Apple Music ↗</a><a href="https://www.youtube.com/watch?v=PC8T0Q3klsI" target="_blank" rel="noreferrer">YouTube ↗</a></div></section>
    <section class="elf-callout"><div class="kicker">THE HIGHLANDS WAIT</div><h2>Time to reclaim<br /><em>a home.</em></h2><a class="cta" href="/goblins">COMPARE GOBLINS →</a></section>
  </main>
  <Footer />
</div>

{#if lightbox}
  <div class="lightbox" on:click={closeMap} on:keydown={(e) => e.key === 'Escape' && closeMap()} role="dialog" aria-modal="true" tabindex="-1">
    <img src={lightbox} alt="Enlarged zone map" />
  </div>
{/if}

<style>
  .detail-page{background:#090b0c}.race-hero{position:relative;min-height:86vh;display:flex;align-items:start;padding:130px clamp(24px,8vw,130px) 180px;overflow:hidden;background:#090b0c}.race-hero-art{position:absolute;inset:0;background:url('/art/high-elves/hero.webp') center 38%/cover no-repeat;filter:saturate(.92) brightness(.95)}.race-hero-overlay{position:absolute;inset:0;background:linear-gradient(180deg,rgba(5,7,8,.55) 0%,transparent 28%,transparent 58%,rgba(9,11,12,.92) 100%),linear-gradient(90deg,rgba(5,7,8,.42),transparent 42%)}.race-hero-copy{position:relative;z-index:1;max-width:760px}.race-hero h1{font-size:clamp(56px,9vw,126px);line-height:.84;color:#ded3bb;text-transform:uppercase;margin:16px 0 28px}.race-hero h1 span{color:#ad884b}.scroll-mark{position:absolute;z-index:2;right:clamp(24px,7vw,110px);bottom:160px;color:#a78348;font-size:10px}.scroll-mark span{display:block;margin-top:12px;color:#847b6d;font:9px var(--font-ui);letter-spacing:.18em;writing-mode:vertical-rl}.lore-frame{position:relative;z-index:2;max-width:980px;margin:-120px clamp(22px,6vw,90px) 0;padding:42px 56px 48px;border:1px solid #8a6a32;box-shadow:0 0 0 6px #120e0a,0 0 0 7px #6d5328,0 24px 50px rgba(0,0,0,.55);background:radial-gradient(circle at 12% 20%,rgba(90,62,28,.18),transparent 42%),linear-gradient(180deg,rgba(28,20,12,.96),rgba(14,12,10,.98))}.lore-frame p{margin:0;color:#d7cbb4;font:18px/1.9 var(--font-body);text-align:center}.lore-frame .drop{float:left;margin:4px 12px 0 0;width:52px;height:52px;display:grid;place-items:center;border:1px solid #8a6a32;background:linear-gradient(180deg,#1c1610,#12100c);color:#c9a45a;font:42px/1 var(--font-display)}.section-heading h2{font-size:clamp(42px,6vw,78px);line-height:.87;color:#ddd1b8;text-transform:uppercase;margin:14px 0}.section-heading em,.zone-copy em,.elf-callout em{font-style:normal;color:#a78348}.cta{display:inline-block;margin-top:30px;padding:14px 18px;border:1px solid #80663a;color:#c7b382;text-decoration:none;text-transform:uppercase;font:10px var(--font-ui);letter-spacing:.14em}.cta:hover{background:rgba(128,102,58,.13);border-color:#b89454}.text-link{display:inline-block;margin-top:30px;padding:14px 18px;border:1px solid #80663a;color:#c7b382;text-decoration:none;text-transform:uppercase;font:10px var(--font-ui);letter-spacing:.14em}.zone-section{display:grid;grid-template-columns:.8fr 1.2fr;gap:80px;padding:125px clamp(24px,8vw,130px);background:radial-gradient(circle at 80% 30%,rgba(31,55,61,.22),transparent 37%),#0b0e0f;border-top:1px solid #17130f}.zone-copy{align-self:center}.zone-copy h2{font-size:clamp(50px,7vw,92px);line-height:.84;color:#ddd1b8;text-transform:uppercase;margin:14px 0 25px}.zone-copy p{max-width:560px;color:#a0988b;font:17px/1.8 var(--font-body)}.text-link{padding:0;border:0}.map-stack{display:grid;grid-template-columns:1.15fr .85fr;align-items:start;align-self:center;gap:16px}.map-stack figure{margin:0;padding:9px;border:1px solid #4c3b23;background:#11100d}.map-stack a{display:block;cursor:zoom-in}.map-stack img{display:block;width:100%;height:auto}.map-stack a:hover img{filter:brightness(1.08)}.map-stack figcaption,.gallery-section figcaption{padding:12px 5px 4px;color:#8e836e;font:9px var(--font-ui);letter-spacing:.15em;text-transform:uppercase}.lightbox{position:fixed;inset:0;z-index:80;display:grid;place-items:center;padding:40px;background:rgba(5,7,8,.88);cursor:zoom-out}.lightbox img{max-width:min(1100px,92vw);max-height:90vh;width:auto;height:auto;border:1px solid #4c3b23;box-shadow:0 24px 60px rgba(0,0,0,.55)}.gallery-section,.traits-section{padding:125px clamp(24px,8vw,130px);background:#080a0b;border-top:1px solid #17130f}.section-heading{display:flex;justify-content:space-between;align-items:end;gap:70px;margin-bottom:48px}.section-heading h2{margin:13px 0 0}.section-heading p{max-width:420px;color:#968e82;font:16px/1.75 var(--font-body);margin:0}.gallery-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}.gallery-grid figure{margin:0;background:#111414;border:1px solid #2f291f}.gallery-grid img{display:block;width:100%;height:230px;object-fit:cover;filter:saturate(.78);transition:.4s}.gallery-grid figure:hover img{filter:saturate(1);transform:scale(1.015)}.traits-section{background:#0b0d0e}.traits-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px}.traits-grid article{padding:28px 22px;border-top:1px solid #5a4528;background:linear-gradient(145deg,rgba(99,72,32,.1),transparent 60%),#0e1112}.traits-grid img{width:58px;height:58px;image-rendering:auto}.traits-grid h3{font-size:24px;line-height:1;text-transform:uppercase;color:#d8cbb1;margin:22px 0 13px}.traits-grid p{color:#968e82;font:15px/1.7 var(--font-body);margin:0}.soundtrack{padding:115px clamp(24px,8vw,130px);background-position:center;background-size:cover;border-top:1px solid #17130f}.soundtrack h2{font-size:clamp(45px,6vw,78px);line-height:.9;color:#ddd1b8;text-transform:uppercase;margin:16px 0}.soundtrack p{max-width:520px;color:#a0988c;font:17px/1.8 var(--font-body)}.music-links{display:flex;gap:12px;flex-wrap:wrap;margin-top:30px}.music-links a{padding:12px 16px;border:1px solid #6b522e;color:#c9b27d;text-decoration:none;text-transform:uppercase;font:10px var(--font-ui);letter-spacing:.12em}.music-links a:hover{background:rgba(116,84,35,.2)}.elf-callout{padding:150px clamp(24px,8vw,130px);text-align:center;background:linear-gradient(180deg,#0b0d10,#080a0b);border-top:1px solid #17130f}.elf-callout h2{font-size:clamp(50px,7vw,94px);line-height:.84;color:#ddd1b8;text-transform:uppercase;margin:16px 0}@media(max-width:900px){.zone-section{grid-template-columns:1fr;gap:40px}.map-stack{max-width:700px}.traits-grid{grid-template-columns:repeat(2,1fr)}.section-heading{display:block;margin-bottom:32px}.section-heading p{margin-top:25px}.gallery-grid{grid-template-columns:1fr 1fr}}@media(max-width:600px){.race-hero{min-height:650px;padding:110px 22px 140px}.lore-frame{margin-top:-80px;padding:28px 22px 32px}.lore-frame .drop{width:44px;height:44px;font-size:34px}.race-hero-art{background-position:center 40%;background-size:cover}.scroll-mark{display:none}.map-stack{grid-template-columns:1fr}.gallery-grid{grid-template-columns:1fr}.traits-grid{grid-template-columns:1fr}}
</style>
