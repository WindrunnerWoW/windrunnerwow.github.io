<script lang="ts">
  import { browser } from '$app/environment';
  import { onDestroy } from 'svelte';
  import { featureCategories } from '$lib/data/featureNav';
  import { toolLinks } from '$lib/data/tools';

  type Panel = 'features' | 'tools';

  let open = false;
  let featuresOpen = false;
  let featuresRendered = false;
  let toolsOpen = false;
  let toolsRendered = false;
  let featureCloseTimer: ReturnType<typeof setTimeout>;
  let toolsCloseTimer: ReturnType<typeof setTimeout>;

  function navLinks(slug: string) {
    const category = featureCategories.find((item) => item.slug === slug);
    if (!category) return [];
    return category.links.filter((link) => link.href !== category.href);
  }

  function closePanel(panel: Panel, immediate = false) {
    if (panel === 'features') {
      featuresOpen = false;
      clearTimeout(featureCloseTimer);
      if (immediate) {
        featuresRendered = false;
        return;
      }
      featureCloseTimer = setTimeout(() => {
        if (!featuresOpen) featuresRendered = false;
      }, 260);
      return;
    }

    toolsOpen = false;
    clearTimeout(toolsCloseTimer);
    if (immediate) {
      toolsRendered = false;
      return;
    }
    toolsCloseTimer = setTimeout(() => {
      if (!toolsOpen) toolsRendered = false;
    }, 260);
  }

  function closeMenu() {
    open = false;
    closePanel('features', true);
    closePanel('tools', true);
  }

  function onPanelToggle(panel: Panel, event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    const isFeatures = panel === 'features';
    const isOpen = isFeatures ? featuresOpen : toolsOpen;

    closePanel(isFeatures ? 'tools' : 'features', true);
    if (isFeatures) clearTimeout(featureCloseTimer);
    else clearTimeout(toolsCloseTimer);

    if (isOpen) {
      closePanel(panel);
      return;
    }

    if (isFeatures) {
      featuresRendered = true;
      featuresOpen = true;
    } else {
      toolsRendered = true;
      toolsOpen = true;
    }
  }

  function onMenuToggle() {
    open = !open;
    if (open && browser) {
      requestAnimationFrame(() => {
        document.querySelector('.site-header nav')?.scrollTo(0, 0);
      });
    }
  }

  function pinNavScroll(event: Event) {
    const nav = (event.currentTarget as HTMLElement).closest('nav');
    if (!nav) return;
    const top = nav.scrollTop;
    requestAnimationFrame(() => {
      nav.scrollTop = top;
    });
  }

  $: if (browser) {
    document.body.classList.toggle('nav-open', open);
    document.documentElement.classList.toggle('nav-open', open);
  }

  onDestroy(() => {
    clearTimeout(featureCloseTimer);
    clearTimeout(toolsCloseTimer);
    if (browser) {
      document.body.classList.remove('nav-open');
      document.documentElement.classList.remove('nav-open');
    }
  });

  function portal(node: HTMLElement) {
    document.body.appendChild(node);
    return {
      destroy() {
        node.remove();
      }
    };
  }
</script>

