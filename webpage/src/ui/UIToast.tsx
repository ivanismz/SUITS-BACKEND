import { privateRemoveToast, privatetoast } from './state_slices/toastState'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import RTIconSource from '../assets/RTIconSource'
import { RTState } from '../RTReduxStore'
import UIImage from './UIImage'

export type ToastPropsWithID = { id: number } & ToastProps;

export type ToastProps = {
  message: string;
  type: 'success' | 'error' | 'info' | boolean;
  disappear?: number | null;
  buttonText?: string | null;
  buttonFunction?: (() => void) | null;
};

export function useToast() {
  const dispatch = useDispatch()
  const [currentToast, setCurrentToast] = useState<ToastProps[]>([])
  useEffect(() => {
    if (currentToast.length === 0) return
    currentToast.forEach((toastProps: ToastProps) => {
      const { message, type, disappear, buttonText, buttonFunction } = toastProps
      dispatch(
        privatetoast({
          buttonFunction,
          buttonText,
          disappear,
          message,
          type,
        })
      )
    })
    setCurrentToast([])
  }, [currentToast.length])
  return (
    message: ToastProps['message'],
    type: ToastProps['type'],
    disappear?: ToastProps['disappear'],
    buttonText?: ToastProps['buttonText'],
    buttonFunction?: ToastProps['buttonFunction']
  ) => {
    setCurrentToast(currToastList => [...currToastList, { buttonFunction, buttonText, disappear, message, type }])
  }
}

function UIToast({
  id,
  message,
  type,
  disappear,
  buttonText,
  buttonFunction,
}: ToastPropsWithID) {
  const [isDeleting, setIsDeleting] = useState(false)
  const dispatch = useDispatch()
  let icon: JSX.Element | null = null
  switch (type) {
    case true:
    case 'success':
      icon = <UIImage src={RTIconSource.CheckCircleIcon} color='green' />
      if (!disappear && !buttonText) disappear = 3000

      break
    case false:
    case 'error':
      icon = <UIImage src={RTIconSource.AlertIcon} color='red' />
      break
    case 'info':
      icon = <UIImage src={RTIconSource.InfoIcon} color='blue' />
      if (!disappear && !buttonText) disappear = 3000

      break
  }
  const onDelete = useCallback(() => {
    dispatch(privateRemoveToast({ id }))
  }, [id])

  const deleteCurrent = useCallback(() => {
    setIsDeleting(true)
    setTimeout(onDelete, 500)
  }, [onDelete])

  useEffect(() => {
    if (disappear) {
      const timeOut = setTimeout(deleteCurrent, disappear)
      return () => {
        clearTimeout(timeOut)
      }
    }
  }, [disappear, deleteCurrent])

  return (
    <div
      className={`ui-toast-wrapper${
        isDeleting ? ' ui-toast-wrapper-collapse' : ''
      }`}>
      <div className='ui-toast'>
        <div className='ui-toast-icon'>{icon}</div>
        <div className='ui-toast-message'>{message}</div>

        {buttonText ? (
          <div
            className='ui-toast-button'
            onClick={() => {
              buttonFunction?.()
              deleteCurrent()
            }}>
            {buttonText}
          </div>
        ) : null}

        <div
          className='ui-toast-close'
          onClick={() => {
            deleteCurrent()
          }}>
          <UIImage src={RTIconSource.CloseIcon} color='grey' />
        </div>
      </div>
    </div>
  )
}

export function UIToastList() {
  const toastList = useSelector(
    (state: RTState) => state.toastState.toastList
  )
  const toastListJSX = toastList.map(toast => (
    <UIToast
      key={toast.id}
      id={toast.id}
      message={toast.message}
      type={toast.type}
      disappear={toast.disappear}
      buttonText={toast.buttonText}
      buttonFunction={toast.buttonFunction}/>
  ))
  return <div className='ui-toast-list'>{toastListJSX}</div>
}
