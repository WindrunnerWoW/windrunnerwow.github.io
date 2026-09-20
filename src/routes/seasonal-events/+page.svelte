<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';

  const winterQuests = [
    {
      title: 'Icy Menace I',
      copy: 'Help Tinsel Lost-Gloves take revenge upon the thieves who have stolen his favorite gloves, and in turn he will reward you with a companion of the valley, a small yet brave Miniature Winter Veil Tree, who wishes to see the world, a most adventurous duo, you and he. To aid you in your future Tinsel shall let his trusted pal Hedwig, a bird of the skies and a hunter of the night accompany you in your travels!'
    },
    {
      title: 'Grizzlore wants Thunder',
      copy: 'Hailing from the far off lands of Kalimdor, the Furbolgs are no strangers to a good drink, yet it seems the Thunderbrew has run dry and the Grizzlore is getting mad! Acquire Thunderbrew Lager from Grombooze Thunderbrew at his camp in Westfall, and be rewarded with an illusionary secret of the bear folk of Kalimdor, how to look like one!'
    },
    {
      title: 'Snowball Wars: Episode I',
      copy: 'It is a period of civil war! Courageous snowball throwers, striking from the shadows have won the first victories against their counterparts! Partake in this endless battle, and earn for yourself a kit of disguising tools, with which you just may be able to save yourself from a certain snowball to the face!'
    },
    {
      title: 'Snowball Wars: Episode II',
      copy: 'War! The merry times of Winter Veil are crumbling under attacks by the ruthless adventurers! There are heroes on all sides, and snowballs are everywhere! Join in the fray, and unleash these freezing projectiles upon the many classes, be rewarded with a box of Winter goodies!'
    },
    {
      title: 'Peace Comes at a Price',
      copy: 'How quickly they grow up… you may even forget that they are monstrous frost demons. Snowball has gone on a rampage in the valley, and is scaring away all the other animals. It’s time to put him to sleep! Defeat the ferocious wolf of Dun Morogh, and be rewarded with a bag to hold all the presents that you will be carrying around! I hear it has 20 slots!'
    },
    {
      title: 'Jolly Holly Dances Prolly',
      copy: 'Holly Tallhair is a regular at many fine gatherings of drinkers and party goers, yet she may have bitten off more than she can chew. The Feast of Winter Veil is the greatest excuse to partake in this alongside her, grab yourself a drink or ten, and dance away the night with her. She may just be willing to give up some of her secret stash of Sparkling Booze in return!'
    },
    {
      title: 'Bracing the Inevitable',
      copy: 'The times of Winter Veil are always a warm gathering of friends and the wildlife around you, except for the poor Moonkin. The tiny hatchlings underdeveloped feathers are not enough to shield them from the bitter cold! Procure a warm drink, the festive Egg Nog should do! And spread it around among the hatchlings, this should be enough of a good deed to earn yourself a box of Winter goodies!'
    }
  ];

  const raceFeatures = [
    'Complete repeatable quests and get rewards, maybe even a mount!',
    'Get your driving licence and drive a single race against time.',
    'Queue for the competition on the main racetrack and win over your friends!',
    'Stun, Blink, Speed Boosters, Cloaking... and of course, Seat Belts!',
    'Hot Pants are still present.',
    'Definitely Non-explosive Sheeps (who got this stupid idea to put’em on the racetrack!?)'
  ];

  let lightbox: string | null = null;

  function openShot(src: string) {
    lightbox = src;
  }

  function closeShot() {
    lightbox = null;
  }
</script>

<svelte:head>
  <title>Seasonal Events - Windrunner</title>
  <meta
    name="description"
    content="Winter Veil Vale, the Steamwheedle Beach Experience, and Mirage Raceway keep the world moving all year."
  />
</svelte:head>

<svelte:window on:keydown={(e) => e.key === 'Escape' && closeShot()} />

