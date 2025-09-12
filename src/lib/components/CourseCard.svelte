<script lang="ts">
	import Users from '@lucide/svelte/icons/users';

	import type { Course } from '$lib/types';
	import { getGradientForString } from '$lib/utilities';

	let { course }: { course: Course } = $props();

	const background = $derived(getGradientForString(course.code));
</script>

<a
	href="/{course.code}"
	class="card preset-filled-surface-100-900 border-surface-200-800 card-hover divide-surface-200-800 block divide-y overflow-hidden border-[1px]"
>
	<article class="space-y-6 p-4">
		<div>
			<div class="mb-4 flex justify-between">
				<span class="badge inline-block {background}">{course.code}</span>
				<span class="{background} bg-clip-text text-sm font-semibold !text-transparent"
					>{course.credits} credits</span
				>
			</div>
			<h3 class="h4 line-clamp-2 h-20">{course.title}</h3>
		</div>

		<div class="space-y-2">
			<div class="flex items-center gap-3 text-gray-600 dark:text-gray-400">
				<div
					class="bg-surface-200-800 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg"
				>
					<Users size={14} class="text-gray-500 dark:text-gray-400" />
				</div>
				<span class="text-surface-700-300 truncate text-sm font-medium">
					{course.instructors}
				</span>
			</div>
		</div>
	</article>
	<footer class="h-1 {background}"></footer>
</a>
