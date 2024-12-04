import { mdsvex } from "mdsvex";
import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			pages: "build",
			assets: "build",
			fallback: null,
			precompress: false,
			strict: true
		}),
		paths: {
			base: process.env.NODE_ENV === 'production' ? process.env.BASE_PATH : ''
		}
	},

	preprocess: [mdsvex()],
	extensions: [".svelte", ".svx"]
};

export default config;