<script lang="ts">
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';
  import { classIconSrc, classInfo, classInfoMap, talentClassMap } from '$lib/talents/data';
  import {
    clearTree,
    decrement,
    emptyPoints,
    fillDescription,
    increment,
    packPoints,
    pointsLeft,
    rankAt,
    requiredLevel,
    requirementLines,
    totalSpent,
    treeSpent,
    unpackPoints
  } from '$lib/talents/engine';
  import type { Talent, TalentClass, TalentTree } from '$lib/talents/types';
  import TalentTreeView from './TalentTree.svelte';

  export let slug: string;
  export let pointsParam: string | null = null;

  const classData: TalentClass = talentClassMap[slug];
  const info = classInfoMap[slug];

  let points = unpackPoints(pointsParam);
  let copied = false;
  let ready = false;
  let tooltip: {
    talent: Talent;
    tree: TalentTree;
    treeIndex: number;
    x: number;
    y: number;
  } | null = null;

  onMount(() => {
    points = unpackPoints(new URLSearchParams(window.location.search).get('points') ?? pointsParam);
    ready = true;
  });

  $: spent = [0, 1, 2].map((index) => treeSpent(points[index]));
  $: left = pointsLeft(points);
  $: level = requiredLevel(points);
  $: used = totalSpent(points);

  $: if (browser && ready && classData) {
    const packed = packPoints(points);
    const url = packed === packPoints(emptyPoints())
      ? `/talents/${slug}`
      : `/talents/${slug}?points=${encodeURIComponent(packed)}`;
    if (`${location.pathname}${location.search}` !== url) {
      history.replaceState(history.state, '', url);
    }
  }

  function add(treeIndex: number, tree: TalentTree, talent: Talent) {
    points = increment(talent, tree, treeIndex, points);
  }

  function remove(treeIndex: number, tree: TalentTree, talent: Talent) {
    points = decrement(talent, tree, treeIndex, points);
  }

  function resetTree(treeIndex: number) {
    points = clearTree(treeIndex, points);
  }

  function hover(treeIndex: number, tree: TalentTree, talent: Talent, event: MouseEvent) {
    tooltip = { talent, tree, treeIndex, x: event.clientX, y: event.clientY };
  }

  function move(event: MouseEvent) {
    if (!tooltip) return;
    tooltip = { ...tooltip, x: event.clientX, y: event.clientY };
  }

  function leave() {
    tooltip = null;
  }

  async function share() {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      window.prompt('Copy this build URL', url);
    }
    copied = true;
    setTimeout(() => (copied = false), 1600);
  }

  function tooltipParts(current = tooltip, currentPoints = points) {
    if (!current) return null;
    const { talent, tree, treeIndex } = current;
    const value = rankAt(currentPoints[treeIndex], talent.i);
    return {
      value,
      current: fillDescription(talent.description, talent.values, value),
      next:
        value > 0 && value < talent.ranks
          ? fillDescription(talent.description, talent.values, value + 1)
          : null,
      lines: requirementLines(talent, tree, currentPoints[treeIndex])
    };
  }

  $: parts = tooltipParts(tooltip, points);
  $: tooltipStyle = tooltip
    ? `left:${Math.min(tooltip.x + 18, (browser ? window.innerWidth : 1200) - 280)}px;top:${Math.min(tooltip.y + 18, (browser ? window.innerHeight : 800) - 20)}px`
    : '';

  function highlight(text: string) {
    const chunks: { text: string; hl: boolean }[] = [];
    const re = /\[([^[\]]+)\]|«([^»]+)»/g;
    let last = 0;
    let match: RegExpExecArray | null;
    while ((match = re.exec(text))) {
      if (match.index > last) chunks.push({ text: text.slice(last, match.index), hl: false });
      chunks.push({ text: match[1] != null ? match[0] : match[2], hl: true });
      last = match.index + match[0].length;
    }
    if (last < text.length) chunks.push({ text: text.slice(last), hl: false });
    return chunks.length ? chunks : [{ text, hl: false }];
  }
</script>

