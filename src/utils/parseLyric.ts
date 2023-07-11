export interface ILyric {
  time: number
  text: string
}

/** 解析歌词成数组*/
// [02:11.842]这世界有那么多人
const timeRegExp = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/
export function parseLyric(lyricString: string) {
  // 1.拿到一行行的歌词
  const lines = lyricString.split('\n')

  // 2.对每句歌词进行解析, 解析成对应的对象
  const lyrics: ILyric[] = []
  for (const line of lines) {
    // 2.1 匹配结果
    const result = timeRegExp.exec(line)
    if (!result) continue // 执行下一次循环

    // 2.2 获取每一组的时间
    const time1 = Number(result[1]) * 60 * 1000
    const time2 = Number(result[2]) * 1000
    const time3 =
      result[3].length === 2 ? Number(result[3]) * 10 : Number(result[3])
    const time = time1 + time2 + time3

    // 2.3 获取每一组的文本
    const text = line.replace(timeRegExp, '')

    // 数组对象
    lyrics.push({ time, text })
  }

  return lyrics
}
