<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import TalentCalculator from '$lib/components/talents/TalentCalculator.svelte';
  import { talentClassMap } from '$lib/talents/data';

  export let data: { slug: string; pointsParam: string | null };
  $: classData = talentClassMap[data.slug];
</script>

<svelte:head>
  <title>{classData?.name ?? 'Talents'} - Talent Calculator - Windrunner</title>
</svelte:head>

<Header />
<main>
  {#if classData}
    {#key data.slug}
      <TalentCalculator slug={data.slug} pointsParam={data.pointsParam} />
    {/key}
  {:else}
    <section class="missing">
      <p>Unknown class.</p>
      <a href="/talents">Choose a class</a>
    </section>
  {/if}
</main>
<Footer />

<style>
  .missing {
    padding: 180px 24px 120px;
    text-align: center;
  }
  .missing a {
    color: #c7b382;
  }
</style>
