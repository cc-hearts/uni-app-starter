import type { RequestOptions } from './request-core'
import { request, requestInterception, responseInterception } from './request-core'
import { SUCCESS_CODE } from '@/configs/index'
responseInterception(([target]) => {
  const { data } = target
  if ([SUCCESS_CODE].includes(data.code)) {
    // TODO: handle data
    return data
  }

  // error
  return Promise.reject(data)
})

requestInterception((options) => {
  const header = Reflect.get(options, 'header')
  if (header) {
    // TODO: add authorization
  }

  return options
})
export function Get<Res, T extends Record<string, unknown> = NonNullable<unknown>>(
  url: string,
  data?: T,
  options?: RequestOptions,
) {
  return request(url, 'get', data, options) as Promise<Res>
}

export function Post<Res, T extends Record<string, unknown> = NonNullable<unknown>>(
  url: string,
  data?: T,
  options?: RequestOptions,
) {
  return request(url, 'post', data, options) as Promise<Res>
}

export function Put<Res, T extends Record<string, unknown> = NonNullable<unknown>>(
  url: string,
  data?: T,
  options?: RequestOptions,
) {
  return request(url, 'put', data, options) as Promise<Res>
}

export function Delete<Res, T extends Record<string, unknown> = NonNullable<unknown>>(
  url: string,
  data?: T,
  options?: RequestOptions,
) {
  return request(url, 'delete', data, options) as Promise<Res>
}
