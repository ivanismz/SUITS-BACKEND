import React, {
  Dispatch,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

import { CacheContext } from './utils/GlobalCache'
import RTIconSource from '../assets/RTIconSource'
import UIFlexBox from './UIFlexbox'
import { UIFormContext } from './UIForm'
import UIImage from './UIImage'
import UIText from './UIText'
import { UIToolTip } from './UIToolTip'
import { useDispatch } from 'react-redux'

// Input variant
export enum INPUT_TYPE {
  TEXT = 'text',
  PASSWORD = 'password',
  NUMBER = 'number',
}

type Props = {
  name: string;
  type?: INPUT_TYPE;
  label?: string;
  placeholder?: string;
  icon?: string;
  isRequired?: boolean;
  errorMessage?: string;
  value?: string | number | null;
  isMulti?: boolean;
  grow?: React.CSSProperties['flexGrow'];
  onChange?: (name: string, value: any) => void;
  onBlur?: () => void;
  variant?: 'primary' | 'secondary';
};

function UIKeyboardInput({
  type,
  grow,
  name,
  label,
  isRequired,
  icon,
  value,
  placeholder,
  errorMessage,
  isMulti,
  variant = 'primary',
  onChange,
  onBlur,
}: Props): JSX.Element {
  const [privateValue, setPrivateValue] = useState<string | number | null>(
    null
  )
  const [dirty, setDirty] = useState(false)
  const [lineCount, setLineCount] = useState(1)
  const dispatch = useDispatch()
  const formContext = useContext(UIFormContext)
  const cacheContext = useContext(CacheContext)
  let iconImage: JSX.Element | null = null
  if (icon)
    iconImage = (
      <UIFlexBox
        style={{
          alignSelf: 'flex-start',
          marginRight: '8px',
          width: '26px',
        }}>
        <UIImage
          src={icon}
          color={variant === 'primary' ? 'dark-blue' : 'orange'}/>
      </UIFlexBox>
    )

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
    setPrivateValue(value ?? '')
    formOnChange(name, value)
    if (typeof value === 'number')
      setLineCount(value)

    if (formContext) {
      const { requiredItems, setRequiredItems } = formContext
      if (isRequired && !requiredItems.includes(name)) {
        requiredItems.push(name)
        setRequiredItems(requiredItems)
      }
    }
  }, [name, value])

  const isSubmitAttempted = formContext ? formContext.isSubmitAttempted : false

  const privateErrorMessage =
    errorMessage ||
    (isRequired && privateValue === '' && (dirty || isSubmitAttempted)
      ? 'This field is required.'
      : '')

  const privateOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const currValue =
        type === INPUT_TYPE.NUMBER ? Number(e.target.value) : e.target.value
      setPrivateValue(e.target.value)
      formOnChange(name, currValue)
      onChange?.(name, currValue)
      cacheOnChange(name, currValue)
      setDirty(true)
    },
    [formOnChange, onChange, cacheOnChange, name]
  )

  const text = (
    <input
      className={'ui-input ' + variant}
      type={type}
      onChange={e => {
        privateOnChange(e)
      }}
      placeholder={placeholder}
      onBlur={onBlur}
      value={privateValue ?? ''}/>
  )
  const textArea = (
    <textarea
      className={'ui-input ' + variant}
      rows={Math.min(lineCount, 5)}
      placeholder={placeholder}
      onChange={e => {
        privateOnChange(e)
        setLineCount(e.target.value.split('\n').length ?? 1)
      }}
      onBlur={onBlur}
      value={privateValue ?? ''}/>
  )

  return (
    <UIFlexBox direction='column' style={{ flexGrow: grow }}>
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
        {iconImage}

        <div className='ui-input-wrapper'>
          {isMulti && (!type || type === INPUT_TYPE.TEXT) ? textArea : text}

          <div
            className={'ui-input-error ' + (privateErrorMessage ? 'shown' : '')}>
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
      </UIFlexBox>
    </UIFlexBox>
  )
}

export default UIKeyboardInput
