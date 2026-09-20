<script lang="ts">
  import StoryPage from '$lib/components/StoryPage.svelte';

  const soundtracks = [
    {
      kicker: 'THALASSIAN HIGHLANDS',
      title: 'Hear the Highlands.',
      copy: 'Immerse yourself in the enchanting melodies of Thalassian Highlands’ early autumn warmth.',
      links: [
        { href: 'https://open.spotify.com/album/4Bsid4jVJiAizt2az9a44c', label: 'Spotify ↗' },
        { href: 'https://classical.music.apple.com/us/album/1725262546', label: 'Apple Music ↗' },
        { href: 'https://www.youtube.com/watch?v=PC8T0Q3klsI', label: 'YouTube ↗' }
      ]
    },
    {
      kicker: 'BLACKSTONE ISLAND',
      title: 'Hear Blackstone Island.',
      copy: "Hear the gritty, forlorn echoes of Blackstone Isle's landscape!",
      links: [
        { href: 'https://open.spotify.com/album/6NC5FiQuiYnwDwD1rU37R1', label: 'Spotify ↗' },
        { href: 'https://music.apple.com/gb/album/blackstone-island/1725277042', label: 'Apple Music ↗' },
        { href: 'https://www.youtube.com/watch?v=Jd9OhfA93v8', label: 'YouTube ↗' }
      ]
    }
  ];
</script>

<StoryPage
  title="Music & Sound"
  eyebrow="SOUND DESIGN"
  intro="Sound design has always been a big part of Warcraft Universe. It helped bring players closer to the stories this world had to offer and enhanced the experience its players had."
  heroImage="/art/high-elves/soundtrack.webp"
  heroPosition="center"
  heroSize="cover"
  sectionEyebrow="AUDIO DIRECTION"
  sectionTitle="A world you can hear."
  bullets={[
    'Local soundscapes give new zones a clear identity.',
    'Sound supports story beats without overwhelming exploration.',
    'Selected music links preserve the atmosphere beyond the game.'
  ]}
>
  <section class="sound-section">
    {#each soundtracks as soundtrack}
      <article class="sound-card">
        <div class="sound-wave" aria-hidden="true">
          <span></span><span></span><span></span><span></span><span></span><span></span><span></span>
          <span></span><span></span><span></span><span></span><span></span><span></span><span></span>
        </div>
        <div>
          <div class="kicker">{soundtrack.kicker}</div>
          <h2>{soundtrack.title}</h2>
          <p>{soundtrack.copy}</p>
          <div class="music-links">
            {#each soundtrack.links as link}
              <a href={link.href} target="_blank" rel="noreferrer">{link.label}</a>
            {/each}
          </div>
        </div>
      </article>
    {/each}
  </section>
</StoryPage>

<style>
  .sound-section {
    padding: 40px clamp(24px, 8vw, 130px) 120px;
    background: #080a0b;
    border-top: 1px solid #17130f;
    display: grid;
    gap: 28px;
  }
  .sound-card {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 70px;
    align-items: center;
    padding: 56px;
    border: 1px solid #342b1d;
    background: linear-gradient(135deg, rgba(79, 57, 31, 0.18), transparent 60%), #0d1011;
  }
  .sound-card h2 {
    font-size: clamp(37px, 5vw, 66px);
    text-transform: uppercase;
    color: #d8cbb1;
    line-height: 0.9;
    margin: 13px 0;
  }
  .sound-card p {
    max-width: 520px;
    color: #938b7f;
    font: 17px / 1.75 var(--font-body);
    margin: 0;
  }
  .music-links {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    margin-top: 24px;
  }
  .music-links a {
    padding: 12px 16px;
    border: 1px solid #6b522e;
    color: #c9b27d;
    text-decoration: none;
    text-transform: uppercase;
    font: 10px var(--font-ui);
    letter-spacing: 0.12em;
  }
  .music-links a:hover {
    background: rgba(116, 84, 35, 0.2);
  }
  .sound-wave {
    height: 180px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }
  .sound-wave span {
    width: 5px;
    height: var(--height, 48px);
    background: linear-gradient(#c9a65e, #5b4729);
    opacity: 0.75;
    animation: wave 1.6s ease-in-out infinite alternate;
  }
  .sound-wave span:nth-child(2n) {
    --height: 90px;
    animation-delay: -0.4s;
  }
  .sound-wave span:nth-child(3n) {
    --height: 135px;
    animation-delay: -0.9s;
  }
  .sound-wave span:nth-child(5n) {
    --height: 65px;
    animation-delay: -0.2s;
  }
  @keyframes wave {
    to {
      transform: scaleY(0.5);
      opacity: 0.45;
    }
  }
  @media (max-width: 700px) {
    .sound-section {
      padding: 0 22px 80px;
    }
    .sound-card {
      grid-template-columns: 1fr;
      gap: 25px;
      padding: 30px;
    }
    .sound-wave {
      height: 110px;
    }
  }
</style>
