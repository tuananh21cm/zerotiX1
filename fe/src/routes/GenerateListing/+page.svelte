<script context="module" lang="ts">
	import { writable } from 'svelte/store';
	import { onMount } from 'svelte';
	export { load } from './+page';
</script>

<script lang="ts">
	let folderInput: HTMLInputElement | null = null;
	let folderPathInput = 'a'; // Variable to bind the input text
	import { load } from './+page';
	load();
	let keyword = '';
    let numberAccount = 1;
    let generateTitles:any =[];
	const keywords = writable<any[]>([]);
	export let data;
	let listName: any = [];
    let editingIndex:any = null;

const updateItem = (index:any, newValue:any) => {
    listName[index] = newValue; 
    editingIndex = null; 
};

// Function to cancel editing
const cancelEdit = () => {
    editingIndex = null; // Exit edit mode without saving
};
	onMount(() => {
		keywords.set([...data.data]);
		console.log('ok');
		if (folderInput) {
			(folderInput as any).webkitdirectory = true;
		}
	});
	const AddKeyword = async () => {
		console.log(keyword);
		try {
			const response = await fetch(`http://localhost:3001/keywordTitle`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ keyword: { keyword, category: 'meme' } })
			});
			if (response.ok) {
				const result = await response.json();
				keywords.set(result.map((item: any) => item.keyword)); // Extract and set keywords
			} else {
				console.error('Failed to fetch keywords:', response.statusText);
				// keywords.set([]); // Clear keywords on failure
			}
		} catch (error) {
			console.error('Error fetching keywords:', error);
			// keywords.set([]); // Clear keywords on error
		} finally {
			keyword = '';
		}
	};
    const handleFolderSelection = (event: Event) => {
        const input = event.target as HTMLInputElement;
        if (input.files) {
            const newNames = [];
            for (let i = 0; i < input.files.length; i++) {
                const file = input.files[i];
                if (file.name.split('.')[0].includes('Thumbs')) continue;
                newNames.push(file.name.split('.')[0]);
            }
            listName = [...listName, ...newNames]; // Reassign to trigger reactivity
        } else {
            console.log('No files selected');
        }
    };
	const handleGenTitle = async () => {
        console.log({listName})
        console.log({numberAccount})
		const response = await fetch('http://localhost:3001/genTitle', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					fileName: folderPathInput,
					listKeys: listName,
                    numberAccount
				})
			});

			if (response.ok) {
                console.log({response})
				generateTitles= await response.json();
				console.log('Response:', generateTitles.generatedTitles);
			} else {
				console.error('Failed to generate title:', response.statusText);
			}
	};
	async function genImg() {
		console.log('gen img');
		//  try {
		// const response = await fetch('http://localhost:3001/genImg', {
		//     method: 'POST',
		//     headers: {
		//         'Content-Type': 'application/json'
		//     },
		//     body: JSON.stringify({
		//         fileName: folderPathInput,
		//         listKeys: ["a", "b", "c"]
		//     })
		// });

		// if (response.ok) {
		//     const result = await response.json();
		// } else {
		//     console.error('Failed to generate title:', response.statusText);
		// }
		// } catch (error) {
		//     console.error('Error:', error);
		// }
	}
</script>

<svelte:head>
	<title>Generate Resource Listing</title>
	<meta name="description" content="Hello" />
</svelte:head>

<section>
	<div>
		<h1 class="text-3xl font-bold text-cyan-300 underline">Generate Resource Listing</h1>
		<input type="text" />
		<input type="file" bind:this={folderInput} on:change={handleFolderSelection} />
		<!-- <input type="text" bind:value={folderPathInput} /> -->
		<button type="button"
        class="btn btn-primary" on:click={handleGenTitle} >Gen</button>
		<button
			type="button"
			class="btn btn-primary"
			data-bs-toggle="modal"
			data-bs-target="#staticBackdrop"
		>
			Key word
		</button>
        <div>
            <div>
                {#each listName as name, index}
                    <div class="list-item">
                        <!-- Toggle between span and input -->
                        {#if editingIndex === index}
                            <input
                                type="text"
                                bind:value={listName[index]}
                                on:blur={() => updateItem(index, listName[index])} 
                                on:keydown={(e) => e.key === 'Enter' && updateItem(index, listName[index])} 
                                on:keydown={(e) => e.key === 'Escape' && cancelEdit()} 
                            />
                        {:else}
                            <span on:click={() => (editingIndex = index)}>
                                {index + 1}. {name}
                            </span>
                        {/if}
                    </div>
                {/each}
            </div>
            <p style="width: 100px;">
                <input
                type="numer"
                bind:value={numberAccount}
                placeholder="Amount"
                class="border border-gray-300 rounded px-4 py-2 w-full"
              />
            </p>
        </div>
        
        <div>
            {#if generateTitles?.generatedTitles}
                <ul class="d-flex flex-column justify-start">
                    {#each generateTitles.generatedTitles as title, index}
                        <li>{index + 1}. {title}</li>
                    {/each}
                </ul>
            {:else}
                <p>Loading...</p>
            {/if}
        </div>
        
        
        <!-- MODAL KEY WORD  -->
		<div
			class="modal fade"
			id="staticBackdrop"
			data-bs-backdrop="static"
			data-bs-keyboard="false"
			tabindex="-1"
			aria-labelledby="staticBackdropLabel"
			aria-hidden="true"
		>
			<div class="modal-dialog modal-dialog-scrollable">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="staticBackdropLabel">List Keys</h5>
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
						></button>
					</div>
					<div class="modal-body">
						<div class="input-group mb-3">
							<input
								type="text"
								class="form-control"
								bind:value={keyword}
								placeholder="Type keyword"
								aria-label="Type keyword"
								aria-describedby="button-addon2"
							/>
							<button
								class="btn btn-outline-secondary"
								type="button"
								id="button-addon2"
								on:click={() => AddKeyword()}>Add</button
							>
						</div>
						<div>
							{#each $keywords as keyword}
								<div class="keyword">
									<div class="d-flex justify-content-between">
										<p>{keyword.keyword}</p>
										<button>❌</button>
									</div>
								</div>
							{/each}
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-primary">Save</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.keyword:hover {
		background-color: aliceblue;
		color: red;
	}
</style>
