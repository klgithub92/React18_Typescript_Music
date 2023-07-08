import type { AxiosRequestConfig, AxiosResponse } from 'axios'

// 定义拦截器接口
export interface KLInterface<T = AxiosResponse> {
  requestSuccessFn?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestFailureFn?: (err: any) => any
  responseSuccessFn?: (res: T) => T
  responseFailureFn?: (err: any) => any
}
// 扩展配置
export interface KLRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: KLInterface<T>
}
