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
  image?: string;
  position?: "top" | "center" | "bottom";
  sections: ChangelogSection[];
};

export type ChangelogPageEntry = ChangelogEntry & { slug: string };

export function getChangelogSlug(version: string): string {
  return version
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function getAllChangelogEntries(): ChangelogPageEntry[] {
  return changelog.map((entry) => ({
    ...entry,
    slug: getChangelogSlug(entry.version),
  }));
}

export function getChangelogEntry(
  slug: string,
): ChangelogPageEntry | undefined {
  return getAllChangelogEntries().find((entry) => entry.slug === slug);
}

export const changelog: ChangelogEntry[] = [
  {
    version: "1.19.0",
    date: "",
    summary:
      "Hearthstone arrived, together with a lot of quest and small QoL improvements",
    image: "/art/news/release_hs.webp",
    position: "center",
    sections: [
      {
        title: "General",
        items: [
          'You can now play Hearthstone! Ezra Chatterton in Orgrimmar and Ibelin Redmoore in Stormwind can tell you more about it. If you cannot find them, maybe someone else in the Cities can point into the right direction? [Learn more about Hearthstone](/hearthstone).',
          'More than 30 new Hearthstone related quests can be found, split between Horde and Alliance.',
        ],
      },
      {
        title: "Interface & QoL",
        items: [
          'The game now features a calendar for all world events. You can find it at your minimap.',
          'Controllers are now supported. You can download the mod "Windrunner-controller" in the Launcher. It is based on ControllerExperience but: No additional setup needed. It is still WIP and will receive updates over time.',
          'The launcher now allows you to install the Windrunner controller mod. This will allow you to use your controller without setting it up any special way, just connect it and use it. More on this mod later in a seperate Feature Spotlight.',
          'Shamans now have a built in totem bar (based on the works of [Call of Elements](https://github.com/sica42/CallOfElements), reworked and fixed).',
          'Players can now enable a "Sell Junk" button in the Interface settings. Using it will, who would have guessed it, sell all of your junk items.',
          'Got any gear in your inventory? Compare it to what you have equipped currently by holding *Shift*.',
          'Want to equip new items in your inventory, but don\'t want to search for them in your bags? Hold the *ALT* key in your character sheet on any slot and you will see what you can equip (for the slot). Click it to quickly equip it.',
        ],
      },
      {
        title: "Companions",
        items: [
          'Stopped companions from going passive when switching to FFA or other Loot methods.',
          'Multiple lifecycle improvements have been made for the companions.',
        ],
      },
      {
        title: "Bugfixes",
        items: [
          "A lot of fixes were done on [tortoise-wow](https://github.com/tortoise-wow/tortoise-wow), all included here.",
          "Disabled auto server restart for honor calculation. This will now happen on the next regular server start instead.",
          "Fixed a lua error when opening the crafting order service.",
          'Fixed problems with recruiter companions making them passive sometimes',
        ],
      },
    ],
  },
  {
    version: "1.18.3-1",
    date: "October 14, 2026",
    summary: "Hotfix",
    image: "/art/news/release_2.webp",
    sections: [
      {
        title: "Bugfixes",
        items: [
          "Fixed a problem with spells that were caused by loading spells from dbc.",
        ],
      },
    ],
  },
  {
    version: "1.18.3",
    date: "October 10, 2026",
    summary:
      "The companion guild is opening its doors and raids receive some changes.",
    image: "/art/news/release_2.webp",
    sections: [
      {
        title: "General",
        items: [
          "The companion guild found its way to Azeroth. You can find companion recruiters in each Inn in the world, visit them and they can help you find companions to help you. Read more on its dedicated [feature page](/companion-guild).",
          "The DungeonClear Addon is now included",
        ],
      },
      {
        title: "Raids",
        items: [
          "All raids that were 40 player raids before are now 20 player raids.",
        ],
      },
      {
        title: "Bugfixes",
        items: [
          "A lot of fixes were done on [tortoise-wow](https://github.com/tortoise-wow/tortoise-wow), all included here.",
          "A lot of playerbot fixes, especially for dungeons and dungeon clear.",
          "The weeklies added in patch 1.18.2 are now correctly categorized in their respective city, instead of having a broken header in the quest log.",
          "Multiple breaking bugs in the Dungeon Clear module were fixed.",
        ],
      },
    ],
  },
  {
    version: "1.18.2",
    date: "September 15, 2026",
    summary: "The first release of Windrunner.",
    image: "/art/news/release_1.webp",
    sections: [
      {
        title: "General",
        items: [
          "Bankers now sell the Material Storage Box. It costs 250 Gold and allows you to store nearly unlimited crafting materials. Read more on its dedicated [feature page](/material-storage).",
          "The auction house now uses real auction house data, with more dynamic pricing, different auction house personas trying to undercut each other (and more) and proper item prices.",
          "All group members can now loot their own copy of quest items from quest mobs, instead of only the player who is allowed to loot the mob.",
          '"Marks of the Ranger General", formerly known as "Donation Points", are now obtained through either gold exchange with Baron Bobby, drops from dungeon and raid bosses, pvp matches or through other weekly activities.',
          "Private Detective Murloc Holmes investigated Baron Bobby. He was found to be a con artist and was chased out of both Orgrimmar and Stormwind. Nonetheless, new agents have taken over his business and now offer new opportunities.",
          "The world is inhabited by bot players, that quest and interact with the player. They receive multiple patches and will be massively changed in the future. Stay tuned.",
        ],
      },
      {
        title: "Professions",
        items: [
          "The professions Skinning, Mining and Herbalism are now seconary professions.",
          "Learning **both** Mining and Herbalism now teaches you the new spell Find Herbs and Minerals that allows you to see both resources on the minimap",
          "Each trainer now offers to craft items for you. Read more about Crafting Orders on its dedicated [feature page](/crafting-orders).",
        ],
      },
      {
        title: "Bugfixes",
        items: [
          "A lot of fixes were done on [tortoise-wow](https://github.com/tortoise-wow/tortoise-wow), all included here.",
        ],
      },
    ],
  },
];
