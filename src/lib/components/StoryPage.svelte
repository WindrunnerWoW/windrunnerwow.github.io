<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';

  export let title = '';
  export let eyebrow = 'FEATURE';
  export let intro = '';
  export let heroImage = '/art/high-elves/hero.webp';
  export let heroPosition = 'center';
  export let heroSize = 'cover';
  export let sectionEyebrow = 'OVERVIEW';
  export let sectionTitle = '';
  export let bullets: string[] = [];
  export let ctaHref = '';
  export let ctaLabel = '';
</script>

<svelte:head>
  <title>{title} - Windrunner</title>
</svelte:head>

<div class="story-page">
  <Header />
  <main>
    <section class="story-hero" style={`--story-image: url("${heroImage}"); --story-position: ${heroPosition}; --story-size: ${heroSize}`}>
      <div class="story-hero-copy page-intro">
        <div class="kicker">{eyebrow}</div>
        <h1>{title}</h1>
        <p>{intro}</p>
      </div>
    </section>

    <section class="story-overview">
      <div>
        <div class="kicker">{sectionEyebrow}</div>
        <h2>{sectionTitle || title}</h2>
      </div>
      <div>
        {#if bullets.length}
          <ul>{#each bullets as bullet}<li>{bullet}</li>{/each}</ul>
        {/if}
        {#if ctaHref && ctaLabel}
          <a class="cta" href={ctaHref}>{ctaLabel}</a>
        {/if}
      </div>
    </section>

    <slot />
  </main>
  <Footer />
</div>

<style>
  .story-page{background:#090b0c}.story-hero{position:relative;min-height:680px;display:flex;align-items:end;padding:150px clamp(24px,8vw,130px) 104px;overflow:hidden;background:#0b0d0e}  .story-hero:before{
    content:"";
    position:absolute;
    inset:0;
    background-image:linear-gradient(90deg,rgba(5,7,8,.95),rgba(5,7,8,.68) 46%,rgba(5,7,8,.14)),linear-gradient(180deg,rgba(5,7,8,.1),#090b0c 97%),var(--story-image);
    background-position:var(--story-position, center);
    background-size:var(--story-size, cover);
    background-repeat:no-repeat;
    filter:saturate(.85) brightness(.78);
  }.story-hero-copy{position:relative;z-index:1}.story-hero h1{max-width:1000px}.story-overview{display:grid;grid-template-columns:1fr 1fr;gap:80px;padding:120px clamp(24px,8vw,130px);border-top:1px solid #17130f;background:radial-gradient(circle at 15% 20%,rgba(102,76,38,.08),transparent 30%),#090b0c}.story-overview h2{font-size:clamp(40px,5vw,72px);line-height:.9;text-transform:uppercase;color:#ddd1b8;margin:14px 0}.story-overview ul{margin:0;padding:0;list-style:none;color:#a39a8c;font:17px/1.75 var(--font-body)}.story-overview li{position:relative;padding:0 0 14px 22px}.story-overview li:before{content:'◆';position:absolute;left:0;top:2px;color:#a78348;font-size:9px}.cta{display:inline-block;margin-top:30px;padding:14px 18px;border:1px solid #80663a;color:#c7b382;text-decoration:none;text-transform:uppercase;font-size:10px;letter-spacing:.14em}.cta:hover{background:rgba(128,102,58,.13);border-color:#b89454}@media(max-width:800px){.story-hero{min-height:600px;padding-bottom:70px}.story-overview{grid-template-columns:1fr;gap:28px;padding-top:80px}}
</style>
