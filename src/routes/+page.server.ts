import type { PageServerLoad } from './$types';

/** Tag shown on the button, from this repo's latest GitHub release. */
const VERSION_RELEASE_API = 'https://api.github.com/repos/WindrunnerWoW/windrunner-wow/releases/latest';

/** Where the button sends people. Independent of the version above. */
const DOWNLOAD_HREF = 'https://github.com/WindrunnerWoW/windrunner-wow/releases/latest';

export const load: PageServerLoad = async () => {
  return {
    downloadVersion: await getLatestReleaseVersion(),
    downloadHref: DOWNLOAD_HREF
  };
};

async function getLatestReleaseVersion(): Promise<string | null> {
  try {
    const response = await fetch(VERSION_RELEASE_API, {
      headers: {
        Accept: 'application/vnd.github+json',
        'User-Agent': 'windrunner-website'
      }
    });
    if (!response.ok) return null;

    const body = await response.json();
    const version = String(body.tag_name || body.name || '')
      .trim()
      .replace(/^v/i, '');
    return version || null;
  } catch {
    return null;
  }
}
