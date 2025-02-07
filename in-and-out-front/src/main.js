import { createApp } from 'vue'
import {createBootstrap} from 'bootstrap-vue-next'
import { createPinia } from 'pinia'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import axios from 'axios'


import App from './App.vue'
import router from './router'

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

const app = createApp(App)

app.use(createBootstrap())
app.use(createPinia())
app.use(router)

app.mount('#app')
