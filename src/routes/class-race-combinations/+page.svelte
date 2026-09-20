<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';

  const combos = [
    {
      race: 'Tauren',
      klass: 'Priest',
      faction: 'Horde',
      raceIcon: '/art/class-race/race-tauren-male.png',
      classIcon: '/art/classes/priest.png',
      image: '/art/class-race/tauren-priest.webp',
      copy:
        "Guided by the gaze of the celestial siblings, the children of the Earthmother have faced many hardships while still staying true to their deities. Their efforts to rekindle the ancestral bond between the celestial and the mortal have granted them the boon of the Three Siblings. Yet while Mu'sha and An'she seek to bless those of good will, the younger sibling Lo'sho is known to answer any who seek his blessing, regardless of intent. And so the fate of the Horde twists under the gaze of the Earthmother, as Tauren across the lands seek to represent and spread their cultural worship, either through acts of hope and order or dismay and chaos."
    },
    {
      race: 'Dwarf',
      klass: 'Warlock',
      faction: 'Alliance',
      raceIcon: '/art/class-race/race-dwarf-female.png',
      classIcon: '/art/classes/warlock.png',
      image: '/art/class-race/dwarf-warlock.webp',
      copy:
        "Power is alluring, even more so if it is forbidden. The noble Bronzebeard dwarves are no exception to that. In the wake of the gnomes' refuge in Ironforge, some of their more morally flexible members have established a secret coven within the mountain city, practicing the shadowy arts of demonology away from the gaze of the simple folk. Initially cautious, they have accepted many eager dwarves into their ranks, teaching them the heretical summoning of demons and subservience to their dark masters."
    },
    {
      race: 'Orc',
      klass: 'Mage',
      faction: 'Horde',
      raceIcon: '/art/class-race/race-orc-male.png',
      classIcon: '/art/classes/mage.png',
      image: '/art/class-race/orc-mage.webp',
      copy:
        'While orcs typically lean towards their affinity for elemental magic, their time on Azeroth has brought them valuable teachings from the ogre and troll mages. Today, a fresh generation of orcish spellcasters diligently delves into the ancient tomes, meticulously unearthing the long-buried arcane secrets.'
    },
    {
      race: 'Dwarf',
      klass: 'Mage',
      faction: 'Alliance',
      raceIcon: '/art/class-race/race-dwarf-male.png',
      classIcon: '/art/classes/mage.png',
      image: '/art/class-race/dwarf-mage.webp',
      copy:
        'Dwarves possess an inherent affinity for Arcane magic, a power further fortified by their lineage traced back to the Titans. In a remarkable revival, the Azurestone Order, a guild of dwarves exceptionally adept in the arcane arts, has been reestablished. Now, it falls upon the shoulders of these skilled dwarven mages to rekindle the Order’s former strength and grandeur.'
    },
    {
      race: 'Undead',
      klass: 'Hunter',
      faction: 'Horde',
      raceIcon: '/art/class-race/race-undead-male.png',
      classIcon: '/art/classes/hunter.png',
      image: '/art/class-race/undead-hunter.webp',
      copy:
        'Countless Forsaken have clung to the memories of their former lives, particularly those who once roamed the lush forests of Lordaeron as skilled hunters. Guided and mentored by the enigmatic Dark Rangers, they have embarked on a journey to rekindle their prowess as marksmen and masterful trappers. These reawakened skills now find a new purpose as they ardently dedicate themselves to the cause of the Dark Lady.'
    },
    {
      race: 'Gnome',
      klass: 'Hunter',
      faction: 'Alliance',
      raceIcon: '/art/class-race/race-gnome-female.png',
      classIcon: '/art/classes/hunter.png',
      image: '/art/class-race/gnome-hunter.webp',
      copy:
        'The ingenious gnomes of Gnomeregan stand as masterful inventors, skilled mechanics, and adept constructors. Their expertise with firearms and intricate gadgets has long positioned them as outstanding marksmen. However, with the invaluable support of their Dwarven allies, they have further solidified their hunting prowess. Today, they hunt amidst the rolling hills of Dun Morogh, not only showcasing their strength but also providing sustenance and vital resources for the refugees of Gnomeregan.'
    },
    {
      race: 'Troll',
      klass: 'Warlock',
      faction: 'Horde',
      raceIcon: '/art/class-race/race-troll-female.png',
      classIcon: '/art/classes/warlock.png',
      image: '/art/class-race/troll-warlock.webp',
      copy:
        'The reunion of the forest trolls and the Darkspear tribes has resulted in a fusion of cultures. As a consequence, the prominence of dark magic has increased within troll society, offering new avenues for those who crave power. The audacious tusken kin, willing to pay the price, are now prepared to venture into the wider world. The question remains: Will you rise above all others, or will your insatiable hunger for power lead to your downfall?'
    },
    {
      race: 'Human',
      klass: 'Hunter',
      faction: 'Alliance',
      raceIcon: '/art/class-race/race-human-male.png',
      classIcon: '/art/classes/hunter.png',
      image: '/art/class-race/human-hunter.webp',
      copy:
        'Many humans have been training vigorously with their newfound High Elven allies ever since they joined forces. They have been forging strong bonds with nature and honing their marksmanship skills. Finally, the first line of Human Hunters is now fully prepared and ready to face whatever challenges the world may present.'
    }
  ];

  let lightbox: { src: string; alt: string } | null = null;

  function openShot(src: string, alt: string) {
    lightbox = { src, alt };
  }

  function closeShot() {
    lightbox = null;
  }

  function portal(node: HTMLElement) {
    document.body.appendChild(node);
    return {
      destroy() {
        node.remove();
      }
    };
  }
