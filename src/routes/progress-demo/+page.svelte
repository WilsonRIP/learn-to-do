<script lang="ts">
  import ProgressBar from '$lib/components/ui/progress/ProgressBar.svelte';
  import { onMount } from 'svelte';

  // Demo progress values
  let progressValues = $state({
    default: 25,
    success: 75,
    warning: 50,
    error: 90,
    gradient: 60,
    custom: 40
  });

  // Custom color examples
  const customColors = [
    { name: 'Purple', bar: '#8b5cf6', bg: '#f3f4f6' },
    { name: 'Pink', bar: '#ec4899', bg: '#fdf2f8' },
    { name: 'Orange', bar: '#f97316', bg: '#fff7ed' },
    { name: 'Teal', bar: '#14b8a6', bg: '#f0fdfa' }
  ];

  // Animate progress values
  onMount(() => {
    const interval = setInterval(() => {
      progressValues = {
        default: (progressValues.default + 1) % 100,
        success: (progressValues.success + 0.5) % 100,
        warning: (progressValues.warning + 1.5) % 100,
        error: (progressValues.error + 0.8) % 100,
        gradient: (progressValues.gradient + 1.2) % 100,
        custom: (progressValues.custom + 0.7) % 100
      };
    }, 100);

    return () => clearInterval(interval);
  });
</script>

<svelte:head>
  <title>Progress Bar Component Demo</title>
  <meta name="description" content="A comprehensive demo of the customizable progress bar component" />
</svelte:head>

