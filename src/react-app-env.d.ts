/// <reference types="react-scripts" />

declare namespace NodeJS {
  // 合并扩展
  interface ProcessEnv {
    readonly REACT_APP_BASE_URL: string
  }
}
