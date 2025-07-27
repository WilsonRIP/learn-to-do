<script lang="ts">
	import { onMount } from 'svelte';

	let isLoaded = false;

	onMount(() => {
		isLoaded = true;
	});

	const features = [
		{
			icon: '🎯',
			title: 'Goal Setting',
			description: 'Set clear, achievable goals and track your progress with our intuitive interface.'
		},
		{
			icon: '📊',
			title: 'Progress Tracking',
			description: 'Visualize your learning journey with detailed analytics and progress reports.'
		},
		{
			icon: '🏆',
			title: 'Achievement System',
			description: 'Earn badges and rewards as you complete milestones and master new skills.'
		},
		{
			icon: '👥',
			title: 'Community Learning',
			description: 'Connect with fellow learners, share experiences, and learn together.'
		},
		{
			icon: '⚡',
			title: 'Quick Start',
			description: 'Get started in minutes with our streamlined onboarding process.'
		},
		{
			icon: '🔒',
			title: 'Secure & Private',
			description: 'Your data is protected with enterprise-grade security and privacy controls.'
		}
	];

	const stats = [
		{ number: '10K+', label: 'Active Learners' },
		{ number: '500+', label: 'Skills Available' },
		{ number: '95%', label: 'Success Rate' },
		{ number: '24/7', label: 'Support Available' }
	];
</script>

