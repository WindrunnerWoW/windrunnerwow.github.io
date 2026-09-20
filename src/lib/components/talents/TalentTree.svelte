<script lang="ts">
  import type { Talent, TalentTree } from '$lib/talents/types';
  import { talentIconSrc } from '$lib/talents/data';
  import {
    arrowKind,
    arrowSpan,
    prereqMet,
    rankAt,
    requiredRanks,
    talentState
  } from '$lib/talents/engine';

  export let tree: TalentTree;
  export let treeIndex: number;
  export let points: number[];
  export let allPoints: number[][];
  export let onAdd: (talent: Talent) => void;
  export let onRemove: (talent: Talent) => void;
  export let onClear: () => void;
  export let onHover: (talent: Talent, event: MouseEvent, node: HTMLElement) => void;
  export let onLeave: () => void;
  export let onMove: (event: MouseEvent) => void;

  const slots = Array.from({ length: 28 }, (_, i) => i);
  const bySlot = new Map(tree.talents.map((talent) => [talent.i, talent]));

  function handleClick(_event: MouseEvent, talent: Talent) {
    onAdd(talent);
  }
</script>

<section class="tree">
  <header>
    <img src={talentIconSrc(tree.icon)} alt="" />
    <div>
      <strong>{tree.name}</strong>
      <small>{points.reduce((sum, n) => sum + (n || 0), 0)} / {tree.maxPoints}</small>
    </div>
  </header>

  <div class="grid" role="group" aria-label="{tree.name} talents">
    {#each slots as slot}
      {@const talent = bySlot.get(slot)}
      {#if !talent}
        <div class="empty"></div>
      {:else}
        {@const value = rankAt(points, talent.i)}
        {@const state = talentState(talent, tree, points, allPoints)}
        {@const kind = talent.requires != null ? arrowKind(talent.requires, talent.i) : null}
        {@const span = talent.requires != null ? arrowSpan(talent.requires, talent.i) : null}
        {@const lit = talent.requires != null && prereqMet(talent, tree, points) && rankAt(points, talent.requires) >= requiredRanks(talent, tree)}
        <div class="cell" data-tree={treeIndex}>
          {#if kind && span}
            <span class="arrow {kind}" class:on={lit} style="--rows:{span.rows};--cols:{span.cols}"></span>
          {/if}
          <button
            type="button"
            class="node {state}"
            class:active={value > 0}
            aria-label="{talent.name} {value}/{talent.ranks}"
            on:click={(event) => handleClick(event, talent)}
            on:contextmenu|preventDefault={() => onRemove(talent)}
            on:mouseenter={(event) => onHover(talent, event, event.currentTarget)}
            on:mousemove={onMove}
            on:mouseleave={onLeave}
            on:focus={(event) => onHover(talent, event, event.currentTarget)}
            on:blur={onLeave}
          >
            <img src={talentIconSrc(talent.icon)} alt="" draggable="false" />
            <span class="rank">{value}/{talent.ranks}</span>
          </button>
        </div>
      {/if}
    {/each}
  </div>

  <button class="clear" type="button" on:click={onClear}>Clear points</button>
</section>

<style>
  .tree {
    width: calc(4 * 48px + 3 * 18px + 40px);
    max-width: 100%;
    padding: 18px 18px 16px;
    border: 1px solid #332b1c;
    background:
      radial-gradient(circle at 50% 0, rgba(130, 94, 48, 0.16), transparent 42%),
      linear-gradient(180deg, #101214, #0b0d0e);
  }

  header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 16px;
    padding-bottom: 12px;
    border-bottom: 1px solid #2a2419;
  }

  header img {
    width: 32px;
    height: 32px;
  }

  header strong {
    display: block;
    font: 500 15px/1.1 var(--font-heading);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #d8cbae;
  }

  header small {
    color: #8d8373;
    font: 11px/1.3 var(--font-ui);
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(4, 48px);
    grid-template-rows: repeat(7, 48px);
    gap: 22px 18px;
    justify-content: center;
    padding: 8px 4px 12px;
  }

  .empty,
  .cell {
    position: relative;
    width: 48px;
    height: 48px;
  }

  .node {
    position: relative;
    width: 48px;
    height: 48px;
    padding: 0;
    border: 0;
    background: transparent;
    cursor: pointer;
  }

  .node img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    pointer-events: none;
  }

  .node.locked img {
    filter: grayscale(1) brightness(0.55);
  }

  .node:hover img,
  .node:focus-visible img {
    filter: brightness(1.12);
  }

  .node.locked:hover img,
  .node.locked:focus-visible img {
    filter: grayscale(1) brightness(0.7);
  }

  .node:focus-visible {
    outline: none;
  }

  .rank {
    position: absolute;
    right: -8px;
    bottom: -8px;
    min-width: 24px;
    padding: 2px 4px;
    border: 1px solid #5a4a2c;
    background: #070808;
    color: #7d7466;
    font: 700 10px/1.2 var(--font-ui);
    text-align: center;
  }

  .available .rank,
  .invested .rank {
    color: #54d46a;
    border-color: #2f6a38;
  }

  .maxed .rank {
    color: #e0c36a;
    border-color: #8a6d34;
  }

  .arrow {
    position: absolute;
    pointer-events: none;
    z-index: 0;
    background: #4a4030;
  }

  .arrow.on {
    background: #c6a04a;
    box-shadow: 0 0 8px rgba(198, 160, 74, 0.45);
  }

  .arrow.down {
    left: 50%;
    bottom: calc(100% - 2px);
    width: 8px;
    height: calc(var(--rows) * 70px - 48px);
    transform: translateX(-50%);
    clip-path: polygon(0 0, 100% 0, 100% calc(100% - 8px), 50% 100%, 0 calc(100% - 8px));
  }

  .arrow.left {
    top: 50%;
    right: calc(100% - 2px);
    height: 8px;
    width: calc(var(--cols) * 66px - 48px);
    transform: translateY(-50%);
    clip-path: polygon(8px 0, 100% 0, 100% 100%, 8px 100%, 0 50%);
  }

  .arrow.right {
    top: 50%;
    left: calc(100% - 2px);
    height: 8px;
    width: calc(var(--cols) * 66px - 48px);
    transform: translateY(-50%);
    clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 50%, calc(100% - 8px) 100%, 0 100%);
  }

  .arrow.leftdown,
  .arrow.rightdown {
    left: 50%;
    bottom: calc(100% - 2px);
    width: 8px;
    height: calc(var(--rows) * 70px - 48px);
    transform: translateX(-50%);
  }

  .arrow.leftdown:before,
  .arrow.rightdown:before {
    content: '';
    position: absolute;
    top: 0;
    height: 8px;
    width: calc(var(--cols) * 66px - 24px);
    background: inherit;
    box-shadow: inherit;
  }

  .arrow.leftdown:before {
    right: 0;
  }

  .arrow.rightdown:before {
    left: 0;
  }

  .clear {
    display: block;
    margin: 8px auto 0;
    border: 0;
    background: none;
    color: #c16a5a;
    cursor: pointer;
    font: 11px var(--font-ui);
  }

  .clear:hover {
    color: #e08b7a;
  }
</style>
