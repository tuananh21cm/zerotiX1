<script lang="ts">
</script>

<!-- <p>visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p> -->

<footer class="fixed-bottom">
	<!-- <img src={logo} height="58px" alt="zeroti logo" /> -->
	<p class="nameProfile ">
		<img src="/header/fly.png" width="40" alt="">
	</p>
	<!-- <p class="nameProfile">
		<img src="/header/dog.gif" width="50" alt="">
	</p> -->
</footer>

<style>
	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
		text-align: center;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
