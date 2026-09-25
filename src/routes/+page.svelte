<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import NewsTitle from '$lib/components/NewsTitle.svelte';
  import { fitOverflowText, titleFitChars } from '$lib/fitTitle';
  import { formatNewsDate, getNewsSummaries } from '$lib/news/posts';

  const news = getNewsSummaries();

  type HomeCard = {
    eyebrow: string;
    title: string;
    text: string;
    href: string;
    image: string;
    wide?: boolean;
    rowStart?: boolean;
    /** CSS background-position: 'center', '40% 20%', 'right top' */
    position?: string;
    /** CSS background-size: 'cover' fills; '140%' zooms in */
    size?: string;
  };

  const cardStyle = (card: HomeCard) =>
    `--card-image: url("${card.image}"); --card-position: ${card.position ?? 'center'}; --card-size: ${card.size ?? 'cover'}`;

  const showcaseCards: HomeCard[] = [
    {
      eyebrow: 'NEW PLAYABLE RACES',
      title: 'Goblins & High Elves',
      text: 'Two new races bring their own stories, classes and starting journeys to Azeroth.',
      href: '/new-races',
      image: '/art/features/races.webp',
      // position: '40% 20%',
      // size: '140%',
    },
    {
      eyebrow: 'WORLD BUILDING',
      title: 'Music & Sound',
      text: 'A richer soundscape that brings every familiar corner of Azeroth closer.',
      href: '/sound-design',
      image: '/art/features/music.webp'
    },
    {
      eyebrow: 'LORE & FACTIONS',
      title: 'Lore & Factions',
      text: 'Meet new factions, characters and quests that grow out of Vanilla lore.',
      href: '/new-factions-and-quests',
      image: '/art/features/lore.webp'
    },
    {
      eyebrow: 'WORLD DESIGN',
      title: 'Zones & Maps',
      text: 'Discover mysterious new lands while the original world stays at the center.',
      href: '/new-locations-and-maps',
      image: '/art/features/zones.webp'
    }
  ];

  const featureCards: HomeCard[] = [
    {
      eyebrow: 'CHARACTERS', title: 'New class & race combinations',
      text: 'Give familiar heroes new ways to succeed.', href: '/class-race-combinations', wide: true,
      image: '/art/features/class-race.webp'
    },
    {
      eyebrow: 'TRAVEL & INTERFACE', title: 'New transport',
      text: 'Reach the corners of Azeroth with new routes and flight paths.', href: '/additional-transport-routes',
      image: '/art/features/transport.webp'
    },
    {
      eyebrow: 'PROFESSION', title: 'Survival & Gardening',
      text: 'Camp, fish, grow crops and make the great outdoors your home.', href: '/survival-and-gardening',
      image: '/art/features/survival.webp',
      position: '58% 60%',
      size: 'auto 160%'
    },
    {
      eyebrow: 'PROFESSION', title: 'Jewelcrafting',
      text: 'Craft powerful gear and gems through Goldsmithing and Gemology.', href: '/jewelcrafting',
      image: '/art/features/jewelcrafting.webp',
      position: '82% 64%',
      size: 'auto 180%'
    },
    {
      eyebrow: 'ITEMIZATION', title: 'Items & Recipes', wide: true,
      text: 'Uncover lost recipes and new rewards throughout the world.', href: '/features/itemization',
      image: '/art/features/items.webp'
    },
    {
      eyebrow: 'PROGRESSION', title: 'Itemization',
      text: 'New dungeons, raids and improved items keep progression fresh for every build.', href: '/features/itemization',
      image: '/art/features/itemization.webp'
    },
    {
      eyebrow: 'ENDGAME', title: 'Raids & Dungeons',
      text: 'New foes and optional encounters for brave adventurers.', href: '/raids-and-dungeons', wide: true,
      image: '/art/features/raids.webp'
    },
    {
      eyebrow: 'PLAYER VS PLAYER', title: 'Arena & Battlegrounds',
      text: 'Earn fame and glory in new faction conflicts.', href: '/player-versus-player-content',
      image: '/art/features/arena.webp'
    },
    {
      eyebrow: 'GUILDS', title: 'Guild Vaults',
      text: 'Build a shared treasury with customizable tabs and access rules.', href: '/guild-banks',
      image: '/art/features/guild-vaults.webp'
    },
    {
      eyebrow: 'GUILDS', title: 'Guild Quarters',
      text: 'Give your guild a home in a tavern anywhere across Azeroth.', href: '/guild-quarters',
      image: '/art/features/guild-quarters.webp'
    },
    {
      eyebrow: 'CUSTOMIZATION', title: 'Character Customizations',
      text: 'New hair colors, skin paints and customization choices.', href: '/character-customizations',
      image: '/art/features/customization.webp',
      position: '73% 18%',
      size: 'auto 130%'
    },
    {
      eyebrow: 'COLLECTIONS', title: 'Pets & Mounts',
      text: 'Collect companions, steeds and shredders in one personal collection.', href: '/pets-and-mounts',
      image: '/art/features/pets.webp'
    },
    {
      eyebrow: 'ACHIEVEMENTS', title: "Player's Titles",
      text: 'Show off legendary accomplishments with titles worth earning.', href: '/achievement-titles',
      image: '/art/features/titles.webp'
    },
    {
      eyebrow: 'FASHION', title: 'Transmog',
      text: 'Complete repeatable quests and shape the look of your gear.', href: '/transmogrification',
      image: '/art/features/transmog.webp'
    },
    {
      eyebrow: 'CLASSIC+', title: 'Classic Raid & Dungeon Update',
      text: 'Optional new rooms, bosses, lore and rewards in familiar dungeons.', href: '/raids-and-dungeons#classic-updates', wide: true,
      image: '/art/features/zul.webp'
    },
    {
      eyebrow: 'QUALITY OF LIFE', title: 'User Interface',
      text: 'Useful improvements in the familiar Vanilla style, without extra add-ons.', href: '/client-interface-improvements',
      image: '/art/features/ui.webp'
    },
    {
      eyebrow: 'SEASONAL', title: 'Exciting Seasonal Events',
      text: 'From sunny beaches to cozy Winter Veil celebrations, there is always something to do.', href: '/seasonal-events',
      image: '/art/features/events.webp'
    },
    {
      eyebrow: 'CHALLENGES', title: 'Leveling Challenges',
      text: 'Prove yourself with optional rulesets that make every alt feel fresh.', href: '/challenges',
      image: '/art/features/challenges.webp'
    },
    {
      eyebrow: 'CLASS DESIGN', title: 'Class changes', wide: true,
      text: 'New and reworked talents help every playstyle stay viable.', href: '/features/classes',
      image: '/art/features/classes.webp'
    },
    {
      eyebrow: 'PROFESSION', title: 'Crafting Orders', wide: true, rowStart: true,
      text: 'Pay a trainer gold to craft for you. Hand in recipes and get enchants without the skill.', href: '/crafting-orders',
      image: '/art/crafting-orders/hero.webp',
      position: 'center top'
    },
    {
      eyebrow: 'PROFESSION', title: 'Material Storage', wide: true,
      text: 'Keep nearly unlimited crafting materials out of your bags from any banker.', href: '/material-storage',
      image: '/art/material-storage/hero.webp',
      position: 'center'
    }
  ];
