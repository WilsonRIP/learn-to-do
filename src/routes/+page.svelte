<script lang="ts">
	import { onMount } from 'svelte';
	import { Button, Card, Navigation } from '$lib/components';

	let isLoaded = false;
	let isVisible = false;

	onMount(() => {
		isLoaded = true;
		
		// Intersection Observer for lazy loading
		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					isVisible = true;
					observer.unobserve(entry.target);
				}
			});
		}, { threshold: 0.1 });

		// Observe sections for lazy loading
		const sections = document.querySelectorAll('section');
		sections.forEach(section => observer.observe(section));

		return () => observer.disconnect();
	});

	const features = [
		{
			icon: '🎯',
			title: 'Goal Setting',
			description:
				'Set clear, achievable goals and track your progress with our intuitive interface.'
		},
		{
			icon: '📊',
			title: 'Progress Tracking',
			description:
				'Visualize your learning journey with detailed analytics and progress reports.'
		},
		{
			icon: '🏆',
			title: 'Achievement System',
			description:
				'Earn badges and rewards as you complete milestones and master new skills.'
		},
		{
			icon: '👥',
			title: 'Community Learning',
			description:
				'Connect with fellow learners, share experiences, and learn together.'
		},
		{
			icon: '⚡',
			title: 'Quick Start',
			description:
				'Get started in minutes with our streamlined onboarding process.'
		},
		{
			icon: '🔒',
			title: 'Secure & Private',
			description:
				'Your data is protected with enterprise-grade security and privacy controls.'
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
	<meta
		name="description"
		content="Transform your life by learning new skills with our comprehensive learning platform. Track progress, earn achievements, and join a community of learners."
	/>
</svelte:head>

<div class="min-h-screen geometric-bg">
	<!-- Navigation -->
	<Navigation
		brand="Learn to do"
		brandIcon="L"
		brandHref="/"
		items={[
			{ label: 'Features', href: '/#features' },
			{ label: 'About', href: '/#about' },
			{ label: 'Contact', href: '/#contact' },
			{ label: 'Typing Test', href: '/typing-test' },
			{ label: 'Progress Demo', href: '/progress-demo' }
		]}
		actions={[
			{ label: 'Get Started', variant: 'primary', size: 'sm' }
		]}
	/>

	<!-- Hero Section -->
	<section class="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
		<div class="max-w-7xl mx-auto text-center">
			<div class="animate-fade-in-up geometric-slide" style="animation-delay: 0.1s">
				<h1 class="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight geometric-heading">
					Learn to do
					<span class="geometric-text-gradient">
						anything
					</span>
				</h1>
				<p class="text-xl sm:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
					Transform your life by mastering new skills. Track your progress, earn achievements, and join a community of passionate learners.
				</p>
				<div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
					<Button size="lg" variant="primary">
						Start Learning Free
					</Button>
					<Button size="lg" variant="outline">
						Watch Demo
					</Button>
				</div>
			</div>
		</div>
	</section>

	<!-- Stats Section -->
	<section class="py-16 px-4 sm:px-6 lg:px-8">
		<div class="max-w-7xl mx-auto">
			<div class="grid grid-cols-2 md:grid-cols-4 gap-8">
				{#each stats as stat, index}
					<div
						class="text-center animate-fade-in-up"
						style="animation-delay: {index * 0.1}s"
					>
						<div class="text-3xl md:text-4xl font-bold text-white mb-2">
							{stat.number}
						</div>
						<div class="text-slate-400">{stat.label}</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Features Section -->
	<section id="features" class="py-20 px-4 sm:px-6 lg:px-8">
		<div class="max-w-7xl mx-auto">
			<div class="text-center mb-16">
				<h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
					Everything you need to
					<span class="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
						succeed
					</span>
				</h2>
				<p class="text-xl text-slate-300 max-w-2xl mx-auto">
					Our comprehensive platform provides all the tools and features you need to accelerate your learning journey.
				</p>
			</div>
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{#each features as feature, index}
					<div
						class="geometric-card p-8 hover:scale-105 transition-all duration-300 geometric-float"
						style="animation-delay: {index * 0.2}s"
					>
						<div class="text-4xl mb-4 geometric-pulse">{feature.icon}</div>
						<h3 class="text-xl font-semibold text-white mb-3">{feature.title}</h3>
						<p class="text-slate-400 leading-relaxed">{feature.description}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- About Section -->
	<section id="about" class="py-20 px-4 sm:px-6 lg:px-8">
		<div class="max-w-7xl mx-auto">
			<div class="text-center mb-16">
				<h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
					About
					<span class="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
						Learn to do
					</span>
				</h2>
				<p class="text-xl text-slate-300 max-w-2xl mx-auto">
					We're passionate about helping people master new skills and achieve their goals through innovative learning experiences.
				</p>
			</div>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-12">
				<div class="geometric-card p-8">
					<h3 class="text-2xl font-semibold text-white mb-4">Our Mission</h3>
					<p class="text-slate-400 leading-relaxed">
						To democratize learning by providing accessible, engaging, and effective tools that help people develop new skills and achieve their personal and professional goals.
					</p>
				</div>
				<div class="geometric-card p-8">
					<h3 class="text-2xl font-semibold text-white mb-4">Our Vision</h3>
					<p class="text-slate-400 leading-relaxed">
						A world where everyone has the tools and support they need to continuously learn, grow, and succeed in their chosen path.
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Contact Section -->
	<section id="contact" class="py-20 px-4 sm:px-6 lg:px-8">
		<div class="max-w-4xl mx-auto">
			<div class="text-center mb-16">
				<h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
					Get in
					<span class="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
						Touch
					</span>
				</h2>
				<p class="text-xl text-slate-300 max-w-2xl mx-auto">
					Have questions or feedback? We'd love to hear from you.
				</p>
			</div>
			<div class="geometric-card p-12">
				<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
					<div>
						<h3 class="text-2xl font-semibold text-white mb-4">Contact Information</h3>
						<div class="space-y-4 text-slate-400">
							<p>📧 hello@learntodo.com</p>
							<p>📱 +1 (555) 123-4567</p>
							<p>📍 123 Learning Street, Education City, EC 12345</p>
						</div>
					</div>
					<div>
						<h3 class="text-2xl font-semibold text-white mb-4">Quick Links</h3>
						<div class="space-y-2">
							<a href="/support" class="block text-slate-400 hover:text-white transition-colors">Support Center</a>
							<a href="/faq" class="block text-slate-400 hover:text-white transition-colors">FAQ</a>
							<a href="/feedback" class="block text-slate-400 hover:text-white transition-colors">Send Feedback</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- CTA Section -->
	<section class="py-20 px-4 sm:px-6 lg:px-8">
		<div class="max-w-4xl mx-auto text-center">
			<div class="geometric-card p-12">
				<h2 class="text-3xl sm:text-4xl font-bold text-white mb-6 geometric-heading">
					Ready to start your learning journey?
				</h2>
				<p class="text-xl text-slate-300 mb-8">
					Join thousands of learners who are already transforming their lives with our platform.
				</p>
				<button class="geometric-btn text-lg px-10 py-4">
					Get Started Today
				</button>
			</div>
		</div>
	</section>

	<!-- Footer -->
	<footer class="bg-slate-900 border-t border-slate-600/50 py-12 px-4 sm:px-6 lg:px-8 geometric-nav">
		<div class="max-w-7xl mx-auto">
			<div class="flex flex-col md:flex-row justify-between items-center">
				<div class="flex items-center space-x-2 mb-4 md:mb-0">
					<div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
						<span class="text-white font-bold text-lg">L</span>
					</div>
					<span class="text-white font-bold text-xl">Learn to do</span>
				</div>
				<div class="flex space-x-6 text-slate-400">
					<a
						href="/privacy"
						class="hover:text-white transition-colors duration-300"
					>
						Privacy
					</a>
					<a
						href="/terms"
						class="hover:text-white transition-colors duration-300"
					>
						Terms
					</a>
					<a
						href="/support"
						class="hover:text-white transition-colors duration-300"
					>
						Support
					</a>
				</div>
			</div>
			<div class="mt-8 pt-8 border-t border-slate-600/50 text-center text-slate-500">
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