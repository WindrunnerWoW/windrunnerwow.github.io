<script lang="ts">
  import StoryPage from '$lib/components/StoryPage.svelte';


  let lightbox = false;

  function closeShot() {
    lightbox = false;
  }
</script>

<svelte:head>
  <meta
    name="description"
    content="All mounts now have dynamic speed - speed adapts along with your riding skill."
  />
</svelte:head>

<svelte:window on:keydown={(e) => e.key === 'Escape' && closeShot()} />

<StoryPage
  title="Dynamic Mount Speed"
  eyebrow="TRAVEL"
  intro="All mounts now have dynamic speed - the speed will adapt along with your riding skill."
  heroImage="/art/features/mount-speed.webp"
  heroPosition="center"
  heroSize="cover"
  sectionEyebrow="TRAVEL"
  sectionTitle="Speed that grows with you."
  bullets={[
    'Mount speed scales with riding skill instead of locking to a single percentage.',
    'Your first mount stays useful as you train Riding 75 and Riding 150.',
    'Travel across Azeroth speeds up with the character, not with a new model.'
  ]}
>
  <section class="block">
    <div class="section-heading">
      <div class="kicker">HOW IT WORKS</div>
      <h2>Skill first,<br /><em>then speed.</em></h2>
    </div>
    <figure class="wide">
      <button class="shot" type="button" aria-label="Enlarge mount speed chart" on:click={() => (lightbox = true)}>
        <img
          src="/art/features/mount-speed.webp"
          alt="Chart comparing mount speed without riding skill versus with riding skill 75 and 150 across character levels"
        />
      </button>
    </figure>
  </section>
</StoryPage>

{#if lightbox}
  <div class="lightbox" on:click={closeShot} on:keydown={(e) => e.key === 'Enter' && closeShot()} role="dialog" aria-modal="true" tabindex="-1">
    <img src="/art/features/mount-speed.webp" alt="Enlarged mount speed chart" />
  </div>
{/if}

<style>
  .block { padding: 120px clamp(24px, 8vw, 130px); background: #080a0b; border-top: 1px solid #17130f; }
  .section-heading { margin-bottom: 44px; }
  .section-heading h2 { font-size: clamp(42px, 6vw, 78px); line-height: .88; text-transform: uppercase; color: #ddd1b8; margin: 12px 0; }
  .section-heading em { font-style: normal; color: #a78348; }
  figure { margin: 0; padding: 10px; border: 1px solid #30281c; background: #11100d; }
  figure.wide { max-width: 1100px; }
  .shot { display: block; width: 100%; padding: 0; border: 0; background: none; cursor: zoom-in; }
  .shot img { display: block; width: 100%; height: auto; }
  .lightbox { position: fixed; inset: 0; z-index: 80; display: grid; place-items: center; padding: 24px; background: rgba(5, 6, 7, .92); cursor: zoom-out; }
  .lightbox img { max-width: min(1400px, 94vw); max-height: 90vh; object-fit: contain; border: 1px solid #3a3124; }
</style>
