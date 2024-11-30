<script lang="ts">
	async function crawlSystem (){
             try {
            const response = await fetch('http://localhost:3001/crawlSystem');

            if (response.ok) {
                console.log("some thing wrong");
            } else {
                console.error('Failed to generate title:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
</script>
<svelte:head>
	<title>Daily Analytics</title>
	<meta name="description" content="Hello" />
</svelte:head>
<section>
	<div>
		<h1 class="text-3xl font-bold underline text-cyan-300">Daily Analytics</h1>
		<button on:click={crawlSystem}>get </button>
	</div>
</section>