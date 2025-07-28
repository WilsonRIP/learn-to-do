<script lang="ts">
  import { Progress, useId } from "bits-ui";

  // Props with comprehensive customization options
  interface Props {
    value?: number;
    max?: number;
    variant?: 'default' | 'success' | 'warning' | 'error' | 'gradient';
    size?: 'sm' | 'md' | 'lg' | 'xl';
    showLabel?: boolean;
    showPercentage?: boolean;
    animated?: boolean;
    striped?: boolean;
    label?: string;
    className?: string;
    barColor?: string;
    bgColor?: string;
    height?: string;
    borderRadius?: string;
    animationDuration?: string;
  }

  let {
    value = 0,
    max = 100,
    variant = 'default',
    size = 'md',
    showLabel = true,
    showPercentage = true,
    animated = true,
    striped = false,
    label = 'Progress',
    className = '',
    barColor = '',
    bgColor = '',
    height = '',
    borderRadius = '',
    animationDuration = '1000ms'
  }: Props = $props();

  const labelId = useId();

  // Variant configurations with hex colors
  const variants = {
    default: {
      bar: '#3b82f6',
      bg: '#e5e7eb'
    },
    success: {
      bar: '#10b981',
      bg: '#d1fae5'
    },
    warning: {
      bar: '#f59e0b',
      bg: '#fef3c7'
    },
    error: {
      bar: '#ef4444',
      bg: '#fee2e2'
    },
    gradient: {
      bar: 'linear-gradient(90deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)',
      bg: '#e5e7eb'
    }
  };

  // Size configurations
  const sizes = {
    sm: { height: '8px', text: 'text-xs' },
    md: { height: '12px', text: 'text-sm' },
    lg: { height: '16px', text: 'text-base' },
    xl: { height: '20px', text: 'text-lg' }
  };

  // Calculate percentage using $derived
  const percentage = $derived(Math.min(Math.max((value / max) * 100, 0), 100));
  const progressWidth = $derived(`${percentage}%`);

  // Get current variant and size configs using $derived
  const currentVariant = $derived(variants[variant]);
  const currentSize = $derived(sizes[size]);
  const finalHeight = $derived(height || currentSize.height);
  const finalBorderRadius = $derived(borderRadius || '9999px');
  const finalBarColor = $derived(barColor || currentVariant.bar);
  const finalBgColor = $derived(bgColor || currentVariant.bg);

  // Animation classes using $derived
  const animationClass = $derived(animated ? 'transition-all ease-in-out' : '');
  const stripedClass = $derived(striped ? 'animate-pulse' : '');

  // Custom styles using $derived
  const progressStyle = $derived(`
    transform: translateX(-${100 - percentage}%);
    background: ${finalBarColor};
    transition-duration: ${animationDuration};
  `);

  const containerStyle = $derived(`
    background-color: ${finalBgColor};
    height: ${finalHeight};
    border-radius: ${finalBorderRadius};
  `);
</script>

<div class="flex w-full flex-col gap-2 {className}">
  {#if showLabel}
    <div class="flex items-center justify-between {currentSize.text} font-medium">
      <span id={labelId}>{label}</span>
      {#if showPercentage}
        <span class="font-mono">{Math.round(percentage)}%</span>
      {/if}
    </div>
  {/if}
  
  <Progress.Root
    aria-labelledby={labelId}
    {value}
    {max}
    class="relative w-full overflow-hidden shadow-mini-inset {animationClass}"
    style={containerStyle}
  >
    <div
      class="h-full w-full flex-1 {stripedClass}"
      style={progressStyle}
    >
      {#if striped && variant === 'gradient'}
        <div class="h-full w-full animate-pulse bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
      {/if}
    </div>
  </Progress.Root>
</div>

<style>
  /* Custom animations for striped effect */
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.8;
    }
  }

  .animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  /* Smooth transitions */
  .transition-all {
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }

  .ease-in-out {
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }
</style>