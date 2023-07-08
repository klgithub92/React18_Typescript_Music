import klRequest from '@/service'

export function getBanners() {
  return klRequest.get({
    url: '/banner'
  })
}
