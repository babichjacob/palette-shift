<script>
	import {
		accessibleColor,
	} from "color-calculations";

	import Icon from "@iconify/svelte";
	import eyedropper from "@iconify-icons/mdi/eyedropper";
	
	export let id: string;
	export let value: string;
</script>

<style>
	:global(::-moz-color-swatch),
	:global(::-webkit-color-swatch) {
		@apply border-transparent;
	}
</style>

<input
	type="color"
	bind:value
	{id}
	class="relative inline-block w-12 h-12 mt-6 border-none
		appearance-none" />
<div
	class="absolute pointer-events-none"
	style="color: {accessibleColor(value)}">
	<div
		class="relative flex items-center justify-center w-12 h-12"
		style="top: -66px">
		<div class="w-8 h-8 opacity-75">
			<Icon icon={eyedropper} width="100%" />
		</div>
	</div>
</div>


<input
	type="text"
	bind:value={value}
	class="relative inline-block h-12 border-none rounded-none
		form-input"
	style="top: -18px; left: -5px; background-color: {value}; color: {accessibleColor(value)}" />
	