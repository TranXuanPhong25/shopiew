import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import {
  // create naive ui
  create,
  // component
  NButton,
  NSwitch,
  NLayout,
  NLayoutSider,
  NSpace,
  NMenu,
  NInput,
  NDropdown,
  NFlex,
  NAvatar,
  NFormItem,
  NSelect,
  NForm,
  NCard,
  NUpload,
  NTree,
  NModal,
  NModalProvider,
  NIcon,
  NMessageProvider,
  NH1, NImage

} from 'naive-ui'
const naive = create({
  components: [
    NButton,
    NLayout,
    NLayoutSider,
    NSwitch,
    NSpace,
    NMenu,
    NInput,
    NDropdown,
    NFlex,
    NAvatar,
    NFormItem,
    NSelect,
    NForm,
    NCard,
    NUpload,
    NTree,
    NModal,
    NModalProvider,
    NIcon,
    NMessageProvider,
    NH1,
    NImage
  ],
})

const app = createApp(App)

app.use(createPinia())
app.use(naive)
app.use(router)

app.mount('#app')
