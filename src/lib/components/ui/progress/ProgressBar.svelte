<!-- src/lib/components/ProgressBar.svelte -->
<script lang="ts">
    /** 
     * A flexible, accessible progress bar.
     */
    export let value: number = 0;
    export let max: number = 100;
    export let showLabel: boolean = false;
    export let label: string = '';
    export let color: string = '#3b82f6';            // Fill color (can be gradient)
    export let backgroundColor: string = '#e5e7eb';  // Track color
    export let height: string = '1rem';
    export let borderRadius: string = '0.25rem';
    export let striped: boolean = false;             // Show stripes
    export let animated: boolean = false;            // Animate stripes
    export let labelColor: string = '#ffffff';       // Text color for label
  
    // clamp value and compute %
    $: normalized = Math.min(Math.max(value, 0), max);
    $: percent = Math.round((normalized / max) * 100);
    
    // Check if color is a gradient
    $: isGradient = color.includes('gradient');
  </script>
  
  <div
    class="progress-bar"
    style="
      background-color: {backgroundColor};
      border-radius: {borderRadius};
    "
  >
    <div
      class="progress-bar__fill {striped ? 'striped' : ''} {animated ? 'animated' : ''}"
      role="progressbar"
      aria-valuemin="0"
      aria-valuemax={max}
      aria-valuenow={normalized}
      style="
        width: {percent}%;
        {isGradient ? `background: ${color};` : `background-color: ${color};`}
        height: {height};
        border-radius: {borderRadius};
      "
    />
    {#if showLabel}
      <span
        class="progress-bar__label"
        style="color: {labelColor};"
      >
        {label || `${percent}%`}
      </span>
    {/if}
  </div>
  
  <style>
    .progress-bar {
      position: relative;
      overflow: hidden;
      width: 100%;
    }
  
    .progress-bar__fill {
      transition: width 0.3s ease;
      position: relative;
    }
  
    /* Optional stripe pattern */
    .striped {
      background-image: repeating-linear-gradient(
        45deg,
        rgba(255,255,255,0.15) 0,
        rgba(255,255,255,0.15) 10px,
        transparent 10px,
        transparent 20px
      );
    }
  
    /* Animate the stripes */
    .animated {
      animation: stripeAnimation 1s linear infinite;
    }
  
    @keyframes stripeAnimation {
      from { background-position: 0 0; }
      to   { background-position: 40px 0; }
    }
  
    .progress-bar__label {
      position: absolute;
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      font-weight: 500;
      font-size: 0.75rem;
      white-space: nowrap;
      z-index: 1;
    }
  </style>
  