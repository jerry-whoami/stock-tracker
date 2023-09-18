<script lang="ts">
	export let active = false;
	export let href: string;

	let activeClasses = active
		? 'text-primary-600 after:absolute relative after:top-1/2 after:-left-4 after:-translate-y-1/2 after:-translate-x-1/2 after:w-2 after:h-8 after:bg-primary-500 after:rounded-full'
		: '';
</script>

<a
	{href}
	class={`${activeClasses} flex px-2 items-center justify-start hover:text-primary-500 gap-x-4 transition`}
>
	<slot name="icon" />

	<slot />
</a>
