<script lang="ts">
	import { page } from '$app/stores';
	import logo from '$lib/images/svelte-logo.svg';
	import "./Header.css"
</script>
<style>
.nameProfile{
	font-size: 25px;
	margin-right: 20px;
}
</style>
<header>
	<div class="corner">
		<a href="https://kit.svelte.dev">
			<img src={logo} alt="SvelteKit" />
		</a>
	</div>

	<nav>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z" />
		</svg>
		<ul>
			<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
				<a href="/">Home</a>
			</li>
			
			<li aria-current={$page.url.pathname.startsWith('/AutoTiksuccess') ? 'page' : undefined}>
				<a href="/AutoTiksuccess"> Tiksuccess</a>
			</li>
			
		</ul>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z" />
		</svg>
	</nav>
	<div >
		<p class="nameProfile">.</p>
	</div>
</header>
