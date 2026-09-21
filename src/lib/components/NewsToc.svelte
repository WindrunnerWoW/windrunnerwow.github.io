<script lang="ts">
  import { onMount } from 'svelte';
  import type { NewsHeading } from '$lib/news/posts';

  export let headings: NewsHeading[];

  type Marker = NewsHeading & { top: number };

  let activeId = headings[0]?.id ?? '';
  let markers: Marker[] = [];
  let thumbTop = 0;
  let tocClip = 0;
  let tocLift = 0;
  let rangeStart = 0;
  let rangeSpan = 1;
  let dragging = false;
  let dragGrab = 0;
  let trackEl: HTMLElement;
  let ticking = false;

  const focusRatio = 0.62;

  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function docHeight() {
    return Math.max(1, document.documentElement.scrollHeight);
  }

  function maxScroll() {
    return Math.max(1, docHeight() - window.innerHeight);
  }

  function headingY(id: string) {
    const el = document.getElementById(id);
    if (!el) return 0;
    return el.getBoundingClientRect().top + window.scrollY;
  }

  function focusY() {
    return window.scrollY + window.innerHeight * focusRatio;
  }

  function articleEnd() {
    return document.querySelector('.post-footer');
  }

  function siteFooter() {
    const next = document.querySelector('main')?.nextElementSibling;
    return next instanceof HTMLElement && next.tagName === 'FOOTER' ? next : null;
  }

  function measure() {
    const firstId = headings[0]?.id;
    const end = articleEnd();
    rangeStart = firstId ? headingY(firstId) : 0;
    rangeSpan = Math.max(
      1,
      (end ? end.getBoundingClientRect().top + window.scrollY : docHeight()) - rangeStart
    );

    markers = headings.map((heading) => ({
      ...heading,
      top: Math.min(1, Math.max(0, (headingY(heading.id) - rangeStart) / rangeSpan))
    }));

    thumbTop = Math.min(1, Math.max(0, (focusY() - rangeStart) / rangeSpan));

    const compact = window.matchMedia('(max-width: 1180px)').matches;
    const headerTop = compact ? 72 : 96;
    const gap = compact ? 16 : 24;
    const railHeight = Math.max(1, window.innerHeight - headerTop - gap);

    tocLift = 0;
    const firstEl = firstId ? document.getElementById(firstId) : null;
    if (firstEl) {
      const dock = window.innerHeight * focusRatio;
      const distanceToDock = Math.max(0, firstEl.getBoundingClientRect().top - dock);
      const startDistance = Math.max(1, rangeStart - dock);
      tocLift = (distanceToDock / startDistance) * railHeight * 0.28;
    }

    const chrome = siteFooter();
    tocClip = chrome
      ? Math.max(0, window.innerHeight - gap - chrome.getBoundingClientRect().top)
      : 0;

    const maxShift = Math.max(0, railHeight - 48);
    tocLift = Math.min(Math.max(0, tocLift), maxShift);
    tocClip = Math.min(tocClip, maxShift - tocLift);
  }

  function syncActive() {
    const probe = focusY();
    let current = headings[0]?.id ?? '';

    for (const heading of headings) {
      if (headingY(heading.id) <= probe) current = heading.id;
    }

    if (current && current !== activeId) activeId = current;
  }

  function refresh() {
    measure();
    syncActive();
  }

  function scrollToFocusDocumentY(documentY: number) {
    window.scrollTo({
      top: Math.min(maxScroll(), Math.max(0, documentY - window.innerHeight * focusRatio)),
      behavior: 'auto'
    });
  }

  function ratioFromY(clientY: number) {
    if (!trackEl) return 0;
    const rect = trackEl.getBoundingClientRect();
    const pad = 18;
    const height = Math.max(1, rect.height - pad * 2);
    return Math.min(1, Math.max(0, (clientY - rect.top - pad) / height));
  }

  function jumpTo(id: string) {
    const el = document.getElementById(id);
    if (!el) return;

    activeId = id;
    window.scrollTo({
      top: Math.min(
        maxScroll(),
        Math.max(0, headingY(id) - window.innerHeight * focusRatio + 1)
      ),
      behavior: prefersReducedMotion() ? 'auto' : 'smooth'
    });
    history.replaceState(history.state, '', `#${id}`);
  }

  function onPointerDown(event: PointerEvent) {
    if (event.button !== 0) return;
    const target = event.target;
    if (target instanceof Element && target.closest('a')) return;

    dragging = true;
    trackEl?.setPointerCapture(event.pointerId);

    const documentY = rangeStart + ratioFromY(event.clientY) * rangeSpan;
    dragGrab = documentY - focusY();
    scrollToFocusDocumentY(documentY - dragGrab);
    refresh();
  }

  function onPointerMove(event: PointerEvent) {
    if (!dragging) return;
    scrollToFocusDocumentY(rangeStart + ratioFromY(event.clientY) * rangeSpan - dragGrab);
    refresh();
  }

  function onPointerUp(event: PointerEvent) {
    if (!dragging) return;
    dragging = false;
    if (trackEl?.hasPointerCapture(event.pointerId)) {
      trackEl.releasePointerCapture(event.pointerId);
    }
  }

  function onKeyDown(event: KeyboardEvent) {
    const page = window.innerHeight * 0.9;
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      window.scrollBy({ top: -48, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      window.scrollBy({ top: 48, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
    } else if (event.key === 'PageUp') {
      event.preventDefault();
      window.scrollBy({ top: -page, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
    } else if (event.key === 'PageDown') {
      event.preventDefault();
      window.scrollBy({ top: page, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
    } else if (event.key === 'Home') {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
    } else if (event.key === 'End') {
      event.preventDefault();
      window.scrollTo({ top: maxScroll(), behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
    }
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      refresh();
      ticking = false;
    });
  }

  function railTop(ratio: number) {
    return `calc(18px + ${Math.min(1, Math.max(0, ratio))} * (100% - 36px))`;
  }

  onMount(() => {
    const hash = decodeURIComponent(location.hash.replace(/^#/, ''));
    if (hash && headings.some((heading) => heading.id === hash)) {
      activeId = hash;
    }

    refresh();
    const later = window.setTimeout(refresh, 400);
    const observer = new ResizeObserver(refresh);
    observer.observe(document.documentElement);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.clearTimeout(later);
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  });
</script>

{#if headings.length}
  <aside
    class="news-toc"
    aria-label="On this page"
    style="--toc-clip: {tocClip}px; --toc-lift: {tocLift}px"
  >
    <div
      class="track"
      bind:this={trackEl}
      class:dragging
      role="scrollbar"
      aria-controls="news-article"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(thumbTop * 100)}
      aria-label="Article position"
      tabindex="0"
      on:pointerdown={onPointerDown}
      on:pointermove={onPointerMove}
      on:pointerup={onPointerUp}
      on:pointercancel={onPointerUp}
      on:keydown={onKeyDown}
    >
      <div class="line" aria-hidden="true"></div>
      <div
        class="thumb"
        style="top: {railTop(thumbTop)}"
        aria-hidden="true"
      ></div>

      <nav class="marks" aria-label="Article sections">
        {#each markers as marker (marker.id)}
          <a
            class="item level-{marker.level}"
            class:active={marker.id === activeId}
            href="#{marker.id}"
            title={marker.text}
            style="top: {railTop(marker.top)}"
            aria-current={marker.id === activeId ? 'location' : undefined}
            on:click|preventDefault={() => jumpTo(marker.id)}
          >
            <span class="tick" aria-hidden="true"></span>
            <span class="label">{marker.text}</span>
          </a>
        {/each}
      </nav>
    </div>
  </aside>
{/if}

<style>
  .news-toc {
    position: fixed;
    z-index: 20;
    top: calc(96px + var(--toc-lift, 0px));
    bottom: calc(24px + var(--toc-clip, 0px));
    left: max(16px, calc(25vw - 236px));
    width: min(220px, calc(25vw - 40px));
    overflow: hidden;
    pointer-events: none;
  }

  .track {
    position: relative;
    height: calc(100% + var(--toc-lift, 0px) + var(--toc-clip, 0px));
    transform: translateY(calc(var(--toc-clip, 0px) * -1));
    pointer-events: auto;
    cursor: ns-resize;
    touch-action: none;
    user-select: none;
  }

  .track.dragging {
    cursor: grabbing;
  }

  .line {
    position: absolute;
    top: 18px;
    bottom: 18px;
    left: 7px;
    width: 2px;
    background: #6d5a38;
    box-shadow: 0 0 0 1px rgba(9, 11, 12, .8);
  }

  .thumb {
    position: absolute;
    left: 4px;
    width: 8px;
    height: 14px;
    transform: translateY(-50%);
    border-radius: 999px;
    background: rgba(198, 163, 102, .88);
    box-shadow: 0 0 14px rgba(198, 163, 102, .35);
    pointer-events: none;
    z-index: 2;
  }

  .item {
    position: absolute;
    left: 0;
    width: 16px;
    transform: translateY(-50%);
    display: grid;
    grid-template-columns: 16px minmax(0, 1fr);
    gap: 10px;
    align-items: center;
    text-decoration: none;
    color: inherit;
    cursor: pointer;
    z-index: 3;
  }

  .item.active,
  .item:hover,
  .item:focus-visible {
    width: auto;
    right: 0;
  }

  .tick {
    width: 8px;
    height: 8px;
    margin-left: 4px;
    border-radius: 999px;
    background: #3a3325;
    box-shadow: 0 0 0 3px #090b0c;
  }

  .item.level-2 .tick {
    width: 10px;
    height: 10px;
    margin-left: 3px;
    background: #524833;
  }

  .item.active .tick {
    background: #c6a366;
  }

  .label {
    min-width: 0;
    display: none;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    padding: 1px 8px;
    border-radius: 2px;
    background: rgba(9, 11, 12, .72);
    font: 14px/1.3 var(--font-body);
    color: #9a9284;
  }

  .item.level-2 .label {
    font: 11px/1.3 var(--font-ui);
    text-transform: uppercase;
    letter-spacing: .12em;
  }

  .item.active .label,
  .item:hover .label,
  .item:focus-visible .label {
    display: -webkit-box;
    color: #d8ccb5;
  }

  @media (max-width: 1180px) {
    .news-toc {
      left: 10px;
      width: 168px;
      top: calc(72px + var(--toc-lift, 0px));
      bottom: calc(16px + var(--toc-clip, 0px));
    }

    .label {
      max-width: 140px;
    }
  }

  @media (max-width: 800px) {
    .news-toc {
      width: 34px;
      padding-right: 12px;
    }

    .label,
    .item.active .label,
    .item:hover .label,
    .item:focus-visible .label {
      display: none;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .thumb {
      transition: none;
    }
  }
</style>
