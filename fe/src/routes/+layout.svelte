<script>import Footer from '../components/Footer/Footer.svelte';
import Header from '../components/Header/Header.svelte';
import './styles.css';
import '../app.css'</script>

<div class="app">
	<Header></Header>

	<main>
		<slot></slot>
	</main>

	<Footer></Footer>
</div>



<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>
