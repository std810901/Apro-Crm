import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { BootstrapVue } from 'bootstrap-vue'
import bootstrap from 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import Button from 'primevue/button'
import ConfirmationService from 'primevue/confirmationservice'
import 'primevue/resources/themes/lara-light-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

import i18n from '@/plugins/i18n'
import GlobalMixin from '@/GlobalMixin.vue'

Vue.config.productionTip = false
Vue.use(ConfirmationService)
Vue.use(BootstrapVue)
Vue.use(PrimeVue)
Vue.use(ToastService)
Vue.component('Button', Button)
Vue.mixin(GlobalMixin)

new Vue({
  bootstrap,
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
