/**
 * Displays a toast message with the specified text and options.
 *
 * @param {string} message - The text to be displayed in the toast.
 * @param {object} [options] - Additional options for the toast.
 * @param {number} [options.duration=3000] - The duration of the toast in milliseconds. Defaults to 3000 (3 seconds).
 * @param {string} [options.icon='none'] - The icon to be displayed in the toast. Defaults to 'none'.
 *
 * @example
 * useMessages('Success!');
 *
 * @example
 * useMessages('Error occurred', { duration: 5000, icon: 'error' });
 */
export const useMessages = (message: string, options = {}) => {
  setTimeout(() => {
    uni.showToast({
      title: message,
      icon: 'none',
      duration: 3000,
      ...options,
    })
  }, 50)
}
