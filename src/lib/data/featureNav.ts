import { art } from './art';
import type { Feature } from './features';

export type FeatureCategory = {
  slug: string;
  href: string;
  title: string;
  eyebrow: string;
  heading: string;
  intro: string;
  listingKicker?: string;
  heroImage: string;
  links: Feature[];
};

export const featureCategories: FeatureCategory[] = [
  {
    slug: 'characters',
    href: '/features/characters',
    title: 'Characters',
    eyebrow: 'CHARACTERS',
    heading: 'Who you play, and how they look.',
    intro:
      'New races, extra class combinations, and ways to show off the journey - without leaving the Vanilla identity behind.',
    listingKicker: 'CHARACTERS',
    heroImage: art.races,

    links: [
      {
        slug: 'high-elves',
        href: '/high-elves',
        eyebrow: 'ALLIANCE',
        title: 'High Elves',
        summary: 'The Silvermoon remnant starts in the Thalassian Highlands, with its own racials, classes, and soundtrack.',
        image: '/art/high-elves/hero.webp'
      },
      {
        slug: 'goblins',
        href: '/goblins',
        eyebrow: 'HORDE',
        title: 'Goblins',
        summary: 'The Horde’s newest bargain begins on Blackstone Island - Prospecting, Exit Strategy, and a deal in motion.',
        image: '/art/goblins/hero.webp'
      },
      {
        slug: 'customizations',
        href: '/character-customizations',
        eyebrow: 'APPEARANCE',
        title: 'Character Customizations',
        summary: 'New hair colors, skin paints, and face options that still read as classic character creation.',
        image: art.customization,
        position: '73% 18%',
        size: 'auto 130%'
      },
      {
        slug: 'class-race',
        href: '/class-race-combinations',
        eyebrow: 'COMBINATIONS',
        title: 'Race & Class Combinations',
        summary: 'Familiar races pick up classes they never had, so old heroes can take new paths through Azeroth.',
        image: art.classRace
      },
      {
        slug: 'titles',
        href: '/achievement-titles',
        eyebrow: 'ACHIEVEMENTS',
        title: 'Achievement Titles',
        summary: 'Titles that mark unusual journeys, challenges, and accomplishments worth showing on the nameplate.',
        image: art.titles,
        position: 'right center'
      },
      {
        slug: 'transmog',
        href: '/transmogrification',
        eyebrow: 'FASHION',
        title: 'Transmogrification',
        summary: 'Collect appearances by wearing them, then spend Fashion Coins to dress the character you actually play.',
        image: art.transmog
      }
    ]
  },
  {
    slug: 'professions',
    href: '/features/professions',
    title: 'Professions',
    eyebrow: 'PROFESSIONS',
    heading: 'Crafting that matters while leveling.',
    intro: 'Two primary crafts, gathering as secondaries, plus Jewelcrafting, Survival, crafting orders, and material storage.',
    listingKicker: 'PROFESSIONS',
    heroImage: art.survival,
    links: [
      {
        slug: 'overview',
        href: '/features/professions',
        eyebrow: 'OVERVIEW',
        title: 'Profession Overview',
        summary: 'How primary and secondary slots work, and what changed from classic profession design.',
        image: art.survival,
        position: '58% 60%',
        size: 'auto 160%'
      },
      {
        slug: 'jewelcrafting',
        href: '/jewelcrafting',
        eyebrow: 'NEW PRIMARY',
        title: 'Jewelcrafting',
        summary:
          'A full crafting profession with over 200 recipes. Goldsmith makes jewelry and staves; Gemology cuts stones that socket into them.',
        image: art.jewelcrafting,
        position: '82% 64%',
        size: 'auto 180%'
      },
      {
        slug: 'survival',
        href: '/survival-and-gardening',
        eyebrow: 'NEW SECONDARY',
        title: 'Survival & Gardening',
        summary: 'Camp, fish, and grow crops on the trail. Tents, boats, campfires, and planters sit alongside Cooking and First Aid.',
        image: art.survival,
        position: '58% 60%',
        size: 'auto 160%'
      },
      {
        slug: 'material-storage',
        href: '/material-storage',
        eyebrow: 'STORAGE',
        title: 'Material Storage',
        summary:
          'Unlock a dedicated store at any banker for 250 gold. Keep nearly unlimited crafting materials out of your bags and bank.',
        image: art.materialStorage,
        position: 'center'
      },
      {
        slug: 'crafting-orders',
        href: '/crafting-orders',
        eyebrow: 'SYSTEMS',
        title: 'Crafting Orders',
        summary:
          'Pay a trainer gold to use their skill. Hand in recipes you find, and let enchanters enchant or disenchant your gear.',
        image: art.craftingOrders,
        position: 'center top'
      }
    ]
  },
  {
    slug: 'world',
    href: '/features/world',
    title: 'World',
    eyebrow: 'WORLD',
    heading: 'Azeroth expanded',
    intro:
      'New places, factions, class work, loot, seasonal events, and a richer soundscape - designed to feel like they were always part of the original world.',
    listingKicker: 'WORLD',
    heroImage: art.world,
    links: [
      {
        slug: 'zones',
        href: '/new-locations-and-maps',
        eyebrow: 'ZONES',
        title: 'Zones & World Changes',
        summary: 'New lands and careful additions to underused corners, matched to the original art direction.',
        image: art.zones
      },
      {
        slug: 'lore',
        href: '/new-factions-and-quests',
        eyebrow: 'LORE & FACTIONS',
        title: 'New Factions & Quests',
        summary: 'Meet new factions, characters, and quests that grow out of the original lore.',
        image: art.lore
      },
      {
        slug: 'classes',
        href: '/features/classes',
        eyebrow: 'CLASS DESIGN',
        title: 'Class Design',
        summary: 'Broader viable solo play without erasing Vanilla identities - plus a talent planner.',
        image: art.classes
      },
      {
        slug: 'itemization',
        href: '/features/itemization',
        eyebrow: 'ITEMIZATION',
        title: 'Itemization',
        summary: 'New and retuned rewards so classic drops stay relevant and new zones have loot of their own.',
        image: art.itemization
      },
      {
        slug: 'events',
        href: '/seasonal-events',
        eyebrow: 'SEASONAL EVENTS',
        title: 'Seasonal Events',
        summary: 'Holiday quests, beach days, and rocket races that keep the world moving all year.',
        image: art.events
      },
      {
        slug: 'sound',
        href: '/sound-design',
        eyebrow: 'MUSIC & SOUND',
        title: 'Music & Sound',
        summary: 'New music and ambient work that brings familiar corners of Azeroth closer.',
        image: art.music
      }
    ]
  },
  {
    slug: 'systems',
    href: '/features/systems',
    title: 'Systems',
    eyebrow: 'SYSTEMS',
    heading: 'Guilds, groups, and optional rules.',
    intro: 'Shared treasuries and taverns, dungeon and raid additions, PvP, and leveling challenges that change the journey.',
    listingKicker: 'SYSTEMS',
    heroImage: art.raids,
    links: [
      {
        slug: 'guild-vaults',
        href: '/guild-banks',
        eyebrow: 'GUILDS',
        title: 'Guild Vaults',
        summary: 'A shared treasury with customizable tabs, daily limits, and rank-based access.',
        image: art.guildVaults
      },
      {
        slug: 'guild-quarters',
        href: '/guild-quarters',
        eyebrow: 'GUILDS',
        title: 'Guild Quarters',
        summary: 'Give the guild a tavern home anywhere in Azeroth.',
        image: art.guildQuarters
      },
      {
        slug: 'raids',
        href: '/raids-and-dungeons',
        eyebrow: 'ENDGAME',
        title: 'Raids & Dungeons',
        summary: 'Optional rooms, bosses, and rewards in familiar instances - plus new threats for groups.',
        image: art.raids
      },
      {
        slug: 'challenges',
        href: '/challenges',
        eyebrow: 'CHALLENGES',
        title: 'Leveling Challenges',
        summary: 'Optional rulesets - Hardcore, War Mode, Craftmaster, and more - with titles to prove it.',
        image: art.challenges
      },
      {
        slug: 'pvp',
        href: '/player-versus-player-content',
        eyebrow: 'PLAYER VS PLAYER',
        title: 'Arena & Battlegrounds',
        summary: 'Faction conflicts and arenas for players who want glory beyond the PvE journey.',
        image: art.arena
      }
    ]
  },
  {
    slug: 'travel',
    href: '/features/travel',
    title: 'Travel & Interface',
    eyebrow: 'TRAVEL & INTERFACE',
    heading: 'Getting around Azeroth.',
    intro: 'New routes and scaling mounts, plus a cleaner client that still reads as Vanilla.',
    listingKicker: 'TRAVEL & INTERFACE',
    heroImage: art.transport,
    links: [
      {
        slug: 'transport',
        href: '/additional-transport-routes',
        eyebrow: 'TRAVEL & INTERFACE',
        title: 'Transport Routes',
        summary: 'Flight paths, boats, and overland connections to forgotten corners of Azeroth.',
        image: art.transport
      },
      {
        slug: 'mount-speed',
        href: '/dynamic-mount-speed',
        eyebrow: 'TRAVEL & INTERFACE',
        title: 'Dynamic Mount Speed',
        summary: 'Riding speed scales with your journey so the first mount stays useful all the way up.',
        image: art.mountSpeed
      },
      {
        slug: 'ui',
        href: '/client-interface-improvements',
        eyebrow: 'QUALITY OF LIFE',
        title: 'Client Improvements',
        summary: 'Vanilla-style interface upgrades - collections, maps, tradeskill, and more - without extra add-ons.',
        image: art.ui
      }
    ]
  }
];

export function getFeatureCategory(slug: string) {
  return featureCategories.find((category) => category.slug === slug);
}
