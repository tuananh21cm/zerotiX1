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
    let showToast = false;

    const triggerToast = () => {
        showToast = true;
        setTimeout(() => {
            showToast = false;
        }, 3000); // Automatically hide after 3 seconds
    };

	const handleCrawlImage=async ()=>{
		try {
            triggerToast();
            const urls = textareaContent.split("\n")
			const response = await fetch(`http://localhost:3001/crawlImage/crawl`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ urls,downloadDirectory:"C:/crawl"})
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
    <div
    class="toast-container position-fixed top-0 end-0 p-3"
    style="z-index: 1055;"
>
    <div class="toast {showToast ? 'show' : ''}" role="alert" aria-live="assertive" aria-atomic="true">
        <div  style="background-color: #00ff00;" class="toast-header">
            <strong class="me-auto">Cào ảnh</strong>
            <small>Just now</small>
            <button type="button" class="btn-close" on:click={() => (showToast = false)} aria-label="Close"></button>
        </div>
        <div class="toast-body">
             Ảnh lưu vào Folder "C:/crawl" 
        </div>
    </div>
</div>
    <div class="d-flex"> 
      <textarea 
        bind:value={textareaContent} 
        name="profile name" 
        id="pro5name" 
        class="form-control w-100"
        style="width: 100%; max-width: 600px;"
      ></textarea>
      <button 
        on:click={() => handleCrawlImage()} 
        class="btn btn-primary ms-3"
      >
        Crawl
      </button>
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
