import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'

import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

Vue.use(Buefy)

axios.defaults.baseURL = 'http://localhost:3000';

Vue.config.productionTip = false

new Vue({
  router: router,
  render: h => h(App)
}).$mount('#app')
