import { type Fn } from '@cc-heart/utils/helper'
import { pipe, isPromise } from '@cc-heart/utils'
import { basePrefix, baseUrl } from '@/configs'
type methodType = 'get' | 'post' | 'delete' | 'put'

export interface RequestOptions {
  header?: Record<string, string>
}

const responseInterceptionCollect: Fn[] = []
const requestInterceptionCollect: Fn[] = []

export const responseInterception = (callback: Fn) => {
  responseInterceptionCollect.push(callback)
}

export const requestInterception = (callback: Fn) => {
  requestInterceptionCollect.push(callback)
}

export const request = async (
  url: string,
  method: methodType,
  data: Record<string, unknown>,
  options: RequestOptions = { header: {} },
) => {
  const originMethod = method.toUpperCase() as Uppercase<methodType>
  const newHeader = { ...options.header }
  url = /^http/.test(url) ? url : baseUrl + basePrefix + url
  let requestOptions = {
    method: originMethod,
    url,
    data,
    header: newHeader,
  }

  const fns = requestInterceptionCollect.slice()
  const tasks = pipe(...fns)
  requestOptions = tasks(requestOptions) || requestOptions

  if (isPromise(requestOptions)) {
    requestOptions = (await requestOptions) as typeof requestOptions
  }

  return new Promise((resolve, reject) => {
    uni.request({
      ...requestOptions,
      success(result) {
        const fns = responseInterceptionCollect.slice()
        const tasks = pipe(...fns)
        const responseOptions = { requestUrl: requestOptions.url, refreshParams: { url, method, data, options } }
        Promise.resolve(tasks([result, responseOptions]))
          .then(resolve)
          .catch(reject)
      },
      fail: reject,
    })
  })
}
