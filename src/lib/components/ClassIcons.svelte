<script lang="ts">
  export let classes: string[] = [];

  const labels: Record<string, string> = {
    warrior: 'Warrior',
    paladin: 'Paladin',
    hunter: 'Hunter',
    rogue: 'Rogue',
    priest: 'Priest',
    shaman: 'Shaman',
    mage: 'Mage',
    warlock: 'Warlock',
    druid: 'Druid',
    'death-knight': 'Death Knight'
  };
</script>

<section class="available-classes">
  <h2>Available Classes</h2>
  <ul aria-label="Available classes">
    {#each classes as id}
      <li>
        <img src="/art/classes/{id}.png" alt={labels[id] ?? id} title={labels[id] ?? id} />
      </li>
    {/each}
  </ul>
</section>

<style>
  .available-classes {
    padding: 88px clamp(24px, 8vw, 130px) 96px;
    text-align: center;
    background: #090b0c;
    border-top: 1px solid #17130f;
  }

  h2 {
    margin: 0 0 42px;
    color: #c9a24d;
    font-family: var(--font-display);
    font-size: clamp(34px, 5vw, 58px);
    font-weight: 400;
    letter-spacing: 0.02em;
  }

  ul {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: clamp(22px, 4.5vw, 64px);
    margin: 0;
    padding: 18px 0 8px;
    list-style: none;
  }

  ul:before {
    content: '';
    position: absolute;
    left: 4%;
    right: 4%;
    top: 50%;
    height: 12px;
    background: url('/art/shared/nav-bottom.png') center / 100% 12px no-repeat;
    opacity: 0.78;
    pointer-events: none;
  }

  li {
    position: relative;
    z-index: 1;
  }

  li:not(:last-child):after {
    content: '◆';
    position: absolute;
    top: 50%;
    right: calc(clamp(22px, 4.5vw, 64px) / -2);
    color: #a78348;
    font-size: 9px;
    transform: translate(50%, -50%);
    pointer-events: none;
  }

  img {
    display: block;
    width: clamp(52px, 7vw, 78px);
    height: clamp(52px, 7vw, 78px);
    object-fit: contain;
    filter: drop-shadow(0 6px 14px rgba(0, 0, 0, 0.55));
  }

  @media (max-width: 700px) {
    ul:before,
    li:not(:last-child):after {
      display: none;
    }

    ul {
      gap: 18px;
    }
  }
</style>
