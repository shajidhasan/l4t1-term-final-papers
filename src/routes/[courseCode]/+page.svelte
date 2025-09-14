<script lang="ts">
	import { page } from '$app/state';

	import { Tabs } from '@skeletonlabs/skeleton-svelte';
	import ArrowLeft from '@lucide/svelte/icons/arrow-left';

	import CourseNotFound from '$lib/components/CourseNotFound.svelte';
	import FloatingAnchor from '$lib/components/FloatingAnchor.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Questions from '$lib/components/Questions.svelte';
	import { courses } from '$lib/courses';
	import { getAvailableBatches } from '$lib/papers';
	import { getGradientForString } from '$lib/utilities';
	import CourseHeader from '$lib/components/CourseHeader.svelte';
	import { goto } from '$app/navigation';

	const courseCode = $derived(page.params.courseCode as string);
	const course = $derived(courses.find((c) => c.code === courseCode));
	const batches = $derived(getAvailableBatches(courseCode) ?? []);
	let group = $derived(batches[0] || '19');
</script>

<svelte:head>
	{#if course}
		<title>{course.code} - {course.title} | CUET ME L4T1</title>
		<meta
			name="description"
			content="Browse {course.title} ({course.code}) question papers from different batches. Access past exam questions and solutions for CUET Mechanical Engineering students."
		/>
	{:else}
		<title>Course Not Found | CUET ME L4T1</title>
		<meta name="description" content="The requested course could not be found in our database." />
	{/if}
</svelte:head>

{#if course}
	<CourseHeader {course} />

	<div class="p-4 md:p-6">
		<Tabs
			contentBase="mt-10"
			value={group}
			onValueChange={(e) => (group = e.value)}
			listJustify="justify-center"
			listBorder=""
		>
			{#snippet list()}
				{#each batches as batch}
					<Tabs.Control
						base="transition-colors"
						stateInactive="px-4 py-2 rounded-base preset-filled-surface-100-900 hover:preset-filled-surface-200-800"
						stateActive="px-4 py-2 rounded-base {getGradientForString(batch)}"
						labelBase=""
						value={batch}
					>
						<span class="text-xs md:text-base">
							<span class="hidden sm:inline"> '</span><span>
								{batch}
							</span>
							<span class="hidden sm:inline"> Batch </span>
						</span>
					</Tabs.Control>
				{/each}
			{/snippet}
			{#snippet content()}
				{#each batches as batch}
					<Tabs.Panel value={batch}>
						<Questions {batch} {courseCode} />
					</Tabs.Panel>
				{/each}
			{/snippet}
		</Tabs>
	</div>

	<FloatingAnchor onclick={() => goto('/', { replaceState: true })}>
		<ArrowLeft class="size-4 md:size-6" />
		<span>Back</span>
	</FloatingAnchor>
{:else}
	<CourseNotFound />
{/if}

<Footer />
