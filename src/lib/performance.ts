// Performance monitoring utility
export class PerformanceMonitor {
	private static instance: PerformanceMonitor;
	private metrics: Map<string, number> = new Map();

	private constructor() {}

	static getInstance(): PerformanceMonitor {
		if (!PerformanceMonitor.instance) {
			PerformanceMonitor.instance = new PerformanceMonitor();
		}
		return PerformanceMonitor.instance;
	}

	// Track page load performance
	trackPageLoad(): void {
		if (typeof window === 'undefined') return;

		window.addEventListener('load', () => {
			const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
			
			this.metrics.set('domContentLoaded', navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart);
			this.metrics.set('loadComplete', navigation.loadEventEnd - navigation.loadEventStart);
			this.metrics.set('firstPaint', this.getFirstPaint());
			this.metrics.set('largestContentfulPaint', this.getLargestContentfulPaint());
			
			this.logMetrics();
		});
	}

	// Track typing test performance
	trackTypingPerformance(startTime: number, endTime: number, accuracy: number): void {
		const duration = endTime - startTime;
		const wpm = this.calculateWPM(duration);
		
		this.metrics.set('typingDuration', duration);
		this.metrics.set('typingAccuracy', accuracy);
		this.metrics.set('typingWPM', wpm);
	}

	// Get First Paint time
	private getFirstPaint(): number {
		const paintEntries = performance.getEntriesByType('paint');
		const firstPaint = paintEntries.find(entry => entry.name === 'first-paint');
		return firstPaint ? firstPaint.startTime : 0;
	}

	// Get Largest Contentful Paint
	private getLargestContentfulPaint(): number {
		const lcpEntries = performance.getEntriesByType('largest-contentful-paint');
		return lcpEntries.length > 0 ? lcpEntries[lcpEntries.length - 1].startTime : 0;
	}

	// Calculate WPM
	private calculateWPM(durationMs: number): number {
		// Assuming average word length of 5 characters
		return Math.round((durationMs / 1000 / 60) * 5);
	}

	// Log performance metrics
	private logMetrics(): void {
		console.group('🚀 Performance Metrics');
		this.metrics.forEach((value, key) => {
			console.log(`${key}: ${value}ms`);
		});
		console.groupEnd();
	}

	// Get performance report
	getReport(): Record<string, number> {
		return Object.fromEntries(this.metrics);
	}

	// Clear metrics
	clear(): void {
		this.metrics.clear();
	}
}

// Export singleton instance
export const performanceMonitor = PerformanceMonitor.getInstance(); 