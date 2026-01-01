<template>
   <n-message-provider>
      <n-layout has-sider class="main-layout">
         <!-- Sidebar -->
         <n-layout-sider bordered collapse-mode="width" :collapsed-width="64" :width="240" :collapsed="collapsed"
            show-trigger="bar" @collapse="collapsed = true" @expand="collapsed = false">
            <RouterLink to="/" class="logo-link">
               <img src="/logo.svg" alt="logo" class="logo-img" />
            </RouterLink>
            <n-menu :collapsed="collapsed" :collapsed-width="64" :collapsed-icon-size="22" :options="menuOptions"
               :render-label="renderMenuLabel" :expand-icon="expandIcon" />
         </n-layout-sider>

         <!-- Main Layout -->
         <n-space vertical class="main-space" :style="{ marginLeft: collapsed ? '64px' : '240px' }">
            <!-- Top Bar -->
            <n-flex class="top-bar" justify="space-between">
               <div>
                  <NInput placeholder="Search" round size="large" />
               </div>
               <n-flex justify="center" align="center">
                  <NotificationDropdown />
                  <AvatarDropdown />
               </n-flex>
            </n-flex>

            <!-- Main Content -->
            <div class="content">
               <RouterView />
            </div>
         </n-space>
      </n-layout>
   </n-message-provider>
</template>

<script setup lang="ts">
import { ref, h } from 'vue'
import { NIcon, type MenuOption } from 'naive-ui'
import { BookmarkOutline, CaretDownOutline } from '@vicons/ionicons5'
import { NotificationOutlined } from '@vicons/antd'
import AvatarDropdown from '@/components/ui/AvatarDropdown.vue'
import NotificationDropdown from '@/components/ui/NotificationDropdown.vue'
import { RouterLink } from 'vue-router'
import type { Component } from 'vue'

const collapsed = ref(false)

function renderIcon(icon: Component) {
   return () => h(NIcon, null, { default: () => h(icon) })
}
const menuOptions: MenuOption[] = [
   {
      label: 'Categories',
      key: 'categories',
      href: '/categories',
      icon: renderIcon(BookmarkOutline),
   },
   {
      label: 'Promotions',
      key: 'promotions',
      icon: renderIcon(NotificationOutlined),
      children: [
         {
            label: 'Dashboard',
            key: 'dashboard',
            href: '/promotions/dashboard',
         },
         {
            label: 'Event banner',
            key: 'event-banner',
            href: '/promotions/banners',
         },
         {
            label: 'Promo bar',
            key: 'promo-bar',
            href: '/promotions/bars',
         },
      ],
   },
]

const renderMenuLabel = (option: MenuOption) => {
   if ('href' in option && option.href) {
      return h(
         RouterLink,
         { to: option.href, class: 'menu-link' },
         { default: () => option.label as string },
      )
   }
   return option.label as string
}

const expandIcon = () => h(NIcon, null, { default: () => h(CaretDownOutline) })
</script>

<style scoped>
/* Layout chính */
.main-layout {
   height: 100%;
}

/* Sidebar */
.n-layout-sider {
   position: fixed;
   height: 100vh;
   left: 0;
   top: 0;
   z-index: 10;
   transition: all 0.3s;
}

/* Logo */
.logo-link {
   display: flex;
   align-items: center;
   justify-content: center;
   height: 64px;
   /* hoặc theo chiều cao mong muốn */
   text-decoration: none;
}

.logo-img {
   width: 48px;
   margin: 8px auto;
}

/* Main space */
.main-space {
   width: 100%;
   padding: 16px;
   background-color: #f3f4f6;
   /* tương đương bg-gray-100 */
   transition: all 0.3s;
}

/* Top Bar */
.top-bar {
   padding: 8px;
   background-color: #ffffff;
   border-radius: 9999px;
   /* rounded-full */
}

/* Content */
.content {
   padding: 16px;
   background-color: #ffffff;
   min-height: 100vh;
   border-radius: 16px;
   /* tương đương rounded-2xl */
}

/* Menu Link */
.menu-link {
   color: #3b82f6;
   /* text-blue-500 */
   text-decoration: none;
}

/* Có thể thêm các media query, biến CSS,... tùy theo yêu cầu */
</style>
