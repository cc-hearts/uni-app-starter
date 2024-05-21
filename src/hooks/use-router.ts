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

  return { push, replace }
}
