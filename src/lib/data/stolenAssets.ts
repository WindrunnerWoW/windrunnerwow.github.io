export type StolenAssetLink = {
  href: string;
  label: string;
};

export type StolenAsset = {
  title: string;
  src: string;
  usedOn?: StolenAssetLink;
  /**
   * Author name shown under the image. Same spelling = same group.
   * Leave it off until you know.
   */
  by?: string;
  /** Link opened when someone clicks the author name. */
  source?: string;
};

export type CreatorProfile = {
  href?: string;
  note?: string;
};

export type StolenAssetGroup = {
  id: string;
  title: string;
  href?: string;
  note?: string;
  items: StolenAsset[];
};

const TURTLECRAFT = 'TurtleCraft';

const page = (href: string, label: string): StolenAssetLink => ({ href, label });

/**
 * Shared profile for a `by` name. TurtleCraft is the default for every piece
 * that does not set `by` / `source`. Override those two fields on exceptions.
 */
export const creators: Record<string, CreatorProfile> = {
  [TURTLECRAFT]: {
    href: 'https://turtlecraft.gg'
  }
};

/**
 * Defaults to TurtleCraft. For someone else:
 * { ..., by: 'Wei Wang', source: 'https://www.artstation.com/weiwang' }
 */
export const stolenAssets: StolenAsset[] = [
  { title: 'New races', src: '/art/features/races.webp', usedOn: page('/new-races', 'New races') },
  { title: 'Sound design', src: '/art/features/music.webp', usedOn: page('/sound-design', 'Sound design') },
  { title: 'Lore', src: '/art/features/lore.webp', usedOn: page('/', 'Home') },
  { title: 'Zones', src: '/art/features/zones.webp', usedOn: page('/new-locations-and-maps', 'Locations') },
  {
    title: 'Class and race combinations',
    src: '/art/features/class-race.webp',
    usedOn: page('/class-race-combinations', 'Class & race')
  },
  {
    title: 'Transport',
    src: '/art/features/transport.webp',
    usedOn: page('/additional-transport-routes', 'Transport')
  },
  {
    title: 'Survival',
    src: '/art/features/survival.webp',
    usedOn: page('/survival-and-gardening', 'Survival')
  },
  {
    title: 'Jewelcrafting',
    src: '/art/features/jewelcrafting.webp',
    usedOn: page('/jewelcrafting', 'Jewelcrafting')
  },
  { title: 'Items', src: '/art/features/items.webp', usedOn: page('/', 'Home') },
  {
    title: 'Itemization',
    src: '/art/features/itemization.webp',
    usedOn: page('/features/itemization', 'Itemization')
  },
  { title: 'Raids', src: '/art/features/raids.webp', usedOn: page('/raids-and-dungeons', 'Raids') },
  { title: 'Arena', src: '/art/features/arena.webp', usedOn: page('/player-versus-player-content', 'PvP') },
  { title: 'Guild vaults', src: '/art/features/guild-vaults.webp', usedOn: page('/', 'Home') },
  {
    title: 'Guild quarters',
    src: '/art/features/guild-quarters.webp',
    usedOn: page('/guild-quarters', 'Guild quarters')
  },
  {
    title: 'Guild quarters hero',
    src: '/art/features/guild-quarters-hero.jpg',
    usedOn: page('/guild-quarters', 'Guild quarters')
  },
  { title: 'Guild banks', src: '/art/features/guild-banks.webp', usedOn: page('/guild-banks', 'Guild banks') },
  {
    title: 'Character customizations',
    src: '/art/features/customization.webp',
    usedOn: page('/character-customizations', 'Customizations')
  },
  { title: 'Pets and mounts', src: '/art/features/pets.webp', usedOn: page('/pets-and-mounts', 'Pets & mounts') },
  { title: 'Achievement titles', src: '/art/features/titles.webp', usedOn: page('/achievement-titles', 'Titles') },
  {
    title: 'Transmogrification',
    src: '/art/features/transmog.webp',
    usedOn: page('/transmogrification', 'Transmog')
  },
  { title: 'Zul', src: '/art/features/zul.webp', usedOn: page('/', 'Home') },
  {
    title: 'Client interface',
    src: '/art/features/ui.webp',
    usedOn: page('/client-interface-improvements', 'Interface')
  },
  { title: 'Seasonal events', src: '/art/features/events.webp', usedOn: page('/seasonal-events', 'Events') },
  { title: 'Challenges', src: '/art/features/challenges.webp', usedOn: page('/challenges', 'Challenges') },
  { title: 'Classes', src: '/art/features/classes.webp', usedOn: page('/features/classes', 'Classes') },
  { title: 'World', src: '/art/features/world.webp', usedOn: page('/features/world', 'World') },
  { title: 'Landscape', src: '/art/features/landscape.webp', usedOn: page('/goblins', 'Goblins') },
  {
    title: 'Mount speed',
    src: '/art/features/mount-speed.webp',
    usedOn: page('/dynamic-mount-speed', 'Mount speed')
  },
  {
    title: 'Nightmares of Ursol',
    src: '/art/roadmap/Nightmares_of_ursol.webp',
    usedOn: page('/roadmap', 'Roadmap')
  },
  { title: 'Tel’Abim', src: '/art/roadmap/Telabim.webp', usedOn: page('/roadmap', 'Roadmap') },
  { title: 'Runecrafting', src: '/art/roadmap/runecrafting.webp', by: 'Blizzard',
    source: 'https://www.blizzard.com/en-us/',
    usedOn: page('/roadmap', 'Roadmap') },
  {
    title: 'Controller support',
    src: '/art/roadmap/controller_support.webp',
    source: 'https://pixabay.com/illustrations/video-game-joystick-console-6529701/',
    by: 'nicolepineda',
    usedOn: page('/roadmap', 'Roadmap')
  },
  { title: 'High elf hero', src: '/art/high-elves/hero.webp', usedOn: page('/high-elves', 'High elves') },
  { title: 'High elf art I', src: '/art/high-elves/art-1.webp', usedOn: page('/high-elves', 'High elves') },
  { title: 'High elf art II', src: '/art/high-elves/art-2.webp', usedOn: page('/high-elves', 'High elves') },
  { title: 'High elf art III', src: '/art/high-elves/art-3.webp', usedOn: page('/high-elves', 'High elves') },
  { title: 'Two elves', src: '/art/high-elves/two-elves.webp', usedOn: page('/high-elves', 'High elves') },
  { title: 'Couple', src: '/art/high-elves/couple-bg.webp', usedOn: page('/high-elves', 'High elves') },
  { title: 'Elven backdrop', src: '/art/high-elves/bg-elves.webp', usedOn: page('/high-elves', 'High elves') },
  { title: 'Soundtrack', src: '/art/high-elves/soundtrack.webp', usedOn: page('/sound-design', 'Sound design') },
  { title: 'Goblin hero', src: '/art/goblins/hero.webp', usedOn: page('/goblins', 'Goblins') },
  { title: 'Blackstone Island', src: '/art/goblins/art-1.webp', usedOn: page('/goblins', 'Goblins') },
  { title: 'The union at work', src: '/art/goblins/art-2.webp', usedOn: page('/goblins', 'Goblins') },
  { title: 'A deal in motion', src: '/art/goblins/art-3.webp', usedOn: page('/goblins', 'Goblins') },
  { title: 'Goblin classes', src: '/art/goblins/classes.webp', usedOn: page('/goblins', 'Goblins') },
  {
    title: 'Jewelcrafting hero',
    src: '/art/jewelcrafting/hero.webp',
    usedOn: page('/jewelcrafting', 'Jewelcrafting')
  },
  {
    title: 'Customizations hero',
    src: '/art/customizations/hero.webp',
    usedOn: page('/character-customizations', 'Customizations')
  },
  { title: 'Boaring', src: '/art/challenges/boaring.webp', usedOn: page('/challenges', 'Challenges') },
  { title: 'Craftmaster', src: '/art/challenges/craftmaster.webp', usedOn: page('/challenges', 'Challenges') },
  { title: 'Exhaustion', src: '/art/challenges/exhaustion.webp', usedOn: page('/challenges', 'Challenges') },
  { title: 'Hardcore', src: '/art/challenges/hardcore.webp', usedOn: page('/challenges', 'Challenges') },
  { title: 'Lunatic', src: '/art/challenges/lunatic.webp', usedOn: page('/challenges', 'Challenges') },
  { title: 'Slow and steady', src: '/art/challenges/slow.webp', usedOn: page('/challenges', 'Challenges') },
  { title: 'Vagrant', src: '/art/challenges/vagrant.webp', usedOn: page('/challenges', 'Challenges') },
  { title: 'War mode', src: '/art/challenges/warmode.webp', usedOn: page('/challenges', 'Challenges') },
  { title: 'Racing I', src: '/art/events/race-1.jpg', usedOn: page('/seasonal-events', 'Events') },
  { title: 'Racing II', src: '/art/events/race-2.webp', usedOn: page('/seasonal-events', 'Events') },
  { title: 'Racing III', src: '/art/events/race-3.webp', usedOn: page('/seasonal-events', 'Events') },
  { title: 'Steam I', src: '/art/events/steam-1.webp', usedOn: page('/seasonal-events', 'Events') },
  { title: 'Steam II', src: '/art/events/steam-2.webp', usedOn: page('/seasonal-events', 'Events') },
  { title: 'Steam III', src: '/art/events/steam-3.webp', usedOn: page('/seasonal-events', 'Events') },
  { title: 'Winter Veil', src: '/art/events/winter.webp', usedOn: page('/seasonal-events', 'Events') },
  { title: 'Winter Veil II', src: '/art/events/winterveil-2.webp', usedOn: page('/seasonal-events', 'Events') },
  { title: 'Winter Veil III', src: '/art/events/winterveil-3.webp', usedOn: page('/seasonal-events', 'Events') },
  { title: 'Winter Veil IV', src: '/art/events/winterveil-4.webp', usedOn: page('/seasonal-events', 'Events') },
  {
    title: 'Caverns of Time I',
    src: '/art/factions/caverns-01.webp',
    usedOn: page('/new-factions-and-quests', 'Factions')
  },
  {
    title: 'Caverns of Time II',
    src: '/art/factions/caverns-02.webp',
    usedOn: page('/new-factions-and-quests', 'Factions')
  },
  { title: 'Goblin preview', src: '/art/factions/goblin.webp', usedOn: page('/new-factions-and-quests', 'Factions') },
  {
    title: 'High elf in Tirisfal',
    src: '/art/factions/highelf-tirisfal.webp',
    usedOn: page('/new-factions-and-quests', 'Factions')
  },
  {
    title: 'Human in Tirisfal',
    src: '/art/factions/human-tirisfal.webp',
    usedOn: page('/new-factions-and-quests', 'Factions')
  },
  { title: 'Kul Tiran I', src: '/art/factions/kultiran-01.webp', usedOn: page('/new-factions-and-quests', 'Factions') },
  {
    title: 'Kul Tiran II',
    src: '/art/factions/kultiran-02.webp',
    usedOn: page('/new-factions-and-quests', 'Factions')
  },
  { title: 'Morogal', src: '/art/factions/morogal.webp', usedOn: page('/new-factions-and-quests', 'Factions') },
  {
    title: 'Troll in Lapidis',
    src: '/art/factions/troll-lapidis.webp',
    usedOn: page('/new-factions-and-quests', 'Factions')
  },
  {
    title: 'Warrior portrait',
    src: '/art/classes/warrior.png',
    by: 'Harlan Elam',
    source: 'https://dribbble.com/shots/6175355-World-of-Warcraft-Vector-Class-Icons',
    usedOn: page('/talents', 'Talents')
  },
  {
    title: 'Paladin portrait',
    src: '/art/classes/paladin.png',
    by: 'Harlan Elam',
    source: 'https://dribbble.com/shots/6175355-World-of-Warcraft-Vector-Class-Icons',
    usedOn: page('/talents', 'Talents')
  },
  {
    title: 'Hunter portrait',
    src: '/art/classes/hunter.png',
    by: 'Harlan Elam',
    source: 'https://dribbble.com/shots/6175355-World-of-Warcraft-Vector-Class-Icons',
    usedOn: page('/talents', 'Talents')
  },
  {
    title: 'Rogue portrait',
    src: '/art/classes/rogue.png',
    by: 'Harlan Elam',
    source: 'https://dribbble.com/shots/6175355-World-of-Warcraft-Vector-Class-Icons',
    usedOn: page('/talents', 'Talents')
  },
  {
    title: 'Priest portrait',
    src: '/art/classes/priest.png',
    by: 'Harlan Elam',
    source: 'https://dribbble.com/shots/6175355-World-of-Warcraft-Vector-Class-Icons',
    usedOn: page('/talents', 'Talents')
  },
  {
    title: 'Shaman portrait',
    src: '/art/classes/shaman.png',
    by: 'Harlan Elam',
    source: 'https://dribbble.com/shots/6175355-World-of-Warcraft-Vector-Class-Icons',
    usedOn: page('/talents', 'Talents')
  },
  {
    title: 'Mage portrait',
    src: '/art/classes/mage.png',
    by: 'Harlan Elam',
    source: 'https://dribbble.com/shots/6175355-World-of-Warcraft-Vector-Class-Icons',
    usedOn: page('/talents', 'Talents')
  },
  {
    title: 'Warlock portrait',
    src: '/art/classes/warlock.png',
    by: 'Harlan Elam',
    source: 'https://dribbble.com/shots/6175355-World-of-Warcraft-Vector-Class-Icons',
    usedOn: page('/talents', 'Talents')
  },
  {
    title: 'Druid portrait',
    src: '/art/classes/druid.png',
    by: 'Harlan Elam',
    source: 'https://dribbble.com/shots/6175355-World-of-Warcraft-Vector-Class-Icons',
    usedOn: page('/talents', 'Talents')
  },
  {
    title: 'Death Knight portrait',
    src: '/art/classes/death-knight.png',
    by: 'Harlan Elam',
    source: 'https://dribbble.com/shots/6175355-World-of-Warcraft-Vector-Class-Icons',
    usedOn: page('/talents', 'Talents')
  }
];

export function creatorName(asset: StolenAsset) {
  return asset.by?.trim() || TURTLECRAFT;
}

/** Click target for the author name: the piece's `source`, or the shared creator profile link. */
export function creatorHref(asset: StolenAsset) {
  return asset.source || creators[creatorName(asset)]?.href;
}

function slug(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '') || 'unknown';
}

export const stolenAssetGroups: StolenAssetGroup[] = (() => {
  const buckets = new Map<string, StolenAsset[]>();

  for (const asset of stolenAssets) {
    const name = creatorName(asset);
    const items = buckets.get(name) ?? [];
    items.push(asset);
    buckets.set(name, items);
  }

  return [...buckets.keys()]
    .sort((a, b) => {
      if (a === TURTLECRAFT) return 1;
      if (b === TURTLECRAFT) return -1;
      return a.localeCompare(b);
    })
    .map((name) => {
      const profile = creators[name];
      return {
        id: slug(name),
        title: name,
        href: profile?.href,
        note: profile?.note,
        items: buckets.get(name) ?? []
      };
    });
})();
