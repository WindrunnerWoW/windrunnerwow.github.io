<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import ClassIcons from '$lib/components/ClassIcons.svelte';

  const playableClasses = ['warrior', 'mage', 'hunter', 'rogue', 'priest', 'warlock'];

  const traits = [
    { image: '/art/goblins/trait-prospecting.png', name: 'Prospecting', copy: '+10 Mining and Jewelcrafting skill.' },
    { image: '/art/goblins/trait-exit-strategy.png', name: 'Exit Strategy', copy: 'Increase movement speed by 40% for 5 seconds, but you cannot attack or cast spells during this time.' },
    { image: '/art/goblins/trait-aggressive-negotiations.png', name: 'Aggressive Negotiations', copy: '+3 Dagger, One-Handed Maces and Two-Handed Maces skill.' }
  ];

  const gallery = [
    { image: '/art/goblins/art-1.webp', label: 'Blackstone Island' },
    { image: '/art/goblins/art-2.webp', label: 'The union at work' },
    { image: '/art/goblins/art-3.webp', label: 'A deal in motion' }
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
  <title>Goblins - Windrunner</title>
  <meta name="description" content="The Goblins of the Horde and their starting zone on Blackstone Island." />
</svelte:head>

<svelte:window on:keydown={(e) => e.key === 'Escape' && closeMap()} />
<div class="detail-page goblin-page">
  <Header />
  <main>
    <section class="race-hero">
      <div class="race-hero-art" aria-hidden="true"></div><div class="race-hero-overlay" aria-hidden="true"></div>
      <div class="race-hero-copy"><div class="kicker">DUROTAR LABOR UNION</div><h1>Goblins<br /><span>of the Horde</span></h1></div>
      <div class="scroll-mark" aria-hidden="true">◆<span>SCROLL TO EXPLORE</span></div>
    </section>
    <section class="lore-frame">
      <p><span class="drop">S</span>hrewd, greedy and ruthless, goblins have built a reputation for putting profit above all else. While many see them as neutral players in global affairs, history tells a different story - such as the Steamwheedle Cartel's alliance with the Old Horde during the Second War. For goblins, loyalty is a commodity, and every decision is a transaction. Goblins don't celebrate heroes for honor or courage - they admire those who strike the biggest deals, invent the wildest gadgets, or come out on top when everything explodes. They're brilliant engineers, clever traders, and expert sailors, but what truly defines them is their relentless pursuit of opportunity - no matter the cost.</p>
    </section>
    <ClassIcons classes={playableClasses} />

    <section class="traits-section">
      <div class="section-heading"><div><div class="kicker">RACIAL TRAITS</div><h2>Profit has<br /><em>perks.</em></h2></div></div>
      <div class="traits-grid">
        {#each traits as trait}
          <article>
            <img src={trait.image} alt="" />
            <h3>{trait.name}</h3>
            <p>{trait.copy}</p>
          </article>
        {/each}
      </div>
    </section>

    <section class="island-section">
      <div class="island-copy">
        <div class="kicker">STARTING ZONE · LEVEL 1–10</div>
        <h2>Blackstone<br /><em>Island</em></h2>
        <p>After fleeing Stonetalon, the goblins of the Durotar Labor Union gave in to their greatest weakness: greed. They've taken over a resource-rich island and built a new empire, this time on the backs of hopeful goblins trying to escape the Venture Co., only to end up in the same trap under new management. Now it's your turn to break the cycle, rise through the ranks, and carve out your place in the Union. This new zone introduces an expanded level 1–10 starting experience for goblins.</p>
        <a class="text-link" href="/new-locations-and-maps">VIEW ALL NEW LOCATIONS →</a>
      </div>
      <div class="map-stack">
        <figure>
          <a href="/art/goblins/zone-map.webp" target="_blank" rel="noopener noreferrer" on:click|preventDefault={() => openMap('/art/goblins/zone-map.webp')}>
            <img src="/art/goblins/zone-map.webp" alt="Map of Blackstone Island" />
          </a>
          <figcaption>Blackstone Island · starting zone</figcaption>
        </figure>
      </div>
    </section>

    <section class="gallery-section">
      <div class="section-heading"><div><div class="kicker">ARTWORKS</div><h2>A union<br /><em>rebuilt.</em></h2></div><p>Scenes from Blackstone Island - where every opportunity has a price, and every price can be negotiated.</p></div>
      <div class="gallery-grid">
        {#each gallery as item}
          <figure>
            <img src={item.image} alt={item.label} />
            <figcaption>{item.label}</figcaption>
          </figure>
        {/each}
      </div>
    </section>
    <section class="goblin-soundtrack"><div class="kicker">SOUNDTRACK</div><h2>Hear Blackstone Island.</h2><p>Hear the gritty, forlorn echoes of Blackstone Isle's landscape!</p><div class="music-links"><a href="https://open.spotify.com/album/6NC5FiQuiYnwDwD1rU37R1" target="_blank" rel="noreferrer">Spotify ↗</a><a href="https://music.apple.com/gb/album/blackstone-island/1725277042" target="_blank" rel="noreferrer">Apple Music ↗</a><a href="https://www.youtube.com/watch?v=Jd9OhfA93v8" target="_blank" rel="noreferrer">YouTube ↗</a></div></section>
    <section class="goblin-callout"><div class="kicker">THE UNION WAITS</div><h2>Make a deal<br /><em>with destiny.</em></h2><a class="cta" href="/high-elves">COMPARE HIGH ELVES →</a></section>
  </main>
  <Footer />
</div>

{#if lightbox}
  <div class="lightbox" on:click={closeMap} role="dialog" aria-modal="true" tabindex="-1">
    <img src={lightbox} alt="Enlarged zone map" />
  </div>
{/if}

<style>
  .detail-page{background:#090b0c}.race-hero{position:relative;min-height:780px;display:flex;align-items:end;padding:150px clamp(24px,8vw,130px) 110px;overflow:hidden;background:#090b0c}.race-hero-art{position:absolute;inset:0;background:url('/art/high-elves/hero.webp') center 28%/cover no-repeat;filter:saturate(.78) brightness(.72)}.race-hero-overlay{position:absolute;inset:0;background:linear-gradient(90deg,rgba(5,7,8,.94),rgba(5,7,8,.55) 45%,rgba(5,7,8,.18)),linear-gradient(180deg,rgba(5,7,8,.02) 40%,#090b0c 98%)}.race-hero-copy{position:relative;z-index:1;max-width:760px}.race-hero h1{font-size:clamp(56px,9vw,126px);line-height:.84;color:#ded3bb;text-transform:uppercase;margin:16px 0 28px}.race-hero h1 span{color:#ad884b}.race-hero p{max-width:720px;color:#b2aa9e;font:18px/1.85 var(--font-body);margin:0}.scroll-mark{position:absolute;z-index:2;right:clamp(24px,7vw,110px);bottom:45px;color:#a78348;font-size:10px}.scroll-mark span{display:block;margin-top:12px;color:#847b6d;font:9px var(--font-ui);letter-spacing:.18em;writing-mode:vertical-rl}.section-heading h2{font-size:clamp(42px,6vw,78px);line-height:.87;color:#ddd1b8;text-transform:uppercase;margin:14px 0}.section-heading em{font-style:normal;color:#a78348}.cta{display:inline-block;margin-top:30px;padding:14px 18px;border:1px solid #80663a;color:#c7b382;text-decoration:none;text-transform:uppercase;font:10px var(--font-ui);letter-spacing:.14em}.cta:hover{background:rgba(128,102,58,.13);border-color:#b89454}
  .goblin-page .race-hero{align-items:start;min-height:86vh;padding:130px clamp(24px,8vw,130px) 180px}.goblin-page .race-hero-art{background-image:url('/art/goblins/hero.webp');background-position:center 42%;background-size:cover;filter:saturate(.95) brightness(.95)}.goblin-page .race-hero-overlay{background:linear-gradient(180deg,rgba(5,7,8,.55) 0%,transparent 28%,transparent 58%,rgba(9,11,12,.92) 100%),linear-gradient(90deg,rgba(5,7,8,.42),transparent 42%)}.goblin-page .scroll-mark{bottom:160px}.lore-frame{position:relative;z-index:2;max-width:980px;margin:-120px clamp(22px,6vw,90px) 0;padding:42px 56px 48px;border:1px solid #8a6a32;box-shadow:0 0 0 6px #120e0a,0 0 0 7px #6d5328,0 24px 50px rgba(0,0,0,.55);background:
radial-gradient(circle at 12% 20%,rgba(90,62,28,.18),transparent 42%),
linear-gradient(180deg,rgba(28,20,12,.96),rgba(14,12,10,.98));}.lore-frame p{margin:0;color:#d7cbb4;font:18px/1.9 var(--font-body);text-align:center}.lore-frame .drop{float:left;margin:4px 12px 0 0;width:52px;height:52px;display:grid;place-items:center;border:1px solid #8a6a32;background:linear-gradient(180deg,#1c1610,#12100c);color:#c9a45a;font:42px/1 var(--font-display)}.island-section{display:grid;grid-template-columns:.9fr 1.1fr;gap:80px;padding:125px clamp(24px,8vw,130px);background:radial-gradient(circle at 78% 40%,rgba(30,42,79,.3),transparent 38%),#0b0d10;border-top:1px solid #17130f}.island-copy{align-self:center}.island-copy h2{font-size:clamp(50px,7vw,92px);line-height:.84;color:#ddd1b8;text-transform:uppercase;margin:14px 0 25px}.island-copy em,.traits-section em,.goblin-callout em,.gallery-section em{font-style:normal;color:#7595d0}.island-copy p{max-width:580px;color:#a0988b;font:17px/1.8 var(--font-body)}.text-link{display:inline-block;margin-top:30px;color:#a7c1ec;text-decoration:none;text-transform:uppercase;font:10px var(--font-ui);letter-spacing:.14em}.map-stack{align-self:center}.map-stack figure{margin:0;padding:9px;border:1px solid #3d4d77;background:#11100d}.map-stack a{display:block;cursor:zoom-in}.map-stack img{display:block;width:100%;height:auto}.map-stack a:hover img{filter:brightness(1.08)}.map-stack figcaption,.gallery-section figcaption{padding:12px 5px 4px;color:#8ba7dc;font:9px var(--font-ui);letter-spacing:.15em;text-transform:uppercase}.lightbox{position:fixed;inset:0;z-index:80;display:grid;place-items:center;padding:40px;background:rgba(5,7,8,.88);cursor:zoom-out}.lightbox img{max-width:min(1100px,92vw);max-height:90vh;width:auto;height:auto;border:1px solid #3d4d77;box-shadow:0 24px 60px rgba(0,0,0,.55)}.traits-section,.gallery-section{padding:125px clamp(24px,8vw,130px);background:#080a0b;border-top:1px solid #17130f}.section-heading{display:flex;justify-content:space-between;align-items:end;gap:70px;margin-bottom:50px}.section-heading h2{font-size:clamp(44px,6vw,78px);line-height:.88;color:#ddd1b8;text-transform:uppercase;margin:13px 0 0}.section-heading p{color:#968e82;font:16px/1.75 var(--font-body);margin:0;max-width:420px}.traits-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px}.traits-grid article{min-width:0;padding:28px 22px;border-top:1px solid #7594d1;background:linear-gradient(145deg,rgba(50,70,117,.16),transparent 60%),#0d1011}.traits-grid img{width:58px;height:58px}.traits-grid h3{font-size:24px;line-height:1;text-transform:uppercase;color:#d8cbb1;margin:22px 0 13px}.traits-grid p{color:#968e82;font:15px/1.7 var(--font-body);margin:0}.gallery-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}.gallery-grid figure{margin:0;background:#111414;border:1px solid #303953}.gallery-grid img{display:block;width:100%;height:230px;object-fit:cover;filter:saturate(.78);transition:.4s}.gallery-grid figure:hover img{filter:saturate(1);transform:scale(1.015)}.goblin-callout{padding:150px clamp(24px,8vw,130px);text-align:center;background:linear-gradient(180deg,#0b0d10,#080a0b);border-top:1px solid #17130f}.goblin-callout h2{font-size:clamp(50px,7vw,94px);line-height:.84;color:#ddd1b8;text-transform:uppercase;margin:16px 0}.goblin-callout .cta{color:#b5c9ef;border-color:#627cae}@media(max-width:900px){.island-section{grid-template-columns:1fr;gap:45px}.section-heading{display:block;margin-bottom:32px}.section-heading p{margin-top:25px}.traits-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.gallery-grid{grid-template-columns:1fr 1fr}}@media(max-width:600px){.race-hero{min-height:650px;padding-bottom:80px}.goblin-page .race-hero{padding:110px 22px 140px}.lore-frame{margin-top:-80px;padding:28px 22px 32px}.lore-frame .drop{width:44px;height:44px;font-size:34px}.race-hero-art{background-position:60% 30%}.goblin-page .race-hero-art{background-position:center 38%;background-size:cover}.scroll-mark{display:none}.gallery-grid{grid-template-columns:1fr}.traits-grid{grid-template-columns:1fr}}
  .goblin-soundtrack{padding:115px clamp(24px,8vw,130px);background:linear-gradient(90deg,rgba(11,13,16,.96),rgba(11,13,16,.74)),url('/art/features/landscape.webp') center/cover;border-top:1px solid #17130f}.goblin-soundtrack h2{font-size:clamp(44px,6vw,78px);line-height:.9;color:#ddd1b8;text-transform:uppercase;margin:16px 0}.goblin-soundtrack p{max-width:540px;color:#a0988b;font:17px/1.8 var(--font-body);margin:0}.music-links{display:flex;gap:12px;flex-wrap:wrap;margin-top:30px}.music-links a{padding:12px 16px;border:1px solid #627cae;color:#b5c9ef;text-decoration:none;text-transform:uppercase;font:10px var(--font-ui);letter-spacing:.12em}.music-links a:hover{background:rgba(98,124,174,.2)}
</style>
