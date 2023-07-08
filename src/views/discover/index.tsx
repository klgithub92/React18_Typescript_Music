import React, { memo, Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import type { FC, ReactNode } from 'react'
import NavBar from './c-cpns/nav-bar'

interface IProps {
  children?: ReactNode
}

const Discover: FC<IProps> = () => {
  return (
    <div>
      <NavBar />
      {/* 二级路由占位 Suspense解决懒加载切换闪烁*/}
      <Suspense fallback="">
        <Outlet />
      </Suspense>
    </div>
  )
}

export default memo(Discover)
