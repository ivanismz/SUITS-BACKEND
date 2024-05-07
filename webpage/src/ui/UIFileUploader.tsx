import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'

import { CacheContext } from './utils/GlobalCache'
import LogUtil from '../utils/LogUtil'
import RTIconSource from '../assets/RTIconSource'
import UIFlexBox from './UIFlexbox'
import { UIFormContext } from './UIForm'
import UIImage from './UIImage'
import UIText from './UIText'
import { UIToolTip } from './UIToolTip'
import { useDispatch } from 'react-redux'

type Props = {
  isRequired?: boolean;
  errorMessage?: string;
  onChange?: (name: string, value: any) => void;
  name: string;
  label?: string;
  text?: string;
  variant?: 'primary' | 'secondary';
  fileName?: string;
};

function UIFileUploader({
  name,
  label,
  fileName,
  onChange,
  errorMessage,
  isRequired,
  variant = 'primary',
  text = 'Browse File',
}: Props) {
  const [privateFileName, setPrivateFileName] = useState('')
  const [dirty, setDirty] = useState(false)
  const formContext = useContext(UIFormContext)
  const cacheContext = useContext(CacheContext)
  const fileUploaderRef = useRef<HTMLInputElement|null>(null)
  const dispatch = useDispatch()
  const formOnChange = useCallback(
    (name: string, value: any) => {
      if (formContext) {
        const { payload, setPayload } = formContext
        payload[name] = value
        setPayload(payload)
      }
    },
    [formContext]
  )
  const cacheOnChange = useCallback(
    (name: string, value: any) => {
      if (cacheContext) {
        const { setItem } = cacheContext
        dispatch(setItem({ name: name, value: value }))
      }
    },
    [cacheContext]
  )
  useEffect(() => {
    setPrivateFileName(fileName ?? '')
    formOnChange(name, fileName)
  }, [name, fileName])
  const onChooseFile = useCallback(() => {
    if (fileUploaderRef.current == null) {  // todo: need error handling
      const errMsg = 'fileUploaderRef.current is null'
      LogUtil.error(errMsg)
      throw new Error(errMsg)
    }
    fileUploaderRef.current.click()
    setDirty(true)
  }, [fileUploaderRef])
  const privateErrorMessage =
    errorMessage ||
    (isRequired && privateFileName === '' && dirty
      ? 'This field is required.'
      : '')
  return (
    <UIFlexBox direction='column'>
      <UIFlexBox style={{ marginBottom: '4px', width: '100%' }}>
        <UIText bold size={16}>
          {label}

          {label && isRequired ? (
            <span className='ui-input-red-star' style={{ marginLeft: '4px' }}>
              *
            </span>
          ) : null}
        </UIText>
      </UIFlexBox>

      <UIFlexBox style={{ alignItems: 'center' }}>
        <div className='ui-file-uploader-wrapper'>
          <input
            id={name}
            ref={fileUploaderRef}
            className='ui-file-uploader-hidden'
            name={name}
            type='file'
            title={text}
            onChange={e => {
              if (e.target.files == null) {  // todo: need error handling
                const errMsg = 'e.target.files is null'
                LogUtil.error(errMsg)
                throw new Error(errMsg)
              }
              onChange?.(name, e.target.files[0])
              formOnChange(name, e.target.files[0])
              cacheOnChange(name, e.target.files[0])
              setPrivateFileName(e.target.files[0].name)
            }}/>

          <div
            className={'ui-file-uploader-display ' + variant}
            onClick={onChooseFile}>
            {text}
          </div>

          <div
            className={'ui-file-uploader-error ' + (privateErrorMessage ? 'shown' : '')}>
            <UIFlexBox
              style={{
                alignItems: 'center',
                boxSizing: 'border-box',
                height: '100%',
                padding: '4px',
                width: '26px',
              }}>
              <UIToolTip
                message={privateErrorMessage}
                style={{ display: 'flex' }}>
                <UIImage src={RTIconSource.AlertIcon} color='red' />
              </UIToolTip>
            </UIFlexBox>
          </div>
        </div>

        <UIText>{privateFileName}</UIText>
      </UIFlexBox>
    </UIFlexBox>
  )
}

export default UIFileUploader
