import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store'
import './registerServiceWorker'
import axios from 'axios'
import VueLogger from 'vuejs-logger'
import mqlOptions from './plugins/mqlOptions.js'
import VueLocalStorage from 'vue-localstorage'
import { loadLanguageAsync, i18n } from './setup/i18n-setup.js'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


import Toasted from 'vue-toasted'
Vue.config.productionTip = false
const isProduction = process.env.NODE_ENV === 'production'

const options = {
  isEnabled: true,
  logLevel: isProduction ? 'error' : 'debug',
  stringifyArguments: false,
  showLogLevel: true,
  showMethodName: true,
  separator: '|',
  showConsoleColors: true
}
Vue.use(VueLogger, options)
Vue.use(Toasted)
Vue.use(BootstrapVue)
var baseURL = 'http://localhost:8080/'
Vue.use(mqlOptions, {
  baseURL: baseURL,
  cdnConfig: [
    {
      'bucketName': 'client1',
      'clientId': 'client1',
      'isPrivateBucket': true
    },
    {
      'bucketName': 'client2',
      'clientId': 'client2',
      'isPrivateBucket': false
    }]
})
// axios.defaults.baseURL = baseURL
// TODO: set axios header on login  to session storage
// axios.defaults.headers.common['Authorization'] = 'Bearer ' + token

// TODO: delete axios header on logout and clear session storage
// delete axios.defaults.headers.common['Authorization']
sessionStorage.setItem('user-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.qCJ-hcgSTLgkaT7kfI6--xRm4IEpPFQmMj3UZ94gNo4')
Vue.use(VueLocalStorage)

router.beforeEach((to, from, next) => {
  loadLanguageAsync(to.meta.lang).then(() => next())

  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title)
  const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags)

  if (nearestWithTitle) document.title = nearestWithTitle.meta.title

  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el))

  if (!nearestWithMeta) return next()
  nearestWithMeta.meta.metaTags.map(tagDef => {
    const tag = document.createElement('meta')
    Object.keys(tagDef).forEach(key => {
      tag.setAttribute(key, tagDef[key])
    })
    tag.setAttribute('data-vue-router-controlled', '')
    return tag
  })
    .forEach(tag => document.head.appendChild(tag))
  next()
})

var vm = new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')

window.app = vm
