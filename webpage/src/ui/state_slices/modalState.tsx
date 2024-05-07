import { ModalProps, ModalPropsWithID } from '../UIModal'

import { createSlice } from '@reduxjs/toolkit'

const initialModalState: {
  modalList: ModalPropsWithID[];
  nextID: number;
} = {
  modalList: [],
  nextID: 0,
}

export const modalSlice = createSlice({
  initialState: initialModalState,
  name: 'modalState',
  reducers: {
    privateAddModal: (
      state,
      action: {
        payload: ModalProps;
      }
    ) => {
      state.modalList.push({ id: state.nextID, ...action.payload })
      state.nextID = state.nextID + 1
    },
    privateRemoveModal: (
      state,
      action: {
        payload: {
          id: number;
        };
      }
    ) => {
      const index = state.modalList.findIndex(
        modal => modal.id === action.payload.id
      )
      if (index >= 0) 
        state.modalList.splice(index, 1)
      
    },
    privateUpdateModal: (
      state,
      action: {
        payload: ModalPropsWithID;
      }
    ) => {
      const index = state.modalList.findIndex(
        modal => modal.id === action.payload.id
      )
      if (index >= 0) 
        state.modalList.splice(index, 1, action.payload)
      
    },
  },
})

export const modalReducer = modalSlice.reducer
export const { privateAddModal, privateUpdateModal, privateRemoveModal } =
  modalSlice.actions
