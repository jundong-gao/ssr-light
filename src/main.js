import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router'

Vue.config.productionTip = false

export function createApp() {
  let router = createRouter()
  let app = new Vue({
    router,
    render: h => h(App)
  })

  return {
    app,
    router
  }
}
