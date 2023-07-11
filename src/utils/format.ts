/** 格式化相关的工具函数*/
export function formatCount(count: number) {
  if (count > 100000) {
    return Math.floor(count / 10000) + '万'
  } else {
    return count
  }
}

/** 获取相应的小的图片*/
export function getImageSize(
  imageUrl: string,
  width: number,
  height: number = width
) {
  return imageUrl + `?param=${width}y${height}`
}

/** 格式化播放时间*/
export function formatTime(time: number) {
  // 1.获得总时长 转换秒数
  const timeSeconds = time / 1000

  // 2.获取分钟和秒钟
  // 100s => 01:40
  // 200s => 03:20
  // Math.floor(100 / 60) => 1
  const minute = Math.floor(timeSeconds / 60)
  const second = Math.floor(timeSeconds) % 60

  // 3.补零格式化
  const formatMinute = String(minute).padStart(2, '0')
  const formatSecond = String(second).padStart(2, '0')
  return `${formatMinute}:${formatSecond}`
}
