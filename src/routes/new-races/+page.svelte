<script lang="ts">
import Header from '$lib/components/Header.svelte';
import Footer from '$lib/components/Footer.svelte';
</script>
<svelte:head><title>New Playable Races - Windrunner</title></svelte:head>
<Header/>
<main>
<section class="hero" style="--hero-image: url('/art/features/races.webp'); --hero-position: center; --hero-size: cover">
<div class="content"><div class="kicker">NEW PLAYABLE RACES</div><h1>Goblins & High Elves</h1><p>In addition to new dungeons, raids, and zones, the expansion features two new races. A group of greedy Goblins splits off from the Venture Company, and High Elf refugees from the fall of Quel'Thalas lend their magical talents to the Alliance.</p></div>
</section>
<section class="detail"><div><div class="kicker">HIGH ELVES</div><h2>Silvermoon Remnant</h2><p class="detail-race-meta">Starting zone: Thalassian Highlands</p><ul><li><strong>Swiftness of the Rangers:</strong> +2% Agility</li><li><strong>Bow Specialization:</strong> +3 Bow skill</li><li><strong>Quel'dorei Meditation:</strong> Restores 10% max mana, 50 energy, or 20 rage over 5 seconds</li><li><strong>Enchanting Specialization:</strong> +10 Enchanting skill</li></ul><a class="cta" href="/high-elves">EXPLORE HIGH ELVES →</a></div><div><div class="kicker">GOBLINS</div><h2>Durotar Labor Union</h2><p class="detail-race-meta">Starting zone: Blackstone Island</p><ul><li><strong>Prospecting:</strong> +10 Mining and Jewelcrafting skill</li><li><strong>Exit Strategy:</strong> +40% movement speed for 5 seconds</li><li><strong>Aggressive Negotiations:</strong> +3 skill with Daggers, One-Handed and Two-Handed Maces</li></ul><a class="cta" href="/goblins">EXPLORE GOBLINS →</a></div></section>
</main>
<Footer/>
<style>
.hero{min-height:760px;display:flex;align-items:end;padding:150px clamp(24px,8vw,130px) 95px;background-image:linear-gradient(180deg,rgba(5,7,8,.15),rgba(5,7,8,.86) 75%,#090b0c),linear-gradient(90deg,rgba(5,7,8,.8),transparent 65%),var(--hero-image);background-size:var(--hero-size, cover);background-position:var(--hero-position, center);background-repeat:no-repeat}.content{max-width:900px}.content h1{font-size:clamp(54px,9vw,112px);line-height:.84;text-transform:uppercase;color:#ded3bb;margin:14px 0 24px}.content p{max-width:760px;font-family:var(--font-body);font-size:18px;line-height:1.85;color:#b1a898}.detail{display:grid;grid-template-columns:1fr 1fr;gap:80px;padding:120px clamp(24px,8vw,130px);background:#090b0c}.detail h2{font-size:clamp(38px,5vw,68px);line-height:.95;text-transform:uppercase;color:#d9cdb5;margin:12px 0}ul{margin:0;padding-left:20px;color:#9c9487;font-family:var(--font-body);font-size:17px;line-height:1.9}.cta{display:inline-block;margin-top:34px;padding:14px 18px;border:1px solid #80663a;color:#c7b382;text-decoration:none;text-transform:uppercase;font-size:10px;letter-spacing:.14em}@media(max-width:800px){.detail{grid-template-columns:1fr;gap:30px}.hero{min-height:650px}}
.detail-race-meta{margin:8px 0 20px;font-family:var(--font-body);font-size:16px;color:#8a8279}
</style>
