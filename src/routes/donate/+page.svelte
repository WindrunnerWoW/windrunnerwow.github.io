<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import { kofiUrl } from '$lib/data/community';
</script>

<svelte:head>
  <title>Donations - Windrunner</title>
  <meta
    name="description"
    content="Windrunner does not depend on donations. If you want to give, please support an animal shelter instead. If you specifically want to support the project, there is a Ko-fi."
  />
</svelte:head>

<div class="donate-page">
  <Header />
  <main>
    <section class="panel">
      <div class="kicker">SUPPORT, IF YOU WANT TO</div>
      <h1>Donations</h1>
      <p>
        I don't depend on donations. Windrunner keeps getting worked on either way, nothing here is
        paywalled, and that is not going to change.
      </p>
      <p class="prefer">
        If you have money you want to give away, please send it to an animal shelter instead. Pick one
        near you, or any rescue that needs a hand. That is my honest preference. Not sure where to
        start?
        <a href="https://www.four-paws.org/" target="_blank" rel="noopener noreferrer">Four Paws</a>
        and
        <a
          href="https://www.doctorswithoutborders.org/"
          target="_blank"
          rel="noopener noreferrer">Doctors Without Borders</a
        >
        are great charities, or pick any other charity you trust.
      </p>
      <p class="fine">
        If you specifically want to support me so I can keep working on the project, there is a Ko-fi.
        It helps, and it is genuinely appreciated. It is just never expected.
      </p>
      <a class="kofi-btn" href={kofiUrl} target="_blank" rel="noopener noreferrer">
        <svg
          class="cup"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
          <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
          <line x1="6" y1="1" x2="6" y2="4" />
          <line x1="10" y1="1" x2="10" y2="4" />
          <line x1="14" y1="1" x2="14" y2="4" />
        </svg>
        Support on Ko-fi
      </a>
    </section>
  </main>
  <Footer />
</div>

<style>
  .donate-page {
    min-height: 100vh;
    background:
      radial-gradient(ellipse at 50% 28%, rgba(255, 94, 91, 0.14), transparent 42%),
      radial-gradient(circle at 78% 18%, rgba(167, 131, 72, 0.14), transparent 32%),
      #090b0c;
  }

  main {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 140px 24px 100px;
  }

  .panel {
    width: min(820px, 100%);
    text-align: center;
  }

  h1 {
    font-size: clamp(64px, 12vw, 140px);
    line-height: 0.82;
    text-transform: uppercase;
    color: #e2d5b8;
    margin: 18px 0 28px;
    letter-spacing: -0.04em;
  }

  p {
    max-width: 560px;
    margin: 0 auto 22px;
    font: 18px / 1.85 var(--font-body);
    color: #aaa091;
  }

  .prefer {
    color: #c7b382;
  }

  .prefer a {
    color: #e7d6a4;
    text-decoration: underline;
    text-underline-offset: 3px;
    text-decoration-color: #80663a;
  }

  .prefer a:hover {
    color: #ffe7a8;
    text-decoration-color: #c4a05a;
  }

  .fine {
    margin-bottom: 48px;
    font-size: 16px;
    color: #8f877b;
  }

  .kofi-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    min-width: min(260px, 100%);
    padding: 16px 28px;
    border: 1px solid #c9b06a;
    border-radius: 5px;
    background: linear-gradient(180deg, #ff8b84 0%, #ff5e5b 46%, #d83a40 100%);
    color: #fff6f4;
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: 0.16em;
    font: 700 13px / 1 var(--font-ui);
    box-shadow:
      0 0 0 1px #5c3418,
      0 10px 26px rgba(0, 0, 0, 0.42),
      0 0 34px rgba(255, 94, 91, 0.32),
      inset 0 1px 0 rgba(255, 255, 255, 0.28);
  }

  .kofi-btn:hover {
    color: #fff;
    transform: translateY(-2px);
    border-color: #ffe7a8;
    box-shadow:
      0 0 0 1px #6a4e1c,
      0 14px 30px rgba(0, 0, 0, 0.48),
      0 0 46px rgba(255, 94, 91, 0.48),
      inset 0 1px 0 rgba(255, 255, 255, 0.38);
  }

  .cup {
    width: 22px;
    height: 22px;
    flex: none;
  }

  @media (max-width: 520px) {
    .kofi-btn {
      min-width: 100%;
      padding: 14px 20px;
      letter-spacing: 0.12em;
      font-size: 12px;
    }

    p {
      font-size: 16px;
    }

    .fine {
      margin-bottom: 36px;
    }
  }
</style>
