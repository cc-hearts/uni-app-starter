export function useCurrentInstance() {
  const [pages] = getCurrentPages().slice(-1)
  if (!pages) return null
  return pages
}
