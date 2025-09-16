<script lang="ts">
	import Copy from '@lucide/svelte/icons/copy';

	import { marked } from '$lib/states';
	import { toaster } from '$lib/toaster';
	import type { Question } from '$lib/types';

	import RenderMarkdown from '$lib/components/RenderMarkdown.svelte';

	const { question }: { question: Question } = $props();

	const onHighlight = () => {
		if (marked.current[question.id] === 'G') {
			marked.current[question.id] = undefined;
		} else if (marked.current[question.id] === 'Y') {
			marked.current[question.id] = 'G';
		} else {
			marked.current[question.id] = 'Y';
		}
	};

	const onCopy = async () => {
		await navigator.clipboard.writeText(question.text);
		toaster.success({ title: 'Question copied!' });
	};
</script>

<div class="flex items-center justify-between gap-2 py-2 pb-4">
	<span class="badge preset-filled-primary-50-950 font-bold">{question.marks} marks</span>
	<div class="flex gap-1">
		<button onclick={onCopy} class="btn btn-sm preset-filled-surface-200-800 border-green-600">
			<Copy size={16} />
			<span>Copy</span>
		</button>
		<button
			class="btn btn-sm preset-filled-surface-200-800 border-green-600"
			class:bg-yellow-700={marked.current[question.id] === 'Y'}
			class:bg-green-700={marked.current[question.id] === 'G'}
			onclick={onHighlight}
		>
			{#if marked.current[question.id] === undefined}
				<span>Mark Yellow</span>
			{:else if marked.current[question.id] === 'Y'}
				<span>Mark Green</span>
			{:else}
				<span>Unmark</span>
			{/if}
		</button>
	</div>
</div>

<div class="border-secondary-400-600 bg-secondary-500/10 border p-2 md:p-4">
	<div
		class="prose dark:prose-invert card prose-sm prose-headings:font-(family-name:--heading-font-family) max-w-full"
	>
		<RenderMarkdown markdown={question.solution} />
	</div>
</div>
