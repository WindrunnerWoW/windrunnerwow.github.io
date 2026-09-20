<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import { classIconSrc, classInfo } from '$lib/talents/data';

  const principles = [
    {
      name: 'Keep the fantasy',
      copy: 'A Warrior still lives in stances. A Rogue still spends combo points. A Mage still drinks mana. The work is to make those identities complete, not to replace them with a later expansion’s kit.'
    },
    {
      name: 'Fix the dead rows first',
      copy: 'Vanilla talent trees are full of ranks that nobody took. Those get rebuilt, merged, or moved before a new button is added. A capstone should be worth walking toward.'
    },
    {
      name: 'Balance the journey',
      copy: 'Specs are judged by how they feel from the Barrens to Blackrock, in a dungeon, and out in the world alone - not by a raid ladder. Solo play should be possible without erasing the class.'
    }
  ];
</script>

<svelte:head>
  <title>CLASS DESIGN - Windrunner</title>
  <meta
    name="description"
    content="Class and spec changes for Warrior, Paladin, Hunter, Rogue, Priest, Shaman, Mage, Warlock and Druid."
  />
</svelte:head>
<Header />
<main>
  <section
    class="hero"
    style="--hero-image: url('/art/features/classes.webp'); --hero-position: center; --hero-size: cover"
  >
    <div class="content">
      <div class="kicker">CLASS DESIGN</div>
      <h1>More viable choices, familiar identities.</h1>
      <p>Class and spec changes aim to broaden viable solo play without erasing the original Vanilla feel.</p>
    </div>
  </section>

  <section class="picker">
    <div class="kicker">CLASSES</div>
    <h2>Learn more about class changes</h2>
    <ul>
      {#each classInfo as cls}
        <li>
          <a href="/features/classes/{cls.slug}" style="--c:{cls.color}">
            <img src={classIconSrc(cls.slug)} alt="" />
            <span>{cls.name}</span>
          </a>
        </li>
      {/each}
    </ul>
  </section>

  <section class="body">
    <div>
      <div class="kicker">PHILOSOPHY</div>
      <h2>Built to feel<br /><em>native to Vanilla.</em></h2>
    </div>
    <div class="copy">
      <p>
        Vanilla class design is uneven. Some specs are finished thoughts. Others stop at row four, hide their best ability behind a full tree, or ask you to ignore everything but two buttons. Windrunner treats that as unfinished work, not as a sacred relic.
      </p>
      <p>
        The rule is simple: a class should still feel like itself. Signature resources, forms, stances, and schools stay. What changes is the dead weight - talents that never paid off, spells that did not scale, and trees that punished any attempt to dip. New abilities appear only when they complete a fantasy the original game already pointed at, not because a later expansion made them famous.
      </p>
      <p>
        Recreating TBC or Wrath druids, hunters, or paladins would be the easy answer. It would also erase the texture of 1.12. The better question is what this class was trying to be, and what a player actually needed while leveling through Azeroth on their own.
      </p>
      <p>
        That last part matters. Group content is still the destination, but the journey is long. A spec that only works in a raid is not viable here. Baseline tools move out of talent walls when every player of that class needed them. Capstones move up a row when they were the only reason to go all the way down. Cooldowns and costs are tuned so the world, not a spreadsheet, is the test.
      </p>
      <p>
        Open a class above for the full list of ability, spell, and talent changes. Use the calculator when you want to see how a build actually sits in the tree.
      </p>
    </div>
  </section>

  <section class="notes">
    <div class="section-heading">
      <div class="kicker">DESIGN PRINCIPLES</div>
      <h2>How a change<br /><em>earns its place.</em></h2>
      <p>
        Every class page is a set of specific edits. These are the tests those edits have to pass.
      </p>
    </div>
    <div class="notes-grid">
      {#each principles as note}
        <article>
          <h3>{note.name}</h3>
          <p>{note.copy}</p>
        </article>
      {/each}
    </div>
    <a class="cta" href="/talents">Open the talent calculator →</a>
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
    background-size: var(--hero-size, cover);
    background-position: var(--hero-position, center);
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
  .picker {
    padding: 80px clamp(24px, 8vw, 130px) 40px;
    background: #090b0c;
  }
  .picker h2 {
    font-size: clamp(38px, 5vw, 68px);
    line-height: 0.95;
    text-transform: uppercase;
    color: #d9cdb5;
    margin: 12px 0 36px;
  }
  .picker ul {
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
  .picker a {
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
  .picker a:hover span {
    color: #e7d7b3;
  }
  .picker img {
    width: 72px;
    height: 72px;
    object-fit: contain;
    filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.5));
  }
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
  .copy p:last-child {
    margin-bottom: 0;
  }
  .notes {
    padding: 40px clamp(24px, 8vw, 130px) 120px;
    background: radial-gradient(circle at 18% 20%, rgba(102, 76, 38, 0.1), transparent 32%), #090b0c;
  }
  .section-heading {
    max-width: 720px;
    margin-bottom: 48px;
  }
  .section-heading p {
    max-width: 640px;
    margin: 20px 0 0;
    color: #a0988b;
    font: 17px / 1.8 var(--font-body);
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
    .hero {
      min-height: 650px;
    }
  }
</style>
