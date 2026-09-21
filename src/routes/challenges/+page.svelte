<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';

  const pair = [
    {
      slug: 'craftmaster',
      name: 'Traveling\nCraftmaster',
      icon: '/art/challenges/craftmaster-icon.png',
      art: '/art/challenges/craftmaster.webp',
      copy: 'No equipment is better than the ones you make yourself. Level using only gear you craft.',
      reward: 'Achievement Title - Craftmaster'
    },
    {
      slug: 'slow',
      name: 'Slow and\nSteady',
      icon: '/art/challenges/slow-icon.png',
      art: '/art/challenges/slow.webp',
      copy: 'If you really like questing and leveling, play in turtle mode. Creature kill rates are set to 0.5. Enjoy the journey and receive rewards every 10 levels.',
      reward: 'Rewards every 10 levels'
    }
  ];

  const mid = [
    {
      slug: 'warmode',
      name: 'War Mode',
      icon: '/art/challenges/warmode-icon.png',
      art: '/art/challenges/warmode.webp',
      copy: 'You can no longer disable PvP, but experience gain from all sources is increased.',
      reward: ''
    },
    {
      slug: 'exhaustion',
      name: 'Exhaustion',
      icon: '/art/challenges/exhaustion-icon.png',
      art: '/art/challenges/exhaustion.webp',
      copy: 'No longer gaining rested experience, but your weapon skill gain will be doubled.',
      reward: ''
    }
  ];

  const lunaticGoals = [
    'Earn 10,000 honorable kills to show you’re more than just fresh meat.',
    'Reach Exalted with at least one faction to prove that even a tiny hero can have powerful friends.',
    'Obtain the Arena Master Trinket to demonstrate that even at level one, you’re an unstoppable force of nature.',
    'Complete 100 quests available to you, earning the respect of tutorial NPCs everywhere.'
  ];
</script>

<svelte:head>
  <title>Leveling Challenges - Windrunner</title>
  <meta
    name="description"
    content="Prove yourself a great adventurer by completing one or multiple leveling challenges - titles, tabards, companions, mounts and more."
  />
</svelte:head>

