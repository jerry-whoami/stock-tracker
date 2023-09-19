<script class="ts">
	let rows = [
		{ code: 'SO-192', title: 'Sneaker', quantity: 12, price: 123.34, cost: 60 },
		{ code: 'SO-192', title: 'Sneaker', quantity: 12, price: 123.34, cost: 60 },
		{ code: 'SO-192', title: 'Sneaker', quantity: 12, price: 123.34, cost: 60 },
		{ code: 'SO-192', title: 'Sneaker', quantity: 12, price: 123.34, cost: 60 },
		{ code: 'SO-192', title: 'Sneaker', quantity: 12, price: 123.34, cost: 60 }
	];
</script>

<header class="flex justify-between items-center mb-4">
	<h1 class="h1">Productos</h1>
	<div class="flex items-center">
		<button class="btn variant-filled-primary" type="button"> Reportes </button>
	</div>
</header>

<section>
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
			{#each rows as row}
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
