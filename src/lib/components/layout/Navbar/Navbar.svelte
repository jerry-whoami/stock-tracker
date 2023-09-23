<script lang="ts">
	import { NavbarItem } from '.';
	import { popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';
	import MenuItem from './MenuItem.svelte';
	import logo from '$lib/images/logo.png';

	let menuOpen = false;

	const menu: PopupSettings = {
		event: 'click',
		target: 'menu',
		placement: 'bottom',
		state: (e: Record<string, boolean>) => (menuOpen = e.state)
	};
</script>

<nav
	class="flex fixed top-0 left-0 z-10 justify-between items-center px-6 w-full border-b shadow-xl md:px-16 border-b-surface-500/30 bg-surface-100-800-token"
>
	<div>
		<img src={logo} class="h-12" alt="logo" />
	</div>
	<div class="">
		<!-- For large screens -->
		<div class="flex gap-4 items-center max-md:hidden">
			<NavbarItem active href="#">Productos</NavbarItem>
		</div>

		<!-- For small screens -->
		<div class="flex relative items-center md:hidden">
			<button
				type="button"
				use:popup={menu}
				class="my-2 btn-icon variant-soft-surface hover:variant-soft-primary"
				class:variant-soft-primary={menuOpen}
			>
				<iconify-icon icon="material-symbols:menu-rounded" height="24" />
			</button>

			<div data-popup="menu" class="py-6 px-4 shadow-lg card !rounded-xl">
				<div class="flex flex-col gap-4 w-60">
					<MenuItem active href="#">
						<svelte:fragment slot="icon">
							<iconify-icon icon="bi:collection-fill" />
						</svelte:fragment>
						Productos
					</MenuItem>
				</div>
			</div>
		</div>
	</div>
</nav>
