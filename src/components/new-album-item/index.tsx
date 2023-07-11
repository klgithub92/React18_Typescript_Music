import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { NewAlbumWrapper } from './style'
import { INewAlbum } from '@/views/discover/c-views/recommend/store/type'
import { getImageSize } from '@/utils/format'

interface IProps {
  children?: ReactNode
  itemData: INewAlbum
}

const NewAlbumItem: FC<IProps> = (props) => {
  const { itemData } = props

  return (
    <NewAlbumWrapper>
      <div className="top">
        <img src={getImageSize(itemData.picUrl, 100)} alt="" />
        <a href="" className="cover sprite_cover"></a>
      </div>
      <div className="bottom">
        <div className="name">{itemData.name}</div>
        <div className="artist">{itemData.artist.name}</div>
      </div>
    </NewAlbumWrapper>
  )
}

export default memo(NewAlbumItem)
