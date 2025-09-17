<script lang="ts">
	import { fade } from 'svelte/transition';

	import type { SearchResult } from 'minisearch';
	import { Accordion } from '@skeletonlabs/skeleton-svelte';

	import Solution from '$lib/components/Solution.svelte';
	import { marked } from '$lib/states';
	import type { Question } from '$lib/types';

	import RenderMarkdown from './RenderMarkdown.svelte';
	import { getGradientForString } from '$lib/utilities';

	const { question }: { question: Question & SearchResult } = $props();

	let highlighted = $derived(
		question.text.replace(
			new RegExp(`(${question.terms.join('|')})`, 'gi'),
			'<span class="search-highlight">$1</span>'
		)
	);

	let mark = $derived(marked.current[question.id]);
	const batch = $derived(question.id.split('-')[1]);
	const number = $derived(question.id.split('-')[2]);
	const letter = $derived(question.id.split('-')[3]);
</script>

<div
	transition:fade={{ duration: 300 }}
	class="card preset-filled-surface-100-900 border-surface-200-800 card-hover divide-surface-200-800 block divide-y overflow-hidden border-[1px]"
>
	<Accordion collapsible padding="p-2" spaceY="space-y-4">
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
					class:bg-yellow-600={mark === 'Y'}>{number} ({letter})</span
				>
			{/snippet}
			{#snippet control()}
				<div class="mb-2 sm:hidden">
					<span
						class="badge preset-filled-surface-200-800 px-2"
						class:bg-green-600={mark === 'G'}
						class:bg-yellow-600={mark === 'Y'}
					>
						{number} ({letter})
					</span>
				</div>
				<p
					class="prose dark:prose-invert max-w-full flex-1 overflow-hidden text-xs sm:text-sm md:text-base"
				>
					<RenderMarkdown markdown={highlighted} figureFilter />
					<span class="badge {getGradientForString(batch)} my-2 text-xs">'{batch} Batch</span>
				</p>
			{/snippet}
			{#snippet panel()}
				<Solution {question} />
			{/snippet}
		</Accordion.Item>
	</Accordion>
</div>
