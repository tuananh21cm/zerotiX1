<script lang="ts">
	const sellers = [
		'Trần Tuấn Anh',
		'Trần Duy Đức',
		'Hoàng Văn Phúc',
		'Đỗ Thị Thu Thảo',
		'Lê Thị Thiện',
		'Trần Quang Anh',
		'Trần Đức Tuấn',
		'Nguyễn Thị Hồng Hạnh'
	];
	import { onMount } from 'svelte';
	import { Chart, registerables } from 'chart.js';
	import ChartDataLabels from 'chartjs-plugin-datalabels';
	import { writable } from 'svelte/store';
	let chart: any;
	let chartCanvas: HTMLCanvasElement;

	// Register Chart.js and plugins
	Chart.register(...registerables, ChartDataLabels);

	export let data: any;

	// Dynamic color generator
	function getColor(index: number): string {
		const colors = [
			'#FF5C5C', // Red
			'#FFC107', // Yellow
			'#8BC34A', // Light Green
			'#4CAF50', // Green
			'#00BCD4', // Cyan
			'#3F51B5', // Blue
			'#9C27B0', // Purple
			'#E91E63' // Pink
		];
		return colors[index % colors.length];
	}
	const truncateTitle = (title: string, wordLimit: number = 10): string => {
		const words = title.split(' ');
		return words.length > wordLimit ? words.slice(0, wordLimit).join(' ') + '...' : title;
	};
	// Chart initialization
	function initializeChart() {
		// Validate data
		if (!data || !data.data || !data.data[0] || !data.data[0].detail) {
			console.error('Invalid or missing data for chart initialization.');
			return;
		}

		const labels = data.data[0].detail.map((item: any) => item.name);
		const values = data.data[0].detail.map((item: any) => item.amountSold);
		const backgroundColors = values.map((_: any, index: any) => getColor(index));

		console.log('Chart Labels:', labels);
		console.log('Chart Values:', values);

		// Destroy any existing chart
		if (chart) {
			chart.destroy();
		}

		chart = new Chart(chartCanvas, {
			type: 'pie',
			plugins: [ChartDataLabels],
			data: {
				labels,
				datasets: [
					{
						data: values,
						backgroundColor: backgroundColors
					}
				]
			},
			options: {
				responsive: true,
				plugins: {
					datalabels: {
						color: '#fff',
						font: {
							weight: 'bold'
						}
					},
					legend: {
						display: false
					}
				}
			}
		});
	}

	onMount(() => {
		console.log('Canvas Element:', chartCanvas);
		initializeChart();
	});
	async function getNewData() {
		try {
			const response = await fetch('http://localhost:3001/crawlSystem/crawlNewData', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				}
			});

			if (response.ok) {
				console.log(' successfully:');
			} else {
				console.error('Failed:', response.statusText);
			}
		} catch (error) {
			console.error('Error:', error);
		}
	}
	const fetchDataSellerDetail = async (tabName: any) => {
		try {
			const response = await fetch(`http://localhost:3001/data?category=${tabName}`);
			if (response.ok) {
				const result = await response.json();
				tabSellerData.set(result);
			} else {
				console.error('Failed to fetch data:', response.statusText);
			}
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};
	const activeSellerTab = writable('meme'); // Default active tab
	const tabSellerData = writable([]);
	const changeTab = (tabName: any) => {
		activeSellerTab.set(tabName);
		fetchDataSellerDetail(tabName);
	};
	$: sortedData = data.data[0].detail[activeTab]?.processedData
		? [...data.data[0].detail[activeTab].processedData].sort((a, b) => b.amount - a.amount)
		: [];
	let activeTab = 0;
	const setActiveTab = (index: number) => {
		activeTab = index;
	};
</script>

<div style="padding:50px">
	<div class=" d-flex justify-content-center align-items-center">
		<p class="mx-3">X1 Team</p>
		<button type="button" class="btn btn-warning" on:click={getNewData}>📩</button>
	</div>
	<div class="d-flex">
		<!-- Legend -->
		<div class="legend">
        {#each data.data[0].detail as item, index}
            <div class="legend-item">
                <div
                    class="color-box"
                    style="background-color: {getColor(index)}"
                ></div>
                <span>{item.name}: {item.amountSold}</span>
            </div>
        {/each}
    </div>
		<!-- Pie Chart -->
		<div class="chart-container">
			<canvas bind:this={chartCanvas}></canvas>
		</div>
	</div>
	<div class="row">
        <div class="col-6 text-white text-center">
		{#if data.data[0].detail.length === 0}
			<!-- Display a loading message if no data is provided -->
			<div class="mt-5 text-center">
				<p>Loading...</p>
			</div>
		{:else}
			<!-- Tabs Navigation -->
			<ul class="nav nav-tabs mt-10">
				{#each data.data[0].detail as seller, index}
					<li class="nav-item">
						<button
							class="nav-link {activeTab === index ? 'active' : ''}"
							on:click={() => setActiveTab(index)}
						>
							{seller.name}
						</button>
					</li>
				{/each}
			</ul>

			<!-- Tab Content -->
			<div class="tab-content mt-10">
				{#if sortedData.length > 0}
					<div class="tab-pane fade show active">
						<table class="table-striped table">
							<thead>
								<tr>
									<th>#</th>
									<th>Image</th>
									<th>Amount</th>
									<th>Title</th>
								</tr>
							</thead>
							<tbody>
								{#each sortedData as product, index}
									<tr>
										<td><span>{index + 1}</span></td>
										<td>
											<img
												src={product.image}
												alt="Product Image"
												style="width: 50px; height: 50px; object-fit: cover;"
											/>
										</td>
										<td>{product.amount} đơn</td>
										<td>{truncateTitle(product.title)}</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				{/if}
			</div>
		{/if}
    </div></div>
</div>

<style>
	.nav-tabs .nav-link.active {
		font-weight: bold;
		background-color: #007bff;
		color: white;
	}
	.container {
		text-align: center;
		padding: 1rem;
	}

	.legend {
		display: flex;
		max-width: 400px;
		flex-wrap: wrap;
		justify-content: center;
		gap: 1rem;
		margin-bottom: 2rem;
	}

	.legend-item {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 14px;
		font-weight: 500;
	}

	.color-box {
		width: 1.5rem;
		height: 0.75rem;
		border-radius: 3px;
	}

	.chart-container {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	canvas {
		max-width: 400px;
		max-height: 400px;
	}
</style>
