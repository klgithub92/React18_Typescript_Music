import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { NarWrapper } from './style'
import { discoverMenu } from '@/assets/data/local_data'

interface IProps {
  children?: ReactNode
}

const NarBar: FC<IProps> = () => {
  return (
    <NarWrapper>
      <div className="nav wrap-v1">
        {discoverMenu.map((item) => {
          return (
            <div className="item" key={item.link}>
              <NavLink to={item.link}> {item.title}</NavLink>
            </div>
          )
        })}
      </div>
    </NarWrapper>
  )
}

export default memo(NarBar)
