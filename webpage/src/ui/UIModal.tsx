import {
  privateAddModal,
  privateRemoveModal,
  privateUpdateModal,
} from './state_slices/modalState'
import { useDispatch, useSelector, useStore } from 'react-redux'
import { useEffect, useState } from 'react'

import RTIconSource from '../assets/RTIconSource'
import { RTState } from '../RTReduxStore'
import UICard from './UICard'
import UIImage from './UIImage'

export type ModalPropsWithID = {
  id: number;
} & ModalProps;

export type ModalProps = {
  isShown: boolean;
  children: JSX.Element | JSX.Element[];
  onClose: () => void;
};

// Modal element
export function UIModal({ isShown, children, onClose }: ModalProps) {
  const dispatch = useDispatch()
  const store = useStore<RTState>()
  const [id, setId] = useState<number>(-1)
  useEffect(() => {
    const nextId = store.getState().modalState.nextID
    setId(nextId)
  }, [])
  useEffect(() => {
    dispatch(
      privateAddModal({
        children,
        isShown,
        onClose,
      })
    )
    return () => {
      dispatch(
        privateRemoveModal({ id })
      )
    }
  }, [])
  useEffect(() => {
    dispatch(
      privateUpdateModal({
        children,
        id,
        isShown,
        onClose,
      })
    )
  }, [isShown, children, onClose])
  return <div />
}

// Modal List shown from the root
export function GlobalUIModal() {
  const modalList = useSelector(
    (state: RTState) => state.modalState.modalList
  )
  const modalListJSX = modalList.map(modal => {
    const { id, isShown, children, onClose } = modal
    return (
      <div
        className='modal-wrapper'
        key={id}
        style={isShown ? undefined : { display: 'none' }}>
        <UICard>
          <>
            <div className='modal-close-button'>
              <UIImage
                src={RTIconSource.CloseIcon}
                color='dark-blue'
                onClick={() => {
                  onClose()
                }}/>
            </div>

            {children}
          </>
        </UICard>
      </div>
    )
  })
  return <div className='modal-list'>{modalListJSX}</div>
}
