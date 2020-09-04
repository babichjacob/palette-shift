import cssnano from "cssnano";
import postcssImport from "postcss-import";
import postcssFontMagician from "postcss-font-magician";
import postcssNested from "postcss-nested";
import postcssPresetEnv from "postcss-preset-env";
import postcssPurgecss from "@fullhuman/postcss-purgecss";
import tailwindcss from "tailwindcss";
import * as tailwindcssConfig from "./tailwind.config";

const mode = process.env.NODE_ENV;
const dev = mode === "development";

export const plugins = [
	postcssImport,

	postcssNested,

	tailwindcss(tailwindcssConfig),

	postcssPresetEnv({
		features: {
			// https://github.com/tailwindcss/tailwindcss/issues/1190
			"focus-within-pseudo-class": false,
			"lab-function": { preserve: true },
			"postcss-nesting": false,
		},
	}),

	postcssFontMagician({
		display: "swap",
		foundries: ["custom", "google"],
		formats: ["local", "otf", "woff2", "woff", "eot", "svg", "ttf"],
		custom: {},
	}),

	!dev && postcssPurgecss({
		content: ["./src/**/*.svelte", "./src/**/*.html"],
		defaultExtractor: (content) => [...content.matchAll(/(?:class:)*([\w\d-/:%.]+)/gm)].map(([_match, group, ..._rest]) => group),
	}),

	!dev && cssnano({
		preset: [
			"default",
			{ discardComments: { removeAll: true } },
		],
	}),
].filter(Boolean);
