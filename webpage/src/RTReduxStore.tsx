import { configureStore } from '@reduxjs/toolkit'
import { modalReducer } from './ui/state_slices/modalState'
import { toastReducer } from './ui/state_slices/toastState'

export const RTStateStore = configureStore({
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }),
  reducer: {
    modalState: modalReducer,
    toastState: toastReducer
  },
})

export type RTState = ReturnType<typeof RTStateStore.getState>;