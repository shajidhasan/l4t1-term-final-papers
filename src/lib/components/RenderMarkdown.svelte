<script lang="ts">
	import 'katex/dist/katex.min.css';

	import katex from 'katex';
	import MarkdownIt from 'markdown-it';

	const { markdown, figureFilter = false } = $props();

	const md = new MarkdownIt({ breaks: true, html: true });

	const renderMarkdown = (text: string, figureFilter: boolean) => {
		if (figureFilter) {
			const regex = /^>.*(\r?\n)?/gm;

			let removed = false;
			text = text.replace(regex, () => {
				removed = true;
				return '';
			});

			if (removed) {
				text +=
					'<div class="-translate-y-2"><span class="badge preset-filled-surface-50-950">🖼️ Includes Figure</span></div>';
			}
		}

		return md.render(text);
	};

	const stripHtmlTags = (str: string): string => {
		return str.replace(/<[^>]*>/g, '');
	};

	const renderEquations = (markdown: string): string => {
		// More specific regex patterns with non-greedy matching
		const dollarBlockRegex = /\$\$([\s\S]*?)\$\$/g;
		const dollarInlineRegex = /\$([^\$\n]+?)\$/g;
		const latexBlockRegex = /\\\[([\s\S]*?)\\\]/g;
		const latexInlineRegex = /\\\(([\s\S]*?)\\\)/g;

		let html = markdown;

		html = html.replace(latexBlockRegex, (match, equation) => {
			try {
				const cleanEquation = stripHtmlTags(equation.trim());
				return katex.renderToString(cleanEquation, { displayMode: true, strict: false });
			} catch (error) {
				console.error('LaTeX block equation error:', error);
				return match;
			}
		});

		html = html.replace(dollarBlockRegex, (match, equation) => {
			try {
				const cleanEquation = stripHtmlTags(equation.trim());
				return katex.renderToString(cleanEquation, { displayMode: true, strict: false });
			} catch (error) {
				console.error('Dollar block equation error:', error);
				return match;
			}
		});

		html = html.replace(latexInlineRegex, (match, equation) => {
			try {
				const cleanEquation = stripHtmlTags(equation.trim());
				return katex.renderToString(cleanEquation, { displayMode: false, strict: false });
			} catch (error) {
				console.error('LaTeX inline equation error:', error);
				return match;
			}
		});

		html = html.replace(dollarInlineRegex, (match, equation) => {
			try {
				const cleanEquation = stripHtmlTags(equation.trim());
				return katex.renderToString(cleanEquation, { displayMode: false, strict: false });
			} catch (error) {
				console.error('Dollar inline equation error:', error);
				return match;
			}
		});

		return html;
	};

	let html = $state('');

	const htmlWithoutEquations = renderMarkdown(markdown, figureFilter);
	html = renderEquations(htmlWithoutEquations);
</script>

{@html html}
