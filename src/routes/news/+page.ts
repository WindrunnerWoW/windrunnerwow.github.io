import { getNewsSummaries } from '$lib/news/posts';
import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = () => {
  return {
    newsPosts: getNewsSummaries()
  };
};
