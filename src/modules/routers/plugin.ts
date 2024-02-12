import type { App } from 'vue'
import { isFn } from '@cc-heart/utils'
import { useCurrentInstance } from '@/hooks/use-current-instance'
import type { RouterPluginOptions } from './helper'

const _router = new WeakSet()
let curPagesInstance = null
let isRedirectFlag = false

const onLaunch = () => {
  uni.addInterceptor('navigateTo', {
    success: () => {
      const currentInstance = useCurrentInstance()
      if (currentInstance) {
        _router.add(currentInstance)
        curPagesInstance = currentInstance
      }
    },
  })

  uni.addInterceptor('redirectTo', {
    success: () => {
      isRedirectFlag = true
    },
  })
}

const _onShow = (options) => {
  curPagesInstance = curPagesInstance || getCurrentPages().shift()
  if (isFn(options?.guard)) {
    const currentInstance = useCurrentInstance()
    const [prevInstance = null] = isRedirectFlag ? [curPagesInstance] : getCurrentPages().slice(-2, -1)
    if (curPagesInstance) options.guard(prevInstance, currentInstance)
  }
}

export default function (options?: RouterPluginOptions) {
  return {
    name: 'router-plugin',
    install(app: App) {
      app.mixin({
        onLaunch,
        onShow: () => _onShow(options),
      })
    },
  }
}
