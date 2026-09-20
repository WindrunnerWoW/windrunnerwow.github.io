export type ChangelogSubsection = {
  title: string;
  /** Supports inline markdown, including `[label](https://example.com)` links. */
  items: string[];
};

export type ChangelogSection = {
  title: string;
  /** Supports inline markdown, including `[label](https://example.com)` links. */
  items?: string[];
  subsections?: ChangelogSubsection[];
};

export type ChangelogEntry = {
  version: string;
  date: string;
  summary: string;
  sections: ChangelogSection[];
};

export type ChangelogPageEntry = ChangelogEntry & { slug: string };

export function getChangelogSlug(version: string): string {
  return version
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function getAllChangelogEntries(): ChangelogPageEntry[] {
  return changelog.map((entry) => ({ ...entry, slug: getChangelogSlug(entry.version) }));
}

export function getChangelogEntry(slug: string): ChangelogPageEntry | undefined {
  return getAllChangelogEntries().find((entry) => entry.slug === slug);
}

export const changelog: ChangelogEntry[] = [
  {
    version: '1.18.2',
    date: 'September 15, 2026',
    summary: 'The first release of Windrunner.',
    sections: [
      {
        title: 'General',
        items: [
          'Bankers now sell the Material Storage Box. It costs 250 Gold and allows you to store nearly unlimited crafting materials. Read more on its dedicated [feature page](/material-storage).',
          'The auction house now uses real auction house data, with more dynamic pricing, different auction house personas trying to undercut each other (and more) and proper item prices.',
          'All group members can now loot their own copy of quest items from quest mobs, instead of only the player who is allowed to loot the mob.',
          '"Marks of the Ranger General", formerly known as "Donation Points", are now obtained through either gold exchange with Baron Bobby, drops from dungeon and raid bosses, pvp matches or through other weekly activities.',
          'Private Detective Murloc Holmes investigated Baron Bobby. He was found to be a con artist and was chased out of both Orgrimmar and Stormwind. Nonetheless, new agents have taken over his business and now offer new opportunities.',
          'The world is inhabited by bot players, that quest and interact with the player. They receive multiple patches and will be massively changed in the future. Stay tuned.',
        ]
      },
      {
        title: 'Professions',
        items: [
          'The professions Skinning, Mining and Herbalism are now seconary professions.',
          'Learning **both** Mining and Herbalism now teaches you the new spell Find Herbs and Minerals that allows you to see both resources on the minimap',
          'Each trainer now offers to craft items for you. Read more about Crafting Orders on its dedicated [feature page](/crafting-orders).',
        ]
      },
      {
        title: 'Bugfixes',
        items: [
          'A lot of fixes were done on [tortoise-wow](https://github.com/tortoise-wow/tortoise-wow), all included here.'
        ]
      }
    ]
  }
];
