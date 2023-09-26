<script lang="ts">
	import { getModalStore } from '@skeletonlabs/skeleton';
	import type { IGetAllResult } from '../../models/products.types';
	import { enhance } from '$app/forms';

	export let parent: any;
	export let record: IGetAllResult | null;

	const modalStore = getModalStore();
</script>

{#if $modalStore[0]}
	<div class="p-4 shadow-xl card w-modal">
		<form
			action={record ? `?/update` : '?/create'}
			method="post"
			class="space-y-4"
			use:enhance={() => {
				return async ({ update }) => {
					await update();

					modalStore.close();
				};
			}}
		>
			<header class="text-2xl font-bold">
				{record ? `Editar ${record.title}` : 'Crear producto'}
			</header>
			<div class="grid grid-cols-2 gap-4 modal-form">
				{#if record}
					<input name="code" value={record?.code ?? ''} type="hidden" />
					<label class="label">
						<span>Código</span>
						<input class="rounded-xl input" value={record?.code ?? ''} type="text" disabled />
					</label>
				{/if}
				<label class="label">
					<span>Título</span>
					<input
						name="title"
						class="rounded-xl input"
						value={record?.title ?? ''}
						type="text"
						required
					/>
				</label>
				<label class="label">
					<span>Precio</span>
					<input
						name="price"
						class="rounded-xl input"
						value={record?.price ?? ''}
						type="number"
						step="0.01"
						min="0"
					/>
				</label>
				<label class="label">
					<span>Costo</span>
					<input
						name="cost"
						class="rounded-xl input"
						value={record?.cost ?? ''}
						type="number"
						step="0.01"
						min="0"
					/>
				</label>
				<label class="label">
					<span>En stock</span>
					<input
						name="quantity"
						class="rounded-xl input"
						value={record?.quantity ?? ''}
						type="number"
						step="0.01"
						min="0"
					/>
				</label>
				{#if record}
					<label class="label">
						<span>Vendido</span>
						<input
							name="sold"
							class="rounded-xl input"
							value={record?.sold ?? ''}
							type="number"
							step="0.01"
							min="0"
						/>
					</label>
					<label class="col-span-full label">
						<span>Ganancias</span>
						<input
							class="rounded-xl input"
							value={(record.price ?? 0) * (record.sold ?? 0)}
							disabled
						/>
					</label>
				{/if}
				<label class="col-span-full label">
					<span>Descripción</span>
					<textarea name="description" class="rounded-xl input" rows="3"
						>{record?.description ?? ''}</textarea
					>
				</label>
			</div>
			<footer class="modal-footer {parent.regionFooter}">
				<button
					class="btn rounded-xl {parent.buttonNeutral}"
					type="button"
					on:click={parent.onClose}
				>
					{parent.buttonTextCancel}
				</button>
				<button class="rounded-xl btn variant-filled-primary" type="submit"> Guardar </button>
			</footer>
		</form>
	</div>
{/if}
