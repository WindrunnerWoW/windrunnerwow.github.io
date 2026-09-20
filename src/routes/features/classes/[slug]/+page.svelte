<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import { classGuideMap } from '$lib/data/classChanges';
  import { classIconSrc, classInfo } from '$lib/talents/data';

  export let data: { slug: string };
  $: guide = classGuideMap[data.slug];
</script>

<svelte:head>
  <title>{guide?.name ?? 'Class'} - Class Design - Windrunner</title>
  {#if guide}
    <meta name="description" content={guide.intro} />
  {/if}
</svelte:head>

<Header />
<main>
  {#if guide}
    <section class="class-intro">
      <a class="back" href="/features/classes">← All classes</a>
      <div class="title-row">
        <img src={classIconSrc(guide.slug)} alt="" />
        <div>
          <div class="kicker">Class changes</div>
          <h1 style="color:{guide.color}">{guide.name}</h1>
        </div>
      </div>
      <p>{guide.intro}</p>
    </section>

    <nav class="class-strip" aria-label="Classes">
      {#each classInfo as cls}
        <a href="/features/classes/{cls.slug}" class:active={cls.slug === guide.slug} title={cls.name}>
          <img src={classIconSrc(cls.slug)} alt={cls.name} />
        </a>
      {/each}
    </nav>

    {#if guide.abilities.length}
      <section class="block">
        <div class="kicker">New abilities</div>
        <div class="ability-grid">
          {#each guide.abilities as ability}
            <article>
              <h3>{ability.name}</h3>
              {#if ability.meta}<p class="meta">{ability.meta}</p>{/if}
              <p>{ability.detail}</p>
            </article>
          {/each}
        </div>
      </section>
    {/if}

    {#if guide.mechanics.length}
      <section class="block">
        <div class="kicker">Changes to class mechanics</div>
        <ul class="changes">
          {#each guide.mechanics as item}
            <li><strong>{item.name}</strong> {item.detail}</li>
          {/each}
        </ul>
      </section>
    {/if}

    {#if guide.baseline.length}
      <section class="block">
        <div class="kicker">Changes to baseline spells</div>
        <ul class="changes">
          {#each guide.baseline as item}
            <li><strong>{item.name}</strong> {item.detail}</li>
          {/each}
        </ul>
      </section>
    {/if}

    {#if guide.talents.length}
      <section class="block">
        <div class="kicker">Talent changes</div>
        <div class="trees">
          {#each guide.talents as tree}
            <div>
              <h2>{tree.tree}</h2>
              <ul class="changes">
                {#each tree.items as item}
                  <li><strong>{item.name}</strong> {item.detail}</li>
                {/each}
              </ul>
            </div>
          {/each}
        </div>
      </section>
    {/if}

    <section class="block cta-row">
      <a class="cta" href="/talents/{guide.slug}">Open {guide.name} talent calculator →</a>
    </section>
  {:else}
    <section class="missing">
      <p>Unknown class.</p>
      <a href="/features/classes">Choose a class</a>
    </section>
  {/if}
</main>
<Footer />

<style>
  .class-intro {
    padding: 130px clamp(24px, 8vw, 130px) 36px;
    background: #090b0c;
  }
  .back {
    display: inline-block;
    margin-bottom: 28px;
    color: #c7b382;
    text-decoration: none;
    text-transform: uppercase;
    font: 11px var(--font-ui);
    letter-spacing: 0.14em;
  }
  .title-row {
    display: flex;
    align-items: center;
    gap: 22px;
  }
  .title-row img {
    width: 84px;
    height: 84px;
    object-fit: contain;
  }
  h1 {
    font-size: clamp(42px, 6vw, 76px);
    line-height: 0.9;
    text-transform: uppercase;
    margin: 8px 0 0;
  }
  .class-intro p {
    max-width: 820px;
    margin: 28px 0 0;
    color: #b1a898;
    font: 18px/1.85 var(--font-body);
  }
  .class-strip {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 14px;
    padding: 8px clamp(24px, 8vw, 130px) 20px;
    background: #090b0c;
    border-bottom: 1px solid #17130f;
  }
  .class-strip a {
    opacity: 0.45;
    transition: opacity 0.2s;
  }
  .class-strip a:hover,
  .class-strip a.active {
    opacity: 1;
  }
  .class-strip img {
    width: 44px;
    height: 44px;
    object-fit: contain;
  }
  .block {
    padding: 70px clamp(24px, 8vw, 130px) 20px;
    background: #090b0c;
  }
  .ability-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    margin-top: 22px;
  }
  article {
    padding: 24px 22px;
    border-top: 1px solid #5a4528;
    background: linear-gradient(145deg, rgba(99, 72, 32, 0.1), transparent 60%), #0e1112;
  }
  article h3 {
    margin: 0 0 8px;
    color: #d8cbb1;
    font-size: 24px;
    text-transform: uppercase;
  }
  .meta {
    margin: 0 0 12px;
    color: #a78348;
    font: 12px/1.5 var(--font-ui);
    letter-spacing: 0.04em;
  }
  article p:last-child {
    margin: 0;
    color: #968e82;
    font: 15px/1.7 var(--font-body);
  }
  h2 {
    margin: 28px 0 16px;
    color: #d9cdb5;
    font-size: clamp(28px, 3vw, 40px);
    text-transform: uppercase;
  }
  .changes {
    margin: 18px 0 0;
    padding: 0;
    list-style: none;
  }
  .changes li {
    position: relative;
    padding: 12px 0 12px 22px;
    border-bottom: 1px solid #1c1812;
    color: #9c9487;
    font: 16px/1.75 var(--font-body);
  }
  .changes li:before {
    content: '★';
    position: absolute;
    left: 0;
    color: #a78348;
    font-size: 11px;
    top: 16px;
  }
  .changes strong {
    color: #d8cbb1;
    font-weight: 600;
    margin-right: 6px;
  }
  .trees {
    display: grid;
    gap: 20px;
  }
  .cta-row {
    padding-bottom: 110px;
  }
  .cta {
    display: inline-block;
    padding: 14px 18px;
    border: 1px solid #80663a;
    color: #c7b382;
    text-decoration: none;
    text-transform: uppercase;
    font-size: 10px;
    letter-spacing: 0.14em;
  }
  .missing {
    padding: 180px 24px 120px;
    text-align: center;
  }
  .missing a {
    color: #c7b382;
  }
  @media (max-width: 800px) {
    .ability-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
