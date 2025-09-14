<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';

	import { Accordion, Tabs } from '@skeletonlabs/skeleton-svelte';
	import ArrowLeft from '@lucide/svelte/icons/arrow-left';

	import CourseNotFound from '$lib/components/CourseNotFound.svelte';
	import FloatingAnchor from '$lib/components/FloatingAnchor.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Question from '$lib/components/TopicQuestion.svelte';
	import { courses } from '$lib/courses';
	import { getGradientForString } from '$lib/utilities';

	import { deslugified, getGroupsByTopic, getSetsByTopic } from './utils';

	const topic = $derived(deslugified(page.params.topic as string));
	const courseCode = $derived(deslugified(page.params.courseCode as string));
	const course = $derived(courses.find((c) => c.code === courseCode));
	const sets = $derived(getSetsByTopic(topic, courseCode));
	const slugify = (topic: string | undefined) => {
		return (topic ?? '').replaceAll(' ', '_').toLowerCase();
	};

	const groups = $derived(getGroupsByTopic(topic, courseCode));

	let tab: 'sets' | 'questions' = $state('sets');
</script>

<svelte:head>
	{#if course}
		<title>{topic} - {course.code} | CUET ME L4T1</title>
		<meta
			name="description"
			content="Browse {topic} questions from {course.title} ({course.code}). View question sets and individual questions organized by batch for CUET Mechanical Engineering students."
		/>
	{:else}
		<title>Topic Not Found | CUET ME L4T1</title>
		<meta name="description" content="The requested topic could not be found in our database." />
	{/if}
</svelte:head>

{#if course}
	<div class="mb-6 px-4 pt-4 md:px-6 md:pt-6">
		<div class="flex">
			<span class="badge [writing-mode:sideways-lr] {getGradientForString(course.code)}">
				{course.code}
			</span>
			<h2 class="h4 lg:h2 {getGradientForString(topic ?? 'Default')} badge">{topic}</h2>
		</div>
	</div>
	<div class="">
		<Tabs
			value={tab}
			onValueChange={(e) => (tab = e.value as typeof tab)}
			listJustify="justify-center"
			listBorder=""
		>
			{#snippet list()}
				<Tabs.Control
					base="transition-colors"
					stateInactive="px-4 py-2 rounded-base preset-filled-surface-100-900 hover:preset-filled-surface-200-800"
					stateActive="px-4 py-2 rounded-base {getGradientForString('Sets')}"
					labelBase=""
					value="sets"
				>
					Sets
				</Tabs.Control>
				<Tabs.Control
					base="transition-colors"
					stateInactive="px-4 py-2 rounded-base preset-filled-surface-100-900 hover:preset-filled-surface-200-800"
					stateActive="px-4 py-2 rounded-base {getGradientForString('Questions')}"
					labelBase=""
					value="questions"
				>
					Questions
				</Tabs.Control>
			{/snippet}
			{#snippet content()}
				<Tabs.Panel value="sets" classes="mx-auto mb-12 flex max-w-4xl flex-col gap-4 p-4 lg:p-6">
					{#each sets as set}
						{@const topics = new Set(set.questions.map((q) => q.topic))}

						<div
							class="card preset-filled-surface-100-900 border-surface-200-800 card-hover divide-surface-200-800 block divide-y overflow-hidden border-[1px]"
						>
							<header class="preset-filled-surface-200-800 p-4">
								<div class="flex items-start">
									<h6 class="shrink-0 text-sm font-medium">
										'{set.batch} Batch
									</h6>
									<div class="-mb-3 ml-2 flex items-center gap-2 overflow-x-auto pb-3 md:ml-4">
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
				</Tabs.Panel>
				<Tabs.Panel
					classes="mx-auto mb-12 flex max-w-4xl flex-col gap-8 p-4 lg:p-6"
					value="questions"
				>
					{#each groups as group, index}
						<div class="space-y-6">
							<div class="flex items-end justify-between">
								<h4 class="h5 relative inline-block">
									<span class="font-semibold">
										'{group.batch} Batch
									</span>

									<div
										class="{getGradientForString(
											topic ?? 'Default'
										)} absolute -right-4 bottom-1 -left-2 -z-1 h-2 opacity-55"
									></div>
								</h4>
								<div>
									{group.questions.reduce((acc, question) => (acc += question.marks), 0)} marks
								</div>
							</div>

							<div class="space-y-4">
								{#each group.questions as question}
									<div
										class="card preset-filled-surface-100-900 border-surface-200-800 card-hover divide-surface-200-800 block divide-y overflow-hidden border-[1px]"
									>
										<Accordion collapsible padding="p-0 md:p-2" spaceY="space-y-4">
											<Question {question} showSetNumber />
										</Accordion>
									</div>
								{/each}
							</div>
						</div>
					{/each}
				</Tabs.Panel>
			{/snippet}
		</Tabs>
	</div>

	<FloatingAnchor
		onclick={() => {
			goto('/' + courseCode, { replaceState: true });
		}}
	>
		<ArrowLeft class="size-4 md:size-6" />
		<span>Back</span>
	</FloatingAnchor>
{:else}
	<CourseNotFound />
{/if}

<Footer />
