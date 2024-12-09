<script context="module" lang="ts">
	import { writable } from 'svelte/store';
	import { onMount } from 'svelte';
	export { load } from './+page';
</script>

<script lang="ts">
	import { load } from './+page';
	load();
	onMount(() => {
	});
	export let data;
	let textareaContent = '';

	const handleGenExcel=async ()=>{
		console.log("Textarea Content:", textareaContent);
		try {
			const response = await fetch(`http://localhost:3001/creator/excelGenerator`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ listAccount: textareaContent })
			});
			if (response.ok) {
				console.log('scroll is in progress');
			} else {
				console.error('failed to delete');
			}
		} catch (error) {
			console.log('error :', error);
		}
	}
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<div style="display: flex;"> 
		<textarea bind:value={textareaContent} name="profile name" id="pro5name"></textarea>
		<button on:click={()=>handleGenExcel()} class="send-message">Gen</button>
	</div>
</section>
<style>
	.send-message {
		cursor: pointer;
		background-color: red;
		color: aliceblue;
		border: none;
		padding: 10px;
		transition: 0.2s;
	}
	.send-message:hover {
		opacity: 0.8;
		transform: scale(1.1);
	}
	.right {
		display: flex;
		justify-content: end;
		padding: 20px;
	}
</style>
