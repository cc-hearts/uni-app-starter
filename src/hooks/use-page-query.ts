import { useCurrentInstance } from './use-current-instance'

export function usePageQuery() {
  return useCurrentInstance()?.options || {}
}
