import React, { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import klRequest from '@/service'

interface IProps {
  children?: ReactNode
}

interface IBannerData {
  imageUrl: string
  targetId: number
  targetType: number
  titleColor: string
  typeTitle: string
  url: string
  exclusive: boolean
  scm: string
  bannerBizType: string
}

const Recommend: FC<IProps> = () => {
  const [banners, setBanners] = useState<IBannerData[]>([])
  // 测试网络请求
  useEffect(() => {
    klRequest
      .get({
        url: '/banner'
      })
      .then((res) => {
        setBanners(res.banners)
      })
  }, [])

  return (
    <div>
      {banners.map((item, index) => {
        return <div key={index}>{item.imageUrl}</div>
      })}
    </div>
  )
}

export default memo(Recommend)