</script>

<svelte:head>
  <title>Class & Race Combinations - Windrunner</title>
  <meta
    name="description"
    content="New class and race combinations for Windrunner: Tauren Priests, Dwarf Warlocks, Orc Mages, and more."
  />
</svelte:head>

<svelte:window on:keydown={(e) => e.key === 'Escape' && closeShot()} />

<Header />
<main>
  <section
    class="hero"
    style="--hero-image: url('/art/features/class-race.webp'); --hero-position: center; --hero-size: cover"
  >
    <div class="content">
      <div class="kicker">NEW CLASS & RACE COMBINATIONS</div>
      <h1>Unprecedented Combinations</h1>
      <p>
        As many new dangers show themselves, new heroes rise to take on the challenge. Orc mages trained by their other kin in the arts of the
        arcane, dwarf mages reconnecting with their titanic past, undead hunters rekindling their sharp senses, gnome hunters bending mighty
        beasts to their will - it is truly the time of adventurers.
      </p>
    </div>
  </section>

  <section class="gallery">
    <div class="section-heading">
      <div>
        <div class="kicker">EIGHT NEW PATHS</div>
        <h2>Heroes find<br /><em>new ways.</em></h2>
      </div>
      <p>Each combination has its own lore and in-game look. Tap a screenshot to enlarge it.</p>
    </div>

    <div class="combo-grid">
      {#each combos as combo}
        <article class="combo">
          <header>
            <div>
              <div class="kicker">{combo.faction}</div>
              <h3>
                <span class="display-font">{combo.race}</span>
                <span class="dot">•</span>
                <span class="display-font">{combo.klass}</span>
              </h3>
            </div>
            <div class="icons" aria-hidden="true">
              <img src={combo.classIcon} alt="" />
              <img src={combo.raceIcon} alt="" />
            </div>
          </header>
          <p>{combo.copy}</p>
          <button
            type="button"
            class="shot"
            aria-label="Enlarge {combo.race} {combo.klass} screenshot"
            on:click={() => openShot(combo.image, `${combo.race} ${combo.klass}`)}
          >
            <img src={combo.image} alt="{combo.race} {combo.klass} preview" />
          </button>
        </article>
      {/each}
    </div>
  </section>

  <section class="detail">
    <div>
      <div class="kicker">CLASS DESIGN</div>
      <h2>Give familiar heroes new ways to succeed.</h2>
    </div>
    <div>
      <p>
        These combinations sit alongside Windrunner’s class work - the same talent trees, itemization, and world you already play, with more
        room to choose how your character walks into it.
      </p>
      <a class="cta" href="/features/classes">EXPLORE CLASS DESIGN →</a>
    </div>
  </section>
</main>
<Footer />

{#if lightbox}
  <div class="lightbox" use:portal on:click={closeShot} role="dialog" aria-modal="true" tabindex="-1">
    <img src={lightbox.src} alt={lightbox.alt} />
  </div>
{/if}

<style>
  .gallery {
    padding: 90px clamp(24px, 8vw, 130px) 40px;
    background: #080a0b;
    border-top: 1px solid #17130f;
  }
  .section-heading {
    display: flex;
    justify-content: space-between;
    align-items: end;
    gap: 70px;
    margin-bottom: 50px;
  }
  .section-heading h2 {
    font-size: clamp(42px, 6vw, 72px);
    line-height: 0.88;
    color: #ddd1b8;
    text-transform: uppercase;
    margin: 13px 0 0;
  }
  .section-heading em {
    font-style: normal;
    color: #a78348;
  }
  .section-heading p {
    color: #968e82;
    font: 16px / 1.75 var(--font-body);
    margin: 0;
    max-width: 420px;
  }
  .combo-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 22px;
  }
  .combo {
    display: flex;
    flex-direction: column;
    padding: 28px 26px 22px;
    border: 1px solid #3a3124;
    background:
      linear-gradient(180deg, rgba(28, 20, 12, 0.55), rgba(12, 13, 14, 0.96)),
      #0e1112;
  }
  .combo header {
    display: flex;
    justify-content: space-between;
    align-items: start;
    gap: 16px;
    margin-bottom: 16px;
  }
  .combo h3 {
    margin: 8px 0 0;
    color: #ded3bb;
    font-family: var(--font-heading);
    font-size: 28px;
    font-weight: 400;
    letter-spacing: 0.02em;
    text-transform: none;
  }
  .combo h3 .display-font {
    font-size: clamp(32px, 3vw, 40px);
    color: #c9a45a;
  }
  .combo .dot {
    margin: 0 8px;
    color: #8a6a32;
  }
  .icons {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
  }
  .icons img {
    width: 42px;
    height: 42px;
    object-fit: contain;
    filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.5));
  }
  .combo > p {
    flex: 1;
    margin: 0 0 22px;
    color: #b1a898;
    font: 16px / 1.8 var(--font-body);
  }
  .shot {
    margin: 0;
    padding: 8px;
    border: 1px solid #4c3b23;
    background: #11100d;
    cursor: zoom-in;
    overflow: hidden;
  }
  .shot img {
    display: block;
    width: 100%;
    height: 240px;
    object-fit: cover;
    object-position: center 38%;
    transition: 0.35s;
  }
  .shot:hover img {
    transform: scale(1.03);
    filter: brightness(1.08);
  }
  .detail p {
    margin: 0;
    color: #9c9487;
    font: 17px / 1.9 var(--font-body);
  }
  .lightbox {
    position: fixed;
    inset: 0;
    z-index: 80;
    display: grid;
    place-items: center;
    padding: 40px;
    background: rgba(5, 7, 8, 0.88);
    cursor: zoom-out;
  }
  .lightbox img {
    max-width: min(1200px, 92vw);
    max-height: 90vh;
    width: auto;
    height: auto;
    border: 1px solid #6d5328;
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.55);
  }
  @media (max-width: 900px) {
    .section-heading {
      display: block;
      margin-bottom: 32px;
    }
    .section-heading p {
      margin-top: 25px;
    }
    .combo-grid {
      grid-template-columns: 1fr;
    }
  }
  @media (max-width: 600px) {
    .gallery {
      padding: 70px 22px 28px;
    }
    .combo {
      padding: 22px 18px 16px;
    }
    .shot img {
      height: 180px;
    }
  }
</style>
