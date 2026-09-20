/**
 * Local screenshots live in /static/art/features/.
 *
 * Alignment (per use site, not here):
 *   --hero-position / card.position  →  CSS background-position
 *     'center' | '40% 20%' | 'right top'
 *     X: 0% left → 100% right.  Y: 0% top → 100% bottom.
 *   --hero-size / card.size          →  CSS background-size
 *     'cover' fills the box.  '130%' / '160%' zooms in.
 */
export const art = {
  races: '/art/features/races.webp',
  music: '/art/features/music.webp',
  lore: '/art/features/lore.webp',
  zones: '/art/features/zones.webp',
  classRace: '/art/features/class-race.webp',
  transport: '/art/features/transport.webp',
  survival: '/art/features/survival.webp',
  jewelcrafting: '/art/features/jewelcrafting.webp',
  materialStorage: '/art/material-storage/hero.webp',
  craftingOrders: '/art/crafting-orders/hero.webp',
  items: '/art/features/items.webp',
  itemization: '/art/features/itemization.webp',
  raids: '/art/features/raids.webp',
  arena: '/art/features/arena.webp',
  guildVaults: '/art/features/guild-vaults.webp',
  guildQuarters: '/art/features/guild-quarters.webp',
  guildQuartersHero: '/art/features/guild-quarters-hero.jpg',
  customization: '/art/features/customization.webp',
  pets: '/art/features/pets.webp',
  titles: '/art/features/titles.webp',
  transmog: '/art/features/transmog.webp',
  zul: '/art/features/zul.webp',
  ui: '/art/features/ui.webp',
  events: '/art/features/events.webp',
  challenges: '/art/features/challenges.webp',
  classes: '/art/features/classes.webp',
  world: '/art/features/world.webp',
  landscape: '/art/features/landscape.webp',
  mountSpeed: '/art/features/mount-speed.webp',
  guildBanks: '/art/features/guild-banks.webp'
} as const;
