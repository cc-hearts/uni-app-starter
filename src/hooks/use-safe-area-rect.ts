export function useSafeAreaRect() {
  const {
    safeAreaInsets: { top, bottom, left, right },
  } = uni.getSystemInfoSync()
  return { top, bottom, left, right }
}
