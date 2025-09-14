<script lang="ts">
	import Search from '@lucide/svelte/icons/search';

	import type { Course } from '$lib/types';
	import { getGradientForString } from '$lib/utilities';
	import { page } from '$app/state';

	let { course }: { course: Course } = $props();
</script>

<div
	class="bg-surface-600-400/20 sticky top-0 right-0 left-0 z-100 flex items-center p-4 text-xs backdrop-blur-2xl md:px-6"
>
	<span class="badge {getGradientForString(course.code)}">
		{course.code}
	</span>
	<span class="ml-2 line-clamp-1 flex-1">
		{course.title}
	</span>
	<a
		href="/{course.code}/search"
		class="btn hover:preset-tonal"
		class:preset-tonal={page.url.pathname === `/${course.code}/search`}
	>
		<Search class="size-5" />
		<span class="hidden sm:inline"> Search </span>
	</a>
</div>