<div class="min-h-screen bg-background p-8">
  <div class="mx-auto max-w-4xl space-y-12">
    <!-- Header -->
    <div class="text-center space-y-4">
      <h1 class="text-4xl font-bold text-foreground">Progress Bar Component</h1>
      <p class="text-lg text-foreground-alt max-w-2xl mx-auto">
        A fully customizable progress bar component with multiple variants, animations, and hex color support.
        Built with Svelte 5 and Tailwind CSS.
      </p>
    </div>

    <!-- Basic Variants -->
    <section class="space-y-6">
      <h2 class="text-2xl font-semibold text-foreground">Basic Variants</h2>
      <div class="grid gap-6">
        <div class="space-y-2">
          <h3 class="text-lg font-medium text-foreground">Default</h3>
          <ProgressBar value={progressValues.default} label="Default Progress" />
        </div>
        
        <div class="space-y-2">
          <h3 class="text-lg font-medium text-foreground">Success</h3>
          <ProgressBar variant="success" value={progressValues.success} label="Success Progress" />
        </div>
        
        <div class="space-y-2">
          <h3 class="text-lg font-medium text-foreground">Warning</h3>
          <ProgressBar variant="warning" value={progressValues.warning} label="Warning Progress" />
        </div>
        
        <div class="space-y-2">
          <h3 class="text-lg font-medium text-foreground">Error</h3>
          <ProgressBar variant="error" value={progressValues.error} label="Error Progress" />
        </div>
        
        <div class="space-y-2">
          <h3 class="text-lg font-medium text-foreground">Gradient</h3>
          <ProgressBar variant="gradient" value={progressValues.gradient} label="Gradient Progress" />
        </div>
      </div>
    </section>

    <!-- Size Variants -->
    <section class="space-y-6">
      <h2 class="text-2xl font-semibold text-foreground">Size Variants</h2>
      <div class="grid gap-6">
        <div class="space-y-2">
          <h3 class="text-lg font-medium text-foreground">Small</h3>
          <ProgressBar size="sm" value={45} label="Small Progress Bar" />
        </div>
        
        <div class="space-y-2">
          <h3 class="text-lg font-medium text-foreground">Medium (Default)</h3>
          <ProgressBar size="md" value={45} label="Medium Progress Bar" />
        </div>
        
        <div class="space-y-2">
          <h3 class="text-lg font-medium text-foreground">Large</h3>
          <ProgressBar size="lg" value={45} label="Large Progress Bar" />
        </div>
        
        <div class="space-y-2">
          <h3 class="text-lg font-medium text-foreground">Extra Large</h3>
          <ProgressBar size="xl" value={45} label="Extra Large Progress Bar" />
        </div>
      </div>
    </section>

    <!-- Custom Colors -->
    <section class="space-y-6">
      <h2 class="text-2xl font-semibold text-foreground">Custom Colors (Hex)</h2>
      <div class="grid gap-6">
        {#each customColors as color}
          <div class="space-y-2">
            <h3 class="text-lg font-medium text-foreground">{color.name}</h3>
            <ProgressBar 
              value={progressValues.custom} 
              label="{color.name} Progress"
              barColor={color.bar}
              bgColor={color.bg}
            />
          </div>
        {/each}
      </div>
    </section>

    <!-- Customization Options -->
    <section class="space-y-6">
      <h2 class="text-2xl font-semibold text-foreground">Customization Options</h2>
      <div class="grid gap-6">
        <!-- No Label -->
        <div class="space-y-2">
          <h3 class="text-lg font-medium text-foreground">No Label</h3>
          <ProgressBar value={65} showLabel={false} />
        </div>
        
        <!-- No Percentage -->
        <div class="space-y-2">
          <h3 class="text-lg font-medium text-foreground">No Percentage</h3>
          <ProgressBar value={65} showPercentage={false} label="Progress without percentage" />
        </div>
        
        <!-- Custom Height -->
        <div class="space-y-2">
          <h3 class="text-lg font-medium text-foreground">Custom Height (24px)</h3>
          <ProgressBar value={65} height="24px" label="Custom height progress bar" />
        </div>
        
        <!-- Custom Border Radius -->
        <div class="space-y-2">
          <h3 class="text-lg font-medium text-foreground">Custom Border Radius (4px)</h3>
          <ProgressBar value={65} borderRadius="4px" label="Square corners" />
        </div>
        
        <!-- Striped Animation -->
        <div class="space-y-2">
          <h3 class="text-lg font-medium text-foreground">Striped Animation</h3>
          <ProgressBar 
            variant="gradient" 
            value={65} 
            striped={true}
            label="Striped gradient progress" 
          />
        </div>
        
        <!-- No Animation -->
        <div class="space-y-2">
          <h3 class="text-lg font-medium text-foreground">No Animation</h3>
          <ProgressBar value={65} animated={false} label="Static progress bar" />
        </div>
        
        <!-- Custom Animation Duration -->
        <div class="space-y-2">
          <h3 class="text-lg font-medium text-foreground">Slow Animation (3s)</h3>
          <ProgressBar 
            value={65} 
            animationDuration="3000ms"
            label="Slow animated progress" 
          />
        </div>
      </div>
    </section>

    <!-- Interactive Demo -->
    <section class="space-y-6">
      <h2 class="text-2xl font-semibold text-foreground">Interactive Demo</h2>
      <div class="bg-card border border-border rounded-lg p-6 space-y-4">
        <div class="flex items-center gap-4">
          <label for="progress-slider" class="text-sm font-medium">Progress Value:</label>
          <input 
            id="progress-slider"
            type="range" 
            min="0" 
            max="100" 
            value={progressValues.custom}
            on:input={(e) => progressValues.custom = parseInt(e.currentTarget.value)}
            class="flex-1"
          />
          <span class="text-sm font-mono w-12">{progressValues.custom}%</span>
        </div>
        
        <ProgressBar 
          value={progressValues.custom}
          label="Interactive Progress Bar"
          variant="gradient"
          striped={true}
        />
      </div>
    </section>

    <!-- Features List -->
    <section class="space-y-6">
      <h2 class="text-2xl font-semibold text-foreground">Features</h2>
      <div class="grid md:grid-cols-2 gap-6">
        <div class="bg-card border border-border rounded-lg p-6 space-y-3">
          <h3 class="text-lg font-medium text-foreground">Variants</h3>
          <ul class="text-sm text-foreground-alt space-y-1">
            <li>• Default (Blue)</li>
            <li>• Success (Green)</li>
            <li>• Warning (Yellow)</li>
            <li>• Error (Red)</li>
            <li>• Gradient (Multi-color)</li>
          </ul>
        </div>
        
        <div class="bg-card border border-border rounded-lg p-6 space-y-3">
          <h3 class="text-lg font-medium text-foreground">Sizes</h3>
          <ul class="text-sm text-foreground-alt space-y-1">
            <li>• Small (8px)</li>
            <li>• Medium (12px)</li>
            <li>• Large (16px)</li>
            <li>• Extra Large (20px)</li>
            <li>• Custom height support</li>
          </ul>
        </div>
        
        <div class="bg-card border border-border rounded-lg p-6 space-y-3">
          <h3 class="text-lg font-medium text-foreground">Customization</h3>
          <ul class="text-sm text-foreground-alt space-y-1">
            <li>• Hex color support</li>
            <li>• Custom border radius</li>
            <li>• Animation duration control</li>
            <li>• Striped animation effects</li>
            <li>• Label and percentage toggle</li>
          </ul>
        </div>
        
        <div class="bg-card border border-border rounded-lg p-6 space-y-3">
          <h3 class="text-lg font-medium text-foreground">Accessibility</h3>
          <ul class="text-sm text-foreground-alt space-y-1">
            <li>• ARIA labels support</li>
            <li>• Screen reader friendly</li>
            <li>• Keyboard navigation</li>
            <li>• High contrast support</li>
            <li>• Semantic HTML structure</li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</div> 