<script lang="ts">
	import { Accordion } from '@skeletonlabs/skeleton-svelte';

	import Solution from '$lib/components/Solution.svelte';
	import { marked } from '$lib/states';
	import type { Question } from '$lib/types';

	import RenderMarkdown from './RenderMarkdown.svelte';

	const { question, showSetNumber }: { question: Question; showSetNumber?: boolean } = $props();
	let mark = $derived(marked.current[question.id]);
</script>

<Accordion.Item controlHover="hover:bg-primary-500/10" leadBase="mb-auto" value={question.id}>
	{#snippet lead()}
		<span
			class="badge preset-filled-surface-200-800 px-2"
			class:bg-green-600={mark === 'G'}
			class:bg-yellow-600={mark === 'Y'}
		>
			{#if showSetNumber}
				{question.id.split('-')[2]}
			{/if}
			({question.id.split('-')[3]})
		</span>
	{/snippet}
	{#snippet control()}
		<p class="prose dark:prose-invert max-w-full flex-1 text-xs sm:text-sm md:text-base">
			<RenderMarkdown markdown={question.text} figureFilter />
		</p>
	{/snippet}
	{#snippet panel()}
		<Solution {question} />
	{/snippet}
</Accordion.Item>
