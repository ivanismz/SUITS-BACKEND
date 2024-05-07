import { ToastProps, ToastPropsWithID } from '../UIToast'

import { createSlice } from '@reduxjs/toolkit'

const initialToastState: {
  toastList: ToastPropsWithID[];
  nextID: number;
} = {
  nextID: 0,
  toastList: [],
}

export const toastSlice = createSlice({
  initialState: initialToastState,
  name: 'toastState',
  reducers: {
    privateRemoveToast: (
      state,
      action: {
        payload: {
          id: number;
        };
      }
    ) => {
      const index = state.toastList.findIndex(
        toast => toast.id === action.payload.id
      )
      if (index >= 0)
        state.toastList.splice(index, 1)

    },
    privatetoast: (
      state,
      action: {
        payload: ToastProps;
      }
    ) => {
      const temp = {
        id: state.nextID,
        ...action.payload,
      }
      state.toastList.push(temp)
      state.nextID = state.nextID + 1
    },
  },
})

export const toastReducer = toastSlice.reducer
export const { privatetoast, privateRemoveToast } = toastSlice.actions
