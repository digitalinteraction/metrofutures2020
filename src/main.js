import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueCookies from 'vue-cookies'

// Bootstrap CSS
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.use(VueAxios, axios)
Vue.use(VueCookies)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
