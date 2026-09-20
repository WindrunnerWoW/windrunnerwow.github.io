import type { Talent, TalentTree } from './types';

export const TOTAL_POINTS = 51;
export const ROWS = 7;
export const COLS = 4;
export const SLOTS = ROWS * COLS;

export function emptyPoints(): number[][] {
  return [zeros(), zeros(), zeros()];
}

function zeros(): number[] {
  return Array.from({ length: SLOTS }, () => 0);
}

export function talentMap(tree: TalentTree): Map<number, Talent> {
  return new Map(tree.talents.map((talent) => [talent.i, talent]));
}

export function treeSpent(points: number[]): number {
  return points.reduce((sum, value) => sum + (value || 0), 0);
}

export function totalSpent(points: number[][]): number {
  return points.reduce((sum, tree) => sum + treeSpent(tree), 0);
}

export function pointsLeft(points: number[][]): number {
  return Math.max(0, TOTAL_POINTS - totalSpent(points));
}

export function requiredLevel(points: number[][]): number {
  const spent = totalSpent(points);
  return spent === 0 ? 1 : spent + 9;
}

export function rankAt(points: number[], slot: number): number {
  return points[slot] || 0;
}

export function rowOf(slot: number): number {
  return Math.floor(slot / COLS);
}

export function colOf(slot: number): number {
  return slot % COLS;
}

export function requiredRanks(talent: Talent, tree: TalentTree): number {
  if (talent.requires == null) return 0;
  if (talent.reqRanks != null) return talent.reqRanks;
  return talentMap(tree).get(talent.requires)?.ranks ?? 0;
}

export function prereqMet(talent: Talent, tree: TalentTree, points: number[]): boolean {
  if (talent.requires == null) return true;
  return rankAt(points, talent.requires) >= requiredRanks(talent, tree);
}

export function rowUnlocked(slot: number, points: number[]): boolean {
  return treeSpent(points) >= rowOf(slot) * 5;
}

export function canIncrement(
  talent: Talent,
  tree: TalentTree,
  treePoints: number[],
  allPoints: number[][]
): boolean {
  const value = rankAt(treePoints, talent.i);
  if (value >= talent.ranks) return false;
  if (pointsLeft(allPoints) <= 0) return false;
  if (!rowUnlocked(talent.i, treePoints)) return false;
  return prereqMet(talent, tree, treePoints);
}

export function dependents(slot: number, tree: TalentTree): Talent[] {
  return tree.talents.filter((talent) => talent.requires === slot);
}

export function canDecrement(talent: Talent, tree: TalentTree, treePoints: number[]): boolean {
  const value = rankAt(treePoints, talent.i);
  if (value <= 0) return false;

  if (dependents(talent.i, tree).some((other) => rankAt(treePoints, other.i) > 0)) {
    return false;
  }

  const pointsPerRow = Array.from({ length: ROWS }, (_, row) =>
    treePoints.slice(row * COLS, row * COLS + COLS).reduce((sum, n) => sum + (n || 0), 0)
  );
  const lastActiveRow = pointsPerRow.findLastIndex((total) => total > 0);
  const row = rowOf(talent.i);
  if (row === lastActiveRow || lastActiveRow < 0) return true;

  const extraByRow: number[] = [];
  let extra = 0;
  for (const rowTotal of pointsPerRow.slice(0, lastActiveRow)) {
    extra = rowTotal + extra - 5;
    extraByRow.push(extra);
  }
  return !extraByRow.slice(row).some((amount) => amount === 0);
}

export function increment(
  talent: Talent,
  tree: TalentTree,
  treeIndex: number,
  points: number[][]
): number[][] {
  if (!canIncrement(talent, tree, points[treeIndex], points)) return points;
  const next = clonePoints(points);
  next[treeIndex][talent.i] = rankAt(next[treeIndex], talent.i) + 1;
  return next;
}

export function decrement(
  talent: Talent,
  tree: TalentTree,
  treeIndex: number,
  points: number[][]
): number[][] {
  if (!canDecrement(talent, tree, points[treeIndex])) return points;
  const next = clonePoints(points);
  next[treeIndex][talent.i] = rankAt(next[treeIndex], talent.i) - 1;
  return next;
}

export function clearTree(treeIndex: number, points: number[][]): number[][] {
  const next = clonePoints(points);
  next[treeIndex] = zeros();
  return next;
}

