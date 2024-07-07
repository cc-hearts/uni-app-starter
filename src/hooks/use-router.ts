import type { Fn } from '@cc-heart/utils/helper'

interface RouterCallback {
  success: Fn
  fail: Fn
  complete: Fn
}

export function useRouter() {
  const push = (url: string, options: Partial<RouterCallback> = {}) => {
    uni.navigateTo({
      url,
      ...options,
    })
  }

  const replace = (url: string, options: Partial<RouterCallback> = {}) => {
    uni.redirectTo({
      url,
      ...options,
    })
  }

  const goBack = (options: Partial<RouterCallback> = {}) => {
    uni.navigateBack({
      delta: 1,
      ...options,
    })
  }

  const reLaunch = (url: string, options: Partial<RouterCallback> = {}) => {
    uni.reLaunch({
      url,
      ...options,
    })
  }

  const switchTab = (url: string) =>
    uni.switchTab({
      url,
    })

  return { push, replace, goBack, switchTab, reLaunch }
}
