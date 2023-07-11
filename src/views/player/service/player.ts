import klRequest from '@/service'

// 获取歌曲详请
export function getSongDetail(ids: number) {
  return klRequest.get({
    url: '/song/detail',
    params: {
      ids
    }
  })
}

// 获取歌词信息
export function getSongLyric(id: number) {
  return klRequest.get({
    url: '/lyric',
    params: {
      id
    }
  })
}
