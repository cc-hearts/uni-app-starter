import type { App } from 'vue'
import { isFn } from '@cc-heart/utils'
import { useCurrentInstance } from '@/hooks/use-current-instance'
import type { RouterPluginOptions } from './helper'
import type { fn } from '@cc-heart/utils/helper'

let curPagesInstance = null
let isRedirectFlag = false
const beforeGuardExecuteList: fn[] = []

function invokeGuardExecuteList() {
  if (beforeGuardExecuteList.length === 0) return
  const fns = [...beforeGuardExecuteList]
  beforeGuardExecuteList.length = 0
  fns.forEach((fn) => fn())
}

function setCurPagesInstance() {
  const currentInstance = useCurrentInstance()
  if (currentInstance) {
    curPagesInstance = currentInstance
  }
}
const onLaunch = () => {
  uni.addInterceptor('navigateTo', {
    success: () => {
      setCurPagesInstance()
    },
  })

  uni.addInterceptor('redirectTo', {
    success: () => {
      isRedirectFlag = true
      beforeGuardExecuteList.push(setCurPagesInstance)
    },
  })

  uni.addInterceptor('navigateBack', {
    success: () => {
      setCurPagesInstance()
    },
  })
}

const _onShow = async (options) => {
  curPagesInstance = curPagesInstance || getCurrentPages().shift()
  if (isFn(options?.guard)) {
    const currentInstance = useCurrentInstance()
    const [prevInstance = null] = isRedirectFlag ? [curPagesInstance] : getCurrentPages().slice(-2, -1)
    invokeGuardExecuteList()
    if (curPagesInstance) await Promise.resolve(options.guard(prevInstance, currentInstance))

    if (isRedirectFlag) isRedirectFlag = false
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
