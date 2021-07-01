import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import BaseSpinner from '@/components/ui/BaseSpinner.vue'
import BaseDialog from '@/components/ui/BaseDialog.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

createApp(App)
  .use(store)
  .use(router)
  .component('base-spinner', BaseSpinner)
  .component('base-dialog', BaseDialog)
  .component('base-button', BaseButton)
  .mount('#app')