<svelte:head>
	<title>Learn to do - Master New Skills, Achieve Your Goals</title>
	<meta name="description" content="Transform your life by learning new skills with our comprehensive learning platform. Track progress, earn achievements, and join a community of learners." />
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-#0f172a via-#1e293b to-#334155">
	<!-- Navigation -->
	<nav class="fixed top-0 w-full z-50 bg-#0f172a/80 backdrop-blur-md border-b border-#334155/50">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex justify-between items-center h-16">
				<div class="flex items-center space-x-2">
					<div class="w-8 h-8 bg-gradient-to-r from-#3b82f6 to-#8b5cf6 rounded-lg flex items-center justify-center">
						<span class="text-white font-bold text-lg">L</span>
					</div>
					<span class="text-white font-bold text-xl">Learn to do</span>
				</div>
				<div class="hidden md:flex items-center space-x-8">
					<a href="#features" class="text-#cbd5e1 hover:text-white transition-colors duration-300">Features</a>
					<a href="#about" class="text-#cbd5e1 hover:text-white transition-colors duration-300">About</a>
					<a href="#contact" class="text-#cbd5e1 hover:text-white transition-colors duration-300">Contact</a>
					<button class="bg-gradient-to-r from-#3b82f6 to-#8b5cf6 text-white px-6 py-2 rounded-lg hover:from-#2563eb hover:to-#7c3aed transition-all duration-300 transform hover:scale-105">
						Get Started
					</button>
				</div>
			</div>
		</div>
	</nav>

	<!-- Hero Section -->
	<section class="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
		<div class="max-w-7xl mx-auto text-center">
			<div class="animate-fade-in-up" style="animation-delay: 0.1s;">
				<h1 class="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
					Learn to do
					<span class="bg-gradient-to-r from-#3b82f6 to-#8b5cf6 bg-clip-text text-transparent">
						anything
					</span>
				</h1>
				<p class="text-xl sm:text-2xl text-#cbd5e1 mb-8 max-w-3xl mx-auto leading-relaxed">
					Transform your life by mastering new skills. Track your progress, earn achievements, and join a community of passionate learners.
				</p>
				<div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
					<button class="bg-gradient-to-r from-#3b82f6 to-#8b5cf6 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-#2563eb hover:to-#7c3aed transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
						Start Learning Free
					</button>
					<button class="border-2 border-#475569 text-#cbd5e1 px-8 py-4 rounded-xl text-lg font-semibold hover:border-#3b82f6 hover:text-white transition-all duration-300">
						Watch Demo
					</button>
				</div>
			</div>
		</div>
	</section>

	<!-- Stats Section -->
	<section class="py-16 px-4 sm:px-6 lg:px-8">
		<div class="max-w-7xl mx-auto">
			<div class="grid grid-cols-2 md:grid-cols-4 gap-8">
				{#each stats as stat, index}
					<div class="text-center animate-fade-in-up" style="animation-delay: {index * 0.1}s;">
						<div class="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
						<div class="text-#94a3b8">{stat.label}</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Features Section -->
	<section id="features" class="py-20 px-4 sm:px-6 lg:px-8">
		<div class="max-w-7xl mx-auto">
			<div class="text-center mb-16">
				<h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
					Everything you need to
					<span class="bg-gradient-to-r from-#3b82f6 to-#8b5cf6 bg-clip-text text-transparent">succeed</span>
				</h2>
				<p class="text-xl text-#cbd5e1 max-w-2xl mx-auto">
					Our comprehensive platform provides all the tools and features you need to accelerate your learning journey.
				</p>
			</div>
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{#each features as feature, index}
					<div class="bg-#1e293b/50 backdrop-blur-sm border border-#334155/50 rounded-xl p-8 hover:bg-#1e293b/70 transition-all duration-300 transform hover:scale-105 animate-fade-in-up" style="animation-delay: {index * 0.1}s;">
						<div class="text-4xl mb-4">{feature.icon}</div>
						<h3 class="text-xl font-semibold text-white mb-3">{feature.title}</h3>
						<p class="text-#94a3b8 leading-relaxed">{feature.description}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- CTA Section -->
	<section class="py-20 px-4 sm:px-6 lg:px-8">
		<div class="max-w-4xl mx-auto text-center">
			<div class="bg-gradient-to-r from-#1e293b to-#334155 rounded-2xl p-12 border border-#475569/50">
				<h2 class="text-3xl sm:text-4xl font-bold text-white mb-6">
					Ready to start your learning journey?
				</h2>
				<p class="text-xl text-#cbd5e1 mb-8">
					Join thousands of learners who are already transforming their lives with our platform.
				</p>
				<button class="bg-gradient-to-r from-#3b82f6 to-#8b5cf6 text-white px-10 py-4 rounded-xl text-lg font-semibold hover:from-#2563eb hover:to-#7c3aed transition-all duration-300 transform hover:scale-105 shadow-lg">
					Get Started Today
				</button>
			</div>
		</div>
	</section>

	<!-- Footer -->
	<footer class="bg-#0f172a border-t border-#334155/50 py-12 px-4 sm:px-6 lg:px-8">
		<div class="max-w-7xl mx-auto">
			<div class="flex flex-col md:flex-row justify-between items-center">
				<div class="flex items-center space-x-2 mb-4 md:mb-0">
					<div class="w-8 h-8 bg-gradient-to-r from-#3b82f6 to-#8b5cf6 rounded-lg flex items-center justify-center">
						<span class="text-white font-bold text-lg">L</span>
					</div>
					<span class="text-white font-bold text-xl">Learn to do</span>
				</div>
				<div class="flex space-x-6 text-#94a3b8">
					<a href="#" class="hover:text-white transition-colors duration-300">Privacy</a>
					<a href="#" class="hover:text-white transition-colors duration-300">Terms</a>
					<a href="#" class="hover:text-white transition-colors duration-300">Support</a>
				</div>
			</div>
			<div class="mt-8 pt-8 border-t border-#334155/50 text-center text-#64748b">
				<p>&copy; 2024 Learn to do. All rights reserved.</p>
			</div>
		</div>
	</footer>
</div>

<style>
	@keyframes fade-in-up {
		from {
			opacity: 0;
			transform: translateY(30px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.animate-fade-in-up {
		animation: fade-in-up 0.6s ease-out forwards;
		opacity: 0;
	}

	@media (prefers-reduced-motion: reduce) {
		.animate-fade-in-up {
			animation: none;
			opacity: 1;
		}
	}
</style>
