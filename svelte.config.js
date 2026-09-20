import adapter from '@sveltejs/adapter-static';

const base = process.env.BASE_PATH ?? '';

export default {
  kit: {
    paths: { base },
    adapter: adapter({
      fallback: '404.html'
    }),
    prerender: {
      origin: process.env.PUBLIC_SITE_URL || 'http://localhost:5173',
      handleHttpError: ({ message }) => {
        if (message.includes('does not begin with `base`')) return;
        throw new Error(message);
      }
    }
  }
};
