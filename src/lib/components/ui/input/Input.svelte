<!-- src/lib/components/ui/input/Input.svelte -->
<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let type: 'text' | 'email' | 'password' | 'number' | 'search' | 'url' = 'text';
	export let placeholder: string = '';
	export let value: string = '';
	export let disabled: boolean = false;
	export let readonly: boolean = false;
	export let required: boolean = false;
	export let size: 'sm' | 'md' | 'lg' = 'md';
	export let fullWidth: boolean = false;
	export let error: boolean = false;
	export let success: boolean = false;
	export let name: string = '';
	export let id: string = '';
	export let autocomplete: 'on' | 'off' = 'off';
	export let spellcheck: boolean = false;

	const dispatch = createEventDispatcher();

	function handleInput(event: Event) {
		const target = event.target as HTMLInputElement;
		value = target.value;
		dispatch('input', event);
	}

	function handleFocus(event: FocusEvent) {
		dispatch('focus', event);
	}

	function handleBlur(event: FocusEvent) {
		dispatch('blur', event);
	}

	$: inputClasses = [
		'geometric-input',
		`input-${size}`,
		fullWidth ? 'w-full' : '',
		error ? 'input-error' : '',
		success ? 'input-success' : '',
		disabled ? 'input-disabled' : ''
	].filter(Boolean).join(' ');
</script>

<input
	{type}
	{placeholder}
	{value}
	{disabled}
	{readonly}
	{required}
	{name}
	{id}
	{autocomplete}
	{spellcheck}
	class={inputClasses}
	on:input={handleInput}
	on:focus={handleFocus}
	on:blur={handleBlur}
/>

<style>
	.geometric-input {
		background: var(--bg-tertiary, #1a1a1a);
		border: 2px solid var(--border-primary, #262626);
		border-radius: 8px;
		color: var(--text-primary, #ffffff);
		padding: 12px 16px;
		transition: all 0.3s ease;
		font-family: inherit;
		font-size: inherit;
		line-height: 1.5;
		outline: none;
	}

	.geometric-input:focus {
		border-color: var(--border-accent, #3b82f6);
		box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
		transform: scale(1.01);
	}

	.geometric-input::placeholder {
		color: var(--text-muted, #a3a3a3);
		opacity: 1;
	}

	/* Sizes */
	.input-sm {
		padding: 8px 12px;
		font-size: 0.875rem;
	}

	.input-md {
		padding: 12px 16px;
		font-size: 1rem;
	}

	.input-lg {
		padding: 16px 20px;
		font-size: 1.125rem;
	}

	/* States */
	.input-error {
		border-color: #ef4444;
		box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
	}

	.input-error:focus {
		border-color: #dc2626;
		box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.2);
	}

	.input-success {
		border-color: #10b981;
		box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
	}

	.input-success:focus {
		border-color: #059669;
		box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.2);
	}

	.input-disabled {
		opacity: 0.5;
		cursor: not-allowed;
		background: var(--bg-secondary, #111111);
	}

	.input-disabled:focus {
		transform: none;
		box-shadow: none;
	}

	/* Full width */
	.w-full {
		width: 100%;
	}

	/* Responsive */
	@media (max-width: 768px) {
		.input-lg {
			padding: 14px 18px;
			font-size: 1rem;
		}
	}
</style> 