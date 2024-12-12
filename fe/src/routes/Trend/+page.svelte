<script context="module" lang="ts">
	import { writable } from 'svelte/store';
	import { onMount } from 'svelte';
	export { load } from './+page';
</script>
<script lang="ts">
    import { load } from './+page';
	load();
    export let data: any;
    console.log({data})
    let activeTab = 0;

    // Function to set the active tab
    const setActiveTab = (index: number) => {
        activeTab = index;
    };
</script>

<svelte:head>
    <title>Daily Analytics</title>
    <meta name="description" content="Daily analytics of keywords with product details" />
</svelte:head>

<section>
    <div>
        <h1 class="text-3xl font-bold underline text-cyan-300">Daily Analytics</h1>
    </div>
    <img width="100" style="margin-left: 60px;" src="https://cdn.shoplus.net/assets/logo-en@2x.abbe8d94.png" alt="">
    <div class="row">
        <div class="col-10 text-center text-white">
            {#if !data.data || !data.data.length}
                <!-- Display a loading message if no data is provided -->
                <div class="mt-5 text-center">
                    <p>Loading...</p>
                </div>
            {:else}
                <ul class="nav nav-tabs d-flex" style="margin: 30px;">
                    {#each data.data as { keyword }, index}
                        <li class="nav-item">
                            <button
                                class="nav-link {activeTab === index ? 'active' : ''}"
                                on:click={() => setActiveTab(index)}
                            >
                                {keyword}
                            </button>
                        </li>
                    {/each}
                </ul>

                <!-- Table -->
                <div class="tab-content mt-10" style="overflow-x: auto;">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Image</th>
                                <th scope="col">Title</th>
                                <th scope="col">Sold (7 Days)</th>
                                <th scope="col">Sold (Total)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {#each data.data[activeTab].data as product}
                                <tr>
                                    <td>
                                        <img src="{product.imageUrl}" alt="Product Image" style="max-width: 100px;" />
                                    </td>
                                    <td>{product.title}</td>
                                    <td>{product.sold7Days}</td>
                                    <td>{product.soldTotal}</td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>
            {/if}
        </div>
    </div>
</section>

<style>
    .nav-link.active {
        background-color: #007bff;
        color: white;
    }
</style>
