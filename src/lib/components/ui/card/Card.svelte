<!-- src/lib/components/ui/card/Card.svelte -->
<script lang="ts">
	export let variant: 'default' | 'elevated' | 'outlined' = 'default';
	export let padding: 'sm' | 'md' | 'lg' | 'xl' = 'md';
	export let hover: boolean = false;
	export let interactive: boolean = false;
	export let fullWidth: boolean = false;

	$: cardClasses = [
		'geometric-card',
		`card-${variant}`,
		`card-padding-${padding}`,
		hover ? 'card-hover' : '',
		interactive ? 'card-interactive' : '',
		fullWidth ? 'w-full' : ''
	].filter(Boolean).join(' ');
</script>

<div class={cardClasses}>
	<slot />
</div>

<style>
	.geometric-card {
		background: var(--bg-secondary, #111111);
		border: 1px solid var(--border-primary, #262626);
		border-radius: 12px;
		position: relative;
		overflow: hidden;
		backdrop-filter: blur(10px);
		transition: all 0.3s ease;
	}

	.geometric-card::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 2px;
		background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
	}

	.geometric-card::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(45deg, transparent 30%, rgba(59, 130, 246, 0.02) 50%, transparent 70%);
		pointer-events: none;
	}

	/* Variants */
	.card-default {
		background: rgba(30, 41, 59, 0.5);
		border: 1px solid rgba(71, 85, 105, 0.3);
	}

	.card-elevated {
		background: rgba(30, 41, 59, 0.8);
		border: 1px solid rgba(71, 85, 105, 0.5);
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.6);
	}

	.card-outlined {
		background: transparent;
		border: 2px solid rgba(71, 85, 105, 0.5);
	}

	/* Padding variants */
	.card-padding-sm {
		padding: 1rem;
	}

	.card-padding-md {
		padding: 1.5rem;
	}

	.card-padding-lg {
		padding: 2rem;
	}

	.card-padding-xl {
		padding: 3rem;
	}

	/* Hover effects */
	.card-hover:hover {
		transform: translateY(-2px);
		box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
		border-color: rgba(59, 130, 246, 0.5);
	}

	/* Interactive cards */
	.card-interactive {
		cursor: pointer;
	}

	.card-interactive:hover {
		transform: translateY(-2px);
		box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
		border-color: rgba(59, 130, 246, 0.5);
	}

	/* Full width */
	.w-full {
		width: 100%;
	}

	/* Responsive */
	@media (max-width: 768px) {
		.card-padding-xl {
			padding: 2rem;
		}
	}
</style> 