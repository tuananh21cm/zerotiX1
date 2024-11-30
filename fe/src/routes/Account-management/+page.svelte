<script lang="ts">
	import { html } from 'gridjs';
	import DataGrid from '../../components/ag-grid-community/DataGrid.svelte';
	export let data;
	let keys = Object.keys(data?.data?.[0]).filter((x) => !['link'].includes(x));
    let visibleColumns = ['name', 'cookie','avatar','link' /* add more columns */];
	const columns = [
		{
			id: 'link',
			name: 'link',
			formatter: (cell: string) => html(`<a href='/Post-insight/${cell}'>${cell}</a>`)
		},
        ...visibleColumns.map(key => ({ id: key, name: key }))

	];
	import { selected } from '../+page.svelte';
	const subscription = selected.subscribe(value => {
  console.log("Selected value:   ;;;", value);
});
console.log("subscription :",subscription)
</script>
<svelte:head>
	<title>account management</title>
	<meta name="description" content="Hello" />
</svelte:head>
<section>
	<h1>account management</h1>
</section>
<DataGrid data={data.data} {columns} />
<!-- //tuananka9zeroti -->
<!-- tuananhdz5cmzeroti -->