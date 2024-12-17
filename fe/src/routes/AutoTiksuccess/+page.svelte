<script context="module" lang="ts">
	import { writable } from 'svelte/store';
	import { onMount } from 'svelte';
	export { load } from './+page';
</script>

<script lang="ts">
	import * as XLSX from 'xlsx';
	let folderInput: HTMLInputElement | null = null;
	let fileNames: string[] = [];
	import { load } from './+page';
	load();
	let keyword = '';
	let numberAccount = 1;
	let generateTitles: any = [];
	export let data;
	let keywords: any;
	let listName: any = [];
	let editingIndex: any = null;
	export let options: string[] = data.data?.data2.data.map(
		(entry: { profile: string }) => entry.profile
	);
	let searchQuery = writable<string>('');
	let selectedOptions = writable<string[]>([]);
	let dropdownOpen = writable<boolean>(false);
	let formData = {
		profileName: '',
		order: 0,
		category: 'meme',
		folderPath: ''
	};
	let niche: any;
	let editingTitleIndex: number | null = null;
	const updateTitle = (index: number, newValue: string) => {
		generateTitles.generatedTitles[index] = newValue;
		editingTitleIndex = null;
	};

	const cancelEditTitle = () => {
		editingTitleIndex = null; // Exit edit mode without saving
	};
	const handleSubmitAddProfile = (event: Event) => {
		event.preventDefault();
		console.log('Form Data Submitted:', formData);
	};

	$: filteredOptions = options.filter((option) =>
		option.toLowerCase().includes($searchQuery.toLowerCase())
	);
	if (folderInput) {
		(folderInput as HTMLInputElement).webkitdirectory = true;
		(folderInput as HTMLInputElement).setAttribute('directory', '');
	}
	function handleClickOutside(event: any) {
		if (!event.target.closest('.dropdown-container')) {
			dropdownOpen.set(false);
		}
	}
	function toggleDropdown() {
		isFileSelected = true;
		dropdownOpen.update((state) => !state);
	}
	let seller: any;
	let loadingKeywords = true;
	onMount(async () => {
		try {
			// Access localStorage
			const storedSeller = localStorage.getItem('seller');

			let seller;
			if (storedSeller) {
				seller = JSON.parse(storedSeller);
			} else {
				// Default seller if not in localStorage
				seller = {
					id: 1,
					name: 'tuananh',
					niche: 'meme'
				};
				localStorage.setItem('seller', JSON.stringify(seller));
			}
			console.log('Using seller:', seller);
			// Call API based on seller
			const response = await fetch(
				`http://localhost:3001/keywordTitle/file?seller=${seller.name}&niche=${seller.niche}`
			);
			if (!response.ok) {
				throw new Error('Failed to fetch data');
			}
			const responseData = await response.json();
			console.log('res : ', responseData);
			keywords = responseData.key;
			niche = responseData.niche;
			console.log({ keywords });
		} catch (error) {
			console.error('Error calling API:', error);
		} finally {
			loadingKeywords = false; // Mark loading as complete
		}
	});
	const exportToExcel = () => {
		const data = generateTitles?.generatedTitles.map((item: any) => [item]);
		const worksheet = XLSX.utils.aoa_to_sheet(data);
		const workbook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
		XLSX.writeFile(workbook, 'exported_data.xlsx');
	};
	// Toggle selection of an option
	function toggleOption(option: string) {
		selectedOptions.update((currentSelections) => {
			if (currentSelections.includes(option)) {
				return currentSelections.filter((selected) => selected !== option);
			} else {
				return [...currentSelections, option];
			}
		});
	}

	// Remove an item from selected options
	function removeOption(option: string) {
		selectedOptions.update((currentSelections) =>
			currentSelections.filter((selected) => selected !== option)
		);
	}

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
	const newNames: Set<string> = new Set();
	const filePaths: Set<string> = new Set();
	const handleFolderSelection = (event: Event) => {
		const input = event.target as HTMLInputElement;
		try {
			if (input.files) {
				for (let i = 0; i < input.files.length; i++) {
					const file = input.files[i];
					if (file.name.includes('Thumbs')) continue;
					const fileNameWithoutExtension = file.name.replace(/\.[^/.]+$/, '');

					newNames.add(fileNameWithoutExtension);
					filePaths.add(file.webkitRelativePath);
					console.log('hhee :', filePaths);
				}

				// Update the reactive variables
				listName = [...listName, ...newNames];
				console.log('Unique File Names Without Extension:', Array.from(newNames));
				console.log('Unique File Paths:', Array.from(filePaths));
			} else {
				console.log('No files selected');
			}
		} catch (error) {
			console.error('Error handling folder selection:', error);
		}
	};

	const handleGenTitle = async () => {
		const storedSeller = localStorage.getItem('seller');
		let seller;
		if (storedSeller) {
			seller = JSON.parse(storedSeller);
		} else {
			seller = {
				id: 1,
				name: 'tuananh',
				niche: 'meme'
			};
			localStorage.setItem('seller', JSON.stringify(seller));
		}
		const sellerName = seller.name;
		const niche = seller.niche;
		const response = await fetch('http://localhost:3001/genTitle', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				fileName: 'folderPathInput',
				listKeys: listName,
				numberAccount: $selectedOptions.length,
				seller:sellerName,
				niche
			})
		});

		if (response.ok) {
			console.log({ response });
			generateTitles = await response.json();
			console.log('Response:', generateTitles.generatedTitles);
		} else {
			console.error('Failed to generate title:', response.statusText);
		}
	};
	const genList = async () => {
		console.log(filePaths);
		const response = await fetch('http://localhost:3001/tikSuccess', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},

			body: JSON.stringify({
				fileNames: generateTitles.generatedTitles,
				filePaths,
				profiles: $selectedOptions
			}) // Send the title data in the body of the request
		});

		if (response.ok) {
			const result = await response.json();
			console.log('Response:', result);
		} else {
			console.error('Failed to generate title:', response.statusText);
		}
	};
	const updateItem = (index: any, newValue: any) => {
		listName[index] = newValue;
		editingIndex = null;
		isFileSelected = true;
	};
	const cancelEdit = () => {
		editingIndex = null; // Exit edit mode without saving
	};
	const handleFileChange = (event: Event) => {
		const input = event.target as HTMLInputElement;
		// if (input.files && input.files[0]) {
		//     formData.file = input.files[0];
		//     console.log("Selected file:", formData.file.name);
		// }
	};
	let profiles: string[] = [];
	let isFileSelected = false;

	function updateSellerNiche(newNiche: any) {
		const storedSeller = localStorage.getItem('seller');
		let seller;
		if (storedSeller) {
			seller = JSON.parse(storedSeller);
			seller.niche = newNiche;
			localStorage.setItem('seller', JSON.stringify(seller));
		} else {
			seller = {
				id: 1,
				name: 'tuananh',
				niche: newNiche
			};
			localStorage.setItem('seller', JSON.stringify(seller));
		}
		return seller;
	}

	async function fetchKeywords(niche: any) {
		try {
			if (!seller) {
				const storedSeller = localStorage.getItem('seller');
				seller = storedSeller
					? JSON.parse(storedSeller)
					: { id: 1, name: 'tuananh', niche: 'meme' };
				if (!storedSeller) {
					localStorage.setItem('seller', JSON.stringify(seller));
				}
			}

			// Update seller's niche for the API call
			seller.niche = niche;

			const response = await fetch(
				`http://localhost:3001/keywordTitle/file?seller=${seller.name}&niche=${seller.niche}`
			);

			if (!response.ok) {
				throw new Error('Failed to fetch data');
			}

			const responseData = await response.json();
			keywords = responseData.key;

			console.log('new niche ', niche);
			console.log('Fetched Keywords:', keywords);
		} catch (error) {
			console.error('Error fetching keywords:', error);
		} finally {
			loadingKeywords = false;
		}
	}
	async function handleNicheChange(event: any) {
		const newNiche = event.target.value.toLowerCase(); // Get selected niche
		console.log({ newNiche });
		if (newNiche) {
			loadingKeywords = true; // Set loading state
			await fetchKeywords(newNiche); // Fetch keywords for the new niche
			niche = newNiche;
			updateSellerNiche(newNiche);
		}
	}
