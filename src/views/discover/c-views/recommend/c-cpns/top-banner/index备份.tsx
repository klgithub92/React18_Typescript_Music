import React, { memo, useRef, useState } from 'react'
import type { FC, ReactNode, ElementRef } from 'react'
import { Carousel } from 'antd'
import classNames from 'classnames'
import { BannerControl, BannerLeft, BannerRight, BannerWrapper } from './style'
import { shallowEqualApp, useAppSelector } from '@/store'

interface IProps {
  children?: ReactNode
}

const TopBanner: FC<IProps> = () => {
  /** 定义组件内部数据*/
  const [currentIndex, setCurrentIndex] = useState(0)
  /** 绑定组件Carousel的ref类型*/
  const bannerRef = useRef<ElementRef<typeof Carousel>>(null)

  /** 获取state中数据*/
  const { banners } = useAppSelector(
    (state) => ({
      banners: state.recommend.banners
    }),
    shallowEqualApp
  )

  /** 事件处理逻辑*/
  function handleBeforeChange() {
    setCurrentIndex(-1)
  }
  function handleAfterChange(current: number) {
    setCurrentIndex(current)
  }
  const handlePrevClick = () => {
    bannerRef.current?.prev()
  }
  const handleNextClick = () => {
    bannerRef.current?.next()
  }

  /** 获得背景图片*/
  let bgImageUrl
  if (currentIndex >= 0 && banners.length > 0) {
    bgImageUrl = banners[currentIndex].imageUrl + '?imageView&blur=40x20'
  }

  return (
    <BannerWrapper
      style={{
        background: `url('${bgImageUrl}') center center / 6000px`
      }}
    >
      <div className="banner wrap-v2">
        <BannerLeft>
          {/* autoplaySpeed自动轮播时间默认3000ms */}
          <Carousel
            autoplay
            autoplaySpeed={5000}
            dots={false}
            ref={bannerRef}
            effect="fade" // 淡入淡出
            afterChange={handleAfterChange} // 切换面板的回调 带数字参数current
            beforeChange={handleBeforeChange}
          >
            {banners.map((item) => {
              return (
                <div className="banner-item" key={item.imageUrl}>
                  <img
                    className="image"
                    src={item.imageUrl}
                    alt={item.typeTitle}
                  />
                </div>
              )
            })}
          </Carousel>
          {/* 下方小点 */}
          <ul className="dots">
            {banners.map((item, index) => {
              return (
                <li key={item.imageUrl}>
                  <span
                    className={classNames('item', {
                      active: index === currentIndex
                    })}
                  ></span>
                </li>
              )
            })}
          </ul>
        </BannerLeft>
        <BannerRight></BannerRight>
        <BannerControl>
          <button className="btn left" onClick={handlePrevClick}></button>
          <button className="btn right" onClick={handleNextClick}></button>
        </BannerControl>
      </div>
    </BannerWrapper>
  )
}

export default memo(TopBanner)
