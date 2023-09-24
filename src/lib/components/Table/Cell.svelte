<script lang="ts">
	let classNames = '';

	export { classNames as class };
	export let clickable = false;
</script>

<td on:click class={'p-4 ' + classNames} class:cursor-pointer={clickable} {...$$restProps}>
	<slot />
</td>
