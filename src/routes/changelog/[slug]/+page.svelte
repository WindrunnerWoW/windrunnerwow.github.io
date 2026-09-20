<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import { formatInlineMarkdown } from '$lib/formatInlineMarkdown';

  export let data;
</script>

<svelte:head>
  <title>Version {data.entry.version} - Windrunner Changelog</title>
  <meta name="description" content={data.entry.summary} />
</svelte:head>

<Header />
<main class="inner">
  <article class="release">
    <a class="back" href="/changelog">← Patch archive</a>

    <header class="release-heading" data-changelog-card={data.entry.slug}>
      <div class="heading-meta" data-changelog-part="meta">
        <span>Release notes</span>
        <span>{data.entry.date}</span>
      </div>
      <h1 data-changelog-part="version">{data.entry.version}</h1>
      <p data-changelog-part="summary">{data.entry.summary}</p>
    </header>

    <section class="changes" aria-labelledby="changes-title">
      <div class="changes-heading">
        <div>
          <div class="kicker">WHAT CHANGED</div>
          <h2 id="changes-title">Patch notes</h2>
        </div>
      </div>

      <div class="patch-sections">
        {#each data.entry.sections as section}
          <section class="patch-section">
            <h3>{section.title}</h3>

            {#if section.items?.length}
              <ul>
                {#each section.items as item}<li>{@html formatInlineMarkdown(item)}</li>{/each}
              </ul>
            {/if}

            {#if section.subsections?.length}
              <div class="subsections">
                {#each section.subsections as subsection}
                  <section class="subsection">
                    <h4>{subsection.title}</h4>
                    <ul>
                      {#each subsection.items as item}<li>{@html formatInlineMarkdown(item)}</li>{/each}
                    </ul>
                  </section>
                {/each}
              </div>
            {/if}
          </section>
        {/each}
      </div>
    </section>

    <a class="back bottom" href="/changelog">← Back to all releases</a>
  </article>
</main>
<Footer />

<style>
  .inner {
    min-height: 72vh;
    padding: 150px clamp(24px, 8vw, 130px) 120px;
    background:
      linear-gradient(90deg, rgba(126, 89, 39, .035) 1px, transparent 1px),
      #090b0c;
    background-size: 90px 100%;
  }
  .release { max-width: 1060px; }
  .back {
    display: inline-block;
    margin-bottom: 38px;
    color: #b99554;
    text-decoration: none;
    text-transform: uppercase;
    font: 12px/1 var(--font-ui);
    letter-spacing: .14em;
  }
  .back:hover { color: #d8b86c; }
  .release-heading {
    padding: 34px clamp(26px, 5vw, 64px) 58px;
    position: relative;
    border: 1px solid #433622;
    background:
      radial-gradient(circle at 88% 12%, rgba(160, 114, 48, .14), transparent 30rem),
      linear-gradient(145deg, rgba(84, 59, 28, .11), transparent 55%),
      #0d0f10;
  }
  .release-heading::before {
    content: '';
    position: absolute;
    inset: 9px;
    border: 1px solid rgba(159, 119, 59, .16);
    pointer-events: none;
  }
  .heading-meta {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    padding-bottom: 26px;
    border-bottom: 1px solid #322b21;
    color: #817664;
    text-transform: uppercase;
    font: 12px/1.2 var(--font-ui);
    letter-spacing: .15em;
  }
  .release-heading h1 {
    margin: 70px 0 30px;
    color: #e1d5bd;
    font-size: clamp(58px, 10vw, 126px);
    line-height: .78;
    text-transform: uppercase;
  }
  .release-heading > p {
    max-width: 650px;
    margin: 0;
    color: #a39a8d;
    font: 19px/1.72 var(--font-body);
  }
  .changes { padding: 88px 0 0; }
  .changes-heading {
    margin-bottom: 34px;
  }
  .changes-heading h2 {
    margin: 12px 0 0;
    color: #d9cdb5;
    font-size: clamp(38px, 6vw, 64px);
    line-height: .9;
    text-transform: uppercase;
  }
  .patch-sections { border-top: 1px solid #413525; }
  .patch-section { padding: 38px 8px 34px; border-bottom: 1px solid #332c21; }
  .patch-section h3 {
    margin: 0 0 22px;
    color: #d7c9ac;
    font-size: clamp(25px, 3.4vw, 36px);
    line-height: 1.05;
    text-transform: uppercase;
  }
  .patch-section ul {
    max-width: 840px;
    margin: 0;
    padding-left: 1.25rem;
    color: #aaa193;
    font: 18px/1.68 var(--font-body);
  }
  .patch-section li { padding-left: .35rem; margin-bottom: .72rem; }
  .patch-section li:last-child { margin-bottom: 0; }
  .patch-section li::marker { color: #9d7c46; font-size: .72em; }
  .patch-section :global(a) {
    color: #c6a366;
    text-decoration: underline;
    text-underline-offset: 3px;
  }
  .patch-section :global(a:hover) { color: #e0c27a; }
  .subsections { margin-top: 34px; display: grid; gap: 30px; }
  .subsection { padding-left: 24px; border-left: 1px solid #59452a; }
  .subsection h4 {
    margin: 0 0 16px;
    color: #bea575;
    font-size: 20px;
    line-height: 1.15;
    text-transform: uppercase;
  }
  .bottom { margin: 58px 0 0; }
  @media (max-width: 620px) {
    .inner { padding-top: 126px; padding-bottom: 90px; }
    .release-heading { padding-bottom: 42px; }
    .heading-meta { flex-direction: column; gap: 8px; }
    .release-heading h1 { margin-top: 52px; }
    .changes { padding-top: 68px; }
    .patch-section { padding-left: 0; padding-right: 0; }
    .patch-section ul { font-size: 17px; }
    .subsection { padding-left: 18px; }
  }
</style>
