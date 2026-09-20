import { error } from '@sveltejs/kit';
import { getAllChangelogEntries, getChangelogEntry } from '$lib/data/changelog';
import type { EntryGenerator, PageLoad } from './$types';

export const prerender = true;

export const entries: EntryGenerator = () =>
  getAllChangelogEntries().map((entry) => ({ slug: entry.slug }));

export const load: PageLoad = ({ params }) => {
  const entry = getChangelogEntry(params.slug);

  if (!entry) {
    error(404, 'Changelog entry not found');
  }

  return { entry };
};
