interface UsePreviewOptions {
  current?: number
}
export function usePreview(images: string[] | string, options: UsePreviewOptions = {}) {
  if (typeof images === 'string') {
    images = [images]
  }

  const { current = 0 } = options

  uni.previewImage({
    urls: images,
    current: current,
  })
}
