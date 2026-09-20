import { base } from '$app/paths';
import { buildNewsRss } from '$lib/news/rss';
import type { RequestHandler } from '@sveltejs/kit';

export const prerender = true;

export const GET: RequestHandler = ({ url }) => {
  const body = buildNewsRss(`${url.origin}${base}`);

  return new Response(body, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'max-age=0, s-maxage=3600'
    }
  });
};
