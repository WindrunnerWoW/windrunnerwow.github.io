<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import { getFeatureCategory } from '$lib/data/featureNav';

  const category = getFeatureCategory('characters')!;
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

  <section class="layout">
    <div>
      <h2>Races, faces, and the name you earn.</h2>
    </div>
    <div class="copy">
      <p>
        High Elves and Goblins join the factions with their own starting lands. Classic races pick up classes they never
        had. New hair and skin options, achievement titles, and transmogrification are how that journey shows on the
        character you actually play.
      </p>
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
          <div class="thumb">
            <div
              class="image"
              style={`background-image:url('${feature.image}');background-position:${feature.position ?? 'center'};background-size:${feature.size ?? 'cover'};background-repeat:no-repeat`}
            ></div>
          </div>
          <div class="card-copy">
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
    min-height: 620px;
    display: flex;
    align-items: end;
    padding: 150px clamp(24px, 8vw, 130px) 80px;
    background-image:
      linear-gradient(180deg, rgba(5, 7, 8, 0.2), rgba(5, 7, 8, 0.88) 78%, #090b0c),
      linear-gradient(90deg, rgba(5, 7, 8, 0.82), transparent 65%), var(--hero-image);
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
  .layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    padding: 72px clamp(24px, 8vw, 130px);
    background: #090b0c;
    border-bottom: 1px solid #17130f;
  }
  .layout h2,
  .listing h2 {
    font-size: clamp(38px, 5vw, 68px);
    line-height: 0.95;
    text-transform: uppercase;
    color: #d9cdb5;
    margin: 12px 0;
  }
  .copy p {
    margin: 0;
    color: #9c9487;
    font-family: var(--font-body);
    font-size: 17px;
    line-height: 1.9;
  }
  .listing {
    padding: 80px clamp(24px, 8vw, 130px) 120px;
    background: #090b0c;
  }
  .section-heading {
    max-width: 850px;
    margin-bottom: 48px;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 22px;
  }
  .card {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border: 1px solid #292319;
    text-decoration: none;
    background: #0d1011;
  }
  .thumb {
    height: 180px;
    overflow: hidden;
  }
  .image {
    height: 100%;
    background-repeat: no-repeat;
    filter: saturate(0.82) brightness(0.88);
    transition: 0.5s;
  }
  .card:hover .image {
    transform: scale(1.035);
    filter: saturate(0.95) brightness(0.94);
  }
  .card-copy {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 26px 24px 28px;
  }
  .card-copy .kicker {
    margin-bottom: 12px;
  }
  .card-copy h3 {
    font-size: clamp(22px, 2vw, 28px);
    line-height: 1.05;
    text-transform: uppercase;
    color: #dfd4bc;
    margin: 0 0 12px;
  }
  .card-copy p {
    margin: 0;
    color: #aba293;
    font-family: var(--font-body);
    font-size: 16px;
    line-height: 1.7;
  }
  .card-copy span {
    display: inline-block;
    margin-top: auto;
    padding-top: 18px;
    color: #b99554;
    text-transform: uppercase;
    font-size: 12px;
    letter-spacing: 0.12em;
  }
  @media (max-width: 1100px) {
    .grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (max-width: 800px) {
    .layout {
      grid-template-columns: 1fr;
      gap: 30px;
    }
    .grid {
      grid-template-columns: 1fr;
    }
    .hero {
      min-height: 520px;
    }
  }
</style>
