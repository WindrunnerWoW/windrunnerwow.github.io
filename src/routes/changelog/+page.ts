import { getAllChangelogEntries } from '$lib/data/changelog';
import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = () => ({
  entries: getAllChangelogEntries()
});
