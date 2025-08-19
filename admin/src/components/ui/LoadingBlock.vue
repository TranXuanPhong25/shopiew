<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue'
import { NProgress, NSpin } from 'naive-ui'

const props = defineProps({
   /**
    * The type of loading animation to display
    * @values 'pulse', 'spin', 'bounce', 'progress', 'dots'
    */
   type: {
      type: String,
      default: 'pulse',
      validator: (value: string) => ['pulse', 'spin', 'bounce', 'progress', 'dots'].includes(value)
   },
   /**
    * Whether the loading component should fill its parent
    */
   fullBlock: {
      type: Boolean,
      default: false
   },
   /**
    * The text to display under the loading animation
    */
   text: {
      type: String,
      default: 'Loading...'
   },
   /**
    * The size of the loading animation
    * @values 'small', 'medium', 'large'
    */
   size: {
      type: String,
      default: 'medium',
      validator: (value: string) => ['small', 'medium', 'large'].includes(value)
   },
   /**
    * The primary color of the loading animation
    */
   color: {
      type: String,
      default: ''
   },
   /**
    * Show the loading text
    */
   showText: {
      type: Boolean,
      default: true
   }
})

// Value for progress animation
const progressValue = ref(0)
const progressInterval = ref<number | null>(null)

// Start progress animation if needed
if (props.type === 'progress') {
   progressInterval.value = window.setInterval(() => {
      progressValue.value = Math.min(progressValue.value + Math.random() * 10, 95)
   }, 500) as unknown as number
}

// Clean up interval on component unmount
onUnmounted(() => {
   if (progressInterval.value !== null) {
      clearInterval(progressInterval.value)
   }
})

// Compute the size of dots based on the size prop
const dotSize = computed(() => {
   switch (props.size) {
      case 'small': return '6px'
      case 'large': return '12px'
      default: return '8px'
   }
})

// Compute the width/height based on the size prop
const dimensionSize = computed(() => {
   switch (props.size) {
      case 'small': return '40px'
      case 'large': return '100px'
      default: return '60px'
   }
})

// Compute the text size based on the size prop
const textSize = computed(() => {
   switch (props.size) {
      case 'small': return '12px'
      case 'large': return '16px'
      default: return '14px'
   }
})

// Compute style for the container
const containerStyle = computed(() => {
   const style: Record<string, string> = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
   }

   if (props.fullBlock) {
      style.width = '100%'
      style.height = '100%'
      style.minHeight = '200px'
   }

   return style
})

// Compute the size for NSpin component
const spinSize = computed(() => {
   switch (props.size) {
      case 'small': return 'small'
      case 'large': return 'large'
      default: return 'medium'
   }
})

// Compute the primary color
const primaryColor = computed(() => props.color || 'var(--primary-color, #18a058)')
</script>

<template>
   <div class="loading-block" :style="containerStyle">
      <!-- Pulse animation -->
      <div v-if="type === 'pulse'" class="pulse-container" :style="{ width: dimensionSize, height: dimensionSize }">
         <div class="pulse-circle" :style="{ backgroundColor: primaryColor }"></div>
      </div>

      <!-- Spin animation using Naive UI -->
      <NSpin v-else-if="type === 'spin'" :size="spinSize" :style="{ color: primaryColor }" />

      <!-- Bounce animation -->
      <div v-else-if="type === 'bounce'" class="bounce-container">
         <div v-for="i in 3" :key="i" class="bounce-dot" :style="{
            backgroundColor: primaryColor,
            width: dotSize,
            height: dotSize,
            animationDelay: `${(i - 1) * 0.16}s`
         }"></div>
      </div>

      <!-- Progress bar animation -->
      <NProgress v-else-if="type === 'progress'" type="line" :percentage="progressValue" :indicator-placement="'inside'"
         :style="{ width: '80%', maxWidth: '300px' }" :color="primaryColor" />

      <!-- Dots animation -->
      <div v-else-if="type === 'dots'" class="dots-container">
         <div v-for="i in 5" :key="i" class="dot" :style="{
            backgroundColor: primaryColor,
            width: dotSize,
            height: dotSize,
            animationDelay: `${(i - 1) * 0.1}s`
         }"></div>
      </div>

      <!-- Loading text -->
      <div v-if="showText" class="loading-text" :style="{ fontSize: textSize, marginTop: '12px' }">
         {{ text }}
      </div>
   </div>
</template>

<style scoped>
.loading-block {
   font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
   color: #333;
}

/* Pulse animation styles */
.pulse-container {
   position: relative;
}

.pulse-circle {
   position: absolute;
   left: 50%;
   top: 50%;
   transform: translate(-50%, -50%);
   width: 40%;
   height: 40%;
   border-radius: 50%;
   animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
   0% {
      transform: translate(-50%, -50%) scale(0.5);
      opacity: 0.2;
   }

   50% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 0.8;
   }

   100% {
      transform: translate(-50%, -50%) scale(0.5);
      opacity: 0.2;
   }
}

/* Bounce animation styles */
.bounce-container {
   display: flex;
   justify-content: center;
   align-items: center;
   gap: 6px;
   height: 20px;
}

.bounce-dot {
   border-radius: 50%;
   animation: bounce 1.4s infinite ease-in-out both;
}

@keyframes bounce {

   0%,
   80%,
   100% {
      transform: scale(0);
   }

   40% {
      transform: scale(1);
   }
}

/* Dots animation styles */
.dots-container {
   display: flex;
   justify-content: center;
   align-items: center;
   gap: 6px;
   height: 20px;
}

.dot {
   border-radius: 50%;
   animation: fade 1.4s infinite ease-in-out both;
}

@keyframes fade {

   0%,
   100% {
      opacity: 0.2;
   }

   50% {
      opacity: 1;
   }
}

.loading-text {
   color: #666;
   font-weight: 500;
}
</style>