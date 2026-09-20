<script lang="ts">
  import StoryPage from '$lib/components/StoryPage.svelte';

  const titles = [
    {
      name: 'Lorekeeper',
      copy: 'Knowledge is power! Lorekeeper is the title for those who managed to complete 1700 quests!'
    },
    {
      name: 'Cartographer',
      copy: 'For those that are bold and adventurous enough to discover all locations in both continents of Azeroth.'
    },
    {
      name: 'Sulfuron Champion',
      copy: 'Wielder of Sulfuras, Hand of Ragnaros.'
    },
    {
      name: 'Guardian of Tirisfal',
      copy: "Wielder of Atiesh, Greatstaff of the Guardian."
    },
    {
      name: 'Stormwielder',
      copy: 'Wielder of Thunderfury, Blessed Blade of the Windseeker.'
    },
    {
      name: 'Conqueror of Naxxramas',
      copy: "Participated in the realm first defeat of Kel'Thuzad in Naxxramas."
    },
    {
      name: 'Scarab Lord',
      copy: 'A proud owner of the Black Qiraji Battle Tank, the Legendary mount of Shifting Sands!'
    },
    {
      name: 'Immortal',
      copy: 'Reach level 60 in Hardcore Mode.'
    },
    {
      name: 'Seeker of Knowledge',
      copy: 'Seeker of Knowledge is the title for those who managed to complete 2800 quests!'
    },
    {
      name: 'Blood Ring Champion',
      copy: 'Reach Exalted with the Steamwheedle Blood Ring faction.'
    },
    {
      name: 'Crazy Cat Lady',
      copy: "Get ready to embark on a wild adventure of snatching up every feline you come across on the street! Bring them all back to your humble abode and claim the ultimate title of Crazy Cat Lady in the game. It's time to show the world just how much you're head-over-heels in love with these purrfect little creatures. Meow!"
    },
    {
      name: 'Lord of the Frogs',
      copy: "Are you a frog fanatic like us? Are you ready to hop around and explore every slimy corner in search of that rare breed? It's time to gather every frog in Azeroth and earn the legendary title of Lord of the Frogs! Let's ribbit our way to victory!"
    },
    {
      name: 'Bloodthirsty',
      copy: 'Reach 250000 honorable kills.'
    },
    {
      name: 'The Wanderer',
      copy: "Reach level 60 in Vagrant's Endeavor challenge."
    },
    {
      name: 'Diplomat',
      copy: "You know what they say - you can't please everyone. But let's face it, who wants to be a people pleaser anyway? If you're ready to earn your title of Diplomat, it's time to prove the naysayers wrong! So, buckle up and get ready to cozy up with the Timbermaw Hold, Cenarion Circle, and Thorium Brotherhood."
    }
  ];
</script>

<StoryPage
  title="Achievement Titles"
  eyebrow="PLAYER'S TITLES"
  intro="Show off your outstanding accomplishments with a title granted to you by wielding legendary items or accomplishing extreme feats."
  heroImage="/art/features/titles.webp"
  heroPosition="center"
  heroSize="cover"
  sectionEyebrow="AVAILABLE TITLES"
  sectionTitle="Show off your accomplishments."
  bullets={[
    'Titles mark legendary weapons, rare mounts, and feats few players ever finish.',
    'Some rewards come from challenges like Hardcore and Vagrant’s Endeavor.',
    'Others wait for collectors, diplomats, and realm-first raiders.'
  ]}
  ctaHref="/challenges"
  ctaLabel="EXPLORE CHALLENGES →"
>
  <section class="titles-section">
    <div class="section-heading">
      <div class="kicker">FIFTEEN TITLES</div>
      <h2>Wear what<br /><em>you earned.</em></h2>
    </div>
    <div class="titles-grid">
      {#each titles as title, index}
        <article>
          <div class="title-top">
            <span>{String(index + 1).padStart(2, '0')}</span>
            <small>★ TITLE</small>
          </div>
          <h3>{title.name}</h3>
          <p>{title.copy}</p>
        </article>
      {/each}
    </div>
  </section>
</StoryPage>

<style>
  .titles-section {
    padding: 120px clamp(24px, 8vw, 130px);
    background: #080a0b;
    border-top: 1px solid #17130f;
  }
  .section-heading {
    margin-bottom: 46px;
  }
  .section-heading h2 {
    font-size: clamp(42px, 6vw, 78px);
    line-height: 0.88;
    text-transform: uppercase;
    color: #ddd1b8;
    margin: 12px 0;
  }
  .section-heading em {
    font-style: normal;
    color: #a78348;
  }
  .titles-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }
  .titles-grid article {
    min-height: 250px;
    padding: 24px;
    border: 1px solid #30281c;
    background: linear-gradient(145deg, rgba(98, 69, 32, 0.12), transparent 55%), #0d1011;
  }
  .title-top {
    display: flex;
    justify-content: space-between;
    gap: 15px;
  }
  .title-top span {
    color: #765a32;
    font: 11px var(--font-ui);
    letter-spacing: 0.15em;
  }
  .title-top small {
    color: #ad884c;
    text-align: right;
    font: 9px / 1.3 var(--font-ui);
    letter-spacing: 0.12em;
  }
  .titles-grid h3 {
    font-size: 27px;
    line-height: 1;
    text-transform: uppercase;
    color: #d8cbb1;
    margin: 35px 0 14px;
  }
  .titles-grid p {
    margin: 0;
    color: #938b7f;
    font: 15px / 1.7 var(--font-body);
  }
  @media (max-width: 1000px) {
    .titles-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (max-width: 600px) {
    .titles-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
