<script lang="ts">
	import { page } from '$app/state';

	import { Tabs } from '@skeletonlabs/skeleton-svelte';
	import Home from '@lucide/svelte/icons/home';
	import Search from '@lucide/svelte/icons/search';

	import CourseNotFound from '$lib/components/CourseNotFound.svelte';
	import FloatingAnchor from '$lib/components/FloatingAnchor.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Questions from '$lib/components/Questions.svelte';
	import { courses } from '$lib/courses';
	import { getAvailableBatches } from '$lib/papers';
	import { getGradientForString } from '$lib/utilities';

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
	<div
		class="bg-surface-600-400/20 sticky top-0 right-0 left-0 z-100 flex items-center px-6 py-6 text-xs backdrop-blur-2xl"
	>
		<span class="badge {getGradientForString(course.code)}">
			{course.code}
		</span>
		<span class="ml-2 line-clamp-1 flex-1">
			{course.title}
		</span>

		<a href="/" class="btn btn-icon hover:preset-tonal">
			<Home />
		</a>
	</div>

	<div class="p-4 md:p-6">
		<Tabs contentBase="mt-10" value={group} onValueChange={(e) => (group = e.value)} fluid>
			{#snippet list()}
				{#each batches as batch}
					<Tabs.Control labelBase="py-2 hover:bg-primary-500/50 rounded-base" value={batch}>
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

	<FloatingAnchor href="/{courseCode}/search">
		<Search class="size-4 md:size-6" />
		<span class="">Search</span>
	</FloatingAnchor>
{:else}
	<CourseNotFound />
{/if}

<Footer />
