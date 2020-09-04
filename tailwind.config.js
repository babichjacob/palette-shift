/*
	Tailwind - The Utility-First CSS Framework
	A project by Adam Wathan (@adamwathan), Jonathan Reinink (@reinink),
	David Hemphill (@davidhemphill) and Steve Schoger (@steveschoger).
	View the full documentation at https://tailwindcss.com.
*/

import customForms from "@tailwindcss/custom-forms";

import newTailwindColorsConfig from "tailwindcss/lib/flagged/uniformColorPalette";
import defaultConfig from "tailwindcss/defaultConfig";

const { theme: defaultTheme } = defaultConfig;

const newTailwindColors = newTailwindColorsConfig.theme.colors;

export const purge = false; // Purging is taken care of in postcss.config.js

export const theme = {
	colors: {
		transparent: "transparent",
		current: "currentColor",
		inherit: "inherit",
		black: newTailwindColors.black,
		white: newTailwindColors.white,
		gray: newTailwindColors.gray,
		source: {
			50: ({ opacityVariable }) => `rgba(var(--source-50), var(${opacityVariable}, 1))`,
			100: ({ opacityVariable }) => `rgba(var(--source-100), var(${opacityVariable}, 1))`,
			200: ({ opacityVariable }) => `rgba(var(--source-200), var(${opacityVariable}, 1))`,
			300: ({ opacityVariable }) => `rgba(var(--source-300), var(${opacityVariable}, 1))`,
			400: ({ opacityVariable }) => `rgba(var(--source-400), var(${opacityVariable}, 1))`,
			500: ({ opacityVariable }) => `rgba(var(--source-500), var(${opacityVariable}, 1))`,
			600: ({ opacityVariable }) => `rgba(var(--source-600), var(${opacityVariable}, 1))`,
			700: ({ opacityVariable }) => `rgba(var(--source-700), var(${opacityVariable}, 1))`,
			800: ({ opacityVariable }) => `rgba(var(--source-800), var(${opacityVariable}, 1))`,
			900: ({ opacityVariable }) => `rgba(var(--source-900), var(${opacityVariable}, 1))`,
		},
		generated: {
			50: ({ opacityVariable }) => `rgba(var(--generated-50), var(${opacityVariable}, 1))`,
			100: ({ opacityVariable }) => `rgba(var(--generated-100), var(${opacityVariable}, 1))`,
			200: ({ opacityVariable }) => `rgba(var(--generated-200), var(${opacityVariable}, 1))`,
			300: ({ opacityVariable }) => `rgba(var(--generated-300), var(${opacityVariable}, 1))`,
			400: ({ opacityVariable }) => `rgba(var(--generated-400), var(${opacityVariable}, 1))`,
			500: ({ opacityVariable }) => `rgba(var(--generated-500), var(${opacityVariable}, 1))`,
			600: ({ opacityVariable }) => `rgba(var(--generated-600), var(${opacityVariable}, 1))`,
			700: ({ opacityVariable }) => `rgba(var(--generated-700), var(${opacityVariable}, 1))`,
			800: ({ opacityVariable }) => `rgba(var(--generated-800), var(${opacityVariable}, 1))`,
			900: ({ opacityVariable }) => `rgba(var(--generated-900), var(${opacityVariable}, 1))`,
		},
	},
	extend: {
		fontFamily: {
			sans: ["Inter", ...defaultTheme.fontFamily.sans],
		},
	},
};
export const variants = {};
export const plugins = [
	customForms,
];

export const experimental = {
	applyComplexClasses: true,
};

export const future = {
	removeDeprecatedGapUtilities: true,
	purgeLayersByDefault: true,
};
