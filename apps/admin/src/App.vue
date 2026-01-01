<template>
  <n-config-provider :theme="theme">
    <!-- <n-global-style /> -->
    <n-message-provider>

      <RouterView />
    </n-message-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { darkTheme } from 'naive-ui'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

// Theme configuration (you can add theme switching logic here)
const theme = computed(() => null) // Use null for light theme, darkTheme for dark theme

// Initialize auth store on app mount
onMounted(() => {
  authStore.initializeAuth()
})
</script>

<style>
/* Global styles */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  line-height: 1.6;
  color: #333;
}

#app {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
</style>
