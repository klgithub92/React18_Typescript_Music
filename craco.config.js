/* craco.config.js */
const path = require('path')
const resolve = (dir) => path.resolve(__dirname, dir)
const CracoLessPlugin = require('craco-less')

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin
      // antd5.x不需要配置
      // options: {
      //   lessLoaderOptions: {
      //     lessOptions: {
      //       javascriptEnabled: true
      //     }
      //   }
      // }
    }
  ],
  webpack: {
    alias: {
      '@': resolve('src')
    }
  }
}
