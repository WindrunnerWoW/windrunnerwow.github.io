import { formatInlineMarkdown } from '../formatInlineMarkdown';

export type RoadmapStatus = 'now' | 'next' | 'planned' | 'horizon' | 'completed';

export const statusLegend: { id: RoadmapStatus; label: string; note: string }[] = [
  { id: 'completed', label: 'Completed', note: 'Shipped' },
  { id: 'now', label: 'In Progress', note: 'Work is in progress' },
  { id: 'next', label: 'Next', note: 'Lined up after current work' },
  { id: 'planned', label: 'Planned', note: 'Scoped, not yet in motion' },
  { id: 'horizon', label: 'Horizon', note: 'Direction. No promises. Not ordered.' }
];

export type RoadmapEntry = {
  status: RoadmapStatus;
  title: string;
  summary: string;
  when?: string;
  /** Short label on the rail, e.g. "Phase 1". Completed entries show a check instead. */
  marker?: string;
  /** Supports inline markdown, including `[label](https://example.com)` links. */
  items?: string[];
  /**
   * Images are shown in the order listed. The first image is the milestone cover;
   * any additional images appear in the expandable gallery.
   */
  images?: { src: string; alt: string }[];
};

/*
  Add a new milestone: copy the example below, paste it into `roadmap`
  in the order it should appear (past first, then upcoming).

  {
    status: 'planned',
    marker: 'Phase 1',
    title: 'New milestone',
    when: 'TBD',
    summary: 'One or two sentences about what this is.',
    images: [
      { src: '/art/roadmap/my-milestone.webp', alt: 'Describe what is shown' }
    ],
    items: [
      'First concrete piece of work',
      'See [the project](https://example.com) for details'
    ]
  },

  status: 'now' | 'next' | 'planned' | 'horizon' | 'completed'
  Completed entries use a check on the rail, matching the legend.
  marker, when, images, and items are optional.
*/

/** Inline markdown for summaries and item lines (links, emphasis, code). */
export const formatRoadmapMarkdown = formatInlineMarkdown;

