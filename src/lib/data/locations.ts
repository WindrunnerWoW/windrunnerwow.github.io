export type NewZone = {
  slug: string;
  name: string;
  level: string;
  copy: string;
  images: string[];
};

export type Subzone = {
  slug: string;
  name: string;
  copy: string;
  image: string;
};

export type ZoneAddition = {
  slug: string;
  name: string;
  map: string;
  subzones: Subzone[];
};

const z = (file: string) => `/art/locations/zones/${file}`;
const a = (file: string) => `/art/locations/additions/${file}`;

export const newZones: NewZone[] = [
  {
    slug: 'blackstone',
    name: 'Blackstone Island',
    level: '1–16',
    copy: 'After escaping from the lands of Stonetalon Mountains, the goblins of the Durotar Labor Union have succumbed to their biggest weakness: greed. They have seized control of an island rich in natural resources, but this new empire has been built on the backs of hopeful goblins who sought an escape from the clutches of the Venture Co. These new recruits found themselves trapped in a similar predicament again, only this time under new management. It is now your responsibility to break free from the chains of poverty and claim your rightful place in the Durotar Labor Union.',
    images: [z('blackstone.webp'), z('blackstone-1.webp'), z('blackstone-2.webp'), z('blackstone-3.webp')]
  },
  {
    slug: 'thalassian',
    name: 'Thalassian Highlands',
    level: '15–20',
    copy: "Located at the remote fringes of Quel'thalas, these lands were initially established as an outpost for Alah'Thalas. Over time, with your assistance, it has developed into a thriving city, complete with its own dock. However, one must not be deceived by the beauty of these lands, for lurking in the shadows are sinister forces, even within the city walls. This zone serves as the starting point for fledgling High Elves, offering a level 1–10 experience.",
    images: [z('thalassian.webp'), z('thalassian-1.webp'), z('thalassian-2.webp'), z('thalassian-3.webp')]
  },
  {
    slug: 'northwind',
    name: 'Northwind',
    level: '28–34',
    copy: 'Nestled in a vale north of Stormwind, Northwind is the cradle of nobility within the human kingdom. Commerce and trade runs high between its citizens and nobles, delivering quality goods to all regions of the Eastern Kingdom. Nowadays however, the verdant hills are riddled with vile fiends sowing chaos and destruction. Lord Amberwood, Ruler of Northwind, and his fellow nobles struggle to maintain order in their lands with the little military power they have left. Even so, the recent incursions are not the only darkness brewing in the vale...',
    images: [z('northwind.webp'), z('northwind-1.webp'), z('northwind-2.webp'), z('northwind-3.webp')]
  },
  {
    slug: 'balor',
    name: 'Balor',
    level: '29–34',
    copy: "Forgotten and mythical alike, this island off to the western shores of Elwynn and Westfall is an accursed place among the people of Stormwind. Burdened by a harrowed past, it was once a blooming trade port for the kingdom, before falling into the hands of the Old Horde during the First War. Held within the tight grip of Gul'dan's Shadow Council throughout the Second War, its shores now only beckon death as its cliffs and breaking waves call out to the restless souls beneath its surface.",
    images: [z('balor.webp'), z('balor-1.webp'), z('balor-2.webp'), z('balor-3.webp')]
  },
  {
    slug: 'grim-reaches',
    name: 'Grim Reaches',
    level: '33–38',
    copy: 'Hanging on the eastern cliffs of the Eastern Kingdoms, Grim Reaches has witnessed many conflicts between the Wildhammer Dwarves of Dun Kithas and the Dragonmaw Orcs. Though this strife stretches over decades, many things have changed as the years went by. The dwarves of the reaches have forgotten of their Wildhammer lineage, dwarven ruins of ages past litter the cliffs serving as camps for the Dragonmaw that yet remain in these lands and hints of corruption has started to show itself, coalescing in the southern end of these lands in a dark swamp named The Grim Hollows.',
    images: [z('grim-reaches.webp'), z('grim-reaches-1.webp'), z('grim-reaches-2.webp'), z('grim-reaches-3.webp')]
  },
  {
    slug: 'gilneas',
    name: 'Gilneas',
    level: '39–46',
    copy: 'Gilneas, once the proud home of a nation, now lies in ruins. Its despondent people struggle to survive, scavenging whatever scraps they can find from the remains. However, with the battered and broken gate of the Greymane Wall, the nation can now open its doors to the outside world, raising hope that Gilneas may flourish once more.',
    images: [z('gilneas.webp'), z('gilneas-1.webp')]
  },
  {
    slug: 'gillijim',
    name: "Gillijim's Isle",
    level: '48–53',
    copy: "Just south of the Island of Lapidis, Gillijim is home to several martial powers seeking dominance over the primal wilderness of this uncharted isle. The ogre clan of Mosh'ogg has settled long ago on Gillijim's Isle and is locked in an eternal conflict with the remaining troll tribes of Zul'Razar, struggling for sovereignty over the island.",
    images: [z('gillijim.webp'), z('gillijim-1.webp'), z('gillijim-2.webp'), z('gillijim-3.webp')]
  },
  {
    slug: 'lapidis',
    name: 'Island of Lapidis',
    level: '48–53',
    copy: 'Long has it been since explorers revealed stories of the great Isle of Gillijim, and the Island of Lapidis. Stories shared around the campfires of eager voyagers ready to make their mark upon the world. A place where trolls practiced shadow, a place where pirates called home and brewed ale to the cartload! Surely these tales and stories are just that, stories right? Is what the old travelers say true, are there really islands out there that beckon new adventurers?',
    images: [z('lapidis.webp')]
  },
  {
    slug: 'telabim',
    name: "Tel'abim",
    level: '54–60',
    copy: "Found off the eastern coast of Tanaris, Tel'abim stands as the center for banana export, overseen by the neutral Tel Company, Tel Co. for short. Recently the apes of the island have started a rebellion against the company, driving them off of collection sites and demolishing equipment. It's up to you to restore order to the island and help Tel Co. resume collection, or else Azeroth might never see another banana again.",
    images: [z('telabim.webp'), z('telabim-1.webp'), z('telabim-2.webp'), z('telabim-3.webp')]
  },
  {
    slug: 'hyjal',
    name: 'Hyjal',
    level: '56–60',
    copy: "Perched atop the peaks of Kalimdor, Hyjal has long been a sacred place for the Night Elves, serving as a constant watch against the horrors of the past. Archimonde's bones, a haunting reminder of the War of the Ancients, adorn Nordrassil. Recently, the once secluded Hyjal has opened its gates, beckoning for aid in the battle against the growing Nightmare and demonic corruption that plagues the mountain. It is crucial that we climb Mount Hyjal and join the fight against this evil, lest we return to the dark days of ten thousand years ago, or worse.",
    images: [z('hyjal.webp'), z('hyjal-1.webp'), z('hyjal-2.webp'), z('hyjal-3.webp')]
  }
];

