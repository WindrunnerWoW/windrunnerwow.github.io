import { appPath } from '$lib/appPath';

export type ChangelogTransitionDirection = 'expand' | 'collapse';

export function isChangelogEntryPath(path: string): boolean {
  return /^\/changelog\/[^/]+$/.test(appPath(path));
}

export function isChangelogFlowPath(path: string): boolean {
  const route = appPath(path);
  return route === '/changelog' || isChangelogEntryPath(route);
}

export function getChangelogTransitionDirection(
  fromPath: string,
  toPath: string
): ChangelogTransitionDirection | null {
  const from = appPath(fromPath);
  const to = appPath(toPath);
  if (from === '/changelog' && isChangelogEntryPath(to)) return 'expand';
  if (isChangelogEntryPath(from) && to === '/changelog') return 'collapse';
  return null;
}

export function getChangelogTransitionSlug(fromPath: string, toPath: string): string | null {
  const from = appPath(fromPath);
  const to = appPath(toPath);
  const entryPath = isChangelogEntryPath(to) ? to : isChangelogEntryPath(from) ? from : '';
  return entryPath ? decodeURIComponent(entryPath.split('/').pop() ?? '') : null;
}
