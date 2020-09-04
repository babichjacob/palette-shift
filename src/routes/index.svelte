<script>
	import { lch } from "d3-color";
	import tailwinduiColors from "@tailwindcss/ui/colors";

	import Step from "../components/Step.svelte";
	import ColorInput from "../components/ColorInput.svelte";

	import {
		accessibleColor,
		copyC,
		copyH,
		generateOutputPalette,
		getNearestPalette,
		nameColor,
		paletteGroups,
	} from "color-calculations";

	let input = lch(70, 60, 360 * Math.random()).formatHex();
	let sourcePalette = getNearestPalette(input);

	$: outputPaletteName = nameColor(outputPalette[500]);
	$: ({ nearestShade, palette: outputPalette, sourceWithIntermediate } = generateOutputPalette(input, sourcePalette));

	$: hueDifference = Math.abs(lch(input).h - lch(sourceWithIntermediate[nearestShade]).h);
	$: if (hueDifference >= 180) hueDifference = 360 - hueDifference;

	$: chromaDifference = Math.abs(lch(input).c - lch(sourceWithIntermediate[nearestShade]).c);

	let reviewSection: HTMLElement;
</script>

<section class="p-24">
	<h1 class="text-6xl font-black text-center">Palette Shift</h1>
	<h2 class="mt-6 text-4xl font-bold text-center">The color palette generator that respects the source material.</h2>
</section>

<section class="p-8">
	<Step number={1} />
	<label class="ml-2 text-center" for="step-1-input">
		<h1 class="inline-block text-xl font-normal">Enter your own color:</h1>
		<br />
	</label>

	<div class="ml-5">
		<ColorInput id={"step-1-input"} bind:value={input} />
	</div>
</section>

