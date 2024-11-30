<script lang="ts">
	import Grid from 'gridjs-svelte';

	export let data: Array<any>;
	export let columns: Array<any>;
</script>

<style global>
	@import 'https://cdn.jsdelivr.net/npm/gridjs/dist/theme/mermaid.min.css';
</style>


<Grid {data} autoWidth {columns} />