export function clonePoints(points: number[][]): number[][] {
  return points.map((tree) => tree.slice());
}

export function talentState(
  talent: Talent,
  tree: TalentTree,
  treePoints: number[],
  allPoints: number[][]
): 'locked' | 'available' | 'invested' | 'maxed' {
  const value = rankAt(treePoints, talent.i);
  if (value >= talent.ranks) return 'maxed';
  if (value > 0) return 'invested';
  return canIncrement(talent, tree, treePoints, allPoints) ? 'available' : 'locked';
}

export function requirementLines(
  talent: Talent,
  tree: TalentTree,
  treePoints: number[]
): { text: string; met: boolean }[] {
  const lines: { text: string; met: boolean }[] = [];
  const row = rowOf(talent.i);
  if (row > 0) {
    const need = row * 5;
    lines.push({
      text: `Requires ${need} points in ${tree.name}`,
      met: treeSpent(treePoints) >= need
    });
  }
  if (talent.requires != null) {
    const required = talentMap(tree).get(talent.requires);
    if (required) {
      lines.push({
        text: `Requires ${required.name}`,
        met: prereqMet(talent, tree, treePoints)
      });
    }
  }
  return lines;
}

export function packPoints(points: number[][]): string {
  return points
    .map((tree) => {
      const trimmed = tree.slice();
      while (trimmed.length && !trimmed[trimmed.length - 1]) trimmed.pop();
      if (!trimmed.length) return '';
      let bits = trimmed.map((n) => (n || 0).toString(2).padStart(3, '0')).join('');
      if (bits.length % 8 !== 0) bits = bits.padEnd(bits.length + (8 - (bits.length % 8)), '0');
      const bytes = bits.match(/.{8}/g)?.map((byte) => parseInt(byte, 2)) ?? [];
      return bytesToBase64(bytes).replace(/=+$/, '');
    })
    .join('-');
}

export function unpackPoints(raw: string | null | undefined): number[][] {
  const empty = emptyPoints();
  if (!raw) return empty;
  const trees = raw.split('-');
  if (trees.length !== 3) return empty;
  return trees.map((tree, index) => {
    if (!tree) return empty[index];
    const padded = tree.padEnd(tree.length + ((4 - (tree.length % 4)) % 4), '=');
    try {
      const bits = [...base64ToBytes(padded)]
        .map((byte) => byte.toString(2).padStart(8, '0'))
        .join('');
      const ranks = (bits.match(/.{3}/g) ?? []).map((chunk) => parseInt(chunk, 2));
      const next = zeros();
      ranks.slice(0, SLOTS).forEach((rank, slot) => {
        next[slot] = Number.isFinite(rank) ? rank : 0;
      });
      return next;
    } catch {
      return empty[index];
    }
  });
}

function bytesToBase64(bytes: number[]): string {
  if (typeof btoa === 'function') {
    return btoa(String.fromCharCode(...bytes));
  }
  return Buffer.from(Uint8Array.from(bytes)).toString('base64');
}

function base64ToBytes(value: string): number[] {
  if (typeof atob === 'function') {
    return [...atob(value)].map((char) => char.charCodeAt(0));
  }
  return [...Buffer.from(value, 'base64')];
}

export function fillDescription(template: string, values: string[][], rank: number): string {
  return template.replace(/\{(\d+)\}/g, (_, index) => {
    const ranks = values[Number(index)] ?? [];
    if (!ranks.length) return '';
    if (rank <= 0) return `[${ranks.join('/')}]`;
    return `«${ranks[Math.min(rank, ranks.length) - 1]}»`;
  });
}

export type ArrowKind = 'down' | 'left' | 'right' | 'leftdown' | 'rightdown';

export function arrowKind(from: number, to: number): ArrowKind | null {
  const x1 = colOf(from);
  const y1 = rowOf(from);
  const x2 = colOf(to);
  const y2 = rowOf(to);
  if (x1 === x2 && y2 > y1) return 'down';
  if (y1 === y2 && x2 > x1) return 'right';
  if (y1 === y2 && x2 < x1) return 'left';
  if (y2 > y1 && x2 < x1) return 'leftdown';
  if (y2 > y1 && x2 > x1) return 'rightdown';
  return 'down';
}

export function arrowSpan(from: number, to: number): { rows: number; cols: number } {
  return {
    rows: Math.abs(rowOf(to) - rowOf(from)),
    cols: Math.abs(colOf(to) - colOf(from))
  };
}
