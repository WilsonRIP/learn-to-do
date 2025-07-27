<script lang="ts">
	import { onMount } from 'svelte';

	let isLoaded = false;
	let isTestStarted = false;
	let isTestCompleted = false;
	let currentText = '';
	let userInput = '';
	let startTime = 0;
	let endTime = 0;
	let mistakes = 0;
	let totalCharacters = 0;
	let currentIndex = 0;
	let selectedDifficulty = 'medium';
	let selectedDuration = 60;
	let timeRemaining = selectedDuration;
	let timer: ReturnType<typeof setInterval>;
	let wpm = 0;
	let accuracy = 100;
	let cpm = 0;

	const difficulties = [
		{ value: 'easy', label: 'Easy', words: ['the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'had', 'her', 'was', 'one', 'our', 'out', 'day', 'get', 'has', 'him', 'his', 'how', 'man', 'new', 'now', 'old', 'see', 'two', 'way', 'who', 'boy', 'did', 'its', 'let', 'put', 'say', 'she', 'too', 'use'] },
		{ value: 'medium', label: 'Medium', words: ['about', 'after', 'again', 'air', 'also', 'another', 'answer', 'any', 'around', 'away', 'back', 'because', 'before', 'below', 'between', 'both', 'call', 'came', 'change', 'come', 'could', 'different', 'does', 'each', 'end', 'even', 'first', 'found', 'give', 'good', 'great', 'help', 'here', 'high', 'home', 'house', 'just', 'know', 'large', 'life', 'line', 'little', 'long', 'look', 'made', 'make', 'many', 'may', 'more', 'most', 'move', 'much', 'must', 'name', 'need', 'next', 'only', 'other', 'over', 'part', 'people', 'place', 'right', 'same', 'should', 'show', 'small', 'some', 'still', 'such', 'take', 'tell', 'than', 'that', 'them', 'then', 'there', 'these', 'they', 'think', 'this', 'those', 'through', 'time', 'under', 'very', 'want', 'well', 'went', 'were', 'what', 'when', 'where', 'which', 'while', 'will', 'with', 'word', 'work', 'world', 'would', 'write', 'year'] },
		{ value: 'hard', label: 'Hard', words: ['ability', 'absence', 'absolute', 'academic', 'acceptance', 'access', 'accomplish', 'accurate', 'achieve', 'acknowledge', 'acquire', 'adaptation', 'adequate', 'adjustment', 'administration', 'advantage', 'adventure', 'advertisement', 'affection', 'agreement', 'agriculture', 'ambition', 'analysis', 'announcement', 'appearance', 'appointment', 'appreciation', 'approach', 'arrangement', 'association', 'assumption', 'atmosphere', 'attention', 'attitude', 'authority', 'background', 'beginning', 'behavior', 'business', 'capacity', 'challenge', 'character', 'circumstance', 'combination', 'comfortable', 'committee', 'communication', 'comparison', 'competition', 'completion', 'conclusion', 'condition', 'confidence', 'connection', 'consciousness', 'consideration', 'construction', 'contribution', 'conversation', 'cooperation', 'correspondence', 'criticism', 'curiosity', 'decision', 'definition', 'democracy', 'description', 'development', 'difference', 'difficulty', 'direction', 'discovery', 'discussion', 'distribution', 'education', 'efficiency', 'emergency', 'employment', 'encouragement', 'entertainment', 'environment', 'equipment', 'establishment', 'examination', 'experience', 'experiment', 'explanation', 'expression', 'foundation', 'friendship', 'government', 'happiness', 'imagination', 'importance', 'improvement', 'independence', 'indication', 'information', 'instruction', 'intelligence', 'intention', 'interaction', 'knowledge', 'leadership', 'literature', 'management', 'measurement', 'movement', 'necessary', 'observation', 'opportunity', 'organization', 'particular', 'performance', 'personality', 'perspective', 'philosophy', 'possibility', 'preparation', 'production', 'profession', 'protection', 'punishment', 'qualification', 'question', 'reaction', 'reality', 'recognition', 'recommendation', 'reference', 'reflection', 'relationship', 'reputation', 'requirement', 'resistance', 'resolution', 'response', 'responsibility', 'satisfaction', 'situation', 'suggestion', 'technology', 'tendency', 'tradition', 'understanding', 'variation', 'willingness'] }
	];

	const durations = [
		{ value: 30, label: '30 seconds' },
		{ value: 60, label: '1 minute' },
		{ value: 120, label: '2 minutes' },
		{ value: 300, label: '5 minutes' }
	];

	function generateText(difficulty: string, wordCount: number = 50): string {
		const difficultyObj = difficulties.find(d => d.value === difficulty);
		if (!difficultyObj) return '';
		
		const words = difficultyObj.words;
		let text = '';
		for (let i = 0; i < wordCount; i++) {
			const randomWord = words[Math.floor(Math.random() * words.length)];
			text += randomWord + ' ';
		}
		return text.trim();
	}

	function startTest() {
		isTestStarted = true;
		isTestCompleted = false;
		userInput = '';
		mistakes = 0;
		currentIndex = 0;
		startTime = Date.now();
		timeRemaining = selectedDuration;
		currentText = generateText(selectedDifficulty, 100);
		totalCharacters = currentText.length;

		timer = setInterval(() => {
			timeRemaining--;
			if (timeRemaining <= 0) {
				endTest();
			}
		}, 1000);
	}

	function endTest() {
		clearInterval(timer);
		isTestCompleted = true;
		isTestStarted = false;
		endTime = Date.now();
		calculateStats();
	}

	function calculateStats() {
		const timeElapsed = (endTime - startTime) / 1000 / 60; // in minutes
		const wordsTyped = userInput.trim().split(/\s+/).length;
		wpm = Math.round(wordsTyped / timeElapsed);
		cpm = Math.round(userInput.length / timeElapsed);
		accuracy = Math.round(((totalCharacters - mistakes) / totalCharacters) * 100);
	}

	function handleInput(event: Event) {
		if (!isTestStarted || isTestCompleted) return;
		
		const target = event.target as HTMLInputElement;
		const inputValue = target.value;
		
		if (inputValue.length > currentText.length) {
			target.value = inputValue.slice(0, currentText.length);
			return;
		}

		userInput = inputValue;
		currentIndex = inputValue.length;

		// Count mistakes
		mistakes = 0;
		for (let i = 0; i < inputValue.length; i++) {
			if (inputValue[i] !== currentText[i]) {
				mistakes++;
			}
		}
	}

	function resetTest() {
		isTestStarted = false;
		isTestCompleted = false;
		userInput = '';
		mistakes = 0;
		currentIndex = 0;
		timeRemaining = selectedDuration;
		wpm = 0;
		accuracy = 100;
		cpm = 0;
		clearInterval(timer);
	}

	function formatTime(seconds: number): string {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins}:${secs.toString().padStart(2, '0')}`;
	}

	onMount(() => {
		isLoaded = true;
		currentText = generateText(selectedDifficulty);
	});
</script>

<svelte:head>
	<title>Typing Test - Learn to do</title>
	<meta name="description" content="Test and improve your typing speed and accuracy with our comprehensive typing test. Multiple difficulty levels and real-time statistics." />
</svelte:head>

<div class="min-h-screen geometric-bg">
	<!-- Navigation -->
	<nav class="fixed top-0 w-full z-50 geometric-nav">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex justify-between items-center h-16">
				<div class="flex items-center space-x-2">
					<a href="/" class="flex items-center space-x-2">
						<div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
							<span class="text-white font-bold text-lg">L</span>
						</div>
						<span class="text-white font-bold text-xl">Learn to do</span>
					</a>
				</div>
				<div class="flex items-center space-x-4">
					<a href="/" class="text-slate-300 hover:text-white transition-colors duration-300">Home</a>
					<span class="text-slate-500">|</span>
					<span class="text-blue-400 font-semibold">Typing Test</span>
				</div>
			</div>
		</div>
	</nav>

	<!-- Main Content -->
	<div class="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
		<div class="max-w-6xl mx-auto">
			<!-- Header -->
			<div class="text-center mb-12">
				<h1 class="text-4xl sm:text-5xl font-bold mb-4">
					Typing Speed Test
				</h1>
				<p class="text-xl text-slate-300 max-w-2xl mx-auto">
					Test your typing speed and accuracy. Choose your difficulty level and duration to get started.
				</p>
			</div>

			<!-- Settings Panel -->
			{#if !isTestStarted && !isTestCompleted}
				<div class="geometric-card p-8 mb-8">
					<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
						<div>
							<h3 class="text-xl font-semibold mb-4">Difficulty Level</h3>
							<div class="space-y-3">
								{#each difficulties as difficulty}
									<label class="flex items-center space-x-3 cursor-pointer">
										<input
											type="radio"
											bind:group={selectedDifficulty}
											value={difficulty.value}
											class="w-4 h-4 text-blue-500 bg-slate-700 border-slate-600 focus:ring-blue-500"
										/>
										<span class="text-slate-300">{difficulty.label}</span>
									</label>
								{/each}
							</div>
						</div>
						<div>
							<h3 class="text-xl font-semibold mb-4">Test Duration</h3>
							<div class="space-y-3">
								{#each durations as duration}
									<label class="flex items-center space-x-3 cursor-pointer">
										<input
											type="radio"
											bind:group={selectedDuration}
											value={duration.value}
											class="w-4 h-4 text-blue-500 bg-slate-700 border-slate-600 focus:ring-blue-500"
										/>
										<span class="text-slate-300">{duration.label}</span>
									</label>
								{/each}
							</div>
						</div>
					</div>
					<div class="mt-8 text-center">
						<button
							on:click={startTest}
							class="geometric-btn text-lg px-8 py-4"
						>
							Start Test
						</button>
					</div>
				</div>
			{/if}

			<!-- Test Interface -->
			{#if isTestStarted}
				<div class="geometric-card p-8 mb-8">
					<!-- Timer and Progress -->
					<div class="flex justify-between items-center mb-6">
						<div class="text-2xl font-bold text-blue-400">
							{formatTime(timeRemaining)}
						</div>
						<div class="text-slate-300">
							Progress: {Math.round((currentIndex / currentText.length) * 100)}%
						</div>
					</div>

					<!-- Text Display -->
					<div class="bg-slate-900/50 border border-slate-600/50 rounded-lg p-6 mb-6">
						<div class="text-lg leading-relaxed font-mono">
							{#each currentText.split('') as char, index}
								{#if index < currentIndex}
									{#if userInput[index] === char}
										<span class="text-green-400">{char}</span>
									{:else}
										<span class="text-red-400 bg-red-400/20">{char}</span>
									{/if}
								{:else if index === currentIndex}
									<span class="text-blue-400 bg-blue-400/20 border-b-2 border-blue-400">{char}</span>
								{:else}
									<span class="text-slate-400">{char}</span>
								{/if}
							{/each}
						</div>
					</div>

					<!-- Input Field -->
					<div class="mb-6">
						<input
							type="text"
							bind:value={userInput}
							on:input={handleInput}
							placeholder="Start typing here..."
							class="w-full bg-slate-900/50 border border-slate-600/50 rounded-lg px-4 py-3 text-lg font-mono focus:outline-none focus:border-blue-500 transition-colors duration-300"
							autocomplete="off"
							spellcheck="false"
						/>
					</div>

					<!-- Real-time Stats -->
					<div class="grid grid-cols-2 md:grid-cols-4 gap-4">
						<div class="text-center">
							<div class="text-2xl font-bold text-white">{Math.round((userInput.length / 5) / ((Date.now() - startTime) / 1000 / 60)) || 0}</div>
							<div class="text-slate-400">WPM</div>
						</div>
						<div class="text-center">
							<div class="text-2xl font-bold text-white">{Math.round(userInput.length / ((Date.now() - startTime) / 1000 / 60)) || 0}</div>
							<div class="text-slate-400">CPM</div>
						</div>
						<div class="text-center">
							<div class="text-2xl font-bold text-white">{Math.round(((userInput.length - mistakes) / userInput.length) * 100) || 100}</div>
							<div class="text-slate-400">Accuracy %</div>
						</div>
						<div class="text-center">
							<div class="text-2xl font-bold text-white">{mistakes}</div>
							<div class="text-slate-400">Mistakes</div>
						</div>
					</div>
				</div>
			{/if}

			<!-- Results -->
			{#if isTestCompleted}
				<div class="geometric-card p-8 mb-8">
					<div class="text-center mb-8">
						<h2 class="text-3xl font-bold mb-4">Test Complete!</h2>
						<p class="text-slate-300">Here are your results:</p>
					</div>

					<div class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
						<div class="text-center">
							<div class="text-4xl font-bold text-blue-400">{wpm}</div>
							<div class="text-slate-400">Words Per Minute</div>
						</div>
						<div class="text-center">
							<div class="text-4xl font-bold text-green-400">{cpm}</div>
							<div class="text-slate-400">Characters Per Minute</div>
						</div>
						<div class="text-center">
							<div class="text-4xl font-bold text-purple-400">{accuracy}%</div>
							<div class="text-slate-400">Accuracy</div>
						</div>
						<div class="text-center">
							<div class="text-4xl font-bold text-red-400">{mistakes}</div>
							<div class="text-slate-400">Mistakes</div>
						</div>
					</div>

					<div class="text-center">
						<button
							on:click={resetTest}
							class="geometric-btn text-lg px-8 py-4"
						>
							Take Another Test
						</button>
					</div>
				</div>
			{/if}

			<!-- Tips Section -->
			{#if !isTestStarted && !isTestCompleted}
				<div class="geometric-card p-8">
					<h3 class="text-2xl font-bold mb-6">Typing Tips</h3>
					<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<h4 class="text-lg font-semibold text-blue-400 mb-3">Improve Speed</h4>
							<ul class="text-slate-300 space-y-2">
								<li>• Practice regularly with touch typing</li>
								<li>• Focus on accuracy over speed initially</li>
								<li>• Use proper finger placement on home row</li>
								<li>• Don't look at the keyboard while typing</li>
							</ul>
						</div>
						<div>
							<h4 class="text-lg font-semibold text-green-400 mb-3">Improve Accuracy</h4>
							<ul class="text-slate-300 space-y-2">
								<li>• Take your time to type correctly</li>
								<li>• Practice with different text types</li>
								<li>• Use online typing tutorials</li>
								<li>• Gradually increase your speed</li>
							</ul>
						</div>
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	/* Custom scrollbar for better UX */
	::-webkit-scrollbar {
		width: 8px;
	}

	::-webkit-scrollbar-track {
		background: #1e293b;
	}

	::-webkit-scrollbar-thumb {
		background: #475569;
		border-radius: 4px;
	}

	::-webkit-scrollbar-thumb:hover {
		background: #64748b;
	}

	/* Focus styles for better accessibility */
	input:focus {
		box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
	}

	/* Smooth transitions */
	* {
		transition: color 0.2s ease, background-color 0.2s ease, border-color 0.2s ease;
	}
</style> 