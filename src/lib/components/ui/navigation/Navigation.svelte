<!-- src/lib/components/ui/navigation/Navigation.svelte -->
<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Button from '../button/Button.svelte';

	export let brand: string = 'Learn to do';
	export let brandIcon: string = 'L';
	export let brandHref: string = '/';
	export let items: Array<{
		label: string;
		href: string;
		active?: boolean;
		external?: boolean;
	}> = [];
	export let actions: Array<{
		label: string;
		href?: string;
		variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
		size?: 'sm' | 'md' | 'lg';
		onClick?: () => void;
	}> = [];
	export let fixed: boolean = true;
	export let transparent: boolean = false;

	const dispatch = createEventDispatcher();

	function handleItemClick(item: any, event: any) {
		dispatch('itemClick', { item, event });
	}

	function handleActionClick(action: any, event: any) {
		if (action.onClick) {
			action.onClick();
		}
		dispatch('actionClick', { action, event });
	}
</script>

<nav class="geometric-nav {fixed ? 'fixed' : ''} {transparent ? 'transparent' : ''}">
	<div class="nav-container">
		<!-- Brand -->
		<div class="nav-brand">
			<a href={brandHref} class="brand-link">
				<div class="brand-icon">
					<span class="brand-icon-text">{brandIcon}</span>
				</div>
				<span class="brand-text">{brand}</span>
			</a>
		</div>

		<!-- Navigation Items -->
		<div class="nav-items">
			{#each items as item}
				<a
					href={item.href}
					class="nav-item {item.active ? 'active' : ''}"
					on:click={(e) => handleItemClick(item, e)}
					{...item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {}}
				>
					{item.label}
				</a>
			{/each}
		</div>

		<!-- Actions -->
		<div class="nav-actions">
			{#each actions as action}
				{#if action.href}
					<Button
						href={action.href}
						variant={action.variant || 'ghost'}
						size={action.size || 'sm'}
						on:click={(e) => handleActionClick(action, e)}
					>
						{action.label}
					</Button>
				{:else}
					<Button
						variant={action.variant || 'ghost'}
						size={action.size || 'sm'}
						on:click={(e) => handleActionClick(action, e)}
					>
						{action.label}
					</Button>
				{/if}
			{/each}
		</div>
	</div>
</nav>

<style>
	.geometric-nav {
		background: rgba(10, 10, 10, 0.9);
		backdrop-filter: blur(20px);
		border-bottom: 1px solid var(--border-primary, #262626);
		position: relative;
		z-index: 50;
		width: 100%;
	}

	.geometric-nav::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 1px;
		background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
		opacity: 0.5;
	}

	.geometric-nav.fixed {
		position: fixed;
		top: 0;
	}

	.geometric-nav.transparent {
		background: transparent;
		border-bottom: none;
	}

	.nav-container {
		max-width: 1280px;
		margin: 0 auto;
		padding: 0 1rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 4rem;
	}

	.nav-brand {
		display: flex;
		align-items: center;
	}

	.brand-link {
		display: flex;
		align-items: center;
		text-decoration: none;
		color: inherit;
		gap: 0.5rem;
	}

	.brand-icon {
		width: 2rem;
		height: 2rem;
		background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
		border-radius: 0.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.brand-icon-text {
		color: white;
		font-weight: bold;
		font-size: 1.125rem;
	}

	.brand-text {
		color: white;
		font-weight: bold;
		font-size: 1.25rem;
	}

	.nav-items {
		display: flex;
		align-items: center;
		gap: 2rem;
	}

	.nav-item {
		color: #cbd5e1;
		text-decoration: none;
		font-weight: 500;
		transition: color 0.3s ease;
		position: relative;
	}

	.nav-item:hover {
		color: white;
	}

	.nav-item.active {
		color: #3b82f6;
	}

	.nav-item.active::after {
		content: '';
		position: absolute;
		bottom: -0.5rem;
		left: 0;
		right: 0;
		height: 2px;
		background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
		border-radius: 1px;
	}

	.nav-actions {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	/* Responsive */
	@media (max-width: 768px) {
		.nav-items {
			display: none;
		}

		.nav-actions {
			gap: 0.5rem;
		}

		.brand-text {
			font-size: 1.125rem;
		}
	}
</style> 