</script>

<svelte:head>
	<title>Auto Tik Success</title>
	<meta name="description" content="Hello" />
</svelte:head>
<section>
	<div>
		<div class="d-flex justify-content-center">
			<h1 class="mr-5 text-3xl font-bold text-cyan-300">Auto Tiksuccess</h1>
			<!-- Button trigger Add Profile-->
			<button
				type="button"
				class="btn btn-warning"
				data-bs-toggle="modal"
				data-bs-target="#exampleModal"
			>
				➕
			</button>
			<!-- Modal -->
			<div
				class="modal fade"
				id="exampleModal"
				tabindex="-1"
				aria-labelledby="exampleModalLabel"
				aria-hidden="true"
			>
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="exampleModalLabel">Add New Profile TikSuccess</h5>
							<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
							></button>
						</div>
						<div class="modal-body">
							<div class="d-flex flex-row-reverse">
								<input
									type="file"
									on:change={handleFileChange}
									class="form-control form-control-sm"
									style="width: auto;"
								/>
							</div>
							<div class="container mt-4">
								<form on:submit={handleSubmitAddProfile} class="rounded border p-4 shadow">
									<h3 class="mb-4 text-center">Profile Form</h3>

									<!-- Profile Name -->
									<div class="mb-3">
										<label for="profileName" class="form-label">Profile Name</label>
										<input
											type="text"
											id="profileName"
											bind:value={formData.profileName}
											class="form-control"
											placeholder="Enter profile name"
											required
										/>
									</div>

									<!-- Order -->
									<div class="mb-3">
										<label for="order" class="form-label">Order</label>
										<input
											type="number"
											id="order"
											bind:value={formData.order}
											class="form-control"
											placeholder="Enter order"
											required
										/>
									</div>

									<!-- Category Dropdown -->
									<div class="mb-3">
										<label for="category" class="form-label">Category</label>
										<select
											id="category"
											bind:value={formData.category}
											class="form-select"
											required
										>
											<option value="meme">Meme</option>
											<option value="rap">Rap</option>
											<option value="anime">Anime</option>
											<option value="sport">Sport</option>
										</select>
									</div>

									<!-- Folder Path -->
									<div class="mb-3">
										<label for="folderPath" class="form-label">Folder Path</label>
										<input
											type="text"
											id="folderPath"
											bind:value={formData.folderPath}
											class="form-control"
											placeholder="Enter folder path"
											required
										/>
									</div>

									<button type="submit" class="btn btn-primary w-100">Submit</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="d-flex justify-content-between">
			<div>
				<input
					type="file"
					bind:this={folderInput}
					on:change={handleFolderSelection}
					multiple
					webkitdirectory
				/>
			</div>
			<button
				type="button"
				class="btn btn-primary"
				data-bs-toggle="modal"
				data-bs-target="#staticBackdrop"
			>
				Key word
			</button>
		</div>
		<div class="flex w-full items-start space-x-4">
			<!-- Dropdown and Search Box -->
			<div class="relative w-1/2">
				<!-- Search box -->
				<input
					type="text"
					placeholder="Search..."
					bind:value={$searchQuery}
					on:focus={toggleDropdown}
					on:input={() => dropdownOpen.set(true)}
					class="w-25 rounded border border-gray-300 px-4 py-2"
				/>

				<!-- Dropdown menu -->
				{#if $dropdownOpen}
					<div
						class="w-25 absolute left-0 top-full z-10 mt-1 max-h-[200px] overflow-y-auto rounded border border-gray-300 bg-white shadow-lg"
					>
						{#each filteredOptions as option}
							<div
								class="flex cursor-pointer items-center px-4 py-2 hover:bg-gray-100"
								on:click={() => toggleOption(option)}
							>
								<input
									type="checkbox"
									class="mr-2"
									checked={$selectedOptions.includes(option)}
									readonly
								/>
								{option}
							</div>
						{/each}
					</div>
				{/if}
			</div>

			<!-- Selected Options -->
			<div class="flex max-h-[60px] w-1/2 flex-wrap items-center gap-2 overflow-y-auto">
				<div>
					<span class="text-sm text-gray-500"><span class="badge bg-danger">{$selectedOptions.length}</span></span>
				</div>
				{#each $selectedOptions as option}
					<div class="ml-50 flex items-center space-x-2 rounded bg-gray-200 px-3 py-1">
						<span class="hover:text-red-700">{option}</span>
						<span
							class="cursor-pointer text-red-500 hover:text-red-700"
							on:click={() => removeOption(option)}>✕</span
						>
					</div>
				{/each}
			</div>
		</div>
		<!--  -->
		<div class="d-flex">
			<div>
				<div>
					<div>
						{#each listName as name, index}
							<div class="list-item">
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
				</div>
				<button
					type="button"
					class="btn btn-primary mt-5"
					on:click={handleGenTitle}
					disabled={!isFileSelected}>Preview Title</button
				>
			</div>
			<div class="d-flex m-5">
				<div class="d-flex flex-column">
					{#if generateTitles?.generatedTitles}
						<div class="d-flex justify-content-center">
							<button
								on:click={exportToExcel}
								class="btn btn-success d-flex align-items-center justify-content-center px-4 py-2 shadow-sm"
							>
								Export to Excel ⬇
							</button>
						</div>
						<ul class="d-flex flex-column justify-start">
							{#each generateTitles.generatedTitles as title, index}
								<li class="w-100">
									{#if editingTitleIndex === index}
										<!-- Inline editing mode -->
										<input
											type="text"
											class="w-100"
											bind:value={generateTitles.generatedTitles[index]}
											on:blur={() => updateTitle(index, generateTitles.generatedTitles[index])}
											on:keydown={(e) =>
												e.key === 'Enter' &&
												updateTitle(index, generateTitles.generatedTitles[index])}
											on:keydown={(e) => e.key === 'Escape' && cancelEditTitle()}
										/>
									{:else}
										<!-- Display mode -->
										<span on:click={() => (editingTitleIndex = index)}>
											{index + 1}. {title}
										</span>
									{/if}
								</li>
							{/each}
						</ul>
					{:else}
						<div>
							<span>💩</span>
						</div>
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
								<div class="w-70 d-flex">
									{#if loadingKeywords}
										<p>loading</p>
									{:else}
										<p><span class="badge bg-primary fs-4 mr-2">{niche}</span></p>
									{/if}
									<select
										class="form-select"
										aria-label="Default select example"
										on:change={handleNicheChange}
									>
										<option disabled selected>Choose another Niche</option>
										<option value="meme">meme</option>
										<option value="sport">sport</option>
										<option value="anime">anime</option>
									</select>
								</div>
								<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
								></button>
							</div>
							<div class="modal-body">
								<!-- <div class="input-group mb-3">
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
								</div> -->
								<div>
									{#if loadingKeywords}
										<p>loading</p>
									{:else}
										{#each keywords as keyword}
											<div class="keyword">
												<div class="d-flex justify-content-between">
													<p>{keyword}</p>
													<!-- <button>❌</button> -->
												</div>
											</div>
										{/each}
									{/if}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{#if generateTitles?.generatedTitles}
				<div class="m-5">
					<button class="bg-success p-3 text-white" on:click={genList}>Start 🔥</button>
				</div>
			{:else}
				<div></div>
			{/if}
		</div>
		<!--  -->
	</div>
</section>

<style>
	.keyword:hover {
		background-color: aliceblue;
		color: red;
	}
	button.btn-success {
		background-color: #28a745;
		border: none;
		border-radius: 5px;
		font-size: 16px;
		font-weight: bold;
		transition:
			background-color 0.3s ease,
			transform 0.2s ease;
	}

	button.btn-success:hover {
		background-color: #218838;
		transform: scale(1.05);
	}

	button.btn-success:active {
		transform: scale(1);
	}
</style>
