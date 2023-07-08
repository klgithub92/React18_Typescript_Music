import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getBanners } from '../service/recommend'

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

interface IRecommendState {
  banners: IBannerData[]
}

const initialState: IRecommendState = {
  banners: []
}

const recommendSlice = createSlice({
  name: 'recommend',
  initialState,
  reducers: {
    // 第一步
    changeBannersAction(state, { payload }) {
      state.banners = payload
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
export const { changeBannersAction } = recommendSlice.actions

export default recommendSlice.reducer
