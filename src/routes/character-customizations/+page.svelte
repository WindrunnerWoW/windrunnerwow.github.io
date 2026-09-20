<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';

  const shots = [
    '/art/customizations/shot-01.webp',
    '/art/customizations/shot-10.webp',
    '/art/customizations/shot-11.webp',
    '/art/customizations/shot-12.webp',
    '/art/customizations/shot-13.webp',
    '/art/customizations/shot-14.webp',
    '/art/customizations/shot-15.webp',
    '/art/customizations/shot-16.webp',
    '/art/customizations/shot-17.webp',
    '/art/customizations/shot-02.webp',
    '/art/customizations/shot-03.webp',
    '/art/customizations/shot-04.webp',
    '/art/customizations/shot-05.webp',
    '/art/customizations/shot-06.webp',
    '/art/customizations/shot-07.webp',
    '/art/customizations/shot-08.webp',
    '/art/customizations/shot-09.webp',
    '/art/customizations/shot-18.webp',
    '/art/customizations/shot-19.webp'
  ];

  let lightbox: string | null = null;

  function openShot(src: string) {
    lightbox = src;
  }

  function closeShot() {
    lightbox = null;
  }
</script>

<svelte:head>
  <title>Character Customizations - Windrunner</title>
  <meta name="description" content="New hair colors, skin paints and customization choices for Windrunner characters." />
</svelte:head>

<svelte:window on:keydown={(e) => e.key === 'Escape' && closeShot()} />

<Header />
<main>
  <section
    class="hero"
    style="--hero-image: url('/art/customizations/hero.webp'); --hero-position: center; --hero-size: cover"
  >
    <div class="content">
      <div class="kicker">NEW CHARACTER</div>
      <h1>Customizations</h1>
      <p>With new hair colors, skin paints and colors, it's never been easier to make your character truly yours.</p>
    </div>
  </section>

  <section class="gallery">
    <div class="section-heading">
      <div>
        <div class="kicker">SCREENSHOTS</div>
        <h2>New looks<br /><em>in the world.</em></h2>
      </div>
      <p>Hair colors, skin paints, and markings across races - tap a shot to enlarge it.</p>
    </div>
    <div class="shot-grid">
      {#each shots as src, i}
        <button type="button" class="shot" on:click={() => openShot(src)}>
          <img src={src} alt="Character customization screenshot {i + 1}" />
        </button>
      {/each}
    </div>
  </section>

  <section class="detail">
    <div>
      <div class="kicker">CUSTOMIZATION OPTIONS</div>
      <h2>Personalize Every Detail</h2>
    </div>
    <div>
      <ul>
        <li>Hair colors - Expanded palette beyond the original options</li>
        <li>Skin paints - Add flair and detail to your character's skin</li>
        <li>Skin colors - Broader range of skin tones to choose from</li>
        <li>Face markings - Stand out with unique facial designs</li>
        <li>Tattoos - Express your character's identity with body art</li>
      </ul>
    </div>
  </section>
</main>
<Footer />

{#if lightbox}
  <div class="lightbox" on:click={closeShot} role="dialog" aria-modal="true" tabindex="-1">
    <img src={lightbox} alt="Enlarged character customization screenshot" />
  </div>
{/if}

<style>
  .gallery {
    padding: 90px clamp(24px, 8vw, 130px) 40px;
    background: #080a0b;
    border-top: 1px solid #17130f;
  }
  .section-heading {
    display: flex;
    justify-content: space-between;
    align-items: end;
    gap: 70px;
    margin-bottom: 50px;
  }
  .section-heading h2 {
    font-size: clamp(42px, 6vw, 72px);
    line-height: 0.88;
    color: #ddd1b8;
    text-transform: uppercase;
    margin: 13px 0 0;
  }
  .section-heading em {
    font-style: normal;
    color: #a78348;
  }
  .section-heading p {
    color: #968e82;
    font: 16px / 1.75 var(--font-body);
    margin: 0;
    max-width: 420px;
  }
  .shot-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 18px;
  }
  .shot {
    margin: 0;
    padding: 0;
    border: 1px solid #3a3124;
    background: #11100d;
    cursor: zoom-in;
    overflow: hidden;
  }
  .shot img {
    display: block;
    width: 100%;
    height: 220px;
    object-fit: cover;
    transition: 0.35s;
  }
  .shot:hover img {
    transform: scale(1.03);
    filter: brightness(1.08);
  }
  .detail {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    padding: 120px clamp(24px, 8vw, 130px);
    background: #090b0c;
    border-top: 1px solid #17130f;
  }
  .detail h2 {
    font-size: clamp(38px, 5vw, 68px);
    line-height: 0.95;
    text-transform: uppercase;
    color: #d9cdb5;
    margin: 12px 0;
  }
  ul {
    margin: 0;
    padding-left: 20px;
    color: #9c9487;
    font-family: var(--font-body);
    font-size: 17px;
    line-height: 1.9;
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
    max-width: min(1200px, 92vw);
    max-height: 90vh;
    width: auto;
    height: auto;
    border: 1px solid #6d5328;
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.55);
  }
  @media (max-width: 900px) {
    .section-heading {
      display: block;
      margin-bottom: 32px;
    }
    .section-heading p {
      margin-top: 25px;
    }
    .shot-grid {
      grid-template-columns: 1fr 1fr;
    }
    .detail {
      grid-template-columns: 1fr;
      gap: 30px;
    }
  }
  @media (max-width: 600px) {
    .shot-grid {
      grid-template-columns: 1fr;
    }
    .shot img {
      height: 200px;
    }
  }
</style>