</script>

<svelte:head>
  <title>Windrunner - Single-Player Server</title>
  <meta name="description" content="Windrunner is a single-player Vanilla+ server set in Azeroth." />
</svelte:head>

<div class="page-shell">
  <Header />

  <section class="hero">
    <div class="hero-bg"></div>
    <div class="hero-vignette"></div>
    <div class="hero-content">
      <img class="hero-logo" src="/art/brand/windrunner-logo.webp" alt="Windrunner" />
      <div class="hero-sub">SINGLE-PLAYER VANILLA+</div>
      <p>Made for a solo journey through the familiar world of old Azeroth, with new progression, class work and carefully integrated additions.</p>
      <div class="actions">
        <a class="primary" href="#features">Explore Features</a>
        <a href="/news">Development News</a>
      </div>
      <a
        class="download"
        href="https://github.com/WindrunnerWoW/windrunner-wow/releases/latest"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span class="download-icon" aria-hidden="true"></span>
        Download
      </a>
    </div>
    <div class="hero-ornament"></div>
  </section>

  <section class="intro" id="about">
    <div>
      <div class="kicker">A DIFFERENT PATH THROUGH AZEROTH</div>
      <h2>Existing content<br/><em>stays relevant.</em></h2>
    </div>
    <p>I’ve always loved the original Azeroth, so I wanted to keep its spirit at the heart of Windrunner. Building on Turtle Wow, I’m adding new content that sits alongside the familiar zones, quests, and classic progression. Every change I make is to help the journey feel fresh, fun, and truly rewarding.</p>
  </section>

  <section class="press-features">
    <a class="press-card survival-art" href="/survival-and-gardening">
      <div class="press-copy">
        <div class="kicker">NEW SECONDARY PROFESSION</div>
        <h3>Survival &<br/>Gardening.</h3>
        <p>Camp, fish, grow crops and make the great outdoors your home.</p>
      </div>
    </a>
    <a class="press-card jewel-art" href="/jewelcrafting">
      <div class="press-copy">
        <div class="kicker">NEW PRIMARY PROFESSION</div>
        <h3>Jewelcrafting.</h3>
        <p>Craft powerful gear and gems through Goldsmithing and Gemology.</p>
      </div>
    </a>
  </section>

  <section class="card-showcase" id="features">
    <div class="card-section-heading">
      <div>
        <div class="kicker">EXPLORE THE EXPANSION</div>
        <h2>Familiar world.<br /><em>New stories.</em></h2>
      </div>
      <p>Every addition is designed to sit alongside the content you already know and love.</p>
    </div>
    <div class="raven-card-grid showcase-grid">
      {#each showcaseCards as card, index}
        <a class="raven-card" href={card.href} style={cardStyle(card)}>
          <div class="raven-card-copy" style:--title-fit={titleFitChars(card.title)}>
            <span class="card-index">{String(index + 1).padStart(2, '0')}</span>
            <div class="kicker">{card.eyebrow}</div>
            <h3 use:fitOverflowText>{card.title}</h3>
            <p>{card.text}</p>
            <span class="card-link">Explore <b>→</b></span>
          </div>
        </a>
      {/each}
    </div>
  </section>

  <section class="card-showcase feature-catalog">
    <div class="card-section-heading">
      <div>
        <div class="kicker">VANILLA+ FEATURES</div>
        <h2>More to<br /><em>discover.</em></h2>
      </div>
      <p>New systems, rewards and adventures - all connected directly to their detailed pages.</p>
    </div>
    <div class="raven-card-grid catalog-grid">
      {#each featureCards as card, index}
        <a class:wide={card.wide} class:row-start={card.rowStart} class="raven-card" href={card.href} style={cardStyle(card)}>
          <div class="raven-card-copy" style:--title-fit={titleFitChars(card.title)}>
            <span class="card-index">{String(index + showcaseCards.length + 1).padStart(2, '0')}</span>
            <div class="kicker">{card.eyebrow}</div>
            <h3 use:fitOverflowText>{card.title}</h3>
            <p>{card.text}</p>
            <span class="card-link">Read more <b>→</b></span>
          </div>
        </a>
      {/each}
    </div>
  </section>

  <section class="news-section">
    <div class="news-heading">
      <div><div class="kicker">DEVELOPMENT JOURNAL</div><h2>Latest updates</h2></div>
      <a href="/news">View all news →</a>
    </div>
    <div class="news-grid">
      {#each news as item}
        <a class="news-card" href="/news/{item.slug}">
          {#if item.image}
            <div class="thumb">
              <img src={item.image} alt="" />
            </div>
          {/if}
          <div class="meta">{formatNewsDate(item.date)} · {item.category}</div>
          <h3><NewsTitle title={item.title} path={item.slug} /></h3>
          <p>{item.description}</p>
        </a>
      {/each}
    </div>
  </section>

  <section class="banner spec-art">
    <div class="kicker">CLASS DESIGN</div>
    <h2 class="special-title">Make your<br/><span>spec viable.</span></h2>
    <p>Explore reworked talents and plan builds with a dedicated talent calculator.</p>
    <a href="/talents">Open Talent Calculator</a>
  </section>

  <section class="two-cards">
    <div class="card customization-art">
      <div class="kicker">PATCH HISTORY</div>
      <h3>Every change,<br/>documented.</h3>
      <p>A clean running record of balance changes, content work and project milestones.</p>
      <a href="/changelog">Read changelog →</a>
    </div>
  </section>

  <Footer />
</div>

<style>
.hero{position:relative;min-height:980px;height:100vh;display:flex;align-items:center;justify-content:center;text-align:center;overflow:hidden;background:#07090a}
.hero-bg{position:absolute;inset:0;background:
linear-gradient(180deg,rgba(4,5,6,.08),rgba(4,5,6,.18) 42%,rgba(10,12,13,.55) 74%,#0a0c0d 100%),
radial-gradient(circle at 50% 34%,rgba(171,122,59,.22),transparent 23%),
url('/art/high-elves/hero.webp') center 28%/cover no-repeat;
filter:saturate(.8) brightness(.62) contrast(1.08);transform:scale(1.08)}
.hero-vignette{position:absolute;inset:0;background:
linear-gradient(180deg,transparent 48%,rgba(10,12,13,.42) 72%,#0a0c0d 100%),
linear-gradient(90deg,rgba(2,3,4,.75),transparent 23%,transparent 77%,rgba(2,3,4,.75)),
radial-gradient(ellipse at center,transparent 25%,rgba(4,6,7,.2) 55%,rgba(4,6,7,.86) 100%)}
.hero-content{position:relative;z-index:2;width:min(1000px,90vw);margin-top:-30px}
.hero-logo{display:block;width:min(760px,88vw);height:auto;margin:0 auto;filter:drop-shadow(0 8px 28px rgba(0,0,0,.7))}
.hero-sub{margin-top:20px;font-size:14px;letter-spacing:.42em;color:#aa8a51;text-transform:uppercase}
.hero p{max-width:690px;margin:34px auto 0;color:#b5ad9d;font-family:Georgia,serif;font-size:17px;line-height:1.9}
.actions{display:flex;justify-content:center;gap:30px;align-items:center;margin-top:42px}
.actions a,.banner a{color:#d7c8a7;text-decoration:none;text-transform:uppercase;letter-spacing:.16em;font-size:10px}
.actions .primary{border:1px solid #80663a;padding:16px 24px;background:rgba(8,8,8,.34);box-shadow:inset 0 0 20px rgba(117,88,42,.08)}
.download{display:inline-flex;align-items:center;justify-content:center;gap:12px;margin-top:28px;padding:18px 34px;border:1px solid #f0d08a;background:linear-gradient(180deg,#e8c478 0%,#c89a45 48%,#9a6f28 100%);color:#1a140b;text-decoration:none;text-transform:uppercase;letter-spacing:.2em;font:700 12px/1 var(--font-ui);box-shadow:0 0 0 1px #5c4318,0 10px 28px rgba(0,0,0,.45),0 0 42px rgba(210,164,72,.42),inset 0 1px 0 rgba(255,240,200,.55);text-shadow:0 1px 0 rgba(255,236,190,.35)}
.download:hover{color:#120e08;border-color:#ffe7a8;transform:translateY(-2px);box-shadow:0 0 0 1px #6a4e1c,0 14px 32px rgba(0,0,0,.5),0 0 58px rgba(232,190,90,.58),inset 0 1px 0 rgba(255,246,214,.7)}
.download-icon{width:13px;height:13px;flex:none;background:currentColor;clip-path:polygon(35% 0,65% 0,65% 46%,100% 46%,50% 100%,0 46%,35% 46%)}
.hero-ornament{position:absolute;z-index:3;bottom:34px;width:min(760px,74vw);height:34px;background:
linear-gradient(90deg,transparent,#6f5732 22%,#aa8b50 50%,#6f5732 78%,transparent) center/100% 1px no-repeat}
.hero-ornament:before{content:"◆";position:absolute;left:50%;top:6px;transform:translateX(-50%) rotate(45deg);color:#9b7a43;font-size:11px}

.intro{display:grid;grid-template-columns:1.1fr 1fr;gap:80px;position:relative;z-index:2;margin-top:-110px;padding:200px clamp(24px,8vw,130px) 130px;background:
linear-gradient(180deg,transparent 0%,#0a0c0d 38%),
radial-gradient(circle at 18% 42%,rgba(93,70,38,.09),transparent 24%)}
.intro h2{font-size:clamp(40px,6vw,78px);line-height:.92;margin:12px 0;color:#ded3bb;text-transform:uppercase;letter-spacing:-.03em}.intro h2 em{font-style:normal;color:#9d7c45}
.intro p{font-family:Georgia,serif;font-size:18px;line-height:1.9;color:#938c7f;align-self:end}

.card a,.news-heading a{display:inline-block;margin-top:24px;color:#b99554;text-decoration:none;text-transform:uppercase;letter-spacing:.14em;font-size:10px}

.press-features{display:grid;grid-template-columns:1fr 1fr;background:#090b0c;border-bottom:1px solid #17130f}
.press-card{min-height:500px;position:relative;display:flex;align-items:end;padding:65px clamp(28px,5vw,72px);overflow:hidden;background-position:center;background-size:cover;text-decoration:none}
.press-card:before{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(5,7,8,.05),rgba(5,7,8,.94)),linear-gradient(90deg,rgba(5,7,8,.65),transparent 72%)}
.press-copy{position:relative;z-index:1;max-width:430px}
.press-copy .kicker{margin-bottom:16px}
.press-copy h3{font-size:clamp(34px,4vw,56px);line-height:.94;text-transform:uppercase;color:#dfd3bb;margin:0 0 16px;letter-spacing:-.025em}
.press-copy p{font-family:Georgia,serif;color:#aaa192;font-size:18px;line-height:1.75}
.survival-art{background-image:url('/art/features/survival.webp');background-position:center;background-size:cover}
.jewel-art{background-image:url('/art/features/jewelcrafting.webp');background-position:center;background-size:cover}

.news-section{padding:130px clamp(24px,8vw,130px);background:#090b0c}
.news-heading{display:flex;justify-content:space-between;align-items:end;margin-bottom:48px}
.news-heading h2{font-size:clamp(38px,5vw,62px);text-transform:uppercase;color:#ddd1b8;margin:8px 0;letter-spacing:-.025em}
.news-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:28px}
.news-card{display:block;border-top:1px solid #342b1d;padding-top:16px;color:inherit;text-decoration:none}
.news-card:hover h3{color:#e6d8b8}
.thumb{aspect-ratio:16/10;overflow:hidden;background:#14110d;border:1px solid #342b1d}
.thumb img{display:block;width:100%;height:100%;object-fit:cover}
.meta{font-size:9px;letter-spacing:.14em;color:#8e7141;margin-top:18px;text-transform:uppercase}
.news-grid h3{font-size:21px;color:#d2c7af;margin:10px 0;text-transform:uppercase;line-height:1.2}.news-grid p{font-family:Georgia,serif;color:#858076;line-height:1.65;font-size:14px}

.card-showcase{padding:130px clamp(24px,8vw,130px);background:#080a0b;border-top:1px solid #17130f;border-bottom:1px solid #17130f}
.card-section-heading{display:flex;justify-content:space-between;align-items:end;gap:70px;margin-bottom:48px}
.card-section-heading h2{font-size:clamp(44px,6vw,80px);line-height:.88;text-transform:uppercase;color:#ddd1b8;margin:13px 0 0;letter-spacing:-.04em}
.card-section-heading h2 em{font-style:normal;color:#a78348}
.card-section-heading>p{max-width:410px;margin:0 0 5px;color:#928a7c;font:16px/1.85 Georgia,serif}
.raven-card-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}
.catalog-grid{grid-template-columns:repeat(4,minmax(0,1fr))}
.raven-card{position:relative;display:flex;align-items:end;min-width:0;min-height:380px;overflow:hidden;border:1px solid #41331e;background-color:#111415;background-image:linear-gradient(180deg,rgba(5,7,8,.05) 22%,rgba(5,7,8,.91) 100%),linear-gradient(90deg,rgba(5,7,8,.63),transparent 80%),var(--card-image);background-position:center,center,var(--card-position, center);background-size:cover,cover,var(--card-size, cover);background-repeat:no-repeat;color:#ded2b6;text-decoration:none;transition:border-color .25s,transform .25s,filter .25s}
.raven-card:before{content:"";position:absolute;inset:8px;border:1px solid rgba(170,133,70,.27);pointer-events:none;transition:border-color .25s}
.raven-card:after{content:"";position:absolute;left:0;bottom:0;width:54px;height:54px;border-left:2px solid #a78348;border-bottom:2px solid #a78348;opacity:.7;pointer-events:none}
.raven-card:hover{border-color:#ae8646;transform:translateY(-4px);filter:saturate(1.08)}
.raven-card:hover:before{border-color:rgba(207,169,94,.65)}
.raven-card-copy{position:relative;z-index:1;width:100%;padding:34px 30px 29px;container-type:inline-size}
.card-index{display:block;margin-bottom:16px;color:#99743d;font:11px/1 var(--font-ui);letter-spacing:.18em}
.raven-card-copy .kicker{margin-bottom:16px}
.raven-card h3{max-width:100%;margin:0 0 16px;color:#dfd3b8;--title-min:16px;font-size:clamp(var(--title-min),min(max(3vw,30px),calc(100cqi / (var(--title-fit, 8) * .72))),47px);line-height:.94;text-transform:uppercase;letter-spacing:-.03em}
.raven-card p{max-width:390px;margin:0;color:#b0a696;font:16px/1.7 Georgia,serif}
.card-link{display:inline-block;margin-top:22px;color:#c6a366;font:12px/1 var(--font-ui);letter-spacing:.13em;text-transform:uppercase}
.card-link b{margin-left:6px;font-size:15px;font-weight:400}
@media(min-width:901px){
  .catalog-grid .raven-card.wide{grid-column:span 2}
  .catalog-grid .raven-card.row-start{grid-column:1 / span 2}
}
.showcase-grid .raven-card{min-height:420px}
@media(min-width:901px){.showcase-grid .raven-card:last-child{grid-column:2}}
.feature-catalog{background:#0a0c0d}
.feature-catalog .raven-card{min-height:340px}

.banner{padding:165px clamp(24px,8vw,130px);position:relative;overflow:hidden;background:#0d1011;border-top:1px solid #17130f;border-bottom:1px solid #17130f}
.banner:before{content:"";position:absolute;inset:0;background:
linear-gradient(90deg,rgba(7,9,10,.98) 0%,rgba(7,9,10,.76) 43%,rgba(7,9,10,.18) 100%),
url('/art/features/classes.webp') center/cover no-repeat;opacity:.94}
.banner>*{position:relative;z-index:1}
.banner h2{font-family:var(--font-heading);font-size:clamp(52px,8vw,112px);line-height:.82;text-transform:uppercase;color:#ddd2bb;margin:20px 0;letter-spacing:-.045em}
.banner h2 span{font-family:var(--font-display);color:#a78348}.banner p{font-family:Georgia,serif;max-width:520px;line-height:1.85;color:#9b9384}

.two-cards{display:block}
.card{min-height:520px;padding:90px clamp(30px,6vw,90px);display:flex;flex-direction:column;justify-content:end;position:relative;overflow:hidden;background:#0e1213}
.card>*{position:relative;z-index:1}.card:before{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(7,9,10,.1),rgba(7,9,10,.94)),linear-gradient(90deg,rgba(7,9,10,.7),transparent 78%);z-index:0}
.customization-art{background:url('/art/features/customization.webp') 73% 20%/cover no-repeat}
.card h3{font-size:clamp(36px,5vw,64px);line-height:.94;text-transform:uppercase;color:#d8ccb5;margin:12px 0;letter-spacing:-.025em}
.card p{font-family:Georgia,serif;max-width:460px;color:#91897c;line-height:1.8}

@media(max-width:900px){
  .hero{min-height:100dvh;height:100dvh}.hero-bg{background-position:58% center}.hero-content{margin-top:20px}
  .intro,.press-features{grid-template-columns:1fr}
  .news-grid{grid-template-columns:1fr}.intro{gap:30px}.news-heading{display:block}
  .card-section-heading{display:block;margin-bottom:32px}.card-section-heading>p{margin-top:25px}.raven-card-grid,.catalog-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
}
@media(max-width:520px){.actions{gap:17px;flex-wrap:wrap}.hero p{font-size:16px}.raven-card-grid,.catalog-grid{grid-template-columns:minmax(0,1fr)}.showcase-grid .raven-card,.feature-catalog .raven-card{min-height:350px}}
</style>
