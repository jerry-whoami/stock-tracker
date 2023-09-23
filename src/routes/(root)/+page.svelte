<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import { getModalStore, type ModalComponent, type ModalSettings } from '@skeletonlabs/skeleton';
	import type { IGetAllResult } from '../../models/products.types.js';
	import RecordModal from './RecordModal.svelte';
	import { enhance } from '$app/forms';

	export let data;

	let search = '';
	let perPage = data.products.perPage;
	$: currentPage = data.products.currentPage;

	const modalStore = getModalStore();

	function openModal(record: IGetAllResult | null = null) {
		const modal: ModalComponent = {
			ref: RecordModal,
			props: { record }
		};

		const settings: ModalSettings = {
			type: 'component',
			component: modal
		};

		modalStore.trigger(settings);
	}

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
		<button
			class="rounded-xl btn variant-filled-primary"
			type="button"
			on:click={() => openModal()}
		>
			Crear
		</button>
	</div>
</header>

<section class="mt-4">
	<div class="grid grid-cols-2 gap-4 items-center p-4">
		<div class="flex col-span-full gap-2 items-center sm:col-span-1 max-sm:justify-end">
			<select
				bind:value={perPage}
				on:change={() => navigate(1)}
				class="py-1 max-w-min rounded-lg select max-sm:order-2"
			>
				<option value={10}>10</option>
				<option value={25}>25</option>
				<option value={50}>50</option>
			</select>
			<span class="text-white max-sm:order-1">Por página</span>
		</div>
		<div class="flex col-span-full gap-x-2 justify-end items-center sm:col-span-1">
			<iconify-icon icon="material-symbols:search" height="32" class="text-gray-700" />
			<input
				bind:value={search}
				type="text"
				class="max-w-sm rounded-lg input"
				placeholder="Código de producto"
			/>
		</div>
	</div>
	<div class="overflow-x-auto rounded-xl">
		<table class="w-full text-left">
			<thead class="font-bold tracking-wider bg-surface-700">
				<tr class="border-b border-b-surface-500/30">
					<th class="p-4">Código</th>
					<th class="p-4">Título</th>
					<th class="p-4 max-sm:hidden">Cantidad</th>
					<th class="p-4 max-md:hidden">Precio</th>
					<th class="p-4 max-md:hidden">Costo</th>
					<th class="p-4" />
				</tr>
			</thead>
			<tbody>
				{#each data.products.items as row (row.code)}
					<tr class="border-b transition border-b-surface-500/70 hover:bg-surface-700/30">
						<td
							on:click={() => openModal(row)}
							class="p-4 font-bold cursor-pointer text-primary-500"
						>
							{row.code}
						</td>
						<td on:click={() => openModal(row)} class="p-4 cursor-pointer">{row.title}</td>
						<td on:click={() => openModal(row)} class="p-4 cursor-pointer max-sm:hidden">
							{row.quantity}
						</td>
						<td on:click={() => openModal(row)} class="p-4 cursor-pointer max-md:hidden">
							{row.price}
						</td>
						<td on:click={() => openModal(row)} class="p-4 cursor-pointer max-md:hidden">
							{row.cost}
						</td>
						<td class="p-4 w-16 cursor-pointer">
							<form action="?/delete" method="post" use:enhance>
								<input name="code" value={row.code} type="hidden" />
								<button class="btn-icon variant-filled-surface" type="submit">
									<iconify-icon class="text-error-500" icon="mdi:trash-can-outline" />
								</button>
							</form>
						</td>
					</tr>
				{/each}
			</tbody>
			<tfoot class="">
				<tr>
					<td class="p-4 text-right max-sm:text-center" colspan="6">
						<div class="rounded-xl btn-group variant-filled-surface">
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
									disabled={currentPage === i + 1}
									class={currentPage === i + 1
										? 'hover:!bg-primary-600 bg-primary-500'
										: 'max-md:!hidden'}
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
