import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { HeaderLeft, HeaderRight, HeaderWrapper } from './style'
import headerTitles from '@/assets/data/header_titles.json'

interface IProps {
  children?: ReactNode
}

/** 组件的展示逻辑 */
function showItem(item: any) {
  if (item.type === 'path') {
    // NavLink有高亮 活跃状态会加active类
    return (
      <NavLink
        to={item.link}
        // 自己写 可以重命名
        className={({ isActive }) => {
          return isActive ? 'active' : undefined
        }}
      >
        {item.title}
        <i className="icon sprite_01"></i>
      </NavLink>
    )
  } else {
    return (
      <a href={item.link} target="_blank" rel="noreferrer">
        {item.title}
      </a>
    )
  }
}

const AppHeader: FC<IProps> = () => {
  return (
    <HeaderWrapper>
      <div className="content wrap-v1">
        <HeaderLeft>
          <a className="logo sprite_01" href="/">
            网易云音乐
          </a>
          <div className="title-list">
            {headerTitles.map((item) => {
              return (
                <div className="item" key={item.title}>
                  {showItem(item)}
                </div>
              )
            })}
          </div>
        </HeaderLeft>
        <HeaderRight>
          <Input
            className="search"
            placeholder="音乐/视频/电台/用户"
            prefix={<SearchOutlined />}
          />
          <span className="center">创作者中心</span>
          <span className="login">登录</span>
        </HeaderRight>
      </div>
      <div className="divider"></div>
    </HeaderWrapper>
  )
}

export default memo(AppHeader)
