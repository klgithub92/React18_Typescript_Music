import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { KLRequestConfig } from './type'

/**
 * 两个难点：
 * 1.拦截器进行精细控制
 *   全局拦截器
 *  · 实例拦截器
 *    单次拦截器
 * 2.响应结果的类型处理(泛型)
 */

class KLRequest {
  instance: AxiosInstance
  constructor(config: KLRequestConfig) {
    //创建request实例=>axios的实例
    this.instance = axios.create(config)

    // 添加全局的请求和响应拦截器 token/loading/修改config等
    this.instance.interceptors.request.use(
      (config) => {
        return config
      },
      (err) => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        return res.data
      },
      (err) => {
        return err
      }
    )

    // 针对特定的klRequest实例添加拦截器
    this.instance.interceptors.request.use(
      config.interceptors?.requestSuccessFn,
      config.interceptors?.requestFailureFn
    )
    this.instance.interceptors.response.use(
      config.interceptors?.responseSuccessFn,
      config.interceptors?.responseFailureFn
    )
  }

  request<T = any>(config: KLRequestConfig<T>) {
    // 单词请求的成功拦截处理
    if (config.interceptors?.requestSuccessFn) {
      // 避免调用时修改config
      config = config.interceptors.requestSuccessFn(config)
    }

    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 单词响应的成功拦截
          if (config.interceptors?.responseSuccessFn) {
            res = config.interceptors.responseSuccessFn(res)
          }
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  // 其他请求
  get<T = any>(config: KLRequestConfig<T>) {
    return this.request({ ...config, method: 'GET' })
  }
  post<T = any>(config: KLRequestConfig<T>) {
    return this.request({ ...config, method: 'POST' })
  }
  delete<T = any>(config: KLRequestConfig<T>) {
    return this.request({ ...config, method: 'DELETE' })
  }
  patch<T = any>(config: KLRequestConfig<T>) {
    return this.request({ ...config, method: 'PATCH' })
  }
}

export default KLRequest
