/** Longest word length, used as a no-JS clamp fallback before measured fitting. */
export function titleFitChars(title: string) {
  return Math.max(1, ...title.split(/\s+/).map((word) => word.length));
}

/**
 * Shrinks a heading from its designed clamp size until the longest word fits.
 * CSS container clamp is only a fallback; this uses the actual rendered width.
 */
export function fitOverflowText(node: HTMLElement) {
  let frame = 0;
  let lastWidth = -1;

  const overflows = () => node.scrollWidth > node.clientWidth + 0.5;

  const fit = () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      const width = node.clientWidth;
      if (width <= 0) return;

      node.style.fontSize = '';
      node.style.setProperty('--title-fit', '1');
      const maxPx = parseFloat(getComputedStyle(node).fontSize);
      node.style.removeProperty('--title-fit');

      const minPx = parseFloat(getComputedStyle(node).getPropertyValue('--title-min')) || 16;
      if (!Number.isFinite(maxPx) || maxPx <= minPx) {
        lastWidth = width;
        return;
      }

      node.style.fontSize = `${maxPx}px`;
      if (!overflows()) {
        node.style.fontSize = '';
        lastWidth = width;
        return;
      }

      let lo = minPx;
      let hi = maxPx;
      let best = minPx;
      for (let i = 0; i < 14; i++) {
        const mid = (lo + hi) / 2;
        node.style.fontSize = `${mid}px`;
        if (overflows()) hi = mid;
        else {
          best = mid;
          lo = mid;
        }
      }
      node.style.fontSize = `${best}px`;
      lastWidth = width;
    });
  };

  const ro = new ResizeObserver(() => {
    if (Math.abs(node.clientWidth - lastWidth) < 0.5 && !overflows()) return;
    fit();
  });
  ro.observe(node.parentElement ?? node);

  fit();
  void document.fonts?.ready.then(fit);
  document.fonts?.addEventListener('loadingdone', fit);

  return {
    destroy() {
      cancelAnimationFrame(frame);
      ro.disconnect();
      document.fonts?.removeEventListener('loadingdone', fit);
      node.style.fontSize = '';
    }
  };
}

/** Fit every page heading to its container. Call again after client-side navigations. */
export function bindFittedHeadings(root: ParentNode = document) {
  const cleanups: Array<() => void> = [];
  root.querySelectorAll<HTMLElement>('.route-page h1').forEach((node) => {
    cleanups.push(fitOverflowText(node).destroy);
  });
  return () => {
    cleanups.forEach((fn) => fn());
  };
}
