import druid from '$lib/data/talents/druid.json';
import hunter from '$lib/data/talents/hunter.json';
import mage from '$lib/data/talents/mage.json';
import paladin from '$lib/data/talents/paladin.json';
import priest from '$lib/data/talents/priest.json';
import rogue from '$lib/data/talents/rogue.json';
import shaman from '$lib/data/talents/shaman.json';
import warlock from '$lib/data/talents/warlock.json';
import warrior from '$lib/data/talents/warrior.json';
import type { ClassInfo, TalentClass } from './types';

export const talentClasses = [
  warrior,
  paladin,
  hunter,
  rogue,
  priest,
  shaman,
  mage,
  warlock,
  druid
] as TalentClass[];

export const talentClassMap: Record<string, TalentClass> = Object.fromEntries(
  talentClasses.map((cls) => [cls.slug, cls])
);

export const classInfo: ClassInfo[] = [
  { slug: 'warrior', name: 'Warrior', color: '#C79C6E' },
  { slug: 'paladin', name: 'Paladin', color: '#F58CBA' },
  { slug: 'hunter', name: 'Hunter', color: '#ABD473' },
  { slug: 'rogue', name: 'Rogue', color: '#FFF569' },
  { slug: 'priest', name: 'Priest', color: '#FFFFFF' },
  { slug: 'shaman', name: 'Shaman', color: '#0070DE' },
  { slug: 'mage', name: 'Mage', color: '#40C7EB' },
  { slug: 'warlock', name: 'Warlock', color: '#8787ED' },
  { slug: 'druid', name: 'Druid', color: '#FF7D0A' }
];

export const classInfoMap: Record<string, ClassInfo> = Object.fromEntries(
  classInfo.map((info) => [info.slug, info])
);

export const classIconSrc = (slug: string) => `/art/classes/${slug}.png`;

export const talentIconSrc = (icon: string) => `/art/talents/${icon.toLowerCase()}.png`;
