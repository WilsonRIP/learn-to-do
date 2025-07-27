import devtoolsJson from 'vite-plugin-devtools-json';
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit(), devtoolsJson()],
	
	// Build optimizations
	build: {
		target: 'esnext',
		minify: 'terser',
		rollupOptions: {
			output: {
				manualChunks: {
					vendor: ['svelte'],
					utils: ['@sveltejs/kit']
				}
			}
		},

	},

	// Optimize dependencies
	optimizeDeps: {
		include: ['svelte']
	},

	// Server optimizations
	server: {
		hmr: {
			overlay: false
		}
	},

	// CSS optimizations
	css: {
		devSourcemap: false
	}
});
