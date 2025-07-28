<script lang="ts">
	export let size: 'sm' | 'md' | 'lg' = 'md';
	export let disabled: boolean = false;
	export let href: string | undefined = undefined;

	function getSizeClasses(size: string) {
		switch (size) {
			case 'sm':
				return 'h-8 px-3 text-sm';
			case 'lg':
				return 'h-14 px-6 text-lg';
			default:
				return 'h-12 px-[21px] text-[15px]';
		}
	}
</script>
 
{#if href}
	<a
		{href}
		class="rounded-button bg-white text-black shadow-btn hover:bg-gray-100 inline-flex
		  items-center justify-center font-semibold active:scale-[0.98] active:transition-all 
		  disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:text-white 
		  dark:hover:bg-gray-700 {getSizeClasses(size)} no-underline"
		on:click
	>
		<slot />
	</a>
{:else}
	<button
		{disabled}
		class="rounded-button bg-white text-black shadow-btn hover:bg-gray-100 inline-flex
		  items-center justify-center font-semibold active:scale-[0.98] active:transition-all 
		  disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:text-white 
		  dark:hover:bg-gray-700 {getSizeClasses(size)}"
		on:click
	>
		<slot />
	</button>
{/if}