<template>
  <div class="auth-layout min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <div class="flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full">
        <!-- Logo/Brand -->
        <div class="text-center mb-8">
          <img 
            src="/logo.svg" 
            alt="Shopiew Admin" 
            class="h-12 w-auto mx-auto mb-4"
          />
          <h1 class="text-2xl font-bold text-gray-900">
            Shopiew Admin
          </h1>
          <p class="text-sm text-gray-600 mt-2">
            Hệ thống quản trị thương mại điện tử
          </p>
        </div>

        <!-- Auth Content -->
        <div class="bg-white rounded-lg shadow-lg p-8">
          <RouterView />
        </div>

        <!-- Footer -->
        <div class="text-center mt-8">
          <p class="text-xs text-gray-500">
            © 2026 Shopiew. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// This layout is for authentication pages (login, register, forgot password, etc.)
</script>

<style scoped>
.auth-layout {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.min-h-screen {
  min-height: 100vh;
}
</style>