<script lang="ts">
	import { Accordion } from '@skeletonlabs/skeleton-svelte';

	import Question from '$lib/components/Question.svelte';
	import { papersCollection } from '$lib/papers';
	import { getGradientForString } from '$lib/utilities';

	let { batch, courseCode }: { batch: string; courseCode: string } = $props();

	const coursePapers = $derived(papersCollection[courseCode] || []);
	const paper = $derived(coursePapers.find((paper) => paper.batch === batch)?.paper);
	const sectionNames = ['A', 'B'];

	const slugify = (topic: string | undefined) => {
		return (topic ?? '').replaceAll(' ', '_').toLowerCase();
	};
</script>

<div class="grid gap-6 lg:grid-cols-2">
	{#if paper}
		{#each paper.sections as section, i}
			<div class="w-full overflow-hidden">
				<h4 class="h4">Section {sectionNames[i]}</h4>
				<div class="space-y-8 py-4">
					{#each section.sets as set}
						{@const topics = new Set(set.questions.map((q) => q.topic))}
						<div
							class="card preset-filled-surface-100-900 border-surface-200-800 card-hover divide-surface-200-800 block divide-y overflow-hidden border-[1px]"
						>
							<header class="preset-filled-surface-200-800 p-4">
								<div class="flex items-start">
									<h6 class="shrink-0 text-sm font-medium">
										Set {set.number}
									</h6>
									<div class="ml-2 flex items-center gap-2 overflow-x-auto md:ml-4">
										{#each topics as topic}
											<a
												href="/{courseCode}/{slugify(topic)}"
												class="chip {getGradientForString(topic ?? 'Default')}"
											>
												{topic ?? 'Unknown'}
											</a>
										{/each}
									</div>
								</div>
							</header>
							<Accordion collapsible padding="p-0 md:p-2" spaceY="space-y-4">
								{#each set.questions as question}
									<Question {question} />
								{/each}
							</Accordion>
						</div>
					{/each}
				</div>
			</div>
		{/each}
	{/if}
</div>
