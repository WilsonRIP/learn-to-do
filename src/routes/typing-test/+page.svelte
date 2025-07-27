<script lang="ts">
	import { onMount } from 'svelte';
	import { TypingTest } from '$lib/components';

	let isLoaded = false;

	const difficulties = [
		{
			value: 'easy',
			label: 'Easy',
			words: ['the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'I', 'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at']
		},
		{
			value: 'medium',
			label: 'Medium',
			words: ['computer', 'technology', 'programming', 'development', 'software', 'application', 'database', 'algorithm', 'function', 'variable', 'interface', 'system', 'network', 'security', 'framework', 'library', 'component', 'module', 'service', 'platform']
		},
		{
			value: 'hard',
			label: 'Hard',
			words: ['supercalifragilisticexpialidocious', 'pneumonoultramicroscopicsilicovolcanoconioses', 'floccinaucinihilipilification', 'antidisestablishmentarianism', 'honorificabilitudinitatibus', 'thyroparathyroidectomized', 'dichlorodifluoromethane', 'pseudopseudohypoparathyroidism', 'subdermatoglyphic', 'hepaticocholangiogastrostomy']
		}
	];

	const durations = [
		{ value: 30, label: '30 seconds' },
		{ value: 60, label: '1 minute' },
		{ value: 120, label: '2 minutes' },
		{ value: 300, label: '5 minutes' }
	];

	function handleTestComplete(results: any) {
		console.log('Test completed:', results);
		// Here you can add logic to save results, show analytics, etc.
	}

	onMount(() => {
		isLoaded = true;
	});
</script>

<svelte:head>
	<title>Typing Test - Learn to do</title>
	<meta name="description" content="Test your typing speed and accuracy with our interactive typing test. Choose from different difficulty levels and durations." />
</svelte:head>

<div class="min-h-screen geometric-bg">
	<div class="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
		<div class="max-w-4xl mx-auto">
			<!-- Header -->
			<div class="text-center mb-12">
				<h1 class="text-4xl md:text-5xl font-bold mb-4 geometric-heading">
					Typing Speed Test
				</h1>
				<p class="text-xl text-slate-300 max-w-2xl mx-auto">
					Improve your typing skills with our interactive test. Choose your difficulty level and test duration to get started.
				</p>
			</div>

			<!-- Typing Test Component -->
			<TypingTest
				{difficulties}
				{durations}
				onComplete={handleTestComplete}
			/>

			<!-- Tips Section -->
			<div class="mt-12">
				<div class="geometric-card p-8">
					<h3 class="text-2xl font-bold mb-6 geometric-heading">Typing Tips</h3>
					<div class="grid md:grid-cols-2 gap-6">
						<div>
							<h4 class="text-lg font-semibold mb-3 text-blue-400">Proper Technique</h4>
							<ul class="space-y-2 text-slate-300">
								<li>• Keep your fingers on the home row (ASDF JKL;)</li>
								<li>• Use all ten fingers for maximum efficiency</li>
								<li>• Don't look at the keyboard while typing</li>
								<li>• Maintain good posture and wrist position</li>
							</ul>
						</div>
						<div>
							<h4 class="text-lg font-semibold mb-3 text-purple-400">Speed vs Accuracy</h4>
							<ul class="space-y-2 text-slate-300">
								<li>• Focus on accuracy first, speed will follow</li>
								<li>• Don't rush - it's better to be accurate than fast</li>
								<li>• Practice regularly for consistent improvement</li>
								<li>• Take breaks to avoid fatigue</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.geometric-heading {
		background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}
</style> 