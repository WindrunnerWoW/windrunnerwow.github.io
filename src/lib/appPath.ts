import { base } from '$app/paths';

/** Strip `kit.paths.base` so route checks stay written as `/news`, `/changelog`, etc. */
export function appPath(path: string): string {
  if (!base) return path;
  if (path === base || path === `${base}/`) return '/';
  if (path.startsWith(`${base}/`)) return path.slice(base.length);
  return path;
}
