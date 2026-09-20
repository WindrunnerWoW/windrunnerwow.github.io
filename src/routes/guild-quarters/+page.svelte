<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';

  const notes = [
    {
      name: 'One-time cost',
      copy: "Setting your guild's base is a one-time cost."
    },
    {
      name: 'Shared taverns',
      copy: 'There is no limit to how many guilds may use one tavern.'
    },
    {
      name: 'Tabard teleport',
      copy: 'These taverns will serve as a new location for Guild Tabards to teleport to.'
    }
  ];
</script>

<svelte:head>
  <title>Guild Quarters - Windrunner</title>
  <meta
    name="description"
    content="Rent a tavern with an Innkeeper as your guild home - Horde, Alliance, or neutral - with rested bonus and tabard teleport."
  />
</svelte:head>

<Header />
<main>
  <section
    class="hero"
    style="--hero-image: url('/art/features/guild-quarters-hero.jpg'); --hero-position: center; --hero-size: cover"
  >
    <div class="content">
      <div class="kicker">GUILD SYSTEMS</div>
      <h1>Guild Quarters</h1>
      <p>
        Guilds have the ability to rent any tavern in the game that includes an Innkeeper, using either gold or tokens.
        These guild quarters can be located in Horde, Alliance, or neutral areas for cross-faction guilds.
      </p>
    </div>
  </section>

  <section class="body">
    <div>
      <div class="kicker">GUILD SYSTEMS</div>
      <h2>A home in<br /><em>every tavern</em></h2>
    </div>
    <div class="copy">
      <p>
        In cross-faction guilds, only players from the same faction as the guild leader will be able to use the guild
        teleport if the rented tavern is in a faction-restricted area.
      </p>
      <p>
        In addition to the guild tabard teleport, these rented taverns will provide an extra rested bonus for guild
        members who are stationed there.
      </p>
      <p>
        This system is being introduced to ensure all guilds, new and old, have fair access to the guild housing
        feature. Previously, older guilds had exclusive access to guild housing which created gameplay advantages newer
        guilds couldn’t share. Some older custom bases occupy space needed for upcoming zones and content expansions.
      </p>
    </div>
  </section>

  <section class="notes">
    <div class="section-heading">
      <div class="kicker">IMPORTANT NOTES</div>
      <h2>Fair access<br /><em>for every guild.</em></h2>
    </div>
    <div class="notes-grid">
      {#each notes as note}
        <article>
          <h3>{note.name}</h3>
          <p>{note.copy}</p>
        </article>
      {/each}
    </div>
    <a class="cta" href="/guild-banks">EXPLORE GUILD VAULTS →</a>
  </section>
</main>
<Footer />

<style>
  .body {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    padding: 100px clamp(24px, 8vw, 130px);
    background: #090b0c;
    border-top: 1px solid #17130f;
  }
  .body h2,
  .notes h2 {
    font-size: clamp(38px, 5vw, 68px);
    line-height: 0.95;
    text-transform: uppercase;
    color: #d9cdb5;
    margin: 12px 0;
  }
  .body em,
  .notes em {
    font-style: normal;
    color: #ad884b;
  }
  .copy {
    max-width: 640px;
  }
  .copy p {
    margin: 0 0 18px;
    color: #9c9487;
    font-family: var(--font-body);
    font-size: 17px;
    line-height: 1.9;
  }
  .notes {
    padding: 40px clamp(24px, 8vw, 130px) 120px;
    background: radial-gradient(circle at 18% 20%, rgba(102, 76, 38, 0.1), transparent 32%), #090b0c;
  }
  .section-heading {
    max-width: 720px;
    margin-bottom: 48px;
  }
  .notes-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 28px;
  }
  .notes-grid article {
    padding: 32px 28px;
    border: 1px solid #3a3124;
    background: linear-gradient(180deg, #14110d, #0d0c0a);
  }
  .notes-grid h3 {
    margin: 0 0 12px;
    font-size: 22px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: #d9cdb5;
  }
  .notes-grid p {
    margin: 0;
    color: #9c9487;
    font: 17px / 1.8 var(--font-body);
  }
  .cta {
    display: inline-block;
    margin-top: 40px;
    padding: 14px 18px;
    border: 1px solid #80663a;
    color: #c7b382;
    text-decoration: none;
    text-transform: uppercase;
    font-size: 10px;
    letter-spacing: 0.14em;
  }
  .cta:hover {
    background: rgba(128, 102, 58, 0.13);
    border-color: #b89454;
  }
  @media (max-width: 900px) {
    .notes-grid {
      grid-template-columns: 1fr;
    }
  }
  @media (max-width: 800px) {
    .body {
      grid-template-columns: 1fr;
      gap: 30px;
      padding-left: 22px;
      padding-right: 22px;
    }
    .notes {
      padding-left: 22px;
      padding-right: 22px;
    }
  }
</style>
