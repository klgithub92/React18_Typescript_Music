// 1.手动切换
export const BASE_URL = 'http://codercba.com:9002'
// export const BASE_URL = 'http://codercba.prod:9002'
export const TIME_OUT = 10000

// 2.webpack内置的pro 判断自动切换
// console.log(process.env.NODE_ENV)
// let BASE_URL = ''
// if (process.env.NODE_ENV === 'development') {
//   // 开发环境
//   BASE_URL = 'http://codercba.com:9002'
// } else {
//   // 生产环境
//   BASE_URL = 'http://codercba.pro.com:9002'
// }

// export { BASE_URL }

// 3.使用配置文件里的内容 必须加 REACT_APP_前缀
// console.log(process.env.REACT_APP_BASE_URL)
