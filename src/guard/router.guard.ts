import { __IS_DEV__ } from '@/configs'
import type { RouterPluginOptions } from '@/modules/routers'

export const beforeRouterGuard: RouterPluginOptions['guard'] = (from, to) => {
  // TODO
  if (__IS_DEV__) {
    console.log(from, to)
  }
}
