import { createSlice } from '@reduxjs/toolkit'
import { posts } from '../assets'
const initialState = {
posts,
}

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
  },
})

export const { increment} = postSlice.actions

export default postSlice.reducer