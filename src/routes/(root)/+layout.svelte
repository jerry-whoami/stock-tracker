<script>
	import { Navbar } from '$lib/components/layout/Navbar';
	import '../../app.postcss';
	import 'iconify-icon';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { Modal, initializeStores } from '@skeletonlabs/skeleton';
	import { storePopup } from '@skeletonlabs/skeleton';

	initializeStores();
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
</script>

<Modal />

<Navbar />
<main class="py-8 px-4 mt-16 text-white md:px-12 md:mt-12">
	<slot />
</main>
