interface UseFetchRefreshDataFactoryOptions {
  preRequestHook?: (isRefresh: boolean) => boolean | void
}

export function useFetchRefreshDataFactory(
  callback: (...args: any) => void,
  { preRequestHook }: UseFetchRefreshDataFactoryOptions,
) {
  let total = 0
  const dataSource = ref([])
  const cb = async (isRefresh = false, options = {}) => {
    const bool = preRequestHook(isRefresh)
    if (bool === false) return

    return Promise.resolve(callback(options)).then((res) => {
      if (Array.isArray(res)) {
        const [list, count] = res
        total = count

        if (isRefresh) dataSource.value = list
        else dataSource.value = [...dataSource.value, ...list]
      }
    })
  }

  return [dataSource, total, cb] as const
}
