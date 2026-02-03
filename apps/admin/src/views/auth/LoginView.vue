<template>
   <div class="auth-page">
      <div class="auth-card">
         <div class="auth-header">
            <h2 class="auth-title">Đăng nhập Admin</h2>
            <p class="auth-subtitle">
               Vui lòng đăng nhập để truy cập hệ thống quản trị
            </p>
         </div>

         <n-form ref="formRef" :model="formData" :rules="rules" size="large" @submit.prevent="handleLogin">
            <div class="form-fields">
               <n-form-item path="email" :show-label="false">
                  <n-input v-model:value="formData.email" type="text" placeholder="Email"
                     :disabled="authStore.isLoading">
                     <template #prefix>
                        <n-icon :component="MailOutline" />
                     </template>
                  </n-input>
               </n-form-item>

               <n-form-item path="password" :show-label="false">
                  <n-input v-model:value="formData.password" type="password" placeholder="Mật khẩu"
                     :disabled="authStore.isLoading" show-password-on="click" @keydown.enter="handleLogin">
                     <template #prefix>
                        <n-icon :component="LockClosedOutline" />
                     </template>
                  </n-input>
               </n-form-item>
            </div>

            <div class="form-options">
               <n-checkbox v-model:checked="rememberMe" :disabled="authStore.isLoading">
                  Ghi nhớ đăng nhập
               </n-checkbox>
            </div>

            <div class="form-actions">
               <n-button type="primary" size="large" :loading="authStore.isLoading" :disabled="!isFormValid"
                  class="submit-button" @click="handleLogin">
                  Đăng nhập
               </n-button>
            </div>

            <n-alert v-if="authStore.error" type="error" closable class="error-alert" @close="authStore.clearError">
               {{ authStore.error }}
            </n-alert>
         </n-form>

      </div>
   </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {
   NForm,
   NFormItem,
   NInput,
   NButton,
   NCheckbox,
   NAlert,
   NIcon,
   useMessage,
   type FormInst,
   type FormRules
} from 'naive-ui'
import { MailOutline, LockClosedOutline } from '@vicons/ionicons5'
import { useAuthStore } from '@/stores/auth'
import type { LoginRequest } from '@/models/auth'

const router = useRouter()
const message = useMessage()
const authStore = useAuthStore()

const formRef = ref<FormInst | null>(null)
const formData = ref<LoginRequest>({
   email: '',
   password: ''
})
const rememberMe = ref(false)

const rules: FormRules = {
   email: [
      {
         required: true,
         message: 'Vui lòng nhập email',
         trigger: ['input', 'blur']
      },
      {
         type: 'email',
         message: 'Email không hợp lệ',
         trigger: ['input', 'blur']
      }
   ],
   password: [
      {
         required: true,
         message: 'Vui lòng nhập mật khẩu',
         trigger: ['input', 'blur']
      },
      {
         min: 6,
         message: 'Mật khẩu phải có ít nhất 6 ký tự',
         trigger: ['input', 'blur']
      }
   ]
}

const isFormValid = computed(() => {
   return formData.value.email && formData.value.password && formData.value.password.length >= 6
})

const handleLogin = async () => {
   if (!formRef.value) return

   try {
      await formRef.value.validate()
      await authStore.login(formData.value)

      message.success('Đăng nhập thành công!')

      // Redirect to dashboard or previous page
      const redirectPath = router.currentRoute.value.query.redirect as string || '/'
      console.log('Redirecting to:', redirectPath)
      await router.push(redirectPath)
   } catch (error) {
      console.error('Login failed:', error)
      // Error is already handled by auth store
   }
}

// Check if already authenticated
onMounted(() => {
   if (authStore.isAuthenticated) {
      router.push('/')
   }
})
</script>

<style scoped>
.auth-page {
   display: flex;
   flex-direction: column;
   width: 100%;
}

.auth-card {
   width: 100%;
}

.auth-header {
   text-align: center;
   margin-bottom: 32px;
}

.auth-title {
   font-size: 24px;
   font-weight: 700;
   color: var(--n-text-color);
   margin: 0 0 8px 0;
}

.auth-subtitle {
   font-size: 14px;
   color: var(--n-text-color-2);
   margin: 0;
}

.form-fields {
   display: flex;
   flex-direction: column;
   gap: 16px;
   margin-bottom: 16px;
}

.form-options {
   margin-bottom: 24px;
}

.form-actions {
   margin-bottom: 24px;
}

.submit-button {
   width: 100%;
   height: 44px;
}

.error-alert {
   margin-bottom: 16px;
}

.auth-footer {
   text-align: center;
   padding-top: 16px;
   border-top: 1px solid var(--n-divider-color);
}

.footer-text {
   font-size: 14px;
   color: var(--n-text-color-2);
   margin: 0;
}

.footer-link {
   color: var(--n-primary-color);
   text-decoration: none;
   font-weight: 500;
}

.footer-link:hover {
   text-decoration: underline;
}
</style>