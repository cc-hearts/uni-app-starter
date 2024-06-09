export const useNavState = () => {
  const rect = uni.getMenuButtonBoundingClientRect()
  return {
    capsuleTop: rect.top,
    capsuleHeight: rect.height,
  }
}
