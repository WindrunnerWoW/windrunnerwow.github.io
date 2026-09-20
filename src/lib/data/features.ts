import { art } from './art';

export type Feature = {
  slug: string;
  href?: string;
  eyebrow: string;
  title: string;
  summary: string;
  image: string;
  /** CSS background-position, e.g. 'center' or '40% 20%' */
  position?: string;
  /** CSS background-size, e.g. 'cover' or '140%' */
  size?: string;
};

export const worldFeatures: Feature[] = [
  { slug: 'zones', href: '/new-locations-and-maps', eyebrow: 'ZONES', title: 'Old places, new stories.', summary: 'New lands and careful additions to underused corners of Azeroth, matched to the original art direction.', image: art.zones },
  { slug: 'lore', href: '/new-factions-and-quests', eyebrow: 'LORE & FACTIONS', title: 'New factions, grounded in Vanilla.', summary: 'Meet new factions, characters and quests that grow out of the original lore.', image: art.lore },
  { slug: 'transport', href: '/additional-transport-routes', eyebrow: 'TRAVEL', title: 'New routes across Azeroth.', summary: 'Reach forgotten corners with new flight paths, boats and overland connections.', image: art.transport },
  { slug: 'mount-speed', href: '/dynamic-mount-speed', eyebrow: 'TRAVEL', title: 'Mounts that grow with you.', summary: 'Riding speed scales with your journey so travel stays useful from the first mount onward.', image: art.mountSpeed },
  { slug: 'events', href: '/seasonal-events', eyebrow: 'SEASONAL EVENTS', title: 'Reasons to return.', summary: 'Holiday quests, beach days and rocket races keep the world moving all year.', image: art.events },
  { slug: 'sound', href: '/sound-design', eyebrow: 'MUSIC & SOUND', title: 'A richer soundscape.', summary: 'New music and ambient work that brings familiar corners of Azeroth closer.', image: art.music }
];

export const features: Feature[] = [
  { slug: 'world', eyebrow: 'WORLD DESIGN', title: 'Azeroth expanded', summary: 'New places and discoveries are designed to feel like they were always part of the original world.', image: art.world },
  { slug: 'classes', eyebrow: 'CLASS DESIGN', title: 'More viable choices, familiar identities.', summary: 'Class and spec changes aim to broaden viable solo play without erasing the original Vanilla feel.', image: art.classes },
  { slug: 'professions', eyebrow: 'PROFESSIONS', title: 'Crafting that matters while leveling.', summary: 'Two primary crafts, gathering as secondaries, plus Jewelcrafting, Survival, crafting orders, and material storage.', image: art.survival },
  { slug: 'itemization', eyebrow: 'ITEMIZATION', title: 'Rewards with purpose.', summary: 'Adjusted and new rewards create more meaningful choices while keeping classic items relevant.', image: art.itemization },
  { slug: 'zones', href: '/new-locations-and-maps', eyebrow: 'ZONES', title: 'Old places, new stories.', summary: 'Underused areas can receive careful additions that match the original art direction and tone.', image: art.zones },
  { slug: 'talents', eyebrow: 'TALENTS', title: 'Plan builds that fit the journey.', summary: 'A dedicated build planner supports class changes and makes experimentation easy.', image: art.classes },
  { slug: 'raids', href: '/raids-and-dungeons', eyebrow: 'DUNGEONS', title: 'Familiar doors, new threats.', summary: 'Optional routes and encounters add depth to classic dungeons and raids.', image: art.raids },
  { slug: 'challenges', href: '/challenges', eyebrow: 'CHALLENGES', title: 'A journey with a twist.', summary: 'Change the rules of leveling and earn visible proof of an unusual adventure.', image: art.challenges },
  { slug: 'events', href: '/seasonal-events', eyebrow: 'SEASONAL EVENTS', title: 'Reasons to return.', summary: 'Holiday quests, beach days and rocket races keep the world moving all year.', image: art.events }
];