<Header />
<main class="events-page">
  <section class="hero" style="--hero-image: url('/art/events/winter.webp'); --hero-position: center; --hero-size: cover">
    <div class="content">
      <div class="kicker">SEASONAL EVENTS</div>
      <h1>Exciting Seasonal Events</h1>
      <p>
        Whether you like spending summer days on the beach parties in Tanaris or enjoying cold yet cozy holidays in
        Winter Veil Vale, there is always something to do for everyone!
      </p>
    </div>
  </section>

  <section class="detail">
    <div>
      <div class="kicker">THE CALENDAR</div>
      <h2>Three reasons<br /><em>to return.</em></h2>
    </div>
    <div>
      <ul>
        <li><a href="#winter-veil">Winter Veil Vale</a> - Holiday quests, Snowball Wars, unique rewards</li>
        <li><a href="#beach">Steamwheedle Beach Experience</a> - Open year-round at Tanaris Coast</li>
        <li><a href="#mirage-raceway">Mirage Raceway</a> - Rocket races in the Shimmering Flats</li>
      </ul>
    </div>
  </section>

  <section id="winter-veil" class="event-block">
    <div class="event-copy">
      <div class="kicker">WINTER VEIL VALE</div>
      <h2 class="display-font">Winter Veil Vale</h2>
      <p>
        Ha, ha! Youngest traveler, and boldest storyteller, have you heard?! My, as of late it has been everyone's word!
        The vale, the vale! The greatest of shows, where all are friends, and none are foes! Hear of this place, where
        snow is thrown at your face. As fires burn in the night, and warm stars shine with an enchanting light. Hear of
        this place where all do go, many a staut tauren, a bold dwarf, a curious elf, but where are you though? So come,
        and be swift, before it vanishes like a rift, in the land of Winter Veil Vale, we are waiting for you, with Egg
        Nog and many presents in hand! Come, come, there is snowmen and drink, good company, and even presents that come
        in pink! So what do you wait? Set out on this journey before it's too late!
      </p>
    </div>
    <div class="gallery three">
      <button type="button" on:click={() => openShot('/art/events/winter.webp')}>
        <img src="/art/events/winter.webp" alt="Winter Veil Vale at night" />
      </button>
      <button type="button" on:click={() => openShot('/art/events/winterveil-2.webp')}>
        <img src="/art/events/winterveil-2.webp" alt="Celebrations in Winter Veil Vale" />
      </button>
      <button type="button" on:click={() => openShot('/art/events/winterveil-3.webp')}>
        <img src="/art/events/winterveil-3.webp" alt="Snowy gathering in Winter Veil Vale" />
      </button>
    </div>
    <button type="button" class="wide-shot" on:click={() => openShot('/art/events/winterveil-4.webp')}>
      <img src="/art/events/winterveil-4.webp" alt="A wide view of Winter Veil Vale" />
    </button>
    <div class="quests">
      {#each winterQuests as quest}
        <article>
          <h3>{quest.title}</h3>
          <p>{quest.copy}</p>
        </article>
      {/each}
    </div>
  </section>

  <section id="beach" class="event-block">
    <div class="event-copy">
      <div class="kicker">TANARIS COAST</div>
      <h2 class="display-font">Steamwheedle Beach Experience</h2>
      <p>
        Ahoy, mateys! We present to you the Steamwheedle Beach Experience! Open year round is the Steamwheedle Beach
        Experience at the Tanaris Coast where one can experience the tropical beach life. With the opening of the site
        we also announce a limited special event: the Super Lovey Beach Event.
      </p>
      <p>
        With Love is in the Air arriving, one has to ask, what better way to spend the time with a loved one than at the
        beach? As a special present for future guests this flyer will serve as a present granting one free Ice Cream at
        the beach!
      </p>
      <h3>So what are you waiting for?</h3>
      <p>
        Whether you're coming alone or with a love interest, the time is ripe to experience the Steamwheedle Beach
        Experience with our Super Lovey Beach Event!
      </p>
    </div>
    <div class="gallery three">
      <button type="button" on:click={() => openShot('/art/events/steam-1.webp')}>
        <img src="/art/events/steam-1.webp" alt="Steamwheedle Beach Experience" />
      </button>
      <button type="button" on:click={() => openShot('/art/events/steam-2.webp')}>
        <img src="/art/events/steam-2.webp" alt="Tanaris Coast beach life" />
      </button>
      <button type="button" on:click={() => openShot('/art/events/steam-3.webp')}>
        <img src="/art/events/steam-3.webp" alt="Super Lovey Beach Event" />
      </button>
    </div>
  </section>

  <section id="mirage-raceway" class="event-block">
    <div class="event-copy">
      <div class="kicker">SHIMMERING FLATS</div>
      <h2 class="display-font">Mirage Raceway</h2>
      <p>
        The Mirage Raceway was a race track, deep within the dry lake bed known as the Shimmering Flats. After the end
        of the Third War, both the goblins and gnomes decided that the large alkali desert known as the Shimmering Flats
        near Thousand Needles would be a perfect place to test their new rocket designs. The natural animosity between
        the two engineering teams created the perfect opportunity for races to see once and for all whether Goblin
        Engineering or Gnome Engineering was superior.
      </p>
      <p>
        However, Mirage Raceway was never fully implemented as a gameplay event. On the official Blizzard servers you
        can see gnome and goblin cars racing, but they’re driven by NPCs.
      </p>
      <h3>What’s new</h3>
      <p>
        Now, on Windrunner, it’s possible to participate to the real race! Grab these car keys, find an opponent from
        your or the opposite faction and floor the gas pedal!
      </p>
      <h3>Features</h3>
      <ul>
        {#each raceFeatures as feature}
          <li>{feature}</li>
        {/each}
      </ul>
      <p>
        Find Fara Boltbreaker in Stormwind or Orgrimmar and speak to this sneaky journalist to know what’s going on.
      </p>
    </div>
    <div class="gallery three">
      <button type="button" on:click={() => openShot('/art/events/race-1.jpg')}>
        <img src="/art/events/race-1.jpg" alt="Mirage Raceway" />
      </button>
      <button type="button" on:click={() => openShot('/art/events/race-2.webp')}>
        <img src="/art/events/race-2.webp" alt="Rocket racing in the Shimmering Flats" />
      </button>
      <button type="button" on:click={() => openShot('/art/events/race-3.webp')}>
        <img src="/art/events/race-3.webp" alt="Gnome and goblin racers" />
      </button>
    </div>
  </section>
</main>
<Footer />

{#if lightbox}
  <div class="lightbox" role="dialog" aria-modal="true" tabindex="-1" on:click={closeShot} on:keydown={(e) => e.key === 'Enter' && closeShot()}>
    <img src={lightbox} alt="" />
  </div>
{/if}

<style>
  .events-page {
    background: #090b0c;
  }
  .event-block {
    scroll-margin-top: 96px;
    padding: 0 clamp(24px, 8vw, 130px) 96px;
    border-top: 1px solid #17130f;
  }
  .event-copy {
    max-width: 920px;
    padding: 88px 0 36px;
  }
  .event-copy .kicker {
    margin: 0 0 18px;
  }
  .event-copy h2 {
    font-size: clamp(42px, 6vw, 78px);
    line-height: 1.15;
    color: #e2d5b8;
    margin: 0 0 28px;
    padding-top: 0.18em;
  }
  .event-copy h3 {
    font-size: 22px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: #d9cdb5;
    margin: 36px 0 14px;
  }
  .event-copy p,
  .event-copy li {
    color: #a39a8c;
    font: 17px/1.8 var(--font-body);
  }
  .event-copy ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .event-copy li {
    position: relative;
    padding: 0 0 12px 22px;
  }
  .event-copy li:before {
    content: '◆';
    position: absolute;
    left: 0;
    top: 4px;
    color: #a78348;
    font-size: 9px;
  }
  .gallery {
    display: grid;
    gap: 12px;
    margin-bottom: 12px;
  }
  .gallery.three {
    grid-template-columns: repeat(3, 1fr);
  }
  .gallery button,
  .wide-shot {
    display: block;
    width: 100%;
    padding: 0;
    border: 1px solid #332b1d;
    background: #0d1011;
    cursor: zoom-in;
  }
  .gallery img,
  .wide-shot img {
    display: block;
    width: 100%;
    height: 220px;
    object-fit: cover;
  }
  .wide-shot {
    margin-bottom: 40px;
  }
  .wide-shot img {
    height: 360px;
  }
  .quests {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 28px;
  }
  .quests article {
    padding: 32px 28px;
    border: 1px solid #3a3124;
    background: linear-gradient(180deg, #14110d, #0d0c0a);
  }
  .quests h3 {
    margin: 0 0 12px;
    font-size: 22px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: #d9cdb5;
  }
  .quests p {
    margin: 0;
    color: #9c9487;
    font: 16px/1.75 var(--font-body);
  }
  .detail li a {
    color: #b99554;
  }
  .lightbox {
    position: fixed;
    inset: 0;
    z-index: 80;
    display: grid;
    place-items: center;
    padding: 40px;
    background: rgba(5, 7, 8, 0.92);
    cursor: zoom-out;
  }
  .lightbox img {
    max-width: min(1400px, 100%);
    max-height: 90vh;
    object-fit: contain;
    border: 1px solid #3a3325;
  }
  @media (max-width: 800px) {
    .gallery.three,
    .quests {
      grid-template-columns: 1fr;
    }
    .gallery img,
    .wide-shot img {
      height: 200px;
    }
  }
</style>
