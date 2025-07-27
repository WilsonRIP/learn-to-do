<script lang="ts">
	import '../app.css';
	import { performanceMonitor } from '$lib/performance';

	let { children } = $props();

	// Register service worker for caching
	if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
		window.addEventListener('load', () => {
			navigator.serviceWorker.register('/sw.js')
				.then((registration) => {
					console.log('SW registered: ', registration);
				})
				.catch((registrationError) => {
					console.log('SW registration failed: ', registrationError);
				});
		});
	}

	// Track performance metrics
	if (typeof window !== 'undefined') {
		performanceMonitor.trackPageLoad();
	}
</script>

<svelte:head>
	<!-- Performance optimizations -->
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
	
	<!-- Preload critical resources -->
	<link rel="preload" href="/favicon.svg" as="image" type="image/svg+xml" />
	
	<!-- DNS prefetch for external resources -->
	<link rel="dns-prefetch" href="//fonts.googleapis.com" />
	
	<!-- Meta tags for performance -->
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta http-equiv="x-ua-compatible" content="IE=edge" />
	
	<!-- Performance hints -->
	<meta name="theme-color" content="#0a0a0a" />
	<meta name="color-scheme" content="dark" />
</svelte:head>

{@render children()}
