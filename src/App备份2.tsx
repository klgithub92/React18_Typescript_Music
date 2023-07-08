import React, { Suspense } from 'react'
import { useRoutes, Link } from 'react-router-dom'
import routes from './router'
import { shallowEqualApp, useAppDispatch, useAppSelector } from '@/store' // 最终
import { changeMessageAction } from './store/modules/counter'
import Demo from './views/demo'

import { Button } from 'antd'

function App() {
  const { count, message, direction } = useAppSelector(
    (state) => ({
      count: state.counter.count,
      message: state.counter.message,
      direction: state.counter.direction,
      names: state.counter.names
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
      {/* 测试antd */}
      <Button type="primary">Primary Button</Button>

      <div>count:{count}</div>
      <div>message:{message}</div>
      <div>direction:{direction}</div>
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
      <Demo username="李四" level={99} />
    </div>
  )
}

export default App