<section class="p-8 mt-12">
	<Step number={2} />
	<h1 class="inline-block ml-2 text-xl font-normal">
		Select a source palette, or
		<button
			class="inline-block p-2 ml-1 font-medium transition duration-300 ease-out border-2 border-black rounded-lg hover:bg-gray-200 focus:bg-gray-200 active:bg-gray-400"
			on:click={() => {
				sourcePalette = getNearestPalette(input);
				reviewSection.scrollIntoView({ behavior: "smooth" });
			}}>choose the best one for me</button>.
	</h1>
	
	<p class="max-w-xl mt-8 ml-5 leading-normal">Generally, you want to choose a palette that's the most similar to your input color. That also means you should try to keep your entered color as close to a shade from the source palette as possible.</p>
	<p class="max-w-xl mt-2 ml-5 leading-normal">The behavior of the source palette will be copied onto your color to make an entire palette just for you!</p>

	<!-- Source palettes -->
	<div class="grid mt-16 gap-y-8">
		<!-- Heading -->
		<div class="grid grid-cols-2">
			{#each Object.entries(paletteGroups) as [paletteGroupName, paletteGroup]}
				<h1 class="text-lg font-bold">{{ defaultTailwindColors: "The default Tailwind CSS color palette", tailwinduiColors: "The Tailwind UI color palette" }[paletteGroupName]}</h1>
			{/each}
		</div>
		<!-- End headings -->
		{#each Object.entries(tailwinduiColors) as [paletteName, palette]}
			{#if typeof palette !== 'string'}
				<div class="grid grid-cols-2">
					{#each Object.entries(paletteGroups) as [paletteGroupName, paletteGroup]}
						<div>
							<div class="max-w-sm">
								{#if paletteGroup.hasOwnProperty(paletteName)}
									<button
										class="w-full overflow-hidden mx-auto transition
											ease-out duration-300 cursor-pointer transform
											hover:scale-110 focus:scale-110 active:scale-105
											hover:shadow-xl focus:shadow-xl focus:outline-none
											border-4 border-transparent {sourcePalette === paletteGroup[paletteName] ? 'border-black' : ''}"
										on:click={() => {
											sourcePalette = paletteGroup[paletteName];
										}}>
										<div
											class="flex items-center w-full h-10 pl-4"
											style="background-color: {paletteGroup[paletteName][500]}">
											<h2
												class="text-sm font-bold uppercase"
												style="color: {accessibleColor(paletteGroup[paletteName][500])}">
												{paletteName.replace(/-/, ' ')}
											</h2>
										</div>
										<div class="flex w-full">
											{#each Object.entries(paletteGroup[paletteName]) as [_shade, value]}
												<div
													class="flex-1 h-10"
													style="background-color: {value}" />
											{/each}
										</div>
									</button>
								{/if}
							</div>
						</div>
					{/each}
				</div>
			{/if}
		{/each}
	</div>
	<!-- End source palettes -->
</section>

<section class="p-8 mt-16" bind:this={reviewSection}>
	<Step number={3} />
	<h1 class="inline-block ml-2 text-xl font-normal">
		Review the generated palette
	</h1>

	<!-- Heading -->
	<div class="grid grid-cols-2 mt-8">
		{#each ["The source palette", "Your generated palette"] as title}
			<h1 class="text-lg font-bold">{title}</h1>
		{/each}
	</div>
	<!-- End headings -->
	<div class="grid grid-cols-2 mt-4">
		{#each [sourceWithIntermediate, outputPalette] as palette}
			<div>
				{#each Object.entries(palette) as [shade, value]}
					<div
						class="flex items-center justify-between max-w-sm p-4"
						style="background-color: {value}; color: {accessibleColor(value)}">
						<div>
							<p class="font-medium">{shade}</p>
							<p class="font-thin">{value}</p>
						</div>
						<div>
							{#if value === input}
								<p>Your input</p>
							{:else if shade === nearestShade}
								<p>Intermediate shade like yours</p>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		{/each}
	</div>


	<button
		class="inline-block p-2 mt-8 text-xl font-medium transition duration-300 ease-out border-2 border-black rounded-lg hover:bg-gray-200 focus:bg-gray-200 active:bg-gray-400"
		on:click={() => { input = copyC(input, sourceWithIntermediate[nearestShade]) }}>
		
		{#if chromaDifference <= 1}
			Same <strong class="font-black">c</strong>hroma as the source—it'll look good!
		{:else if chromaDifference >= 30}
			<strong class="font-black">C</strong>hromas are really different—are you sure you should use this palette?
		{:else}
			Copy <strong class="font-black">c</strong>hroma from source
		{/if}
	</button>

	<button
		class="inline-block p-2 text-xl font-medium transition duration-300 ease-out border-2 border-black rounded-lg hover:bg-gray-200 focus:bg-gray-200 active:bg-gray-400"
		on:click={() => { input = copyH(input, sourceWithIntermediate[nearestShade]) }}>

		{#if hueDifference <= 1}
			Same <strong class="font-black">h</strong>ue as the source—it'll look good!
		{:else if hueDifference >= 40 && lch(input).c > 10}
			<strong class="font-black">H</strong>ues are really different—are you sure you should use this palette?
		{:else}
			Copy <strong class="font-black">h</strong>ue from source
		{/if}
	</button>
	
	<br />

	<label class="ml-2 text-center" for="step-1-input">
		<h1 class="inline-block mt-16 text-xl font-normal">Tune your color directly:</h1>
		<br />
	</label>
	<ColorInput id={"step-1-input"} bind:value={input} />
</section>

<section class="p-8 mt-16">
	<Step number={4} />
	<h1 class="inline-block ml-2 text-xl font-normal">
		Copy the values into your own Tailwind CSS configuration:
	</h1>

	<pre
		class="p-4 mt-4 leading-snug text-gray-900 bg-gray-100 rounded-lg shadow-inset">
		<code>
						{JSON.stringify({ theme: { extend: { colors: { [outputPaletteName || "generated"]: outputPalette } } } }, null, '   ')}
		</code>
	</pre>
</section>

<hr class="h-2 mx-8 mt-16 bg-gray-200">
<section class="p-8 mt-16">
	This project is free and open source software: AGPL-3.0 licensed. See <a class="font-medium hover:underline" href="https://github.com/babichjacob/palette-shift">the source on GitHub</a>.
</section>
