import { createSSRApp } from 'vue'
import App from './App.vue'
import 'uno.css'
import { __IS_DEV__ } from './configs'
import { RouterPlugin } from './modules/routers/index'
import { beforeRouterGuard } from './guard/router.guard'

if (__IS_DEV__) {
  console.log('uni app compile success')
}

export function createApp() {
  const app = createSSRApp(App)
  app.use(RouterPlugin({ guard: beforeRouterGuard }))
  return {
    app,
  }
}