<div class="calculator" style="--class-color:{info?.color ?? '#c9a24d'}">
  <nav class="class-bar" aria-label="Classes">
    {#each classInfo as cls}
      <a
        href="/talents/{cls.slug}"
        class:active={cls.slug === slug}
        style="--c:{cls.color}"
        on:click={(event) => {
          if (cls.slug === slug) event.preventDefault();
        }}
      >
        <img src={classIconSrc(cls.slug)} alt="" />
        <span>{cls.name}</span>
      </a>
    {/each}
  </nav>

  <div class="summary">
    <div class="identity">
      <img src={classIconSrc(slug)} alt="" />
      <div>
        <p class="kicker">Talent calculator</p>
        <h1>{classData.name}</h1>
      </div>
      <strong class="spread" style="color:{info?.color}">{spent.join(' / ')}</strong>
    </div>
    <div class="meta">
      {#if used}
        <span>Level {level}</span>
      {/if}
      <span>Points left <b>{left}</b></span>
      <button type="button" on:click={share}>{copied ? 'Copied' : 'Share'}</button>
    </div>
  </div>

  <p class="hint">Left-click to add a point. Right-click to remove. The URL updates as you build, so you can copy and share it.</p>

  <div class="trees">
    {#each classData.trees as tree, treeIndex}
      <TalentTreeView
        {tree}
        {treeIndex}
        points={points[treeIndex]}
        allPoints={points}
        onAdd={(talent) => add(treeIndex, tree, talent)}
        onRemove={(talent) => remove(treeIndex, tree, talent)}
        onClear={() => resetTree(treeIndex)}
        onHover={(talent, event) => hover(treeIndex, tree, talent, event)}
        onLeave={leave}
        onMove={move}
      />
    {/each}
  </div>
</div>

{#if tooltip && parts}
  <div class="tooltip" style={tooltipStyle}>
    <h4>{tooltip.talent.name}</h4>
    <p class="rank">Rank {parts.value}/{tooltip.talent.ranks}</p>
    <p class="desc">{#each highlight(parts.current) as chunk}<span class:hl={chunk.hl}>{chunk.text}</span>{/each}</p>
    {#if parts.next}
      <p class="next-label">Next rank:</p>
      <p class="desc next">{#each highlight(parts.next) as chunk}<span class:hl={chunk.hl}>{chunk.text}</span>{/each}</p>
    {/if}
    {#each parts.lines as line}
      <p class="req" class:met={line.met}>{line.text}</p>
    {/each}
  </div>
{/if}

<style>
  .calculator {
    padding: 128px clamp(16px, 4vw, 64px) 80px;
  }

  .class-bar {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 6px;
    margin-bottom: 28px;
    padding: 12px 10px;
    border: 1px solid #332b1c;
    background: #0c0f10;
  }

  .class-bar a {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    min-width: 76px;
    padding: 8px 6px 6px;
    color: var(--c);
    text-decoration: none;
    opacity: 0.62;
    font: 10px/1 var(--font-ui);
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .class-bar a.active {
    opacity: 1;
    background: rgba(255, 255, 255, 0.04);
    box-shadow: inset 0 0 0 1px rgba(198, 160, 74, 0.45);
  }

  .class-bar a:hover {
    opacity: 1;
    background: rgba(255, 255, 255, 0.03);
  }

  .class-bar img {
    width: 42px;
    height: 42px;
    object-fit: contain;
    filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.5));
  }

  .summary {
    display: flex;
    flex-wrap: wrap;
    align-items: end;
    justify-content: space-between;
    gap: 18px;
    margin-bottom: 10px;
  }

  .identity {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .identity img {
    width: 52px;
    height: 52px;
    object-fit: contain;
  }

  h1 {
    margin: 0;
    font-size: clamp(32px, 5vw, 52px);
    line-height: 0.9;
    text-transform: uppercase;
    color: #ded3bb;
  }

  .spread {
    font: 500 22px/1 var(--font-heading);
    margin-left: 8px;
  }

  .meta {
    display: flex;
    align-items: center;
    gap: 14px;
    color: #9c9487;
    font: 12px var(--font-ui);
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  .meta b {
    color: #e0c36a;
    font-weight: 600;
  }

  .meta button {
    border: 1px solid #80663a;
    background: transparent;
    color: #c7b382;
    padding: 8px 12px;
    cursor: pointer;
    text-transform: uppercase;
    font: 10px var(--font-ui);
    letter-spacing: 0.14em;
  }

  .hint {
    max-width: 720px;
    margin: 0 0 22px;
    color: #8d8578;
    font: 15px/1.6 var(--font-body);
  }

  .trees {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: start;
    gap: 14px;
    padding-bottom: 8px;
  }

  .tooltip {
    position: fixed;
    z-index: 80;
    width: min(340px, calc(100vw - 24px));
    padding: 12px 14px 14px;
    border: 1px solid #6d5931;
    background: rgba(8, 10, 11, 0.94);
    box-shadow: 0 18px 40px rgba(0, 0, 0, 0.45);
    pointer-events: none;
  }

  .tooltip h4 {
    margin: 0 0 4px;
    color: #e0c36a;
    font: 500 16px/1.2 var(--font-heading);
  }

  .tooltip .rank {
    margin: 0 0 8px;
    color: #fff;
    font: 12px var(--font-ui);
  }

  .tooltip .desc {
    margin: 0;
    color: #e8e0d2;
    white-space: pre-wrap;
    font: 13px/1.55 var(--font-ui);
  }

  .tooltip .next-label {
    margin: 10px 0 4px;
    color: #e0c36a;
    font: 12px var(--font-ui);
  }

  .tooltip .hl {
    color: #54d46a;
  }

  .tooltip .req {
    margin: 8px 0 0;
    color: #d35d5d;
    font: 12px var(--font-ui);
  }

  .tooltip .req.met {
    color: #54d46a;
  }

  @media (max-width: 980px) {
    .trees {
      display: flex;
    }
  }
</style>
