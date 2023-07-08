// 创建counter仓库模块
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface IState {
  count: number
  message: string
  direction: 'left' | 'right'
  names: string[]
}

const initialState: IState = {
  count: 100,
  message: 'Hello Redux',
  direction: 'left',
  names: []
}

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    changeMessageAction(state, { payload }: PayloadAction<string>) {
      state.message = payload
    }
  }
})

export const { changeMessageAction } = counterSlice.actions

export default counterSlice.reducer
