<template>
  <n-dropdown :options="options" trigger="click" @select="handleMenuSelect">
    <n-button circle quaternary>
      <n-avatar circle :src="authStore.user?.avatar">
        {{ userInitials }}
      </n-avatar>
    </n-button>
  </n-dropdown>
</template>

<script lang="ts">
import type { Component } from 'vue'
import {
  Pencil as EditIcon,
  LogOutOutline as LogoutIcon,
  PersonCircleOutline as UserIcon
} from '@vicons/ionicons5'
import { NIcon, useMessage } from 'naive-ui'
import { defineComponent, h, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

function renderIcon(icon: Component) {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon)
    })
  }
}

export default defineComponent({
  setup() {
    const authStore = useAuthStore()
    const router = useRouter()
    const message = useMessage()

    const userInitials = computed(() => {
      if (!authStore.user?.name) return 'A'
      return authStore.user.name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    })

    const handleMenuSelect = async (key: string) => {
      switch (key) {
        case 'profile':
          // Handle profile view
          break
        case 'editProfile':
          // Handle edit profile
          break
        case 'logout':
          try {
            await authStore.logout()
            message.success('Đã đăng xuất thành công')
            router.push('/auth/login')
          } catch (error) {
            message.error('Có lỗi xảy ra khi đăng xuất')
          }
          break
      }
    }

    return {
      authStore,
      userInitials,
      handleMenuSelect,
      options: [
        {
          label: 'Thông tin cá nhân',
          key: 'profile',
          icon: renderIcon(UserIcon)
        },
        {
          label: 'Chỉnh sửa hồ sơ',
          key: 'editProfile',
          icon: renderIcon(EditIcon)
        },
        {
          type: 'divider',
          key: 'divider'
        },
        {
          label: 'Đăng xuất',
          key: 'logout',
          icon: renderIcon(LogoutIcon)
        }
      ]
    }
  }
})
</script>
