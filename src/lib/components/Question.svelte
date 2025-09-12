<script lang="ts">
	import { Accordion } from '@skeletonlabs/skeleton-svelte';

	import Solution from '$lib/components/Solution.svelte';
	import { marked } from '$lib/states';
	import type { Question } from '$lib/types';

	import RenderMarkdown from './RenderMarkdown.svelte';

	const { question }: { question: Question } = $props();
	let mark = $derived(marked.current[question.id]);
</script>

<Accordion.Item
	contentBase="overflow-x-auto w-full"
	controlHover="hover:bg-primary-500/10"
	leadBase="mb-auto hidden sm:inline-block"
	value={question.id}
>
	{#snippet lead()}
		<span
			class="badge preset-filled-surface-200-800 px-2"
			class:bg-green-600={mark === 'G'}
			class:bg-yellow-600={mark === 'Y'}>({question.id.split('-')[3]})</span
		>
	{/snippet}
	{#snippet control()}
		<div class="mb-2 sm:hidden">
			<span
				class="badge preset-filled-surface-200-800 px-2"
				class:bg-green-600={mark === 'G'}
				class:bg-yellow-600={mark === 'Y'}>({question.id.split('-')[3]})</span
			>
		</div>
		<p
			class="prose dark:prose-invert max-w-full flex-1 overflow-hidden text-xs sm:text-sm md:text-base"
		>
			<RenderMarkdown markdown={question.text} figureFilter />
		</p>
	{/snippet}
	{#snippet panel()}
		<Solution {question} />
	{/snippet}
</Accordion.Item>
