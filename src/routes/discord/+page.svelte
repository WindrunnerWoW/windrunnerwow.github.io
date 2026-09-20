<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import { discordInviteUrl } from '$lib/data/community';
</script>

<svelte:head>
  <title>Discord - Windrunner</title>
  <meta
    name="description"
    content="Join the Windrunner Discord for development news, feedback, and the community around this single-player Vanilla+ project."
  />
</svelte:head>

<div class="discord-page">
  <Header />
  <main>
    <section class="panel">
      <div class="kicker">COMMUNITY</div>
      <h1>Discord</h1>
      <p>
        Development chatter, feedback, and the people walking Azeroth alone. Come in, say hello, and
        keep up as the project grows.
      </p>
      <a class="discord-btn" href={discordInviteUrl} target="_blank" rel="noopener noreferrer">
        <svg class="clyde" viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.1.1 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.1 16.1 0 0 0-4.8 0c-.14-.34-.36-.76-.54-1.09c-.02-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.24 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25c.02-.01.05-.01.07 0c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07 0c.11.09.22.17.33.26c.04.03.04.09-.01.11c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.02.02.05.03.08.02c1.72-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02M8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.84 2.12-1.89 2.12m6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.83 2.12-1.89 2.12"
          />
        </svg>
        STILL UNDER CONSTRUCTION
      </a>
    </section>
  </main>
  <Footer />
</div>

<style>
  .discord-page {
    min-height: 100vh;
    background:
      radial-gradient(ellipse at 50% 28%, rgba(88, 101, 242, 0.16), transparent 42%),
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
    margin: 0 auto 48px;
    font: 18px / 1.85 var(--font-body);
    color: #aaa091;
  }

  .discord-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    min-width: min(420px, 100%);
    padding: 26px 42px;
    border: 1px solid #c9b06a;
    border-radius: 6px;
    background: linear-gradient(180deg, #6d78f7 0%, #5865f2 46%, #3f4ac4 100%);
    color: #f4f6ff;
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: 0.18em;
    font: 700 15px / 1 var(--font-ui);
    box-shadow:
      0 0 0 1px #5c4318,
      0 16px 40px rgba(0, 0, 0, 0.45),
      0 0 48px rgba(88, 101, 242, 0.38),
      inset 0 1px 0 rgba(255, 255, 255, 0.28);
  }

  .discord-btn:hover {
    color: #fff;
    transform: translateY(-2px);
    border-color: #ffe7a8;
    box-shadow:
      0 0 0 1px #6a4e1c,
      0 20px 44px rgba(0, 0, 0, 0.5),
      0 0 64px rgba(88, 101, 242, 0.55),
      inset 0 1px 0 rgba(255, 255, 255, 0.38);
  }

  .clyde {
    width: 34px;
    height: 34px;
    flex: none;
  }

  @media (max-width: 520px) {
    .discord-btn {
      min-width: 100%;
      padding: 22px 22px;
      letter-spacing: 0.12em;
      font-size: 13px;
    }

    p {
      font-size: 16px;
      margin-bottom: 36px;
    }
  }
</style>
