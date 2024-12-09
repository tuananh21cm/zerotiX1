<script lang="ts">
    import { onMount } from "svelte";
    import { Chart, registerables } from "chart.js";
    import ChartDataLabels from "chartjs-plugin-datalabels";
    import { writable } from 'svelte/store';
    let chart: any;
    let chartCanvas: HTMLCanvasElement;

    // Register Chart.js and plugins
    Chart.register(...registerables, ChartDataLabels);

    export let data: any;

    // Dynamic color generator
    function getColor(index: number): string {
        const colors = [
            "#FF5C5C", // Red
            "#FFC107", // Yellow
            "#8BC34A", // Light Green
            "#4CAF50", // Green
            "#00BCD4", // Cyan
            "#3F51B5", // Blue
            "#9C27B0", // Purple
            "#E91E63", // Pink
        ];
        return colors[index % colors.length];
    }

    // Chart initialization
    function initializeChart() {
        // Validate data
        if (!data || !data.data || !data.data[0] || !data.data[0].detail) {
            console.error("Invalid or missing data for chart initialization.");
            return;
        }

        const labels = data.data[0].detail.map((item: any) => item.name);
        const values = data.data[0].detail.map((item: any) => item.amountSold);
        const backgroundColors = values.map((_:any, index:any) => getColor(index));

        console.log("Chart Labels:", labels);
        console.log("Chart Values:", values);

        // Destroy any existing chart
        if (chart) {
            chart.destroy();
        }

        chart = new Chart(chartCanvas, {
            type: "pie",
            plugins: [ChartDataLabels],
            data: {
                labels,
                datasets: [
                    {
                        data: values,
                        backgroundColor: backgroundColors,
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    datalabels: {
                        color: "#fff",
                        font: {
                            weight: "bold",
                        }
                    },
                    legend: {
                        display: false,
                    },
                },
            },
        });
    }

    onMount(() => {
        console.log("Canvas Element:", chartCanvas);
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
				console.log(" successfully:");
			} else {
				console.error('Failed:', response.statusText);
			}
		} catch (error) {
			console.error('Error:', error);
		}
	}
    const fetchDataSellerDetail = async (tabName:any) => {
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
    const changeTab = (tabName:any) => {
        activeSellerTab.set(tabName);
        fetchDataSellerDetail(tabName);
    };
</script>


<style>
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

<div style="padding:50px">

    <div class=" d-flex justify-content-center align-items-center">
       <p class="mx-3"> X1 Team </p>
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
</div>
