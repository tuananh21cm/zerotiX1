<script context="module" lang="ts">
	import { writable } from 'svelte/store';
	import { onMount } from 'svelte';
	export { load } from './+page';
</script>

<script lang="ts">
	let images: any[] = [];
	import { load } from './+page';
	load();
	export let data;
</script>

<svelte:head>
	<title>Warehouse</title>
	<meta name="description" content="Hello" />
</svelte:head>
<section>
	<div>
		<div class="d-flex justify-content-center">
			<h1 class="text-3xl font-bold text-cyan-300 mr-5 ">Warehouse</h1>
			<!-- Button trigger modal -->
			<button
				type="button"
				class="btn btn-primary"
				data-bs-toggle="modal"
				data-bs-target="#staticBackdrop"
			>
				Status
			</button>
			<div
				class="modal fade"
				id="staticBackdrop"
				data-bs-backdrop="static"
				data-bs-keyboard="false"
				tabindex="-1"
				aria-labelledby="staticBackdropLabel"
				aria-hidden="true"
			>
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="staticBackdropLabel">Status</h5>
							<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
							></button>
						</div>
						<div class="modal-body">
							<ul class="nav nav-tabs" id="myTab" role="tablist">
								<li class="nav-item" role="presentation">
									<button class="nav-link active" id="tab1-tab" data-bs-toggle="tab" data-bs-target="#tab1" type="button" role="tab" aria-controls="tab1" aria-selected="true">Tab 1</button>
								</li>
								<li class="nav-item" role="presentation">
									<button class="nav-link" id="tab2-tab" data-bs-toggle="tab" data-bs-target="#tab2" type="button" role="tab" aria-controls="tab2" aria-selected="false">Tab 2</button>
								</li>
								<li class="nav-item" role="presentation">
									<button class="nav-link" id="tab3-tab" data-bs-toggle="tab" data-bs-target="#tab3" type="button" role="tab" aria-controls="tab3" aria-selected="false">Tab 3</button>
								</li>
								<li class="nav-item" role="presentation">
									<button class="nav-link" id="tab4-tab" data-bs-toggle="tab" data-bs-target="#tab4" type="button" role="tab" aria-controls="tab4" aria-selected="false">Tab 4</button>
								</li>
								<li class="nav-item" role="presentation">
									<button class="nav-link" id="tab5-tab" data-bs-toggle="tab" data-bs-target="#tab5" type="button" role="tab" aria-controls="tab5" aria-selected="false">Tab 5</button>
								</li>
							</ul>
						
							<!-- Tab content -->
							<div class="tab-content" id="myTabContent">
								<div class="tab-pane fade show active" id="tab1" role="tabpanel" aria-labelledby="tab1-tab">
									<h5>Tab 1 Content</h5>
									<table class="table table-sm">
										<thead>
											<tr>
												<th>Profile</th>
												<th>category</th>
												<th>Status</th>
												<th>amount</th>
											</tr>
										</thead>
										<tbody>
											{#each data.data as row, index}
											<tr class={row.status === 'died' ? "table-danger" : "table-warning"}>
												<td>{row.profileName}</td>
												<td>{row.category}</td>
												<td>{row.status}</td>
												<td>{row.order}</td>
											</tr>
										{/each}
										</tbody>
									</table>
								</div>
								<div class="tab-pane fade" id="tab2" role="tabpanel" aria-labelledby="tab2-tab">
									<h5>Tab 2 Content</h5>
									<p>This is content for Tab 2.</p>
								</div>
								<div class="tab-pane fade" id="tab3" role="tabpanel" aria-labelledby="tab3-tab">
									<h5>Tab 3 Content</h5>
									<p>This is content for Tab 3.</p>
								</div>
								<div class="tab-pane fade" id="tab4" role="tabpanel" aria-labelledby="tab4-tab">
									<h5>Tab 4 Content</h5>
									<p>This is content for Tab 4.</p>
								</div>
								<div class="tab-pane fade" id="tab5" role="tabpanel" aria-labelledby="tab5-tab">
									<h5>Tab 5 Content</h5>
									<p>This is content for Tab 5.</p>
								</div>
							</div>
						</div>
						
					</div>
				</div>
			</div>
		</div>
		<div>
		
		</div>
	</div>
</section>
