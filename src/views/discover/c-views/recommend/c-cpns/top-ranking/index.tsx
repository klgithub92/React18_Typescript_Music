import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { TopRankingWrapper } from './style'
import AreaHeaderV1 from '@/components/area-header-v1'
import TopRankingItem from '../top-ranking-item'
import { shallowEqualApp, useAppSelector } from '@/store'

interface IProps {
  children?: ReactNode
}

const TopRanking: FC<IProps> = () => {
  /** 获取redux数据*/
  const { rankings = [] } = useAppSelector(
    (state) => ({
      rankings: state.recommend.rankings
    }),
    shallowEqualApp
  )
  return (
    <TopRankingWrapper>
      <AreaHeaderV1 title="榜单" moreLink="/discover/ranking" />
      <div className="content">
        {rankings.map((item) => {
          return <TopRankingItem itemData={item} key={item.id} />
        })}
      </div>
    </TopRankingWrapper>
  )
}

export default memo(TopRanking)
