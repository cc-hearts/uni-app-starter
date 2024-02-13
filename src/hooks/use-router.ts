import type { fn } from '@cc-heart/utils/helper'

interface RouterCallback {
  success: fn
  fail: fn
  complete: fn
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
