<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import {
    formatRoadmapMarkdown,
    roadmap,
    statusLegend,
    type RoadmapEntry,
    type RoadmapStatus
  } from '$lib/data/roadmap';

  function isExpandable(entry: RoadmapEntry) {
    return Boolean(entry.items?.length || (entry.images && entry.images.length > 1));
  }

  const statusLabel: Record<RoadmapStatus, string> = {
    completed: 'Completed',
    now: 'In progress',
    next: 'Next',
    planned: 'Planned',
    horizon: 'Horizon'
  };
</script>

<svelte:head>
  <title>Roadmap - Windrunner</title>
  <meta
    name="description"
    content="Where Windrunner has been and where it is headed. A living plan for the single-player Vanilla+ journey through Azeroth."
  />
</svelte:head>

<Header />

<main>
  <section
    class="hero"
    style="--hero-image: url('/art/features/zones.webp'); --hero-position: center; --hero-size: cover"
  >
    <div class="hero-wash"></div>
    <div class="content">
      <div class="kicker">THE JOURNEY AHEAD</div>
      <h1>Roadmap</h1>
      <p>
        Where we have been and where we are headed. Dates may move as the world grows - follow the
        path, one milestone at a time.
      </p>
      <a class="hero-link" href="#development-path">Follow the path <span>↓</span></a>
    </div>
  </section>

  <section class="legend" aria-labelledby="legend-title">
    <div class="legend-copy">
      <div class="kicker">HOW TO READ THIS</div>
      <h2 id="legend-title">A living<br /><em>roadmap.</em></h2>
      <p>
        Every chapter has a status. Check here to see what's planned.
      </p>
    </div>

    <div class="legend-list">
      {#each statusLegend as entry}
        <div class="legend-item" data-status={entry.id}>
          <span class="legend-name">
            <span class="legend-dot" aria-hidden="true">
              {#if entry.id === 'completed'}
                <svg viewBox="0 0 18 18" fill="none">
                  <path
                    d="m4 9.2 3.1 3.1L14 5.8"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              {/if}
            </span>
            {entry.label}
          </span>
          <span class="legend-note">{entry.note}</span>
        </div>
      {/each}
    </div>
  </section>

  <section class="timeline" id="development-path" aria-labelledby="timeline-title">
    <div class="section-heading">
      <div class="kicker">DEVELOPMENT PATH</div>
      <h2 id="timeline-title">One road.<br /><em>Many chapters.</em></h2>
      <p>
        A single timeline for the story so far and the work still ahead. Open a chapter to look
        closer.
      </p>
    </div>

    {#if roadmap.length}
      <ol class="track">
        {#each roadmap as entry, index}
          <li class="stop" data-status={entry.status}>
            <div class="milestone-meta">
              <span class="chapter-number">{String(index + 1).padStart(2, '0')}</span>
              <span class="chapter-label">{entry.marker ?? statusLabel[entry.status]}</span>
              {#if entry.when}<span class="chapter-when">{entry.when}</span>{/if}
            </div>

            <div class="node" aria-hidden="true">
              {#if entry.status === 'completed'}
                <svg viewBox="0 0 18 18" fill="none">
                  <path
                    d="m4 9.2 3.1 3.1L14 5.8"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              {:else}
                <span></span>
              {/if}
            </div>

            <details
              class="milestone"
              class:expandable={isExpandable(entry)}
              open={isExpandable(entry) && entry.status === 'now'}
            >
              <summary
                onclick={(event) => {
                  if (!isExpandable(entry)) event.preventDefault();
                }}
              >
                {#if entry.images?.[0]}
                  <div class="cover">
                    <img src={entry.images[0].src} alt={entry.images[0].alt} loading="lazy" />
                    <div class="cover-shade"></div>
                    <span class="status-pill">{statusLabel[entry.status]}</span>
                  </div>
                {:else}
                  <div class="cover placeholder">
                    <span>Add milestone image</span>
                    <span class="status-pill">{statusLabel[entry.status]}</span>
                  </div>
                {/if}

                <div class="milestone-copy">
                  <h3>{entry.title}</h3>
                  <p>{@html formatRoadmapMarkdown(entry.summary)}</p>
                  {#if isExpandable(entry)}
                    <span class="expand-copy">
                      <span class="expand-closed">Explore milestone</span>
                      <span class="expand-open">Close milestone</span>
                      <span class="disclosure" aria-hidden="true"></span>
                    </span>
                  {/if}
                </div>
              </summary>

              {#if isExpandable(entry)}
                <div class="milestone-details">
                  {#if entry.items?.length}
                    <div class="detail-list">
                      <span class="detail-kicker">Inside this chapter</span>
                      <ul>
                        {#each entry.items as item}<li>{@html formatRoadmapMarkdown(item)}</li>{/each}
                      </ul>
                    </div>
                  {/if}

                  {#if entry.images && entry.images.length > 1}
                    <div class="gallery" aria-label={`${entry.title} gallery`}>
                      {#each entry.images.slice(1) as image}
                        <img src={image.src} alt={image.alt} loading="lazy" />
                      {/each}
                    </div>
                  {/if}
                </div>
              {/if}
            </details>
          </li>
        {/each}
      </ol>
    {:else}
      <div class="empty">
        <span class="status-pill">Awaiting milestones</span>
        <p>Nothing public yet. New chapters appear here as they are ready to share.</p>
      </div>
    {/if}

    <div class="timeline-end" aria-hidden="true">
      <span></span>
      <small>The path continues</small>
    </div>
    <a class="text-link" href="/changelog">Read the changelog <span>→</span></a>
  </section>
</main>

<Footer />

<style>
  .hero {
    min-height: 640px;
    display: flex;
    align-items: end;
    position: relative;
    overflow: hidden;
    padding: 150px clamp(24px, 8vw, 130px) 92px;
    background-image: var(--hero-image);
    background-size: var(--hero-size, cover);
    background-position: var(--hero-position, center);
    background-repeat: no-repeat;
    isolation: isolate;
  }
  .hero::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -2;
    background: linear-gradient(180deg, rgba(5, 7, 8, .08), rgba(5, 7, 8, .78) 66%, #090b0c 100%),
      linear-gradient(90deg, rgba(5, 7, 8, .86), transparent 68%);
  }
  .hero::after {
    content: '';
    position: absolute;
    inset: auto 0 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(167, 131, 72, .58), transparent);
  }
  .hero-wash {
    position: absolute;
    inset: 0;
    z-index: -1;
    background: radial-gradient(circle at 73% 34%, transparent 0 12%, rgba(8, 10, 11, .16) 48%, rgba(8, 10, 11, .38));
    pointer-events: none;
  }
  .content { max-width: 830px; }
  .content h1 {
    font-size: clamp(68px, 10vw, 136px);
    line-height: .78;
    text-transform: uppercase;
    color: #e4d8be;
    margin: 18px 0 32px;
    text-shadow: 0 7px 34px rgba(0, 0, 0, .48);
  }
  .content p {
    max-width: 690px;
    margin: 0;
    font: 19px/1.75 var(--font-body);
    color: #b9b0a0;
  }
  .hero-link {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    margin-top: 34px;
    color: #c6a668;
    text-decoration: none;
    text-transform: uppercase;
    font: 10px/1 var(--font-ui);
    letter-spacing: .2em;
  }
  .hero-link span { font-size: 15px; transition: transform .2s ease; }
  .hero-link:hover { color: #e0c382; }
  .hero-link:hover span { transform: translateY(3px); }

  .legend {
    display: grid;
    grid-template-columns: minmax(280px, .85fr) minmax(460px, 1.35fr);
    gap: clamp(48px, 8vw, 120px);
    padding: 112px clamp(24px, 8vw, 130px);
    background: radial-gradient(circle at 13% 10%, rgba(126, 91, 43, .1), transparent 31%), #090b0c;
    border-bottom: 1px solid #1b1711;
  }
  .legend-copy h2,
  .section-heading h2 {
    font-size: clamp(44px, 5.6vw, 78px);
    line-height: .88;
    text-transform: uppercase;
    color: #ddd1b8;
    margin: 14px 0 0;
  }
  .legend-copy h2 em,
  .section-heading h2 em { color: #a78348; font-style: normal; }
  .legend-copy > p,
  .section-heading > p {
    max-width: 600px;
    margin: 26px 0 0;
    color: #9e9587;
    font: 17px/1.75 var(--font-body);
  }
  .legend-list { border-top: 1px solid #322a1d; }
  .legend-item {
    min-height: 72px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    padding: 0 4px;
    border-bottom: 1px solid #322a1d;
    color: #c8bda8;
  }
  .milestone summary::-webkit-details-marker { display: none; }
  .legend-name {
    display: inline-flex;
    align-items: center;
    gap: 14px;
    flex: 0 0 auto;
    text-transform: uppercase;
    font: 11px/1 var(--font-ui);
    letter-spacing: .18em;
  }
  .legend-note {
    min-width: 0;
    color: #8a8174;
    font: 300 15px/1.4 var(--font-body);
    text-align: right;
  }
  .legend-dot {
    flex: 0 0 14px;
    width: 14px;
    height: 14px;
    display: grid;
    place-items: center;
    border: 1px solid #7a6642;
    border-radius: 50%;
    background: #17130e;
    color: #1d1810;
  }
  .legend-dot svg { width: 9px; height: 9px; }
  [data-status='completed'] .legend-dot {
    background: #8e7446;
    border-color: #c2a462;
  }
  [data-status='now'] .legend-dot { background: #c4a35f; border-color: #e0c57f; box-shadow: 0 0 0 4px rgba(167, 131, 72, .13); }
  [data-status='next'] .legend-dot { background: #7c653c; border-color: #b8995d; }
  [data-status='planned'] .legend-dot { background: #342a1d; }
  [data-status='horizon'] .legend-dot { background: transparent; border-style: dashed; opacity: .75; }
  .disclosure {
    position: relative;
    flex: 0 0 18px;
    width: 18px;
    height: 18px;
  }
  .disclosure::before,
  .disclosure::after {
    content: '';
    position: absolute;
    background: #987b49;
    transition: transform .22s ease;
  }
  .disclosure::before { width: 12px; height: 1px; left: 3px; top: 8px; }
  .disclosure::after { width: 1px; height: 12px; left: 8px; top: 3px; }
  details[open] > summary .disclosure::after { transform: rotate(90deg); }

  .timeline {
    position: relative;
    padding: 124px clamp(24px, 7vw, 112px) 120px;
    overflow: hidden;
    background:
      radial-gradient(circle at 50% 12%, rgba(105, 76, 38, .08), transparent 28rem),
      linear-gradient(180deg, #080a0b, #0a0b0b 50%, #080a0b);
  }
  .timeline::before {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    opacity: .22;
    background-image: linear-gradient(rgba(255, 255, 255, .017) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, .012) 1px, transparent 1px);
    background-size: 80px 80px;
  }
  .section-heading {
    position: relative;
    z-index: 1;
    max-width: 760px;
    margin: 0 auto 94px;
    text-align: center;
  }
  .section-heading > p { margin-left: auto; margin-right: auto; }

  .track {
    position: relative;
    z-index: 1;
    list-style: none;
    max-width: 1240px;
    margin: 0 auto;
    padding: 0;
  }
  .track::before {
    content: '';
    position: absolute;
    z-index: -1;
    top: 24px;
    bottom: -28px;
    left: 50%;
    width: 1px;
    transform: translateX(-.5px);
    background: linear-gradient(180deg, #80673b, #54452d 86%, transparent);
  }
  .stop {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 96px minmax(0, 1fr);
    align-items: start;
    position: relative;
    padding-bottom: 86px;
  }
  .stop:last-child { padding-bottom: 16px; }
  .milestone-meta {
    grid-column: 3;
    grid-row: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    padding: 19px 0 0 10px;
  }
  .stop:nth-child(even) .milestone-meta {
    grid-column: 1;
    align-items: flex-end;
    padding: 19px 10px 0 0;
    text-align: right;
  }
  .chapter-number {
    color: #50452f;
    font: 11px/1 var(--font-ui);
    letter-spacing: .2em;
  }
  .chapter-label {
    color: #b7985d;
    text-transform: uppercase;
    font: 10px/1.2 var(--font-ui);
    letter-spacing: .2em;
  }
  .chapter-when {
    color: #817a6f;
    font: 16px/1.25 var(--font-body);
  }
  [data-status='now'] .chapter-label { color: #e1c57f; }
  [data-status='completed'] .chapter-label { color: #8d816c; }
  [data-status='horizon'] .chapter-label { color: #746954; }

  .node {
    grid-column: 2;
    grid-row: 1;
    justify-self: center;
    position: relative;
    z-index: 3;
    width: 28px;
    height: 28px;
    margin-top: 14px;
    display: grid;
    place-items: center;
    border: 1px solid #9a7c47;
    border-radius: 50%;
    background: #0a0b0b;
    color: #1d1810;
    box-shadow: 0 0 0 7px #090a0a;
  }
  .node span { width: 6px; height: 6px; border-radius: 50%; background: #8d7244; }
  .node svg { width: 17px; height: 17px; }
  [data-status='completed'] .node { background: #8e7446; border-color: #c2a462; }
  [data-status='now'] .node {
    background: #d0ad64;
    border-color: #ebd08b;
    box-shadow: 0 0 0 7px #090a0a, 0 0 0 11px rgba(167, 131, 72, .2), 0 0 30px rgba(196, 155, 81, .22);
  }
  [data-status='now'] .node span { background: #241b0f; }
  [data-status='horizon'] .node { border-style: dashed; border-color: #5e5137; }
  [data-status='horizon'] .node span { background: #4c402b; }

  .milestone {
    grid-column: 1;
    grid-row: 1;
    min-width: 0;
    border: 1px solid #342c20;
    background: #0c0e0f;
    box-shadow: 0 18px 52px rgba(0, 0, 0, .2);
    transition: border-color .25s ease, transform .25s ease, box-shadow .25s ease;
  }
  .stop:nth-child(even) .milestone { grid-column: 3; }
  .milestone:hover {
    transform: translateY(-3px);
    border-color: #5b492d;
    box-shadow: 0 22px 58px rgba(0, 0, 0, .3);
  }
  [data-status='now'] .milestone { border-color: #6c5732; }
  .milestone > summary { cursor: pointer; list-style: none; }
  .milestone:not(.expandable) > summary { cursor: default; }
  .cover {
    position: relative;
    aspect-ratio: 16 / 8.8;
    overflow: hidden;
    background: #151718;
  }
  .cover img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: saturate(.82) contrast(1.04);
    transition: transform .6s cubic-bezier(.22, 1, .36, 1), filter .4s ease;
  }
  .milestone:hover .cover img { transform: scale(1.025); filter: saturate(.98) contrast(1.04); }
  .cover-shade {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(5, 7, 8, .03) 35%, rgba(5, 7, 8, .7));
    pointer-events: none;
  }
  .cover.placeholder {
    display: grid;
    place-items: center;
    color: #615844;
    background: radial-gradient(circle, rgba(129, 96, 47, .12), transparent 55%), #111314;
    text-transform: uppercase;
    font: 9px/1 var(--font-ui);
    letter-spacing: .18em;
  }
  .status-pill {
    position: absolute;
    left: 18px;
    bottom: 17px;
    display: inline-flex;
    padding: 7px 10px 6px;
    border: 1px solid rgba(204, 175, 111, .48);
    background: rgba(8, 10, 11, .76);
    backdrop-filter: blur(8px);
    color: #d2b977;
    text-transform: uppercase;
    font: 9px/1 var(--font-ui);
    letter-spacing: .18em;
  }
  [data-status='completed'] .status-pill { color: #b7aa91; border-color: rgba(183, 170, 145, .32); }
  [data-status='horizon'] .status-pill { color: #968a73; border-style: dashed; }
  .milestone-copy { padding: 26px 28px 24px; }
  .milestone-copy h3 {
    margin: 0;
    color: #ddd1b8;
    font-size: clamp(25px, 2.4vw, 34px);
    line-height: 1.02;
    text-transform: uppercase;
  }
  .milestone-copy > p {
    margin: 15px 0 0;
    color: #9d9588;
    font: 16px/1.68 var(--font-body);
  }
  .expand-copy {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    margin-top: 24px;
    padding-top: 17px;
    border-top: 1px solid #29241c;
    color: #9d814d;
    text-transform: uppercase;
    font: 9px/1 var(--font-ui);
    letter-spacing: .18em;
  }
  .expand-open { display: none; }
  .milestone[open] .expand-closed { display: none; }
  .milestone[open] .expand-open { display: inline; }
  .milestone-details {
    padding: 0 28px 28px;
    animation: reveal .35s ease both;
  }
  .detail-list {
    padding: 23px 0 5px;
    border-top: 1px solid #29241c;
  }
  .detail-kicker {
    color: #75664b;
    text-transform: uppercase;
    font: 9px/1 var(--font-ui);
    letter-spacing: .18em;
  }
  .detail-list ul {
    margin: 15px 0 0;
    padding: 0;
    list-style: none;
    color: #aaa193;
    font: 15px/1.6 var(--font-body);
  }
  .detail-list li { position: relative; padding: 0 0 8px 17px; }
  .detail-list li::before { content: '◆'; position: absolute; left: 0; top: 6px; color: #9d7b45; font-size: 7px; }
  .milestone-copy > p :global(a),
  .detail-list :global(a) {
    color: #c6a366;
    text-decoration: underline;
    text-underline-offset: 3px;
  }
  .milestone-copy > p :global(a:hover),
  .detail-list :global(a:hover) { color: #e0c27a; }
  .gallery { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; margin-top: 18px; }
  .gallery img { display: block; width: 100%; aspect-ratio: 4 / 3; object-fit: cover; }

  .timeline-end {
    position: relative;
    z-index: 1;
    width: 180px;
    margin: 50px auto 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 18px;
  }
  .timeline-end span {
    width: 8px;
    height: 8px;
    border: 1px solid #75633f;
    border-radius: 50%;
    background: #0a0b0b;
    box-shadow: 0 0 0 7px #090a0a;
  }
  .timeline-end small {
    color: #655c4c;
    text-transform: uppercase;
    font: 9px/1 var(--font-ui);
    letter-spacing: .2em;
  }
  .text-link {
    position: relative;
    z-index: 1;
    display: flex;
    width: max-content;
    align-items: center;
    gap: 12px;
    margin: 48px auto 0;
    color: #b99554;
    text-decoration: none;
    text-transform: uppercase;
    font: 10px/1 var(--font-ui);
    letter-spacing: .16em;
  }
  .text-link:hover { color: #d5b46c; }
  .text-link span { transition: transform .2s ease; }
  .text-link:hover span { transform: translateX(4px); }
  .empty {
    position: relative;
    z-index: 1;
    max-width: 660px;
    margin: 0 auto;
    padding: 42px 40px;
    border: 1px solid #30281c;
    background: #0d1011;
    text-align: center;
  }
  .empty .status-pill { position: static; }
  .empty p { margin: 22px 0 0; color: #9e9587; font: 18px/1.8 var(--font-body); }

  @keyframes reveal {
    from { opacity: 0; transform: translateY(-5px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 900px) {
    .hero { min-height: 590px; }
    .legend { grid-template-columns: 1fr; gap: 46px; padding-top: 88px; padding-bottom: 88px; }
    .legend-copy { max-width: 620px; }
    .legend-list { max-width: 680px; width: 100%; }
    .timeline { padding-top: 96px; }
    .section-heading { margin-bottom: 70px; text-align: left; }
    .section-heading > p { margin-left: 0; }
    .track { max-width: 720px; margin-left: 0; }
    .track::before { left: 15px; transform: none; }
    .stop {
      grid-template-columns: 31px minmax(0, 1fr);
      column-gap: 22px;
      padding-bottom: 58px;
    }
    .node { grid-column: 1; grid-row: 1; width: 26px; height: 26px; margin-top: 0; justify-self: start; }
    .milestone-meta,
    .stop:nth-child(even) .milestone-meta {
      grid-column: 2;
      grid-row: 1;
      align-items: flex-start;
      padding: 2px 0 15px;
      text-align: left;
    }
    .milestone,
    .stop:nth-child(even) .milestone { grid-column: 2; grid-row: 2; }
    .chapter-number { display: none; }
    .milestone-meta { flex-direction: row; align-items: baseline; flex-wrap: wrap; }
    .chapter-when { font-size: 15px; }
    .timeline-end { width: auto; margin-left: 11px; align-items: flex-start; }
    .timeline-end small { margin-left: -3px; }
  }

  @media (max-width: 600px) {
    .hero { min-height: 540px; padding-bottom: 68px; }
    .content h1 { margin-bottom: 26px; }
    .content p { font-size: 17px; line-height: 1.65; }
    .legend { padding-top: 76px; padding-bottom: 76px; }
    .timeline { padding: 82px 20px 90px; }
    .track { margin-left: 0; }
    .stop { grid-template-columns: 25px minmax(0, 1fr); column-gap: 14px; }
    .track::before { left: 11px; }
    .node { width: 23px; height: 23px; }
    .node svg { width: 14px; height: 14px; }
    .milestone-copy { padding: 22px 20px 20px; }
    .milestone-details { padding: 0 20px 22px; }
    .gallery { grid-template-columns: 1fr; }
    .timeline-end { margin-left: 8px; }
  }

  @media (prefers-reduced-motion: reduce) {
    .milestone,
    .cover img,
    .hero-link span,
    .text-link span { transition: none; }
    .milestone-details { animation: none; }
  }
</style>
