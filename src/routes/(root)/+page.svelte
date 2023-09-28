<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import { getModalStore, type ModalComponent, type ModalSettings } from '@skeletonlabs/skeleton';
	import type { IGetAllResult } from '../../models/products.types.js';
	import RecordModal from './RecordModal.svelte';
	import { enhance } from '$app/forms';
	import { Cell, Heading, Row, Table } from '$lib/components/Table/index.js';

	export let data;

	let perPage = data.products.perPage;
	let search = $page.url.searchParams.get('search');
	let sortOrder = $page.url.searchParams.get('sortOrder');
	let sortField = $page.url.searchParams.get('sortField');
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

	function searchByCode() {
		search ? $page.url.searchParams.set('search', search) : $page.url.searchParams.delete('search');
		history.replaceState(history.state, '', $page.url);

		invalidateAll();
	}

	function sortBy(field: string) {
		sortOrder = $page.url.searchParams.get('sortOrder');
		sortField = $page.url.searchParams.get('sortField');

		if (!sortOrder || sortField !== field) {
			$page.url.searchParams.set('sortField', field.toString());
			$page.url.searchParams.set('sortOrder', 'asc');
			sortField = field;
		} else if (sortOrder === 'asc') {
			$page.url.searchParams.set('sortField', field.toString());
			$page.url.searchParams.set('sortOrder', 'desc');
			sortField = field;
		} else {
			$page.url.searchParams.delete('sortField');
			$page.url.searchParams.delete('sortOrder');
			sortField = null;
		}

		sortOrder = $page.url.searchParams.get('sortOrder');
		history.replaceState(history.state, '', $page.url);

		invalidateAll();
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
			<select bind:value={perPage} class="py-1 max-w-min rounded-lg select max-sm:order-2">
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
				on:change={() => searchByCode()}
				type="text"
				class="max-w-sm rounded-lg input"
				placeholder="Buscar..."
			/>
		</div>
	</div>
	<div class="overflow-x-auto rounded-xl">
		<Table>
			<svelte:fragment slot="head">
				<Heading class="p-4">Código</Heading>
				<Heading class="p-4">Título</Heading>
				<Heading
					sortable
					direction={sortOrder}
					active={sortField === 'quantity'}
					on:click={() => sortBy('quantity')}
					class="p-4 max-sm:hidden"
				>
					Cantidad
				</Heading>
				<Heading
					sortable
					direction={sortOrder}
					active={sortField === 'price'}
					on:click={() => sortBy('price')}
					class="p-4 max-md:hidden"
				>
					Precio
				</Heading>
				<Heading
					sortable
					direction={sortOrder}
					active={sortField === 'cost'}
					on:click={() => sortBy('cost')}
					class="p-4 max-md:hidden"
				>
					Costo
				</Heading>
				<Heading
					sortable
					direction={sortOrder}
					active={sortField === 'sold'}
					on:click={() => sortBy('sold')}
					class="p-4 max-md:hidden"
				>
					Vendidos
				</Heading>
				<Heading class="p-4 max-md:hidden">Ganancias</Heading>
				<Heading class="p-4" />
			</svelte:fragment>
			<svelte:fragment slot="body">
				{#each data.products.items as row (row.id)}
					<Row>
						<Cell clickable on:click={() => openModal(row)} class="font-bold text-primary-500"
							>{row.code}</Cell
						>
						<Cell clickable on:click={() => openModal(row)}>{row.title}</Cell>
						<Cell clickable on:click={() => openModal(row)} class="max-sm:hidden">
							<span> {row.quantity} </span>
							{#if (row.quantity ?? 0) < 10}
								<span class="bg-red-700 badge">
									<iconify-icon icon="zondicons:exclamation-outline" />
									<span class="uppercase">Surtir</span>
								</span>
							{/if}
						</Cell>
						<Cell clickable on:click={() => openModal(row)} class="max-md:hidden">
							$ {row.price}
						</Cell>
						<Cell clickable on:click={() => openModal(row)} class="max-md:hidden">
							$ {row.cost}
						</Cell>
						<Cell clickable on:click={() => openModal(row)} class="max-md:hidden">{row.sold}</Cell>
						<Cell clickable on:click={() => openModal(row)} class="max-md:hidden">
							$ {((row.price ?? 0) * (row.sold ?? 0)).toFixed(2)}
						</Cell>
						<Cell clickable class="w-16">
							<form action="?/delete" method="post" use:enhance>
								<input name="code" value={row.code} type="hidden" />
								<button class="btn-icon variant-filled-surface" type="submit">
									<iconify-icon class="text-error-500" icon="mdi:trash-can-outline" />
								</button>
							</form>
						</Cell>
					</Row>
				{/each}
			</svelte:fragment>
			<svelte:fragment slot="foot">
				<tr>
					<Cell class="text-right max-sm:text-center" colspan="8">
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
					</Cell>
				</tr>
			</svelte:fragment>
		</Table>
	</div>
</section>
