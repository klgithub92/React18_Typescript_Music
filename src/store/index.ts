// 创建store
import { configureStore } from '@reduxjs/toolkit'
import {
  useSelector,
  TypedUseSelectorHook,
  useDispatch,
  shallowEqual
} from 'react-redux'
import counterReducer from './modules/counter'
import recommendReducer from '@/views/discover/c-views/recommend/store/recommend'
import playerReducer from '@/views/player/store/player'

const store = configureStore({
  reducer: {
    counter: counterReducer,
    recommend: recommendReducer,
    player: playerReducer
  }
})

// 补充：这种也可以获得state类型
// const state = store.getState()
// type StateType = typeof state

// 动态推导state类型
type GetStateFnType = typeof store.getState
export type IRootState = ReturnType<GetStateFnType>
// dispatch类型
type DispatchType = typeof store.dispatch

// hook的二次封装
// 使用函数调用签名TypedUseSelectorHook包装useSelector 实现自动类型推导state类型
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector
// 封装自己的函数
export const useAppDispatch: () => DispatchType = useDispatch
export const shallowEqualApp = shallowEqual

export default store
