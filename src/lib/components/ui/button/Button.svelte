<!-- src/lib/components/ui/button/Button.svelte -->
<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let variant: 'primary' | 'secondary' | 'outline' | 'ghost' = 'primary';
	export let size: 'sm' | 'md' | 'lg' | 'xl' = 'md';
	export let disabled: boolean = false;
	export let loading: boolean = false;
	export let fullWidth: boolean = false;
	export let type: 'button' | 'submit' | 'reset' = 'button';
	export let href: string | undefined = undefined;

	const dispatch = createEventDispatcher();

	function handleClick(event: MouseEvent) {
		if (disabled || loading) return;
		dispatch('click', event);
	}

	$: buttonClasses = [
		'geometric-btn',
		`btn-${variant}`,
		`btn-${size}`,
		fullWidth ? 'w-full' : '',
		disabled ? 'btn-disabled' : '',
		loading ? 'btn-loading' : ''
	].filter(Boolean).join(' ');
</script>

{#if href}
	<a
		{href}
		class={buttonClasses}
		on:click={handleClick}
		role="button"
		tabindex={disabled ? -1 : 0}
	>
		{#if loading}
			<div class="btn-spinner" />
		{/if}
		<slot />
	</a>
{:else}
	<button
		class={buttonClasses}
		on:click={handleClick}
		{disabled}
		{type}
	>
		{#if loading}
			<div class="btn-spinner" />
		{/if}
		<slot />
	</button>
{/if}

<style>
	.geometric-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border: none;
		border-radius: 8px;
		font-weight: 600;
		position: relative;
		overflow: hidden;
		transition: all 0.3s ease;
		cursor: pointer;
		text-decoration: none;
		white-space: nowrap;
	}

	.geometric-btn::before {
		content: '';
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
		transition: left 0.5s ease;
	}

	.geometric-btn:hover::before {
		left: 100%;
	}

	/* Variants */
	.btn-primary {
		background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
		color: white;
	}

	.btn-primary:hover {
		background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
		transform: translateY(-2px);
		box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);
	}

	.btn-secondary {
		background: linear-gradient(135deg, #1f2937 0%, #374151 100%);
		color: white;
		border: 1px solid #4b5563;
	}

	.btn-secondary:hover {
		background: linear-gradient(135deg, #111827 0%, #1f2937 100%);
		border-color: #6b7280;
		transform: translateY(-2px);
	}

	.btn-outline {
		background: transparent;
		color: #cbd5e1;
		border: 2px solid #475569;
	}

	.btn-outline:hover {
		border-color: #3b82f6;
		color: white;
		transform: translateY(-2px);
	}

	.btn-ghost {
		background: transparent;
		color: #cbd5e1;
	}

	.btn-ghost:hover {
		background: rgba(59, 130, 246, 0.1);
		color: white;
		transform: translateY(-2px);
	}

	/* Sizes */
	.btn-sm {
		padding: 8px 16px;
		font-size: 0.875rem;
	}

	.btn-md {
		padding: 12px 24px;
		font-size: 1rem;
	}

	.btn-lg {
		padding: 16px 32px;
		font-size: 1.125rem;
	}

	.btn-xl {
		padding: 20px 40px;
		font-size: 1.25rem;
	}

	/* States */
	.btn-disabled {
		opacity: 0.5;
		cursor: not-allowed;
		transform: none !important;
	}

	.btn-disabled:hover {
		transform: none !important;
		box-shadow: none !important;
	}

	.btn-loading {
		cursor: wait;
	}

	/* Spinner */
	.btn-spinner {
		width: 16px;
		height: 16px;
		border: 2px solid transparent;
		border-top: 2px solid currentColor;
		border-radius: 50%;
		animation: spin 1s linear infinite;
		margin-right: 8px;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	/* Full width */
	.w-full {
		width: 100%;
	}

	/* Focus styles */
	.geometric-btn:focus {
		outline: none;
		box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
	}

	/* Responsive */
	@media (max-width: 768px) {
		.btn-xl {
			padding: 16px 32px;
			font-size: 1.125rem;
		}
	}
</style> 