<header use:portal class="site-header" class:menu-open={open}>
  <div class="header-inner">
    <button class="menu" on:click={onMenuToggle} aria-label="Toggle navigation" aria-expanded={open}>
      <span></span><span></span><span></span>
    </button>

    <nav class:open aria-label="Primary navigation">
      <a href="/news" on:click={closeMenu}>News</a>
      <details class="nav-group" open={featuresRendered} class:opening={featuresOpen} class:closing={featuresRendered && !featuresOpen} on:toggle={pinNavScroll}>
        <summary on:click={(event) => onPanelToggle('features', event)}>Features</summary>
        <div class="menu-panel features-panel">
          {#each featureCategories as category}
            <div class="panel-column">
              <a class="panel-title" href={category.href} on:click={closeMenu}>{category.title}</a>
              {#each navLinks(category.slug) as link}
                <a href={link.href} on:click={closeMenu}>{link.title}</a>
              {/each}
            </div>
          {/each}
        </div>
      </details>
      <a href="/changelog" on:click={closeMenu}>Changelog</a>
      <a class="home" href="/" on:click={closeMenu}>Home</a>
      <a href="/roadmap" on:click={closeMenu}>Roadmap</a>
      <details class="nav-group" open={toolsRendered} class:opening={toolsOpen} class:closing={toolsRendered && !toolsOpen} on:toggle={pinNavScroll}>
        <summary on:click={(event) => onPanelToggle('tools', event)}>Tools</summary>
        <div class="menu-panel tools-panel">
          {#each toolLinks as tool}
            <a class="panel-column tool-link" href={tool.href} on:click={closeMenu}>
              <span class="panel-title">{tool.title}</span>
              <p>{tool.summary}</p>
            </a>
          {/each}
        </div>
      </details>
      <a href="https://github.com/orgs/WindrunnerWoW/repositories" target="_blank" rel="noopener noreferrer" on:click={closeMenu}>Github</a>
    </nav>
  </div>
</header>

<style>
  .site-header{position:fixed;z-index:50;top:0;left:0;right:0;background:linear-gradient(180deg,rgba(6,7,8,.98),rgba(6,7,8,.78) 72%,transparent);border-bottom:1px solid rgba(148,116,57,.22);backdrop-filter:blur(8px)}.site-header:after{content:"";position:absolute;z-index:-1;left:0;right:0;bottom:-11px;height:14px;background:url('/art/shared/nav-bottom.png') center/auto 14px no-repeat;opacity:.72;pointer-events:none}
  .header-inner{min-height:80px;display:flex;align-items:center;justify-content:center;gap:36px;padding:0 clamp(22px,5vw,78px);position:relative}
  nav{display:flex;align-items:baseline;justify-content:center;gap:26px}nav>a,.nav-group{display:flex;align-items:baseline;line-height:1}nav a,summary{color:#d7cfbd;text-decoration:none;font:13px/1 var(--font-ui);text-transform:uppercase;letter-spacing:.12em;opacity:.92;cursor:pointer;white-space:nowrap}nav a:hover,summary:hover{color:#d8b86c}nav a.home{color:#ad884b;opacity:1}nav a.home:hover{color:#c9a45a}
  .nav-group{position:static}.nav-group summary{list-style:none;display:inline-flex;align-items:center;line-height:1}.nav-group summary::-webkit-details-marker{display:none}.nav-group summary:after{content:'';width:0;height:0;margin-left:7px;border-left:4px solid transparent;border-right:4px solid transparent;border-top:5px solid #96753e;transition:transform .4s cubic-bezier(.16,1,.3,1)}.nav-group.opening summary{color:#d8b86c}.nav-group.opening summary:after{transform:rotate(180deg)}
  .menu-panel{position:absolute;top:80px;left:clamp(20px,4vw,64px);right:clamp(20px,4vw,64px);display:grid;grid-template-columns:repeat(5,1fr);gap:24px;padding:22px 30px 32px;border:1px solid #3d3321;border-top-color:#927440;background:linear-gradient(180deg,#121413,#0c0f10);box-shadow:0 22px 45px rgba(0,0,0,.48);transform-origin:top center}.tools-panel{grid-template-columns:1fr;left:0;right:0;width:min(420px,calc(100% - clamp(40px,8vw,128px)));margin:0 auto;gap:0;padding:14px 22px 18px}nav a.tool-link{padding:12px 0;border-bottom:1px solid #27231b;gap:3px}nav a.tool-link .panel-title{margin-bottom:0}nav a.tool-link:last-child{border-bottom:0}.nav-group.opening .menu-panel{animation:mega-menu-open .52s cubic-bezier(.16,1,.3,1) both}.nav-group.closing .menu-panel{animation:mega-menu-close .24s cubic-bezier(.4,0,1,1) both}.nav-group.opening .panel-column{animation:mega-column-in .38s cubic-bezier(.22,1,.36,1) both}.nav-group.opening .panel-column:nth-child(1){animation-delay:.06s}.nav-group.opening .panel-column:nth-child(2){animation-delay:.1s}.nav-group.opening .panel-column:nth-child(3){animation-delay:.14s}.nav-group.opening .panel-column:nth-child(4){animation-delay:.18s}.nav-group.opening .panel-column:nth-child(5){animation-delay:.22s}
  .panel-column{display:flex;flex-direction:column;gap:11px}.panel-column a{font-size:13px;text-transform:none;letter-spacing:.03em;color:#aaa18f;white-space:normal;line-height:1.35}.panel-column a:hover{color:#d6b269}.panel-column a.panel-title,.panel-column .panel-title{color:#a78348;font:12px/1 var(--font-ui);text-transform:uppercase;letter-spacing:.16em;margin-bottom:7px;padding:0;opacity:1;white-space:normal}.panel-column a.panel-title:hover,.tool-link:hover .panel-title{color:#a78348}.panel-column p{margin:0;color:#aaa18f;font-family:var(--font-body);font-size:15px;line-height:1.5;letter-spacing:0;text-transform:none;white-space:normal}nav a.tool-link{text-decoration:none;white-space:normal;min-width:0}nav a.tool-link:hover p{color:#d6b269}
  .menu{display:none;background:none;border:0;padding:8px;color:#e7dcc0;cursor:pointer}.menu span{display:block;width:24px;height:1px;background:#c6a363;margin:5px 0;transition:.2s}.menu-open .menu span:nth-child(1){transform:translateY(6px) rotate(45deg)}.menu-open .menu span:nth-child(2){opacity:0}.menu-open .menu span:nth-child(3){transform:translateY(-6px) rotate(-45deg)}
  @keyframes mega-menu-open{0%{opacity:0;clip-path:inset(0 0 100% 0);transform:translateY(-10px) scaleY(.92)}65%{opacity:1}100%{opacity:1;clip-path:inset(0);transform:none}}
  @keyframes mega-menu-close{from{opacity:1;clip-path:inset(0);transform:none}to{opacity:0;clip-path:inset(0 0 100% 0);transform:translateY(-8px) scaleY(.95)}}
  @keyframes mega-column-in{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:none}}
  @media(max-width:1100px){nav{gap:16px}.menu-panel{grid-template-columns:repeat(3,1fr)}.tools-panel{grid-template-columns:1fr}.panel-column a{font-size:12px}}
  @media(max-width:800px){.site-header{background:none;border:0;backdrop-filter:none;pointer-events:none}.site-header:after{display:none}.header-inner{min-height:0;justify-content:flex-end;padding:10px 14px 0;pointer-events:none}.menu,.header-inner nav{pointer-events:auto}.menu{display:block;position:fixed;z-index:51;top:10px;right:10px;filter:drop-shadow(0 1px 6px rgba(0,0,0,.85))}nav{display:none;position:fixed;top:52px;left:14px;right:14px;bottom:14px;max-height:none;min-height:0;overflow-x:hidden;overflow-y:scroll;overscroll-behavior:contain;touch-action:pan-y;-webkit-overflow-scrolling:touch;padding:10px 20px calc(28px + env(safe-area-inset-bottom));background:#0d1011;border:1px solid #3a3325;box-shadow:0 20px 35px rgba(0,0,0,.48);flex-direction:column;align-items:stretch;gap:0}nav.open{display:block}nav>a,summary{display:block;padding:15px 0;border-bottom:1px solid #27231b}.nav-group{display:block;border-bottom:1px solid #27231b}.nav-group summary{display:flex;align-items:center;border:0}.menu-panel{position:static;display:block;margin:0 -8px 10px;padding:14px 16px 8px;box-shadow:none;border-color:#332b1c;left:auto;right:auto;width:auto;max-width:none;transform:none}.panel-column{padding:9px 0;border-bottom:1px solid #27231b}.panel-column:last-child{border-bottom:0}.panel-column a{font-size:12px;padding:4px 0}.panel-column a.panel-title{padding:0;margin-bottom:7px}}
  @media(prefers-reduced-motion:reduce){.nav-group summary:after{transition:none}.nav-group.opening .menu-panel,.nav-group.opening .panel-column,.nav-group.closing .menu-panel{animation:none}}
</style>