<Header />
<main>
  <section class="intro">
    <div class="intro-art" aria-hidden="true"></div>
    <div class="intro-overlay" aria-hidden="true"></div>
    <div class="intro-copy">
      <div class="kicker">A JOURNEY WITH A TWIST</div>
      <h1>Leveling Challenges</h1>
      <p>
        Prove yourself a great adventurer by completing one or multiple challenges. Get unique rewards such as titles,
        tabards, companions, mounts and more.
      </p>
    </div>
    <div class="scroll-mark" aria-hidden="true">◆<span>SCROLL TO EXPLORE</span></div>
  </section>

  <section class="list">
    <article class="feature hardcore">
      <div class="feature-art" aria-hidden="true"></div>
      <div class="feature-copy">
        <div class="name-row">
          <img src="/art/challenges/hardcore-icon.png" alt="" />
          <h2 class="display-font">Hardcore</h2>
        </div>
        <p>
          This is the ultimate test of skill, caution, and sheer stubbornness: level your character to 60 without dying.
          Not even once. Once you’re level 60, you can participate in raiding and PvP without a risk of losing your
          character.
        </p>
        <div class="reward">Achievement Title - Immortal</div>
      </div>
    </article>

    <div class="pair">
      {#each pair as item}
        <article class="panel {item.slug}">
          <div class="panel-copy">
            <h2 class="display-font">{item.name}</h2>
            <p>{item.copy}</p>
            {#if item.reward}
              <div class="reward">{item.reward}</div>
            {/if}
          </div>
        </article>
      {/each}
    </div>

    <article class="lunatic">
      <img class="lunatic-art" src="/art/challenges/lunatic.webp" alt="A level one character in the arena" />
      <div class="lunatic-copy">
        <div class="name-row">
          <img src="/art/challenges/lunatic-icon.png" alt="" />
          <h2 class="display-font">Level One Lunatic</h2>
        </div>
        <p>
          During this challenge, you’ll earn exclusive titles to prove just how far a noob can go, all while staying
          level one:
        </p>
        <ul>
          {#each lunaticGoals as goal}
            <li>{goal}</li>
          {/each}
        </ul>
        <div class="reward">
          Achievement Titles - The Wee Warlord, Pint-Sized Politician, Arena’s Smallest Smasher, Hero of Goldshire
          (Alliance) / Lazy Peon’s Foreman (Horde)
        </div>
      </div>
    </article>

    <article class="feature boaring">
      <div class="feature-copy">
        <div class="name-row">
          <img src="/art/challenges/boaring-icon.png" alt="" />
          <h2 class="display-font">Boaring<br />Adventure</h2>
        </div>
        <p>In this challenge, leveling up is a real big deal. Experience comes exclusively from slaying boars!</p>
        <div class="reward">Achievement Title - The Hambringer</div>
      </div>
    </article>

    <div class="pair">
      {#each mid as item}
        <article class="panel {item.slug}">
          <div class="panel-copy">
            <div class="name-row">
              <img src={item.icon} alt="" />
              <h2 class="display-font">{item.name}</h2>
            </div>
            <p>{item.copy}</p>
          </div>
        </article>
      {/each}
    </div>

    <article class="feature vagrant">
      <div class="feature-copy">
        <div class="name-row">
          <img src="/art/challenges/vagrant-icon.png" alt="" />
          <h2 class="display-font">Vagrant's<br />Endeavor</h2>
        </div>
        <p>
          Live the simple life. You’ll be forced to wear nothing but poor or common quality gear until you hit level 60.
          Enchanting items is not allowed.
        </p>
        <div class="reward">Achievement Title - The Wanderer, and a mule to lug around all your newly-unlocked epics.</div>
      </div>
    </article>
  </section>

  <section class="callout">
    <div class="kicker">PROOF OF THE JOURNEY</div>
    <h2>Wear what<br /><em>you earned.</em></h2>
    <a class="cta" href="/achievement-titles">VIEW ACHIEVEMENT TITLES →</a>
  </section>
</main>
<Footer />

<style>
  .intro {
    position: relative;
    min-height: 760px;
    display: flex;
    align-items: end;
    padding: 150px clamp(24px, 8vw, 130px) 110px;
    overflow: hidden;
    background: #090b0c;
  }
  .intro-art {
    position: absolute;
    inset: 0;
    background: url('/art/features/challenges.webp') 70% 42% / cover no-repeat;
    filter: saturate(0.82) brightness(0.72);
  }
  .intro-overlay {
    position: absolute;
    inset: 0;
    background:
      linear-gradient(90deg, rgba(5, 7, 8, 0.94), rgba(5, 7, 8, 0.52) 46%, rgba(5, 7, 8, 0.18)),
      linear-gradient(180deg, rgba(5, 7, 8, 0.08) 40%, #090b0c 98%);
  }
  .intro-copy {
    position: relative;
    z-index: 1;
    max-width: 820px;
  }
  .intro h1 {
    font-size: clamp(52px, 8vw, 108px);
    line-height: 0.86;
    color: #ded3bb;
    text-transform: uppercase;
    margin: 10px 0 24px;
  }
  .intro p {
    max-width: 680px;
    margin: 0;
    color: #b2aa9e;
    font: 18px / 1.85 var(--font-body);
  }
  .scroll-mark {
    position: absolute;
    z-index: 2;
    right: clamp(24px, 7vw, 110px);
    bottom: 45px;
    color: #a78348;
    font-size: 10px;
  }
  .scroll-mark span {
    display: block;
    margin-top: 12px;
    color: #847b6d;
    font: 9px var(--font-ui);
    letter-spacing: 0.18em;
    writing-mode: vertical-rl;
  }
  .list {
    display: grid;
    gap: 28px;
    padding: 48px clamp(24px, 8vw, 130px) 80px;
  }
  .feature,
  .panel,
  .lunatic {
    position: relative;
    overflow: hidden;
    border: 1px solid #3a3124;
    background: linear-gradient(180deg, #14110d, #0d0c0a);
  }
  .feature {
    min-height: 340px;
    display: grid;
    align-items: center;
  }
  .hardcore {
    grid-template-columns: 1.05fr 0.95fr;
    min-height: 380px;
    background:
      linear-gradient(90deg, transparent 42%, rgba(9, 11, 12, 0.88) 68%, #0b0d0e 100%),
      url('/art/challenges/hardcore.webp') left center / cover no-repeat,
      #0b0d0e;
  }
  .feature-art {
    min-height: 280px;
  }
  .feature-copy,
  .panel-copy,
  .lunatic-copy {
    position: relative;
    z-index: 1;
    padding: 48px 42px;
    max-width: 560px;
  }
  .name-row {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 16px;
  }
  .name-row img {
    width: 58px;
    height: 58px;
    flex-shrink: 0;
  }
  h2.display-font {
    margin: 0;
    font-size: clamp(36px, 4vw, 52px);
    line-height: 0.95;
    color: #c9a45a;
    text-transform: none;
    font-weight: 400;
    white-space: pre-line;
  }
  .feature p,
  .panel p,
  .lunatic p {
    margin: 0 0 18px;
    color: #a39a8c;
    font: 16px / 1.8 var(--font-body);
  }
  .reward {
    color: #c7b382;
    font: 14px / 1.6 var(--font-body);
  }
  .reward::before {
    content: '★ ';
    color: #a78348;
  }
  .pair {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 28px;
  }
  .panel {
    min-height: 420px;
    display: flex;
    align-items: end;
  }
  .craftmaster {
    background:
      linear-gradient(180deg, rgba(9, 11, 12, 0.12) 20%, rgba(9, 11, 12, 0.82) 72%, #0b0d0e 100%),
      url('/art/challenges/craftmaster.webp') 88% center / cover no-repeat;
  }
  .slow {
    background:
      linear-gradient(180deg, rgba(9, 11, 12, 0.12) 20%, rgba(9, 11, 12, 0.82) 72%, #0b0d0e 100%),
      url('/art/challenges/slow.webp') 72% center / cover no-repeat;
  }
  .warmode {
    background:
      linear-gradient(180deg, rgba(9, 11, 12, 0.2) 10%, rgba(9, 11, 12, 0.86) 70%, #0b0d0e 100%),
      url('/art/challenges/warmode.webp') 86% center / cover no-repeat;
  }
  .exhaustion {
    background:
      linear-gradient(180deg, rgba(9, 11, 12, 0.2) 10%, rgba(9, 11, 12, 0.86) 70%, #0b0d0e 100%),
      url('/art/challenges/exhaustion.webp') 90% center / cover no-repeat;
  }
  .lunatic {
    display: grid;
    grid-template-columns: 1.05fr 0.95fr;
    align-items: center;
  }
  .lunatic-art {
    display: block;
    width: 100%;
    height: 100%;
    min-height: 320px;
    object-fit: cover;
    object-position: 82% 70%;
  }
  .lunatic ul {
    margin: 0 0 18px;
    padding: 0;
    list-style: none;
    color: #a39a8c;
    font: 16px / 1.75 var(--font-body);
  }
  .lunatic li {
    position: relative;
    padding: 0 0 10px 18px;
  }
  .lunatic li::before {
    content: '◆';
    position: absolute;
    left: 0;
    top: 4px;
    color: #a78348;
    font-size: 8px;
  }
  .boaring {
    min-height: 420px;
    background:
      linear-gradient(90deg, rgba(9, 11, 12, 0.72) 0%, rgba(9, 11, 12, 0.35) 32%, transparent 55%),
      url('/art/challenges/boaring.webp') left center / cover no-repeat;
  }
  .vagrant {
    min-height: 420px;
    background:
      linear-gradient(90deg, rgba(9, 11, 12, 0.92) 0%, rgba(9, 11, 12, 0.55) 38%, transparent 62%),
      url('/art/challenges/vagrant.webp') right center / cover no-repeat;
  }
  .callout {
    padding: 80px clamp(24px, 8vw, 130px) 130px;
    text-align: center;
    border-top: 1px solid #17130f;
  }
  .callout h2 {
    font-size: clamp(42px, 6vw, 78px);
    line-height: 0.88;
    text-transform: uppercase;
    color: #ddd1b8;
    margin: 14px 0 28px;
  }
  .callout em {
    font-style: normal;
    color: #a78348;
  }
  .cta {
    display: inline-block;
    padding: 14px 18px;
    border: 1px solid #80663a;
    color: #c7b382;
    text-decoration: none;
    text-transform: uppercase;
    font: 10px var(--font-ui);
    letter-spacing: 0.14em;
  }
  .cta:hover {
    background: rgba(128, 102, 58, 0.13);
    border-color: #b89454;
  }
  @media (max-width: 980px) {
    .hardcore,
    .lunatic,
    .pair {
      grid-template-columns: 1fr;
    }
    .feature-art {
      display: none;
    }
    .hardcore,
    .vagrant {
      background-position: center;
    }
    .boaring {
      background-position: left center;
    }
    .hardcore {
      background-image:
        linear-gradient(180deg, rgba(9, 11, 12, 0.35) 0%, rgba(9, 11, 12, 0.88) 58%, #0b0d0e 100%),
        url('/art/challenges/hardcore.webp');
    }
    .boaring,
    .vagrant {
      background-image:
        linear-gradient(180deg, rgba(9, 11, 12, 0.25) 0%, rgba(9, 11, 12, 0.88) 62%, #0b0d0e 100%),
        var(--mob-art);
    }
    .boaring {
      --mob-art: url('/art/challenges/boaring.webp');
    }
    .vagrant {
      --mob-art: url('/art/challenges/vagrant.webp');
    }
  }
  @media (max-width: 600px) {
    .intro {
      min-height: 620px;
      padding-bottom: 80px;
    }
    .scroll-mark {
      display: none;
    }
    .intro,
    .list,
    .callout {
      padding-left: 22px;
      padding-right: 22px;
    }
    .feature-copy,
    .panel-copy,
    .lunatic-copy {
      padding: 28px 22px;
    }
  }
</style>
