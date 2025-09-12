<script lang="ts">
	import type { Snippet } from 'svelte';

	let { href, onclick, children }: { href?: string; onclick?: () => void; children: Snippet } =
		$props();

	const classes =
		'btn fixed right-4 bottom-8 z-100 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 px-8 py-3 text-white shadow-md transition-all duration-300 ease-in-out hover:scale-105 hover:from-cyan-500 hover:via-blue-600 hover:to-purple-700 hover:shadow-xl focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:outline-none active:scale-95';
</script>

{#if href}
	<a {href} class={classes}>
		{@render children()}
	</a>
{:else}
	<button
		class={classes}
		onclick={() => {
			if (onclick) {
				onclick();
			}
		}}
	>
		{@render children()}
	</button>
{/if}
