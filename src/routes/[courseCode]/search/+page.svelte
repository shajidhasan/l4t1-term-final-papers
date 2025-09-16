<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	import type { SearchResult } from 'minisearch';
	import ArrowLeft from '@lucide/svelte/icons/arrow-left';
	import Home from '@lucide/svelte/icons/home';
	import Search from '@lucide/svelte/icons/search';

	import CourseHeader from '$lib/components/CourseHeader.svelte';
	import FloatingAnchor from '$lib/components/FloatingAnchor.svelte';
	import SearchQuestion from '$lib/components/SearchQuestion.svelte';
	import { courses } from '$lib/courses';
	import { miniSearch } from '$lib/search';
	import type { Question } from '$lib/types';
	import { debounce, getGradientForString } from '$lib/utilities';

	const courseCode = $derived(page.params.courseCode);
	const course = $derived(courses.find((c) => c.code === courseCode));

	type Results = (Question & SearchResult)[];

	let searchQuery = $state('');

	let searchResults: Results = $state([]);

	let top = $derived(searchQuery.trim().length > 0);

	let searchElement: HTMLInputElement | undefined = $state(undefined);

	const search = (query: string) => {
		searchResults = (
			miniSearch.search(query, {
				prefix: true,
				filter: (result) => result.courseCode === courseCode
			}) as Results
		).sort((a, b) => b.id.localeCompare(a.id));
	};

	const debouncedSearch = debounce(search, 500);

	$effect(() => {
		debouncedSearch(searchQuery);
	});

	onMount(() => {
		searchElement?.focus();
	});
</script>

<svelte:head>
	{#if course}
		<title>Search {course.code} Questions | CUET ME L4T1</title>
		<meta
			name="description"
			content="Search through {course.title} ({course.code}) questions and find specific topics, problems, or solutions from past exam papers."
		/>
	{:else}
		<title>Search - Course Not Found | CUET ME L4T1</title>
		<meta name="description" content="The requested course could not be found for searching." />
	{/if}
</svelte:head>

{#if course}
	<CourseHeader {course} />

	<div class="relative container mx-auto min-h-[calc(100vh-51px)] max-w-3xl p-4">
		<div
			class="absolute z-100 {top
				? 'top-10'
				: 'top-[40%]'} left-1/2 w-full -translate-x-1/2 -translate-y-1/2 p-4 transition-[top] duration-500"
		>
			<div class="relative flex justify-center">
				{#if !top}
					<div out:fade in:fade={{ delay: 1000 }} class="absolute -top-24">
						<h2
							class="h4 md:h2 bg-gradient-to-b from-blue-50 via-blue-100 to-red-300 bg-clip-text text-center text-transparent select-none"
						>
							Search {courseCode} Questions
						</h2>
						<div
							class="absolute -bottom-1 left-1/2 -z-10 h-2 w-full -translate-x-1/2 rotate-2 bg-gradient-to-r from-red-500 to-blue-500 blur-sm"
						></div>
					</div>
				{/if}
				<div class="input-group w-full grid-cols-[auto_1fr_auto]">
					<div class="ig-cell preset-tonal">
						<Search size={16} />
					</div>
					<input
						bind:this={searchElement}
						bind:value={searchQuery}
						class="ig-input"
						type="search"
						placeholder="Search..."
					/>
				</div>
				{#if !top}
					<p class="absolute top-16 text-center italic opacity-60" transition:fade>
						Seek and you shall find, sometimes more than you expected.
					</p>
				{/if}
			</div>
		</div>

		{#if top}
			<div class="mt-16 space-y-4" in:fade out:fade>
				{#each searchResults as question}
					<SearchQuestion {question} />
				{/each}
			</div>
		{/if}
	</div>
{:else}
	<div class="container mx-auto flex min-h-screen items-center justify-center p-4">
		<div class="text-center">
			<h1 class="h2 mb-4">Course Not Found</h1>
			<p class="text-surface-600-400 mb-6">The course you're looking for doesn't exist.</p>
			<a href="/" class="btn variant-filled-primary">Go Home</a>
		</div>
	</div>
{/if}

<FloatingAnchor onclick={() => goto('/' + courseCode, { replaceState: true })}>
	<ArrowLeft class="size-4" />
	<span>Back</span>
</FloatingAnchor>
