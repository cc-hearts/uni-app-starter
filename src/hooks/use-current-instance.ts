import type { GetArrayChildItem } from '@cc-heart/utils/helper'

export function useCurrentInstance() {
  const [pages] = getCurrentPages().slice(-1)
  if (!pages) return null
  return pages as GetArrayChildItem<ReturnType<typeof getCurrentPages>> & { options: Record<string, string> }
}
