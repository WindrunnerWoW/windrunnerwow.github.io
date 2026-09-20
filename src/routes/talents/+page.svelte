<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import { classIconSrc, classInfo } from '$lib/talents/data';
</script>

<svelte:head>
  <title>Talent Calculator - Windrunner</title>
  <meta
    name="description"
    content="Plan Warrior, Paladin, Hunter, Rogue, Priest, Shaman, Mage, Warlock and Druid talent builds for Windrunner."
  />
</svelte:head>

<Header />
<main>
  <section class="picker">
    <h2>Choose a class</h2>
    <ul>
      {#each classInfo as cls}
        <li>
          <a href="/talents/{cls.slug}" style="--c:{cls.color}">
            <img src={classIconSrc(cls.slug)} alt="" />
            <span>{cls.name}</span>
          </a>
        </li>
      {/each}
    </ul>
  </section>
</main>
<Footer />

<style>
  .picker {
    padding: 140px clamp(24px, 6vw, 110px) 120px;
  }

  h2 {
    text-align: center;
    color: #c9a24d;
    font-size: clamp(28px, 4vw, 42px);
    letter-spacing: 0.06em;
    text-transform: uppercase;
    margin: 0 0 36px;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: clamp(18px, 3vw, 36px);
    margin: 0;
    padding: 28px 18px;
    list-style: none;
    border: 1px solid #332b1c;
    background: #0c0f10;
  }

  a {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    min-width: 88px;
    color: var(--c);
    text-decoration: none;
    font: 12px var(--font-ui);
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  a:hover span {
    color: #e7d7b3;
  }

  img {
    width: 72px;
    height: 72px;
    object-fit: contain;
    filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.5));
  }
</style>