/** Starter timeline - replace titles, dates, and statuses as the real plan firms up. */
export const roadmap: RoadmapEntry[] = [
  {
    status: 'now',
    marker: 'Work in Progress',
    title: '1.18.1 Restoration',
    when: 'Ongoing: Upstream work',
    summary:
      'The Restoration is a major feat will bring back many of the features that are still missing or not working correctly right now.',
    images: [
      { src: '/art/roadmap/Nightmares_of_ursol.webp', alt: 'Restoration of Nightmares of Ursol' }
    ],
    items: [
      'Keep an eye on [tortoise-wow](https://github.com/tortoise-wow/tortoise-wow) and support Penqle if you can!'
    ]
  },
  {
    status: 'now',
    marker: 'Development finished',
    title: 'Crafting Orders',
    when: '1.18.2',
    summary:
      'Crafting Orders are a new feature that will allow you to pay trainers to craft items for you. No need to skill smithing to get the one item you want.',
    images: [
      { src: '/art/crafting-orders/hero.webp', alt: 'Crafting Orders at Trainers' }
    ],
    items: [
      'Custom UI Panels for Crafting Orders',
      'Backend Module for Crafting Orders',
    ]
  },
  {
    status: 'now',
    marker: 'Development finished',
    title: 'Reagent Bank',
    when: '1.18.2',
    summary:
      'Who likes to keep their reagents in their bank? No more digging through bags to find the one you need. Almost unlimited space for a small fee.',
    images: [
      { src: '/art/material-storage/hero.webp', alt: 'Material Storage' },
    ],
    items: [
      'Custom UI Panels for Reagent Bank',
      'Backend Module for Reagent Bank',
    ]
  },
  {
    status: 'now',
    marker: 'Work in Progress',
    title: 'Donation Point Rework',
    when: '1.18.2',
    summary:
      'Who are you gonna donate to if it is your server? In the future, these renamed "Marks of the Ranger General" will be aquired by differnt means.',
    images: [
      { src: '/art/features/windrunner-rewards.webp', alt: 'Windrunner Rewards' }
    ],
    items: [
      'Earn "Marks of the Ranger General" by buying them or completing challenges.',
    ]
  },
  {
    status: 'planned',
    marker: 'Coming Soon',
    title: 'Companion Recruiter Guild',
    when: '1.18.3',
    summary:
      'The Companion Recruiter Guild will allow you to recruit companions to help you in your adventures.',
    images: [
      { src: '/art/roadmap/companion_guild.webp', alt: 'Companion' }
    ],
    items: [
      'Custom UI Panels for Companion Recruitment',
      'Backend Module for Companion Recruitment',
    ]
  },
  {
    status: 'planned',
    marker: 'Coming Soon',
    title: 'Windrunner Launcher',
    when: '1.18.3',
    summary:
      'The Windrunner Launcher will allow you to launch the game without having to know anything. I will set up the server, game, take care of the updates and more.',
    images: [
      { src: '/art/roadmap/launcher.webp', alt: 'Windrunner Launcher' }
    ],
  },
  {
    status: 'planned',
    marker: 'Planned',
    title: 'Windrunner Voiceover',
    when: '1.18.3',
    summary:
      'The Voiceover addon is great, but missing the custom quests. Let\'s fix that.',
    images: [
      { src: '/art/roadmap/voiceover.webp', alt: 'Voiceover' }
    ],
    items: [
      'Regenerate the voiceover for all quests, with higher quality and more natural sounding voices. RIP: ALL MEMBERS OF THE HORDE ARE EQUAL IN MY EYES ADVENTURER.',
      'Improvements to the addon.'
    ],
  },
  {
    status: 'planned',
    marker: 'Planned',
    title: 'Raid Reworks',
    when: '1.18.4',
    summary:
      '40 Player raids? 39 bots and you? Hell nah! Let\'s make them more manageable.',
    images: [
      { src: '/art/roadmap/raid_reworks.webp', alt: 'Raid Reworks' }
    ],
    items: [
      'Rework all 40 player raids to be 10 or 20 player raids.',
    ],
  },
  {
    status: 'horizon',
    marker: 'Horizon',
    title: 'Zone Improvements',
    when: 'TBD',
    summary:
      'Improvements to the zones. Turtle Wow created new zones, some are still missing polishing.',
    images: [
      { src: '/art/roadmap/Telabim.webp', alt: 'Zone Improvements' }
    ]
  },

  {
    status: 'horizon',
    marker: 'Horizon',
    title: 'New Raid: Caverns of Time: The Fight for Dalaran',
    when: 'TBD',
    summary:
      'A new raid set in the heart of Dalaran. Fight back against the blue dragonflight and defeat Malygos\' minions before it is too late.',
    images: [
      { src: '/art/roadmap/dalaran.webp', alt: 'Housing' }
    ]
  },
  {
    status: 'horizon',
    marker: 'Horizon',
    title: 'New Profession: Runecrafting',
    when: 'TBD',
    summary:
      'Learn to craft powerful runes and enchantments to enhance your gear.',
    images: [
      { src: '/art/roadmap/runecrafting.webp', alt: 'Housing' }
    ],
    items: [
      'Create runes that allow you to cast spells and abilities from other classes. Until the rune breaks...',
      'Create enchantments that allow you to enhance your gear with additional bonuses.',
    ]
  },
  {
    status: 'horizon',
    marker: 'Horizon',
    title: 'Shamelessly Stealing stuff from WoW Forever',
    when: 'TBD',
    summary:
      'They will hopefully at least have one good idea.',
    images: [
      { src: '/art/roadmap/steal_forever.webp', alt: 'Stealing Forever' }
    ],
  },
  {
    status: 'horizon',
    marker: 'Horizon',
    title: 'User Interface Improvements',
    when: 'TBD',
    summary:
      'Improvements to the Interface. Optional, toggleable in the settings.',
    images: [
      { src: '/art/roadmap/ui_improvements.webp', alt: 'UI' }
    ],
  },
  {
    status: 'horizon',
    marker: 'Horizon',
    title: 'New Raid: Emerald Nightmare',
    when: 'TBD',
    summary:
      'The Emerald Nightmare is a new raid that will test your skills against the Nightmares encroaching on the Emerald Dream.',
    images: [
      { src: '/art/roadmap/emerald_nightmare.webp', alt: 'Emerald Nightmare' }
    ]
  },
  {
    status: 'horizon',
    marker: 'Horizon',
    title: 'Better Controller Support',
    when: 'TBD',
    summary:
      'Better Controller Support for the game. Can I do it? Probably not, but I will try.',
    images: [
      { src: '/art/roadmap/controller_support.webp', alt: 'Controller Support' }
    ]
  },
  {
    status: 'horizon',
    marker: 'Horizon',
    title: 'Living Cities',
    when: 'TBD',
    summary:
      'Cities without players are boring. Let\'s make them more interesting. With the Living Cities, cities are denser populated with citizens, traders and more.',
    images: [
      { src: '/art/roadmap/living_cities.webp', alt: 'Living Cities' }
    ]
  },
  {
    status: 'horizon',
    marker: 'Horizon',
    title: 'Housing',
    when: 'TBD',
    summary:
      'The Housing system is will allow you to buy and customize your own home.',
    images: [
      { src: '/art/roadmap/housing.webp', alt: 'Housing' }
    ]
  }
];
