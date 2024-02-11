import { createSSRApp } from 'vue'
import App from './App.vue'
import 'uno.css'
import { __IS_DEV__ } from './configs'

if (__IS_DEV__) {
  console.log('uni app compile success')
}
export function createApp() {
  const app = createSSRApp(App)
  return {
    app,
  }
}
