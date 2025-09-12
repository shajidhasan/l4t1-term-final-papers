<script lang="ts">
	import CourseCard from '$lib/components/CourseCard.svelte';
	import Footer from '$lib/components/Footer.svelte';

	import { courses } from '$lib/courses';
</script>

<svelte:head>
	<title>CUET ME · L4T1 - Term Final Papers Archive</title>
	<meta
		name="description"
		content="Term final papers archive for CUET Mechanical Engineering Level 4 Term 1 courses. Browse question papers from '19 to '15 batch including ME413, ME417, ME431, ME451, and ME461."
	/>
</svelte:head>

<div class="min-h-[calc(100vh-80px)] p-4 md:p-6">
	<div class="mb-8">
		<h1 class="h1 mb-4">CUET ME · L4T1</h1>
		<p class="text-surface-800-200 text-lg">Term final papers archive · From '19 to '15 batch</p>
	</div>

	<div class="">
		<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each courses as course}
				<CourseCard {course} />
			{/each}
		</div>
	</div>
</div>

<Footer />
