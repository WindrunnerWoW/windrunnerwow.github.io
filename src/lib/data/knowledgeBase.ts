export type KnowledgeEntry = {
  title: string;
  category: string;
  summary: string;
  /** Extra terms that should match search, e.g. old names. */
  aliases?: string[];
  href?: string;
};

export const knowledgeCategories = [
  'Rewards',
  'Characters',
  'Professions',
  'World',
  'Systems',
  'Travel & Interface',
  'Challenges',
  'Classes',
  'Upcoming'
] as const;

export const knowledgeBase: KnowledgeEntry[] = [
  {
    title: 'Marks of the Ranger General',
    category: 'Rewards',
    aliases: ['donation points', 'donation point', 'dp', 'windrunner rewards'],
    summary:
      'Donation points, now known as Marks of the Ranger General, are spent in the in-game menu. Earn them from Baron Bobby for gold, dungeon and raid bosses, PvP, or weekly activities.'
  },
  {
    title: 'Fashion Coins',
    category: 'Rewards',
    aliases: ['transmog currency'],
    summary: 'Spend Fashion Coins to apply collected appearances to your gear. They drop from fashionista quests, end-game bosses, and events.',
    href: '/transmogrification'
  },
  {
    title: 'Achievement Titles',
    category: 'Rewards',
    aliases: ['titles'],
    summary: 'Titles on the nameplate for unusual journeys, challenges, and accomplishments such as Immortal, Lorekeeper, or Scarab Lord.',
    href: '/achievement-titles'
  },
  {
    title: 'High Elves',
    category: 'Characters',
    aliases: ['alliance', 'thalassian'],
    summary: 'Alliance race starting in the Thalassian Highlands, with their own racials, classes, and soundtrack.',
    href: '/high-elves'
  },
  {
    title: 'Goblins',
    category: 'Characters',
    aliases: ['horde', 'blackstone'],
    summary: 'Horde race starting on Blackstone Island, with Prospecting, Exit Strategy, and a bargain already in motion.',
    href: '/goblins'
  },
  {
    title: 'Character Customizations',
    category: 'Characters',
    aliases: ['hair', 'skin paints'],
    summary: 'Extra hair colors, skin paints, and faces at character creation that still read as classic Vanilla.',
    href: '/character-customizations'
  },
  {
    title: 'Race & Class Combinations',
    category: 'Characters',
    aliases: ['tauren priest', 'dwarf warlock', 'orc mage'],
    summary: 'Familiar races can take classes they never had in 1.12, including Tauren Priest, Dwarf Warlock, Orc Mage, and more.',
    href: '/class-race-combinations'
  },
  {
    title: 'Transmogrification',
    category: 'Characters',
    aliases: ['mog', 'appearances'],
    summary: 'Collect an appearance by wearing the item, then spend Fashion Coins to put that look on the gear you actually use.',
    href: '/transmogrification'
  },
  {
    title: 'Jewelcrafting',
    category: 'Professions',
    aliases: ['goldsmith', 'gemology', 'sockets'],
    summary: 'New primary profession. Goldsmith makes jewelry and staves; Gemology cuts gems that socket into them.',
    href: '/jewelcrafting'
  },
  {
    title: 'Survival & Gardening',
    category: 'Professions',
    aliases: ['camping', 'tents'],
    summary: 'New secondary: camp, fish, and grow crops on the trail. Tents, boats, campfires, and planters sit with Cooking and First Aid.',
    href: '/survival-and-gardening'
  },
  {
    title: 'Gathering as secondaries',
    category: 'Professions',
    aliases: ['mining', 'herbalism', 'skinning'],
    summary: 'Mining, Herbalism, and Skinning no longer take primary slots. They sit with Cooking, First Aid, Fishing, and Survival.'
  },
  {
    title: 'Find Herbs and Minerals',
    category: 'Professions',
    aliases: ['minimap tracking'],
    summary: 'Learn both Mining and Herbalism to unlock a spell that shows herbs and ore on the minimap at once.'
  },
  {
    title: 'Crafting Orders',
    category: 'Professions',
    aliases: ['trainer craft'],
    summary: 'Ask a profession trainer to craft for you. You bring reagents and gold; they use their skill, even if you never took that craft.',
    href: '/crafting-orders'
  },
  {
    title: 'Material Storage',
    category: 'Professions',
    aliases: ['reagent bank', 'reagent box'],
    summary: 'Buy a Material Storage Box from any banker for 250 gold and keep nearly unlimited crafting materials out of bags and bank.',
    href: '/material-storage'
  },
  {
    title: 'Concoctions',
    category: 'Professions',
    aliases: ['elixirs', 'flasks'],
    summary: 'Two long elixirs can be combined into one concoction so they stop fighting for bag and buff slots.'
  },
  {
    title: 'Zones & World Changes',
    category: 'World',
    aliases: ['telabim', 'gilneas', 'grim reaches'],
    summary: 'New lands and careful additions to underused corners, matched to the original art direction.',
    href: '/new-locations-and-maps'
  },
  {
    title: 'New Factions & Quests',
    category: 'World',
    aliases: ['lore'],
    summary: 'New factions, characters, and quests that grow out of original Vanilla lore.',
    href: '/new-factions-and-quests'
  },
  {
    title: 'Seasonal Events',
    category: 'World',
    aliases: ['winter veil vale', 'tanaris beach', 'mirage raceway'],
    summary: 'Winter Veil Vale, the year-round Steamwheedle Beach in Tanaris, and rocket races at Mirage Raceway.',
    href: '/seasonal-events'
  },
  {
    title: 'Music & Sound',
    category: 'World',
    aliases: ['soundtrack'],
    summary: 'New music and ambient work for familiar corners of Azeroth and the new starting zones.',
    href: '/sound-design'
  },
  {
    title: 'Shared quest loot',
    category: 'World',
    aliases: ['quest items', 'group loot'],
    summary: 'Every group member can loot their own copy of quest items from quest mobs, not only the player who tags the corpse.'
  },
  {
    title: 'Auction House',
    category: 'Systems',
    aliases: ['ah', 'auction'],
    summary: 'The auction house uses live-style data: dynamic prices and competing auction-house personas that try to undercut each other.'
  },
  {
    title: 'Guild Vaults',
    category: 'Systems',
    aliases: ['guild bank'],
    summary: 'Unlock a shared guild treasury with gold. Extra tabs, custom icons, daily withdraw limits, and rank access.',
    href: '/guild-banks'
  },
  {
    title: 'Guild Quarters',
    category: 'Systems',
    aliases: ['guild tavern', 'tabard teleport'],
    summary: 'Pay once to set a tavern as the guild home. Tabards teleport there; several guilds can share one inn.',
    href: '/guild-quarters'
  },
  {
    title: 'Raids & Dungeons',
    category: 'Systems',
    aliases: ['karazhan', 'emerald sanctum', 'dungeon extensions'],
    summary: 'Optional rooms and bosses in familiar instances, plus new group content such as Lower Karazhan and Emerald Sanctum.',
    href: '/raids-and-dungeons'
  },
  {
    title: 'Arena & Battlegrounds',
    category: 'Systems',
    aliases: ['pvp', 'blood ring', 'sunnyglade'],
    summary: 'Faction conflicts and arenas beyond the PvE journey, including battlegrounds queued from the minimap.',
    href: '/player-versus-player-content'
  },
  {
    title: 'Itemization',
    category: 'Systems',
    aliases: ['loot', 'tier', 'sockets'],
    summary: 'New and retuned rewards so classic drops stay relevant and new zones have loot of their own.',
    href: '/features/itemization'
  },
  {
    title: 'Pets & Mounts collection',
    category: 'Systems',
    aliases: ['spellbook', 'companions'],
    summary: 'Pets and mounts live in collection tabs on the spellbook, so they no longer need a bank slot.',
    href: '/pets-and-mounts'
  },
  {
    title: 'Looking For Turtles',
    category: 'Travel & Interface',
    aliases: ['lft', 'lfg', 'looking for group'],
    summary: 'A bulletin board that helps form groups. It does not teleport you to the dungeon.',
    href: '/client-interface-improvements'
  },
  {
    title: 'Hardcore channel',
    category: 'Travel & Interface',
    aliases: ['/h', 'hc chat'],
    summary: 'Hardcore players open a dedicated channel with /h. It turns off at 60 unless you are still on Inferno Mode.',
    href: '/client-interface-improvements'
  },
  {
    title: 'XP Gain toggle',
    category: 'Travel & Interface',
    aliases: ['experience', 'portrait'],
    summary: 'Right-click your character portrait to turn experience gain on or off.',
    href: '/client-interface-improvements'
  },
  {
    title: 'Profession UI',
    category: 'Travel & Interface',
    aliases: ['tradeskill', 'recipe search'],
    summary: 'Larger profession window with Have materials, Provides skill-up, and a recipe search bar.',
    href: '/client-interface-improvements'
  },
  {
    title: 'Mailed loot',
    category: 'Travel & Interface',
    aliases: ['full bags', 'group loot'],
    summary: 'If the roll winner’s bags are full, rare or better loot is mailed instead of becoming free-for-all or vanishing.',
    href: '/client-interface-improvements'
  },
  {
    title: 'Minimized world map',
    category: 'Travel & Interface',
    aliases: ['map'],
    summary: 'Click the arrow next to the map’s close button to shrink the world map instead of closing it.',
    href: '/client-interface-improvements'
  },
  {
    title: 'Extended quest log',
    category: 'Travel & Interface',
    aliases: ['quests'],
    summary: 'The quest log is larger so you can see more at once. The 20-quest cap is still in place for now.',
    href: '/client-interface-improvements'
  },
  {
    title: 'Battleground finder',
    category: 'Travel & Interface',
    aliases: ['minimap pvp'],
    summary: 'Queue for battlegrounds from the minimap, from the Blood Ring to Sunnyglade Valley.',
    href: '/client-interface-improvements'
  },
  {
    title: 'Transport Routes',
    category: 'Travel & Interface',
    aliases: ['flight paths', 'boats'],
    summary: 'New flight paths, boats, and overland connections to forgotten corners of Azeroth.',
    href: '/additional-transport-routes'
  },
  {
    title: 'Dynamic Mount Speed',
    category: 'Travel & Interface',
    aliases: ['riding', 'mounts'],
    summary: 'Mount speed scales with riding skill, so the first mount stays useful through Riding 75 and 150.',
    href: '/dynamic-mount-speed'
  },
  {
    title: 'Hardcore',
    category: 'Challenges',
    aliases: ['immortal', 'inferno'],
    summary: 'Reach 60 without dying. After 60 you can raid and PvP without losing the character. Title: Immortal.',
    href: '/challenges'
  },
  {
    title: 'Traveling Craftmaster',
    category: 'Challenges',
    aliases: ['craftmaster'],
    summary: 'Level using only gear you craft yourself. Title: Craftmaster.',
    href: '/challenges'
  },
  {
    title: 'Slow and Steady',
    category: 'Challenges',
    aliases: ['turtle mode'],
    summary: 'Creature kill XP is halved. Rewards every 10 levels for taking the long road.',
    href: '/challenges'
  },
  {
    title: 'Level One Lunatic',
    category: 'Challenges',
    aliases: ['level 1'],
    summary: 'Stay level one and chase titles through honorable kills, reputation, arena, and quests.',
    href: '/challenges'
  },
  {
    title: 'Boaring Adventure',
    category: 'Challenges',
    aliases: ['boars', 'hambringer'],
    summary: 'All experience comes from slaying boars. Title: The Hambringer.',
    href: '/challenges'
  },
  {
    title: 'War Mode',
    category: 'Challenges',
    aliases: ['pvp flag'],
    summary: 'You can no longer disable PvP, but experience from all sources is increased.',
    href: '/challenges'
  },
  {
    title: 'Exhaustion',
    category: 'Challenges',
    aliases: ['rested xp'],
    summary: 'No rested experience. Weapon skill gains are doubled instead.',
    href: '/challenges'
  },
  {
    title: "Vagrant's Endeavor",
    category: 'Challenges',
    aliases: ['wanderer', 'white gear'],
    summary: 'Wear only poor or common gear to 60. No enchants. Title: The Wanderer, plus a mule for your epics.',
    href: '/challenges'
  },
  {
    title: 'Class Design',
    category: 'Classes',
    aliases: ['talents', 'specs'],
    summary: 'Vanilla identities stay; dead talent rows and missing tools get rebuilt so solo play is viable.',
    href: '/features/classes'
  },
  {
    title: 'Talent Calculator',
    category: 'Classes',
    aliases: ['builds', 'planner'],
    summary: 'Plan and share talent trees for every class.',
    href: '/talents'
  },
  {
    title: 'Warrior',
    category: 'Classes',
    summary: 'Stance identity stays. Arms, Fury, and Protection are each meant to work on their own.',
    href: '/features/classes/warrior'
  },
  {
    title: 'Paladin',
    category: 'Classes',
    summary: 'Holy, Protection, and Retribution are tuned for the journey, not only for a raid slot.',
    href: '/features/classes/paladin'
  },
  {
    title: 'Hunter',
    category: 'Classes',
    summary: 'Pet and shot identity stays, with trees cleaned up so more than one spec is worth taking.',
    href: '/features/classes/hunter'
  },
  {
    title: 'Rogue',
    category: 'Classes',
    summary: 'Combo points and finishers stay. Combat tools that used to hide in talents are easier to reach.',
    href: '/features/classes/rogue'
  },
  {
    title: 'Priest',
    category: 'Classes',
    summary: 'Healing tools come off talent walls. Shadow and Holy keep distinct end-of-tree identities.',
    href: '/features/classes/priest'
  },
  {
    title: 'Shaman',
    category: 'Classes',
    summary: 'Totems, shields, and dual wield stay. Enhancement and Elemental are built to work while leveling.',
    href: '/features/classes/shaman'
  },
  {
    title: 'Mage',
    category: 'Classes',
    summary: 'Mana, schools, and crowd control stay. Specs are filled in without copying a later expansion.',
    href: '/features/classes/mage'
  },
  {
    title: 'Warlock',
    category: 'Classes',
    summary: 'Shards, pets, and curses stay. Affliction, Demo, and Destruction each get a clearer payoff.',
    href: '/features/classes/warlock'
  },
  {
    title: 'Druid',
    category: 'Classes',
    summary: 'Forms and resources stay. Balance, Feral, and Restoration are completed as Vanilla fantasies, not later kits.',
    href: '/features/classes/druid'
  },
  {
    title: 'Companion Recruiter Guild',
    category: 'Upcoming',
    aliases: ['companions', 'hirelings'],
    summary: 'Planned for 1.18.3. Recruit companions to help on the road.',
    href: '/roadmap'
  },
  {
    title: 'Windrunner Launcher',
    category: 'Upcoming',
    aliases: ['client'],
    summary: 'Planned launcher that installs the game, points at the server, and handles updates.',
    href: '/roadmap'
  },
  {
    title: 'Runecrafting',
    category: 'Upcoming',
    aliases: ['runes'],
    summary: 'Horizon profession: craft runes and enchantments, including runes that let you borrow another class’s tools until they break.',
    href: '/roadmap'
  },
  {
    title: 'Housing',
    category: 'Upcoming',
    aliases: ['home'],
    summary: 'Horizon system: buy and customize a home.',
    href: '/roadmap'
  },
  {
    title: 'Caverns of Time: The Fight for Dalaran',
    category: 'Upcoming',
    aliases: ['dalaran', 'malygos'],
    summary: 'Horizon raid in Dalaran against the blue dragonflight.',
    href: '/roadmap'
  },
  {
    title: 'Emerald Nightmare',
    category: 'Upcoming',
    aliases: ['emerald dream'],
    summary: 'Horizon raid against the Nightmare encroaching on the Emerald Dream.',
    href: '/roadmap'
  }
];

export function knowledgeEntryText(entry: KnowledgeEntry) {
  return [entry.title, entry.category, entry.summary, ...(entry.aliases ?? [])].join(' ').toLowerCase();
}
