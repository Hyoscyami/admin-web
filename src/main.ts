import { createApp } from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import SvgIcon from '@/components/SvgIcon/index.vue' // svg component

import '@/styles/index.scss' // global css

import App from '@/App.vue'
import store from '@/store'
import router from './router'
import '@/icons' // icon
import './permission' // permission control

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'development') {
  // const { mockXHR } = require('../mock')
  // mockXHR()
}
const app = createApp(App)
app.use(ElementPlus, { locale: zhCn })
app.use(router)
app.use(store)
app.component('SvgIcon', SvgIcon)
app.mount('#app')
