import klRequest from '@/service'

/** 头部导航和轮播图*/
export function getBanners() {
  return klRequest.get({
    url: '/banner'
  })
}

/** 热门推荐*/
export function getHotRecommend(limit = 30) {
  return klRequest.get({
    url: '/personalized',
    params: {
      limit
    }
  })
}

/** 新碟上架 默认12条*/
export function getNewAlbum() {
  return klRequest.get({
    url: '/album/newest'
  })
}

/** 获取榜单详情数据*/
export function getPlaylistDetail(id: number) {
  return klRequest.get({
    url: '/playlist/detail',
    params: {
      id
    }
  })
}

/** 歌手信息*/
export function getArtistList(limit = 30) {
  return klRequest.get({
    url: '/artist/list',
    params: {
      limit
    }
  })
}
