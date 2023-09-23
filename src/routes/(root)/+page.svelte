<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';

	export let data;

	let search = '';
	let perPage = data.products.perPage;
	$: currentPage = data.products.currentPage;
	$: console.log(currentPage);

	function navigate(page: number) {
		$page.url.searchParams.set('perPage', perPage.toString());
		$page.url.searchParams.set('currentPage', page.toString());
		history.replaceState(history.state, '', $page.url);

		invalidateAll();
	}
</script>

<header class="flex justify-between items-center px-4 mb-4">
	<h1 class="h1">Productos</h1>
	<div class="flex items-center">
		<button class="rounded-xl btn variant-filled-primary" type="button"> Reportes </button>
	</div>
</header>

<section class="mt-4">
	<div class="flex justify-between items-center p-4">
		<div>
			<select
				bind:value={perPage}
				on:change={() => navigate(1)}
				class="py-1 max-w-min rounded-lg select"
			>
				<option value={10}>10</option>
				<option value={25}>25</option>
				<option value={50}>50</option>
			</select>
			<span class="text-gray-700">por página</span>
		</div>
		<div class="flex gap-x-2 items-center">
			<iconify-icon icon="material-symbols:search" height="32" class="text-gray-700" />
			<input
				bind:value={search}
				type="text"
				class="rounded-lg input"
				placeholder="Código de producto"
			/>
		</div>
	</div>
	<div class="overflow-hidden rounded-xl">
		<table class="w-full text-left">
			<thead class="font-bold tracking-wider bg-surface-200">
				<tr class="border-b border-b-surface-500/30">
					<th class="p-4">Código</th>
					<th class="p-4">Título</th>
					<th class="p-4">Cantidad</th>
					<th class="p-4">Precio</th>
					<th class="p-4">Costo</th>
				</tr>
			</thead>
			<tbody>
				{#each data.products.items as row}
					<tr class="border-b transition border-b-surface-500/30 hover:bg-surface-300/30">
						<td class="p-4 font-bold text-primary-500">{row.code}</td>
						<td class="p-4">{row.title}</td>
						<td class="p-4">{row.quantity}</td>
						<td class="p-4">{row.price}</td>
						<td class="p-4">{row.cost}</td>
					</tr>
				{/each}
			</tbody>
			<tfoot class="bg-surface-200">
				<tr>
					<td class="p-4 text-right" colspan="5">
						<div class="rounded-xl btn-group variant-filled">
							<button
								type="button"
								on:click={() => navigate(currentPage - 1)}
								class="disabled:bg-surface-700/50"
								disabled={currentPage === 1}
							>
								<iconify-icon icon="mdi:chevron-left" />
							</button>
							{#each Array(data.products.lastPage) as _, i}
								<button
									type="button"
									on:click={() => navigate(i + 1)}
									class={currentPage === i + 1 ? 'hover:!bg-primary-500 bg-primary-500' : ''}
								>
									{i + 1}
								</button>
							{/each}
							<button
								type="button"
								on:click={() => navigate(currentPage + 1)}
								class="disabled:bg-surface-700/50"
								disabled={currentPage === data.products.lastPage}
							>
								<iconify-icon icon="mdi:chevron-right" />
							</button>
						</div>
					</td>
				</tr>
			</tfoot>
		</table>
	</div>
</section>
