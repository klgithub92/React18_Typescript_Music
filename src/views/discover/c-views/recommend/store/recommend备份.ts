import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getBanners, getHotRecommend, getNewAlbum } from '../service/recommend'
import type { IBannerData, IHotRecommend, INewAlbum } from './type'

/** 方式一发起异步网络请求*/
// export const fetchBannerDataAction = createAsyncThunk(
//   'recommend/banner',
//   async () => {
//     const res = await getBanners()
//     return res.banners
//   }
// )

/** 方式二发起异步网络请求 推荐*/
export const fetchBannerDataAction = createAsyncThunk(
  'recommend/banner',
  async (arg, { dispatch }) => {
    const res = await getBanners()
    // 第三步
    dispatch(changeBannersAction(res.banners))
  }
)

export const fetchHotRecommendDataAction = createAsyncThunk(
  'recommend/hotRecommend',
  async (arg, { dispatch }) => {
    const res = await getHotRecommend(8)
    dispatch(changeHotRecommendAction(res.result))
  }
)

export const fetchNewAlbumDataAction = createAsyncThunk(
  'recommend/newAlbum',
  async (arg, { dispatch }) => {
    const res = await getNewAlbum()
    dispatch(changeNewAlbumAction(res.albums))
  }
)

interface IRecommendState {
  banners: IBannerData[]
  hotRecommends: IHotRecommend[]
  newAlbums: INewAlbum[]
}

const initialState: IRecommendState = {
  banners: [],
  hotRecommends: [],
  newAlbums: []
}

const recommendSlice = createSlice({
  name: 'recommend',
  initialState,
  reducers: {
    // 第一步
    changeBannersAction(state, { payload }) {
      state.banners = payload
    },
    changeHotRecommendAction(state, { payload }) {
      state.hotRecommends = payload
    },
    changeNewAlbumAction(state, { payload }) {
      state.newAlbums = payload
    }
  }
  // 方式一 这种方式方便在redux工具中追踪各个状态
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(fetchBannerDataAction.pending, () => {
  //       console.log('pending')
  //     })
  //     .addCase(fetchBannerDataAction.fulfilled, (state, { payload }) => {
  //       state.banners = payload
  //     })
  //     .addCase(fetchBannerDataAction.rejected, () => {
  //       console.log('rejected')
  //     })
  // }
})

// 第二步
export const {
  changeBannersAction,
  changeHotRecommendAction,
  changeNewAlbumAction
} = recommendSlice.actions

export default recommendSlice.reducer
