/**
 * Creates a factory function that applies a loading effect.
 *
 * @param {Function} callback - The callback function to be executed.
 * @param {Partial<UniNamespace.ShowLoadingOptions>} loadingOptions - Options for the loading effect.
 * @returns {Function} - A function with a loading effect.
 */
export function useLoadingFactory(
  callback: (...args: any) => any,
  loadingOptions: Partial<UniNamespace.ShowLoadingOptions> = {},
) {
  return (...args) => {
    uni.showLoading(loadingOptions)

    Promise.resolve(callback(...args)).finally(() => {
      uni.hideLoading()
    })
  }
}
