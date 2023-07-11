import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getSongDetail, getSongLyric } from '../service/player'
import { ILyric, parseLyric } from '@/utils/parseLyric'

export const fetchCurrentSongAction = createAsyncThunk(
  'currentSong',
  (id: number, { dispatch }) => {
    // 1.获取歌曲信息
    getSongDetail(id).then((res) => {
      // 1.1 获取song
      if (!res.songs.length) return
      const song = res.songs[0]

      // 1.2 将song放到currentSong中
      dispatch(changeCurrentSongAction(song))
    })

    // 2.获取歌词信息
    getSongLyric(id).then((res) => {
      // 2.1 获取歌词的字符串
      const lyricString = res.lrc.lyric
      // 2.2 对歌词进行解析(一个个对象)
      const lyrics = parseLyric(lyricString)
      // 2.3 将lyrics放到currentSong中
      dispatch(changeLyricsAction(lyrics))
      // console.log(lyrics)
    })
  }
)

interface IPlayerState {
  currentSong: any
  lyrics: ILyric[]
  lyricIndex: number
}
const initialState: IPlayerState = {
  currentSong: {},
  lyrics: [],
  lyricIndex: -1
}

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    changeCurrentSongAction(state, { payload }) {
      state.currentSong = payload
    },
    changeLyricsAction(state, { payload }) {
      state.lyrics = payload
    },
    changeLyricIndexAction(state, { payload }) {
      state.lyricIndex = payload
    }
  }
})

export const {
  changeCurrentSongAction,
  changeLyricsAction,
  changeLyricIndexAction
} = playerSlice.actions

export default playerSlice.reducer
