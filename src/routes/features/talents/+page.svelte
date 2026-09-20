<script lang="ts">
import Header from '$lib/components/Header.svelte';
import Footer from '$lib/components/Footer.svelte';
</script>
<svelte:head><title>TALENTS - Windrunner</title></svelte:head>
<Header/>
<main>
<section class="hero" style="--hero-image: url('/art/features/classes.webp'); --hero-position: center; --hero-size: cover">
<div class="content"><div class="kicker">TALENTS</div><h1>Plan builds that fit the journey.</h1><p>A dedicated build planner supports class changes and makes experimentation easy.</p></div>
</section>
<section class="detail"><div><div class="kicker">DESIGN PRINCIPLES</div><h2>Built to feel native to Vanilla.</h2></div><div><ul><li>Support shareable build URLs.</li><li>Keep tree structure familiar and readable.</li><li>Document every altered talent alongside patch notes.</li></ul><a class="cta" href="/talents">Open Talent Calculator</a></div></section>
</main>
<Footer/>
<style>
.hero{min-height:760px;display:flex;align-items:end;padding:150px clamp(24px,8vw,130px) 95px;background-image:linear-gradient(180deg,rgba(5,7,8,.15),rgba(5,7,8,.86) 75%,#090b0c),linear-gradient(90deg,rgba(5,7,8,.8),transparent 65%),var(--hero-image);background-size:var(--hero-size, cover);background-position:var(--hero-position, center);background-repeat:no-repeat}.content{max-width:900px}.content h1{font-size:clamp(54px,9vw,112px);line-height:.84;text-transform:uppercase;color:#ded3bb;margin:14px 0 24px}.content p{max-width:760px;font-family:var(--font-body);font-size:18px;line-height:1.85;color:#b1a898}.detail{display:grid;grid-template-columns:1fr 1fr;gap:80px;padding:120px clamp(24px,8vw,130px);background:#090b0c}.detail h2{font-size:clamp(38px,5vw,68px);line-height:.95;text-transform:uppercase;color:#d9cdb5;margin:12px 0}ul{margin:0;padding-left:20px;color:#9c9487;font-family:var(--font-body);font-size:17px;line-height:1.9}.cta{display:inline-block;margin-top:34px;padding:14px 18px;border:1px solid #80663a;color:#c7b382;text-decoration:none;text-transform:uppercase;font-size:10px;letter-spacing:.14em}@media(max-width:800px){.detail{grid-template-columns:1fr;gap:30px}.hero{min-height:650px}}
</style>
