<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import type { FeatureCategory } from '$lib/data/featureNav';

  export let category: FeatureCategory;
</script>

<svelte:head>
  <title>{category.title} - Windrunner</title>
  <meta name="description" content={category.intro} />
</svelte:head>

<Header />
<main>
  <section class="hero" style={`--hero-image: url('${category.heroImage}')`}>
    <div class="content">
      <div class="kicker">{category.eyebrow}</div>
      <h1>{category.heading}</h1>
      <p>{category.intro}</p>
    </div>
  </section>

  <section class="listing">
    <div class="section-heading">
      <div class="kicker">{category.listingKicker}</div>
      <h2>Explore the pages.</h2>
    </div>
    <div class="grid">
      {#each category.links as feature}
        <a class="card" href={feature.href}>
          <div
            class="image"
            style={`background-image:linear-gradient(180deg,transparent,rgba(6,8,9,.88)),url('${feature.image}');background-position:${feature.position ?? 'center'};background-size:${feature.size ?? 'cover'};background-repeat:no-repeat`}
          ></div>
          <div class="copy">
            <div class="kicker">{feature.eyebrow}</div>
            <h3>{feature.title}</h3>
            <p>{feature.summary}</p>
            <span>Read more →</span>
          </div>
        </a>
      {/each}
    </div>
  </section>
</main>
<Footer />

<style>
  .hero {
    min-height: 760px;
    display: flex;
    align-items: end;
    padding: 150px clamp(24px, 8vw, 130px) 95px;
    background-image:
      linear-gradient(180deg, rgba(5, 7, 8, 0.15), rgba(5, 7, 8, 0.86) 75%, #090b0c),
      linear-gradient(90deg, rgba(5, 7, 8, 0.8), transparent 65%), var(--hero-image);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
  .content {
    max-width: 900px;
  }
  .content h1 {
    font-size: clamp(54px, 9vw, 112px);
    line-height: 0.84;
    text-transform: uppercase;
    color: #ded3bb;
    margin: 14px 0 24px;
  }
  .content p {
    max-width: 760px;
    font-family: var(--font-body);
    font-size: 18px;
    line-height: 1.85;
    color: #b1a898;
  }
  .listing {
    padding: 80px clamp(24px, 8vw, 130px) 120px;
    background: #090b0c;
  }
  .section-heading {
    max-width: 850px;
    margin-bottom: 48px;
  }
  .listing h2 {
    font-size: clamp(38px, 5vw, 68px);
    line-height: 0.95;
    text-transform: uppercase;
    color: #d9cdb5;
    margin: 12px 0;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }
  .card {
    position: relative;
    min-height: 420px;
    overflow: hidden;
    border: 1px solid #292319;
    text-decoration: none;
    background: #0d1011;
  }
  .image {
    position: absolute;
    inset: 0;
    background-repeat: no-repeat;
    filter: saturate(0.76) brightness(0.72);
    transition: 0.5s;
  }
  .card:hover .image {
    transform: scale(1.035);
    filter: saturate(0.92) brightness(0.78);
  }
  .copy {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 40px;
  }
  .copy .kicker {
    margin-bottom: 14px;
  }
  .copy h3 {
    font-size: clamp(28px, 3.5vw, 44px);
    line-height: 0.94;
    text-transform: uppercase;
    color: #dfd4bc;
    margin: 0 0 14px;
  }
  .copy p {
    max-width: 520px;
    color: #aba293;
    font-family: var(--font-body);
    font-size: 17px;
    line-height: 1.75;
  }
  .copy span {
    display: inline-block;
    margin-top: 18px;
    color: #b99554;
    text-transform: uppercase;
    font-size: 12px;
    letter-spacing: 0.12em;
  }
  @media (max-width: 850px) {
    .grid {
      grid-template-columns: 1fr;
    }
    .card {
      min-height: 380px;
    }
  }
  @media (max-width: 800px) {
    .hero {
      min-height: 650px;
    }
  }
</style>
