export const prerender = true;

const slugs = [
  'warrior',
  'paladin',
  'hunter',
  'rogue',
  'priest',
  'shaman',
  'mage',
  'warlock',
  'druid'
];

export function entries() {
  return slugs.map((slug) => ({ slug }));
}

export function load({ params }: { params: { slug: string } }) {
  return {
    slug: params.slug,
    pointsParam: null
  };
}
