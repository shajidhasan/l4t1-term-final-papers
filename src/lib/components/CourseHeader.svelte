<script lang="ts">
	import Home from '@lucide/svelte/icons/home';

	import type { Course } from '$lib/types';
	import { getGradientForString } from '$lib/utilities';

	let { course }: { course: Course } = $props();
</script>

<div
	class="bg-surface-600-400/20 sticky top-0 right-0 left-0 z-100 flex items-center p-4 text-xs backdrop-blur-2xl md:p-6"
>
	<span class="badge {getGradientForString(course.code)}">
		{course.code}
	</span>
	<span class="ml-2 line-clamp-1 flex-1">
		{course.title}
	</span>
	<a href="/" class="btn btn-sm hover:preset-tonal">
		<Home class="size-4" />
		<span class="hidden sm:inline"> Home </span>
	</a>
</div>
