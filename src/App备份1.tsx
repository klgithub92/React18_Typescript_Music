import React, { Suspense } from 'react'
import { useRoutes, Link } from 'react-router-dom'
import routes from './router'

// import store from '@/store'
// store.getState // 拿到该函数返回值类型
// type GetStateFnType = typeof store.getState
// 函数返回值类型FuncReturnType就是state类型IRootState
// type FuncReturnType = ReturnType<GetStateType>
// type IRootState = ReturnType<GetStateFnType>

// import { IRootState } from '@/store'
import { shallowEqualApp, useAppDispatch, useAppSelector } from '@/store' // 最终
import { changeMessageAction } from './store/modules/counter'

function App() {
  // const { count, message } = useSelector(
  //   // state直接类型推导成功
  //   (state: IRootState) => ({
  //     count: state.counter.count,
  //     message: state.counter.message
  //   }),
  //   shallowEqual
  // )

  // 最终
  const { count, message } = useAppSelector(
    // state直接类型推导成功
    (state) => ({
      count: state.counter.count,
      message: state.counter.message
    }),
    shallowEqualApp
  )

  // 事件处理
  const dispatch = useAppDispatch()
  function handleChangeMessage() {
    dispatch(changeMessageAction('哈哈哈'))
  }

  return (
    <div className="App">
      <div>count:{count}</div>
      <div>message:{message}</div>
      <button onClick={handleChangeMessage}>修改message</button>
      <hr />
      <div className="nav">
        <Link to="/discover">发现音乐</Link>
        <Link to="/mine">我的音乐</Link>
        <Link to="/focus">关注</Link>
        <Link to="/download">下载客户端</Link>
      </div>
      <Suspense fallback="">
        <div className="main">{useRoutes(routes)}</div>
      </Suspense>
    </div>
  )
}

export default App
