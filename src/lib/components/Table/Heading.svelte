<script lang="ts">
	let classNames = '';

	export { classNames as class };
	export let sortable = false;
	export let direction: string | null = null;
	export let active = false;
</script>

<th class={'p-4 ' + classNames} {...$$restProps}>
	{#if sortable}
		<button on:click type="button" class="flex gap-2 items-center group">
			<slot />
			<div class="inline-flex flex-col justify-center items-center">
				{#if active && direction === 'asc'}
					<iconify-icon icon="mdi:chevron-up" />
				{:else if active && direction === 'desc'}
					<iconify-icon icon="mdi:chevron-down" />
				{:else}
					<iconify-icon
						class="opacity-0 transition group-hover:opacity-100"
						icon="mdi:chevron-down"
					/>
				{/if}
			</div>
		</button>
	{:else}
		<div>
			<slot />
		</div>
	{/if}
</th>
