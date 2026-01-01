import { createRouter, createWebHistory } from 'vue-router'
import AuthLayout from '@/layouts/AuthLayout.vue'
import MainLayout from '@/layouts/MainLayout.vue'
import Default from '@/views/DefaultView.vue'
import { AuthService } from '@/services/AuthService'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Auth routes with AuthLayout
    {
      path: '/auth',
      component: AuthLayout,
      meta: { requiresGuest: true },
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import('@/views/auth/LoginView.vue'),
          meta: { requiresGuest: true, title: 'Đăng nhập' },
        },
      ],
    },

    // Main app routes with MainLayout
    {
      path: '/',
      component: MainLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'dashboard',
          component: Default,
          meta: { requiresAuth: true, title: 'Dashboard' },
        },
        {
          path: 'categories',
          name: 'categories',
          component: () => import('@/views/category/CategoryView.vue'),
          meta: { requiresAuth: true, title: 'Quản lý danh mục' },
        },
        {
          path: 'promotions',
          name: 'promotions',
          redirect: '/promotions/dashboard',
          meta: { requiresAuth: true },
        },
        {
          path: 'promotions/dashboard',
          name: 'promotion-dashboard',
          component: () => import('@/views/promotion/PromotionDashboard.vue'),
          meta: { requiresAuth: true, title: 'Dashboard khuyến mãi' },
        },
        {
          path: 'promotions/banners',
          name: 'event-banners',
          component: () => import('@/views/promotion/EventBannerView.vue'),
          meta: { requiresAuth: true, title: 'Quản lý Event Banner' },
        },
        {
          path: 'promotions/bars',
          name: 'promo-bars',
          component: () => import('@/views/promotion/PromoBarView.vue'),
          meta: { requiresAuth: true, title: 'Quản lý Promo Bar' },
        },
        {
          path: 'analytics',
          name: 'analytics',
          component: () => import('@/views/analytics/AnalyticsView.vue'),
          meta: { requiresAuth: true, title: 'Thống kê' },
        },
      ],
    },

    // Redirect root auth to login
    {
      path: '/auth',
      redirect: '/auth/login',
    },
  ],
})

// Navigation guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const isAuthenticated = authStore.isAuthenticated
  const requiresAuth = to.meta.requiresAuth
  const requiresGuest = to.meta.requiresGuest

  if (requiresAuth && !isAuthenticated) {
    // Redirect to login if authentication required but not authenticated
    next({ name: 'login', query: { redirect: to.fullPath } })
  } else if (requiresGuest && isAuthenticated) {
    // Redirect to dashboard if guest page accessed while authenticated
    next({ name: 'dashboard' })
  } else {
    // Set document title
    if (to.meta.title) {
      document.title = `${to.meta.title} - Shopiew Admin`
    } else {
      document.title = 'Shopiew Admin'
    }
    next()
  }
})

export default router
