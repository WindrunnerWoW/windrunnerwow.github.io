import { error } from '@sveltejs/kit';
import {
  attachHeadingAnchors,
  formatMarkdown,
  getAllNewsPosts,
  getNewsPost,
  stripTitleHeading
} from '$lib/news/posts';
import type { EntryGenerator, PageLoad } from './$types';

export const prerender = true;

export const entries: EntryGenerator = () => {
  return getAllNewsPosts().map((post) => ({ slug: post.slug }));
};

export const load: PageLoad = ({ params }) => {
  const post = getNewsPost(params.slug);

  if (!post) {
    error(404, 'Post not found');
  }

  const { html, headings } = attachHeadingAnchors(
    formatMarkdown(stripTitleHeading(post.content, post.title))
  );

  return {
    post: {
      slug: post.slug,
      title: post.title,
      date: post.date,
      category: post.category,
      description: post.description,
      image: post.image,
      discussion: post.discussion,
      html,
      headings
    }
  };
};
