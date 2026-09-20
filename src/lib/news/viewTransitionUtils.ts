import { appPath } from '$lib/appPath';

export type TitleWord = {
  text: string;
  viewTransitionName: string;
  key: string;
};

export function wrapTitleWithViewTransitionNames(title: string, path = 'unknown'): TitleWord[] {
  if (!title) return [];

  const safePath = path.split('/').pop() || 'unknown';
  const wordCounts: Record<string, number> = {};

  return title
    .split(/\s+/)
    .filter(Boolean)
    .map((origWord) => {
      const word = origWord.toLocaleLowerCase().replace(/[^a-z0-9-_]/g, '') || 'word';
      const count = wordCounts[word] ?? 0;
      wordCounts[word] = count + 1;
      const uniqueName = `_${safePath}________${word}${count > 0 ? '___' + count : ''}`;

      return {
        text: origWord,
        viewTransitionName: uniqueName,
        key: uniqueName
      };
    });
}

export function isNewsArticlePath(path: string): boolean {
  return /^\/news\/[^/]+$/.test(appPath(path));
}

export function isNewsFlowPath(path: string): boolean {
  const route = appPath(path);
  return route === '/news' || isNewsArticlePath(route);
}

export function isNewsTitleTransition(fromPath: string, toPath: string): boolean {
  const from = appPath(fromPath);
  const to = appPath(toPath);
  if (isNewsArticlePath(to)) return true;
  if (isNewsArticlePath(from) && (to === '/news' || to === '/')) return true;
  return false;
}
