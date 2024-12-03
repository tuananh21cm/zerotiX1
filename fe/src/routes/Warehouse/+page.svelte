<svelte:head>
	<title>Warehouse</title>
	<meta name="description" content="Hello" />
</svelte:head>
<script context="module" lang="ts">
	import { writable } from 'svelte/store';
	import { onMount } from 'svelte';
	// export { load } from './+page';
</script>
<script lang="ts">
	// import { load } from './+page';
	// load();
	// export let data;
	let images:any[] = [];
  
  </script>
<section>
	<div>
		<h1 class="text-3xl font-bold underline text-cyan-300">Warehouse</h1>
		<div>
			{#if true}
			  <!-- {#each images as image} -->
				<img src={`//172.16.0.30/kbt_global/KBT_Teamx1/Images/Tuan Anh/warehouse/test/2 In The Pink 1 In the Stink Dirty Humor T-Shirt for Menswear Crewneck Relaxed Fit.jpeg`} alt="Image" />
				<img src={"/warehouse/meme/Alien Cat UFO T-Shirt Selfie T-Shirt Gamis Underwear.jpeg"} alt="Image" />
			  <!-- {/each} -->
			{:else}
			  <p>Loading images...</p>
			{/if}
		  </div>
	</div>
	
</section>