export const zoneAdditions: ZoneAddition[] = [
  {
    slug: 'arathi',
    name: 'Arathi Highlands',
    map: a('arathi.webp'),
    subzones: [
      { slug: 'wildtusk-village', name: 'Wildtusk Village', image: a('wildtusk-village.webp'), copy: "Survivors of the razed Zul'Rasaz tribe seek Horde aid. The hamlet links to The Hinterlands via the winding Rasaz Trails." },
      { slug: 'ruins-zulrasaz', name: "Ruins of Zul'Rasaz", image: a('ruins-zulrasaz.webp'), copy: 'What remains of the grand Witherbark city, still fiercely protected by its tribe.' },
      { slug: 'livingstone-croft', name: 'Livingstone Croft', image: a('livingstone-croft.webp'), copy: 'Home of the Livingstone family, looking for adventurers to keep the farm safe and operational.' },
      { slug: 'gallant-square', name: 'Gallant Square', image: a('gallant-square.webp'), copy: 'Section of Stromgarde Keep reclaimed by the Arathi humans.' }
    ]
  },
  {
    slug: 'wetlands',
    name: 'Wetlands',
    map: a('wetlands.webp'),
    subzones: [
      { slug: 'hawks-vigil', name: "Hawk's Vigil", image: a('hawks-vigil.webp'), copy: "Mountain settlement bracing for a Scourge raid that never came, offers level 20–30 quests and a mystery chain echoing the Legend of Stalvan." },
      { slug: 'dun-agrath', name: 'Dun Agrath', image: a('dun-agrath.webp'), copy: "Sturdy dwarven outpost at the foot of Hawk's Vigil, providing shelter and modest trade." }
    ]
  },
  {
    slug: 'stranglethorn',
    name: 'Stranglethorn Vale',
    map: a('stranglethorn.webp'),
    subzones: [
      { slug: 'jaguero-isle', name: 'Jaguero Isle', image: a('jaguero-isle.webp'), copy: 'Bloodsail Buccaneers recruit daring pirates. Begin the swashbuckling initiation questline in Booty Bay before setting sail.' }
    ]
  },
  {
    slug: 'stormwind',
    name: 'Stormwind',
    map: a('stormwind.webp'),
    subzones: [
      { slug: 'stormwind-harbor', name: 'Stormwind Harbor', image: a('stormwind-harbor.webp'), copy: 'Bustling export hub and travel nexus, offering safe passage to Darkshore and Balor.' },
      { slug: 'kul-tiran-embassy', name: 'Kul Tiran Embassy', image: a('kul-tiran-embassy.webp'), copy: "Diplomatic outpost re-establishing ties with Stormwind. Kul Tirans' proud stubbornness may spark fresh tensions." },
      { slug: 'little-silvermoon', name: 'Little Silvermoon', image: a('little-silvermoon.webp'), copy: 'The street once called Cut-Throat Alley has been carved into a slice of home by the High Elf refugees that now inhabit it.' }
    ]
  },
  {
    slug: 'azshara',
    name: 'Azshara',
    map: a('azshara.webp'),
    subzones: [
      { slug: 'flaxwhisker-front', name: 'Flaxwhisker Front', image: a('flaxwhisker-front.webp'), copy: "Basecamp of the gnomish expedition sent from Gnomeregan before it was lost. They've been stranded here unaware of the tragedy that befell their home." },
      { slug: 'rethress-sanctum', name: 'Rethress Sanctum', image: a('rethress-sanctum.webp'), copy: "A naga royalty's remaining warband plots revenge against those that betrayed them." },
      { slug: 'bloodfist-point', name: 'Bloodfist Point', image: a('bloodfist-point.webp'), copy: "Forefront of the Horde's efforts to tame the haunted lands of Azshara." },
      { slug: 'ursolan', name: 'Ursolan', image: a('ursolan.webp'), copy: 'The subzone is now extended to include the cliffs above Timbermaw Hold, providing accommodation and supplies to their proven allies.' },
      { slug: 'timbermaw-gate', name: 'Timbermaw Gate', image: a('timbermaw-gate.webp'), copy: 'The way into the home of the Timbermaw now lays open, allowing passage into the new raid and also serving as an underground passage to Moonwhisper Coast.' }
    ]
  },
  {
    slug: 'thousand-needles',
    name: 'Thousand Needles',
    map: a('thousand-needles.webp'),
    subzones: [
      { slug: 'saghs-refuge', name: "Sagh's Refuge", image: a('saghs-refuge.webp'), copy: "A retreat inhabited by the Windhorn tribe after their ancestral home's invasion by the Grimtotem tribe." },
      { slug: 'ironstone-camp', name: 'Ironstone Camp', image: a('ironstone-camp.webp'), copy: 'The forward camp at the edge of the Shimmering Flats has been improved.' }
    ]
  },
  {
    slug: 'swamp-of-sorrows',
    name: 'Swamp of Sorrows',
    map: a('swamp-of-sorrows.webp'),
    subzones: [
      { slug: 'sorrowguard-keep', name: 'Sorrowguard Keep', image: a('sorrowguard-keep.webp'), copy: "A keep abandoned after the Second War, it has been reclaimed and repaired in secret by Watch Paladin Janathos' guard." }
    ]
  },
  {
    slug: 'durotar',
    name: 'Durotar',
    map: a('durotar.webp'),
    subzones: [
      { slug: 'anchors-edge', name: "Anchor's Edge", image: a('anchors-edge.webp'), copy: "Kul Tiran expedition led by Lt. Alverold settled in this southern isle, pushing forward scouts that threaten the Horde's claim over Durotar." },
      { slug: 'sparkwater-port', name: 'Sparkwater Port', image: a('sparkwater-port.webp'), copy: 'The town of the Durotar Trade Union that never truly sleeps.' }
    ]
  },
  {
    slug: 'stonetalon',
    name: 'Stonetalon Mountains',
    map: a('stonetalon.webp'),
    subzones: [
      { slug: 'bramblethorn-pass', name: 'Bramblethorn Pass', image: a('bramblethorn-pass.webp'), copy: 'Quilboar flee a rising evil, sealing the southern gorge to escape restless spirits haunting the cliffs.' },
      { slug: 'bael-hardul', name: 'Bael Hardul', image: a('bael-hardul.webp'), copy: "Re-occupied dwarf stronghold used by the Explorers' League to probe Kalimdor-linked ancestry and mountain secrets." },
      { slug: 'blacksand-oil', name: 'Blacksand Oil Fields', image: a('blacksand-oil.webp'), copy: 'Venture Co. drills greedily, spilling black gold and ravaging the landscape.' },
      { slug: 'venture-camp', name: 'Venture Camp & Broken Cliff Mine', image: a('venture-camp.webp'), copy: 'Venture Co. probes the valley for lost workers, draining resources while chasing rumors of hidden treasure.' },
      { slug: 'powder-town', name: 'Powder Town', image: a('powder-town.webp'), copy: "Former Venture camp now under the Durotar Labor Union's sway. Investigate the town's volatile loyalties and the origin of its name." },
      { slug: 'earthen-ring', name: 'Earthen Ring', image: a('earthen-ring.webp'), copy: 'Massive shamanistic order, their ritual site is a sanctuary to all that labor to restore balance to Azeroth.' }
    ]
  },
  {
    slug: 'badlands',
    name: 'Badlands',
    map: a('badlands.webp'),
    subzones: [
      { slug: 'crystalline-oasis', name: 'Crystalline Oasis', image: a('crystalline-oasis.webp'), copy: 'The sole water source, guarded by a shimmering crystal studied by the Blue Dragonflight.' },
      { slug: 'redbrands-digsite', name: "Redbrand's Digsite", image: a('redbrands-digsite.webp'), copy: "Noble Redbrand Estate's excavation overrun by troggs, dwarven relics lie beneath the rubble." },
      { slug: 'angor-digsite', name: 'Angor Digsite', image: a('angor-digsite.webp'), copy: 'Dark Iron miners scour the hilltop for forgotten artifacts, risking ancient curses.' },
      { slug: 'ruins-corthan', name: 'Ruins of Corthan', image: a('ruins-corthan.webp'), copy: 'Ancient citadel of a forgotten king, now examined by Earthen scholars eager to catalog its secrets for an unknown purpose.' },
      { slug: 'scalebane-ridge', name: 'Scalebane Ridge', image: a('scalebane-ridge.webp'), copy: 'Greedy dwarf whelps and dragon hunters carve a treacherous ridge, hunting drake trophies and dark-iron riches amid scorching cliffs.' }
    ]
  },
  {
    slug: 'feralas',
    name: 'Feralas',
    map: a('feralas.webp'),
    subzones: [
      { slug: 'thalanaar', name: 'Thalanaar', image: a('thalanaar.webp'), copy: "Once a modest elven outpost, now a sizable Sentinel base contesting Shandris Feathermoon's influence across the region." },
      { slug: 'chimaera-roost', name: 'Chimaera Roost Vale', image: a('chimaera-roost.webp'), copy: 'Once abandoned after the Third War, the forgotten roost finds hope in the determined efforts of night elf Velos, who strives to restore its former glory.' }
    ]
  },
  {
    slug: 'felwood',
    name: 'Felwood',
    map: a('felwood.webp'),
    subzones: [
      { slug: 'talonbranch-glade', name: 'Talonbranch Glade', image: a('talonbranch-glade.webp'), copy: "Druids work to emulate the purification done by the ancient Ethwyr's sacrifice, but hidden motives stir beneath the verdant canopy." },
      { slug: 'shrine-betrayer', name: 'Shrine of the Betrayer', image: a('shrine-betrayer.webp'), copy: 'Millennia-old Illidan statue reclaimed by blood elves and a lone demon hunter, a beacon of defiance.' }
    ]
  },
  {
    slug: 'ashenvale',
    name: 'Ashenvale',
    map: a('ashenvale.webp'),
    subzones: [
      { slug: 'forest-song', name: 'Forest Song', image: a('forest-song.webp'), copy: 'Reinforced elven shrine where sentinels and druids clash with the Warsong Clan. Internal disputes threaten their fragile alliance.' }
    ]
  },
  {
    slug: 'dustwallow',
    name: 'Dustwallow Marsh',
    map: a('dustwallow.webp'),
    subzones: [
      { slug: 'deserters-hideout', name: "Deserter's Hideout", image: a('deserters-hideout.webp'), copy: 'Kul Tiran loyalists that defected from Theramore plot from this hidden encampment.' },
      { slug: 'shady-rest', name: 'Shady Rest Inn', image: a('shady-rest.webp'), copy: "Finale of the inn's saga unfolds, leaving more questions than answers amid the marsh's mist." },
      { slug: 'blackhorn-village', name: 'Blackhorn Village', image: a('blackhorn-village.webp'), copy: 'Grimtotem-tainted Tauren stir trouble, threatening nearby settlements.' },
      { slug: 'westhaven-hollow', name: 'Westhaven Hollow', image: a('westhaven-hollow.webp'), copy: "Former Kul Tiran colony now cursed by an orc necromancer's dark rites." },
      { slug: 'hermit-coast', name: 'Hermit of the Eastern Coast', image: a('hermit-coast.webp'), copy: "A solitary mountain house stands watch over the sea's endless horizon." }
    ]
  },
  {
    slug: 'tanaris',
    name: 'Tanaris',
    map: a('tanaris.webp'),
    subzones: [
      { slug: 'caverns-time', name: 'The Caverns of Time', image: a('caverns-time.webp'), copy: "The caverns' passage lays open, allowing access to pivotal moments in Azeroth's history." },
      { slug: 'slickwick-oil', name: 'Slickwick Oil Rig', image: a('slickwick-oil.webp'), copy: 'Goblin-run Durotar Labor Union operation in southwestern sands, greed-driven and ever-expanding.' },
      { slug: 'sandmoon-village', name: 'Sandmoon Village', image: a('sandmoon-village.webp'), copy: "Hidden home of a small sect of Sandfury trolls aware of their tribe's corruption." }
    ]
  },
  {
    slug: 'dun-morogh',
    name: 'Dun Morogh',
    map: a('dun-morogh.webp'),
    subzones: [
      { slug: 'rugford-mountain', name: "Rugford's Mountain Rest", image: a('rugford-mountain.webp'), copy: 'Once a warm inn for Ironforge climbers, now overrun by Dark Iron marauders sowing chaos.' },
      { slug: 'gnomeregan-facility', name: 'Gnomeregan Reclamation Facility', image: a('gnomeregan-facility.webp'), copy: "Fruit of gnomekind's collective efforts, it serves as their new primary home and a step forward for Gnomeregan's reclamation." }
    ]
  },
  {
    slug: 'mulgore',
    name: 'Mulgore',
    map: a('mulgore.webp'),
    subzones: [
      { slug: 'redcloud-roost', name: 'Redcloud Roost', image: a('redcloud-roost.webp'), copy: "Found atop a spire at the Red Cloud Mesa, it's here where fledgling wyverns are trained to transport passengers around Kalimdor." },
      { slug: 'suntail-pass', name: 'Suntail Pass', image: a('suntail-pass.webp'), copy: 'A place of pilgrimage for a few spiritwalkers, it also serves as a mostly safe passage to the Barrens.' }
    ]
  },
  {
    slug: 'teldrassil',
    name: 'Teldrassil',
    map: a('teldrassil.webp'),
    subzones: [
      { slug: 'ursan-heights', name: 'Ursan Heights', image: a('ursan-heights.webp'), copy: 'A secluded Furbolg refuge high in the branches, untouched until recent incursions disturbed its tranquil balance.' }
    ]
  },
  {
    slug: 'eastern-plaguelands',
    name: 'Eastern Plaguelands',
    map: a('eastern-plaguelands.webp'),
    subzones: [
      { slug: 'forlorn-summit', name: 'Forlorn Summit', image: a('forlorn-summit.webp'), copy: "An abandoned outpost where Prince Arthas plotted the Culling of Stratholme, now a breeding ground for Kel'thuzad's cult." }
    ]
  },
  {
    slug: 'burning-steppes',
    name: 'Burning Steppes',
    map: a('burning-steppes.webp'),
    subzones: [
      { slug: 'karfang-hold', name: 'Karfang Hold', image: a('karfang-hold.webp'), copy: 'Home of the Blackrock made aware of their position as puppets of the Black Dragonflight, they now ally themselves with the New Horde.' },
      { slug: 'hateforge-excavation', name: 'Hateforge Excavation', image: a('hateforge-excavation.webp'), copy: 'Digsite that precedes Hateforge Quarry proper, it is no less busy than the quarry where insidious plots brew.' }
    ]
  },
  {
    slug: 'tirisfal',
    name: 'Tirisfal Glades',
    map: a('tirisfal.webp'),
    subzones: [
      { slug: 'tirisfal-uplands', name: 'Tirisfal Uplands', image: a('tirisfal-uplands.webp'), copy: 'The Forsaken have mobilized into this western region to cement their claim over the Glades. The Lordaeron remnants are not keen on giving up what remains of their homeland.' }
    ]
  },
  {
    slug: 'westfall',
    name: 'Westfall',
    map: a('westfall.webp'),
    subzones: [
      { slug: 'gartside-plot', name: 'Gartside Plot', image: a('gartside-plot.webp'), copy: 'Humble abode of Maltimore Gartside. The old man seeks aid in dealing with the harvest golem problems that plague Westfall.' },
      { slug: 'westfall-church', name: 'The Westfall Church', image: a('westfall-church.webp'), copy: 'The old church of Westfall is closed.' }
    ]
  }
];
