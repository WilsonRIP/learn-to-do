<!-- src/lib/components/typing/TypingTest.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import Button from '../ui/button/Button.svelte';
	import Card from '../ui/card/Card.svelte';
	import Input from '../ui/input/Input.svelte';
	import ProgressBar from '../ui/progress/ProgressBar.svelte';

	export let difficulties: Array<{ value: string; label: string; words: string[] }> = [];
	export let durations: Array<{ value: number; label: string }> = [];
	export let onComplete: (results: any) => void = () => {};

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
	let showParticles = false;
	let streak = 0;
	let maxStreak = 0;
	let showStreak = false;
	let lastCorrect = false;
	let debounceTimer: ReturnType<typeof setTimeout>;

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
		streak = 0;
		maxStreak = 0;
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
		
		showParticles = true;
		setTimeout(() => {
			showParticles = false;
		}, 3000);

		onComplete({
			wpm,
			cpm,
			accuracy,
			mistakes,
			maxStreak,
			duration: selectedDuration,
			difficulty: selectedDifficulty
		});
	}

	function calculateStats() {
		const timeElapsed = (endTime - startTime) / 1000 / 60;
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

		const isCorrect = inputValue.length > 0 && inputValue[inputValue.length - 1] === currentText[inputValue.length - 1];
		
		if (isCorrect && !lastCorrect) {
			streak++;
			maxStreak = Math.max(maxStreak, streak);
			if (streak % 10 === 0) {
				showStreak = true;
				setTimeout(() => showStreak = false, 2000);
			}
		} else if (!isCorrect) {
			streak = 0;
		}
		
		lastCorrect = isCorrect;

		clearTimeout(debounceTimer);
		debounceTimer = setTimeout(() => {
			mistakes = 0;
			for (let i = 0; i < inputValue.length; i++) {
				if (inputValue[i] !== currentText[i]) {
					mistakes++;
				}
			}
		}, 50);
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
		streak = 0;
		maxStreak = 0;
		showStreak = false;
		clearInterval(timer);
	}

	function formatTime(seconds: number): string {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins}:${secs.toString().padStart(2, '0')}`;
	}

	onMount(() => {
		currentText = generateText(selectedDifficulty);
	});
</script>

<div class="typing-test">
	<!-- Settings Panel -->
	{#if !isTestStarted && !isTestCompleted}
		<Card padding="lg" hover={true}>
			<div class="settings-grid">
				<div>
					<h3 class="settings-title">Difficulty Level</h3>
					<div class="settings-options">
						{#each difficulties as difficulty}
							<label class="setting-option">
								<input
									type="radio"
									bind:group={selectedDifficulty}
									value={difficulty.value}
									class="radio-input"
								/>
								<span class="radio-label">{difficulty.label}</span>
							</label>
						{/each}
					</div>
				</div>
				<div>
					<h3 class="settings-title">Test Duration</h3>
					<div class="settings-options">
						{#each durations as duration}
							<label class="setting-option">
								<input
									type="radio"
									bind:group={selectedDuration}
									value={duration.value}
									class="radio-input"
								/>
								<span class="radio-label">{duration.label}</span>
							</label>
						{/each}
					</div>
				</div>
			</div>
			<div class="settings-actions">
				<Button size="lg" on:click={startTest}>
					Start Test
				</Button>
			</div>
		</Card>
	{/if}

	<!-- Test Interface -->
	{#if isTestStarted}
		<Card padding="lg">
			<div class="test-container">
			<!-- Timer and Progress -->
			<div class="test-header">
				<div class="timer geometric-pulse">
					{formatTime(timeRemaining)}
				</div>
				<div class="progress-info">
					Progress: {Math.round((currentIndex / currentText.length) * 100)}%
				</div>
				{#if showStreak}
					<div class="streak-notification">
						🔥 {streak} Streak!
					</div>
				{/if}
			</div>

			<!-- Progress Bar -->
			<div class="progress-container">
				<ProgressBar
					value={currentIndex}
					max={currentText.length}
					showLabel={true}
					label="{Math.round((currentIndex / currentText.length) * 100)}%"
					color="linear-gradient(90deg, #3b82f6, #8b5cf6)"
					backgroundColor="#374151"
					height="0.5rem"
					borderRadius="0.25rem"
					striped={true}
					animated={true}
					labelColor="#e5e7eb"
				/>
			</div>

			<!-- Text Display -->
			<div class="text-display">
				<div class="text-content">
					{#each currentText.split('') as char, index}
						{#if index < currentIndex}
							{#if userInput[index] === char}
								<span class="char-correct">{char}</span>
							{:else}
								<span class="char-incorrect">{char}</span>
							{/if}
						{:else if index === currentIndex}
							<span class="char-current">{char}</span>
						{:else}
							<span class="char-future">{char}</span>
						{/if}
					{/each}
				</div>
			</div>

			<!-- Input Field -->
			<div class="input-container">
				<Input
					type="text"
					bind:value={userInput}
					on:input={handleInput}
					placeholder="Start typing here..."
					size="lg"
					fullWidth={true}
					autocomplete="off"
					spellcheck={false}
				/>
			</div>

			<!-- Real-time Stats -->
			<div class="stats-grid">
				<div class="stat-card">
					<div class="stat-value">{Math.round((userInput.length / 5) / ((Date.now() - startTime) / 1000 / 60)) || 0}</div>
					<div class="stat-label">WPM</div>
				</div>
				<div class="stat-card">
					<div class="stat-value">{Math.round(userInput.length / ((Date.now() - startTime) / 1000 / 60)) || 0}</div>
					<div class="stat-label">CPM</div>
				</div>
				<div class="stat-card">
					<div class="stat-value">{Math.round(((userInput.length - mistakes) / userInput.length) * 100) || 100}</div>
					<div class="stat-label">Accuracy %</div>
				</div>
				<div class="stat-card">
					<div class="stat-value">{mistakes}</div>
					<div class="stat-label">Mistakes</div>
				</div>
			</div>

			<!-- Streak Display -->
			{#if streak > 0}
				<div class="streak-display">
					<div class="streak-badge">
						<span>🔥 Current Streak: {streak}</span>
					</div>
				</div>
			{/if}
			</div>
		</Card>
	{/if}

	<!-- Results -->
	{#if isTestCompleted}
		<Card padding="lg">
			<div class="result-container">
			<div class="result-header">
				<h2 class="result-title">Test Complete!</h2>
				<p class="result-subtitle">Here are your results:</p>
			</div>

			<div class="results-grid">
				<div class="result-stat">
					<div class="result-value">{wpm}</div>
					<div class="result-label">Words Per Minute</div>
				</div>
				<div class="result-stat">
					<div class="result-value">{cpm}</div>
					<div class="result-label">Characters Per Minute</div>
				</div>
				<div class="result-stat">
					<div class="result-value">{accuracy}%</div>
					<div class="result-label">Accuracy</div>
				</div>
				<div class="result-stat">
					<div class="result-value">{mistakes}</div>
					<div class="result-label">Mistakes</div>
				</div>
			</div>

			{#if maxStreak > 0}
				<div class="max-streak">
					<div class="streak-badge">
						<span>🏆 Max Streak: {maxStreak}</span>
					</div>
				</div>
			{/if}

			<div class="result-actions">
				<Button size="lg" on:click={resetTest}>
					Take Another Test
				</Button>
			</div>
			</div>
		</Card>
	{/if}

	<!-- Particle Effects -->
	{#if showParticles}
		<div class="particles-container">
			{#each Array(20) as _, i}
				<div 
					class="particle"
					style="--delay: {i * 0.1}s; --x: {Math.random() * 100}%; --y: {Math.random() * 100}%"
				></div>
			{/each}
		</div>
	{/if}
</div>

<style>
	.typing-test {
		position: relative;
	}

	.settings-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2rem;
		margin-bottom: 2rem;
	}

	.settings-title {
		font-size: 1.25rem;
		font-weight: 600;
		margin-bottom: 1rem;
		color: white;
	}

	.settings-options {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.setting-option {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		cursor: pointer;
		padding: 0.5rem;
		border-radius: 0.5rem;
		transition: background-color 0.3s ease;
	}

	.setting-option:hover {
		background: rgba(71, 85, 105, 0.3);
	}

	.radio-input {
		width: 1rem;
		height: 1rem;
		color: #3b82f6;
		background: #1e293b;
		border: 1px solid #475569;
		border-radius: 50%;
	}

	.radio-label {
		color: #cbd5e1;
		font-weight: 500;
	}

	.settings-actions {
		text-align: center;
	}

	.test-container {
		position: relative;
		overflow: hidden;
	}

	.test-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1.5rem;
	}

	.timer {
		font-size: 1.5rem;
		font-weight: bold;
		color: #3b82f6;
	}

	.progress-info {
		color: #cbd5e1;
	}

	.streak-notification {
		color: #10b981;
		font-weight: bold;
		font-size: 1.125rem;
		animation: bounce 1s infinite;
	}

	.progress-container {
		margin-bottom: 1.5rem;
	}

	.text-display {
		background: rgba(17, 24, 39, 0.5);
		border: 1px solid rgba(71, 85, 105, 0.3);
		border-radius: 0.5rem;
		padding: 1.5rem;
		margin-bottom: 1.5rem;
		position: relative;
		overflow: hidden;
	}

	.text-content {
		font-size: 1.125rem;
		line-height: 1.75;
		font-family: monospace;
	}

	.char-correct {
		color: #10b981;
		animation: correctChar 0.2s ease-out;
	}

	.char-incorrect {
		color: #ef4444;
		background: rgba(239, 68, 68, 0.2);
		animation: incorrectChar 0.2s ease-out;
	}

	.char-current {
		color: #3b82f6;
		background: rgba(59, 130, 246, 0.2);
		border-bottom: 2px solid #3b82f6;
		animation: currentChar 0.1s ease-out;
	}

	.char-future {
		color: #9ca3af;
	}

	.input-container {
		margin-bottom: 1.5rem;
	}

	.stats-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
		margin-bottom: 1rem;
	}

	.stat-card {
		background: rgba(30, 41, 59, 0.5);
		border: 1px solid rgba(71, 85, 105, 0.3);
		border-radius: 0.5rem;
		padding: 1rem;
		text-align: center;
		transition: all 0.3s ease;
	}

	.stat-card:hover {
		background: rgba(30, 41, 59, 0.8);
		border-color: rgba(59, 130, 246, 0.5);
		transform: translateY(-2px);
	}

	.stat-value {
		font-size: 1.5rem;
		font-weight: bold;
		color: white;
		margin-bottom: 0.25rem;
	}

	.stat-label {
		color: #9ca3af;
		font-size: 0.875rem;
	}

	.streak-display {
		text-align: center;
		margin-top: 1rem;
	}

	.streak-badge {
		display: inline-block;
		background: rgba(16, 185, 129, 0.2);
		border: 1px solid rgba(16, 185, 129, 0.3);
		border-radius: 0.5rem;
		padding: 0.5rem 1rem;
	}

	.streak-badge span {
		color: #10b981;
		font-weight: 600;
	}

	.result-header {
		text-align: center;
		margin-bottom: 2rem;
	}

	.result-title {
		font-size: 2rem;
		font-weight: bold;
		margin-bottom: 0.5rem;
		color: white;
	}

	.result-subtitle {
		color: #cbd5e1;
		font-size: 1.125rem;
	}

	.results-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1.5rem;
		margin-bottom: 2rem;
	}

	.result-stat {
		text-align: center;
		animation: resultPop 0.6s ease-out;
	}

	.result-value {
		font-size: 3rem;
		font-weight: bold;
		margin-bottom: 0.5rem;
	}

	.result-stat:nth-child(1) .result-value { color: #3b82f6; }
	.result-stat:nth-child(2) .result-value { color: #10b981; }
	.result-stat:nth-child(3) .result-value { color: #8b5cf6; }
	.result-stat:nth-child(4) .result-value { color: #ef4444; }

	.result-label {
		color: #9ca3af;
		font-size: 1rem;
	}

	.max-streak {
		text-align: center;
		margin-bottom: 2rem;
	}

	.result-actions {
		text-align: center;
	}

	.particles-container {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		z-index: 1000;
	}

	.particle {
		position: absolute;
		width: 4px;
		height: 4px;
		background: linear-gradient(45deg, #3b82f6, #8b5cf6);
		border-radius: 50%;
		animation: particleFloat 3s ease-out forwards;
		animation-delay: var(--delay);
		left: var(--x);
		top: var(--y);
	}

	@keyframes correctChar {
		0% { transform: scale(1); }
		50% { transform: scale(1.1); color: #10b981; }
		100% { transform: scale(1); }
	}

	@keyframes incorrectChar {
		0% { transform: scale(1); }
		50% { transform: scale(1.1); background-color: rgba(239, 68, 68, 0.4); }
		100% { transform: scale(1); }
	}

	@keyframes currentChar {
		0% { transform: scale(1); }
		50% { transform: scale(1.05); }
		100% { transform: scale(1); }
	}

	@keyframes resultPop {
		0% { transform: scale(0.8); opacity: 0; }
		50% { transform: scale(1.1); }
		100% { transform: scale(1); opacity: 1; }
	}

	@keyframes particleFloat {
		0% {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
		100% {
			opacity: 0;
			transform: translateY(-100px) scale(0);
		}
	}

	@keyframes bounce {
		0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
		40% { transform: translateY(-10px); }
		60% { transform: translateY(-5px); }
	}

	@media (max-width: 768px) {
		.settings-grid {
			grid-template-columns: 1fr;
		}

		.stats-grid {
			grid-template-columns: 1fr;
		}

		.results-grid {
			grid-template-columns: 1fr;
		}

		.result-value {
			font-size: 2.5rem;
		}

		.particle {
			width: 3px;
			height: 3px;
		}
	}
</style> 