<script lang="ts">
	import { Button, Modal } from 'flowbite-svelte';
	import { tick } from 'svelte';

	let defaultModal = false;

	let groupName = '';
	let urlGroup = '';

	interface IDataGroup {
		groupName: string;
		urlGroup: string;
	}

	// Function to call API
	async function addPost(dataGroup: IDataGroup) {
		try {
			const response = await fetch('http://localhost:3001/crawlPostFb', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(dataGroup)
			});

			if (response.ok) {
				const result = await response.json();
				console.log("Data posted successfully:", result);
				
				// Close the modal after success
				await tick();
				defaultModal = false;
			} else {
				console.error('Failed:', response.statusText);
			}
		} catch (error) {
			console.error('Error:', error);
		}
	}

	// Form submission handler
	function handleSubmit(event: Event) {
		// event.preventDefault(); // Prevent page reload
		addPost({ groupName, urlGroup });
	}
</script>

<svelte:head>
	<title>Post Crawl Management</title>
	<meta name="description" content="Hello" />
</svelte:head>

<section>
	<div>
		<h1 class="text-3xl font-bold">Post Crawl Management</h1>
		<Button
			type="button"
			class="mb-2 me-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
			on:click={() => (defaultModal = true)}>Add New Group</Button>

		<Modal title="Add New Group" bind:open={defaultModal} autoclose={false}>
			<form on:submit={handleSubmit} class="mx-auto max-w-sm">
				<div class="mb-5">
					<label for="name" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Group Name</label>
					<input
						bind:value={groupName}
						type="text"
						id="name"
						class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
						required
					/>
				</div>
				<div class="mb-5">
					<label for="url" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">URL</label>
					<input
						bind:value={urlGroup}
						type="text"
						id="url"
						class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
						required
					/>
				</div>
				<button
					type="submit"
					class="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto"
				>
					OK
				</button>
			</form>
		</Modal>
	</div>
</section>
