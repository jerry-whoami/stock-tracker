<script class="ts">
	import { page } from '$app/stores';

	export let data;

	let search = '';
	let pageNumber = '0';
	let perPage = '10';
</script>

<header class="flex justify-between items-center px-4 mb-4">
	<h1 class="h1">Productos</h1>
	<div class="flex items-center">
		<button class="btn variant-filled-primary" type="button"> Reportes </button>
	</div>
</header>

<section class="mt-4">
	<div class="flex justify-between items-center p-4">
		<div>
			<select bind:value={perPage} class="py-1 max-w-min rounded-lg select">
				<option value="10">10</option>
				<option value="25">25</option>
				<option value="50">50</option>
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
	<table class="w-full text-left">
		<thead class="font-bold tracking-wider">
			<tr class="border-b border-b-surface-500/30">
				<th class="p-4">Código</th>
				<th class="p-4">Título</th>
				<th class="p-4">Cantidad</th>
				<th class="p-4">Precio</th>
				<th class="p-4">Costo</th>
			</tr>
		</thead>
		<tbody>
			{#each data.products as row}
				<tr class="border-b transition border-b-surface-500/30 hover:bg-surface-200">
					<td class="p-4 font-bold text-primary-500">{row.code}</td>
					<td class="p-4">{row.title}</td>
					<td class="p-4">{row.quantity}</td>
					<td class="p-4">{row.price}</td>
					<td class="p-4">{row.cost}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</section>
