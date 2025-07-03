import { configureStore } from '@reduxjs/toolkit'
import postReducer from './feacture.post'

export const store = configureStore({
  reducer: {
post:postReducer
  },
})
