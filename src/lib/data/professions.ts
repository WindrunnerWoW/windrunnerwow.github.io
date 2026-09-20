import { art } from './art';
import type { Feature } from './features';

export const professionFeatures: Feature[] = [
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
    summary:
      'Camp, fish, and grow crops on the trail. Tents, boats, campfires, and planters sit alongside Cooking and First Aid.',
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
      'Unlock dedicated storage at any banker for 250 gold. Keep nearly unlimited crafting materials out of your bags and bank.',
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
];
