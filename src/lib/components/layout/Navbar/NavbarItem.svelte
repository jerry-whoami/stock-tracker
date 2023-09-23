<script lang="ts">
	export let active = false;
	export let href: string;

	let activeClasses = active
		? 'text-primary-600 after:absolute relative after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:translate-y-1/2 after:w-12 after:h-2 after:bg-primary-500 after:rounded-full'
		: '';
</script>

<a {href} class={`${activeClasses} px-8 py-4 hover:text-primary-500 gap-x-4 transition`}>
	<slot name="icon" />

	<slot />
</a>
