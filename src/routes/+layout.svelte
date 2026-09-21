<script lang="ts">
  import { afterNavigate, beforeNavigate, onNavigate } from '$app/navigation';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { browser } from '$app/environment';
  import { bindFittedHeadings } from '$lib/fitTitle';
  import {
    getChangelogTransitionDirection,
    getChangelogTransitionSlug,
    isChangelogEntryPath,
    isChangelogFlowPath
  } from '$lib/changelog/viewTransitionUtils';
  import { isNewsArticlePath, isNewsFlowPath, isNewsTitleTransition } from '$lib/news/viewTransitionUtils';
  import '../app.css';

  type TransitionDocument = Document & {
    startViewTransition?: (callback: () => void | Promise<void>) => { finished: Promise<void> };
  };

  let fallbackTimer: ReturnType<typeof setTimeout>;
  let skipPageSlide = false;
  let stopFitting = () => {};

  const refitHeadings = () => {
    stopFitting();
    stopFitting = bindFittedHeadings();
  };

  $: pageTransitionKey = isNewsFlowPath($page.url.pathname)
    ? 'news-flow'
    : isChangelogFlowPath($page.url.pathname)
      ? 'changelog-flow'
      : $page.url.pathname;

  const changelogPartNames: Record<string, string> = {
    meta: 'changelog-meta',
    version: 'changelog-version',
    summary: 'changelog-summary'
  };

  const setChangelogMorphNames = (slug: string) => {
    const card = Array.from(document.querySelectorAll<HTMLElement>('[data-changelog-card]'))
      .find((element) => element.dataset.changelogCard === slug);
    if (!card) return;

    card.style.viewTransitionName = 'changelog-card';
    card.querySelectorAll<HTMLElement>('[data-changelog-part]').forEach((part) => {
      const name = changelogPartNames[part.dataset.changelogPart ?? ''];
      if (name) part.style.viewTransitionName = name;
    });
  };

  const clearChangelogMorphNames = () => {
    document.querySelectorAll<HTMLElement>('[data-changelog-card], [data-changelog-part]').forEach((element) => {
      element.style.removeProperty('view-transition-name');
    });
  };

  const setChangelogTransitionClass = (direction: 'expand' | 'collapse' | null) => {
    document.documentElement.classList.toggle('changelog-morph-transition', direction !== null);
    document.documentElement.classList.toggle('changelog-expand-transition', direction === 'expand');
    document.documentElement.classList.toggle('changelog-collapse-transition', direction === 'collapse');
  };

  const setCurtainState = (state: 'idle' | 'cover' | 'reveal') => {
    const curtain = document.querySelector('.route-curtain');
    if (!curtain) return;

    curtain.classList.toggle('cover', state === 'cover');
    curtain.classList.toggle('reveal', state === 'reveal');
  };

  function handleLinkClick(event: MouseEvent) {
    if (!browser || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const target = event.target;
    if (!(target instanceof Element)) return;

    const link = target.closest('a');
    if (!link || link.target === '_blank' || link.hasAttribute('download') || link.hasAttribute('data-sveltekit-reload')) return;

    const destination = new URL(link.href, window.location.href);
    if (destination.origin !== window.location.origin) return;
    if (destination.pathname === window.location.pathname && destination.search === window.location.search) return;
    if (
      isNewsTitleTransition(window.location.pathname, destination.pathname) ||
      getChangelogTransitionDirection(window.location.pathname, destination.pathname)
    ) return;

    setCurtainState('cover');
  }

  if (browser) {
    const transitionDocument = document as TransitionDocument;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const startViewTransition = !reducedMotion && transitionDocument.startViewTransition
      ? transitionDocument.startViewTransition.bind(transitionDocument)
      : undefined;

    if (startViewTransition) {
      onNavigate((navigation) => {
        const fromPath = navigation.from?.url.pathname ?? '';
        const toPath = navigation.to?.url.pathname ?? '';
        const newsTitle = isNewsTitleTransition(fromPath, toPath);
        const changelogDirection = getChangelogTransitionDirection(fromPath, toPath);
        const changelogSlug = getChangelogTransitionSlug(fromPath, toPath);
        const isSpecialTransition = newsTitle || changelogDirection !== null;
        skipPageSlide = isSpecialTransition;
        document.documentElement.classList.toggle('news-title-transition', newsTitle);
        setChangelogTransitionClass(changelogDirection);
        if (changelogDirection && changelogSlug) setChangelogMorphNames(changelogSlug);

        return new Promise<void>((resolve) => {
          const viewTransition = startViewTransition(async () => {
            resolve();
            await navigation.complete;
            if (changelogDirection && changelogSlug) setChangelogMorphNames(changelogSlug);
          });

          viewTransition.finished
            .catch(() => undefined)
            .finally(() => {
              clearChangelogMorphNames();
              setChangelogTransitionClass(null);
              document.documentElement.classList.remove('news-title-transition');
            });
        });
      });
    } else if (!reducedMotion) {
      beforeNavigate(({ to }) => {
        const toPath = to?.url.pathname ?? '';
        const newsTitle = isNewsTitleTransition(window.location.pathname, toPath);
        const changelogDirection = getChangelogTransitionDirection(window.location.pathname, toPath);
        skipPageSlide = newsTitle || changelogDirection !== null;
        document.documentElement.classList.toggle('news-title-transition', newsTitle);
        setChangelogTransitionClass(changelogDirection);
        if (skipPageSlide) return;
        if (toPath !== window.location.pathname || to?.url.search !== window.location.search) {
          setCurtainState('cover');
        }
      });

      onNavigate((navigation) => {
        const fromPath = navigation.from?.url.pathname ?? window.location.pathname;
        const toPath = navigation.to?.url.pathname ?? '';
        const newsTitle = isNewsTitleTransition(fromPath, toPath);
        const changelogDirection = getChangelogTransitionDirection(fromPath, toPath);
        skipPageSlide = newsTitle || changelogDirection !== null;
        document.documentElement.classList.toggle('news-title-transition', newsTitle);
        setChangelogTransitionClass(changelogDirection);
        if (skipPageSlide) return;

        setCurtainState('cover');
        return new Promise<void>((resolve) => setTimeout(resolve, 260));
      });

      afterNavigate(() => {
        if (skipPageSlide) {
          setCurtainState('idle');
          setChangelogTransitionClass(null);
          document.documentElement.classList.remove('news-title-transition');
          return;
        }
        setCurtainState('reveal');
        clearTimeout(fallbackTimer);
        fallbackTimer = setTimeout(() => setCurtainState('idle'), 520);
      });
  }
}

onMount(() => {
  refitHeadings();
  return () => stopFitting();
});

afterNavigate(refitHeadings);
</script>

<svelte:head>
  <link rel="alternate" type="application/rss+xml" title="Windrunner News" href="/rss.xml" />
</svelte:head>

<svelte:window on:click={handleLinkClick} />
<div class="route-curtain" aria-hidden="true"></div>
{#key pageTransitionKey}
  <div
    class="route-page"
    class:skip-slide={skipPageSlide || isNewsArticlePath($page.url.pathname) || isChangelogEntryPath($page.url.pathname)}
  >
    <slot />
  </div>
{/key}
