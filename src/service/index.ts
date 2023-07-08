import { BASE_URL, TIME_OUT } from './config'
import KLRequest from './request'

// 统一导出
const klRequest = new KLRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  // 配置拦截器
  interceptors: {
    requestSuccessFn(config) {
      return config
    }
  }
})

export default klRequest
