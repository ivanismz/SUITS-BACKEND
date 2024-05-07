import './third_party/chosen/chosen.jquery'
import './third_party/chosen/chosen.css'

import React, {
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

import $ from 'jquery'
import { CacheContext } from './utils/GlobalCache'
import RTIconSource from '../assets/RTIconSource'
import UIFlexBox from './UIFlexbox'
import { UIFormContext } from './UIForm'
import UIImage from './UIImage'
import UIText from './UIText'
import { UIToolTip } from './UIToolTip'
import { useDispatch } from 'react-redux'

export type UISelectOptionContent = {
  value: string | number;
  label: string | number;
};

type Props = {
  id: string;
  name: string;
  value?: any;
  label?: string;
  isMulti?: boolean;
  options?: ReactNode;
  placeholder?: string;
  isRequired?: boolean;
  errorMessage?: string;
  onChange?: (name: string, value: any | any[]) => void;
  onBlur?: () => void;
  grow?: React.CSSProperties['flexGrow'];
};

function UIKeyboardSelect({
  id,
  name,
  grow,
  label,
  isMulti,
  options,
  placeholder,
  isRequired,
  errorMessage,
  onChange,
  onBlur,
  value,
}: Props) {
  useEffect(() => {
    $(document).ready(() => {
      $(`#${id}`).chosen({ no_results_text: 'Oops, nothing found!' })
    })
    return () => {
      $(`#${id}`).chosen('destroy')
    }
  }, [])
  const [privateValue, setPrivateValue] = useState(isMulti ? [] : '')
  const [dirty, setDirty] = useState(false)
  const formContext = useContext(UIFormContext)
  const cacheContext = useContext(CacheContext)
  const dispatch = useDispatch()

  useEffect(() => {
    setPrivateValue(isMulti ? [] : '')
  }, [isMulti])

  const formOnChange = useCallback(
    (name: string, value: any) => {
      if (formContext) {
        const { payload, setPayload } = formContext
        if (!isNaN(Number(value)))
          payload[name] = Number(value)
        else
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
        dispatch(setItem({ name, value }))
      }
    },
    [cacheContext]
  )

  useEffect(() => {
    setPrivateValue(value ?? (isMulti ? [] : ''))
    formOnChange(name, value)
    if (formContext) {
      const { requiredItems, setRequiredItems } = formContext
      if (isRequired && !requiredItems.includes(name)) {
        requiredItems.push(name)
        setRequiredItems(requiredItems)
      }
    }
  }, [name, value])

  useEffect(() => {
    $(`#${id}`).trigger('chosen:updated')
  })

  const privateOnChange = useCallback(
    (value: any) => {
      setPrivateValue(value)
      onChange?.(name, value)
      formOnChange(name, value)
      cacheOnChange(name, value)
      setDirty(true)
    },
    [formOnChange, onChange, name]
  )

  useEffect(() => {
    $(`#${id}`)
      .chosen()
      .on('change', e => {
        const value = $(e.target).val()
        privateOnChange(value)
      })
    return () => {
      $(`#${id}`)
        .chosen()
        .off('change')
    }
  }, [privateOnChange])

  const isSubmitAttempted = formContext ? formContext.isSubmitAttempted : false
  const privateErrorMessage =
    errorMessage ||
    (isRequired &&
      (privateValue === '' ||
        (Array.isArray(privateValue) && privateValue.length === 0)) &&
      (dirty || isSubmitAttempted))
      ? 'This field is required.'
      : ''

  return (
    <UIFlexBox
      direction='column'
      style={{ flexGrow: grow }}>
      <UIFlexBox style={{ marginBottom: '4px', width: '100%' }}>
        <UIText
          bold
          size={16}>
          {label}

          {label && isRequired ? (
            <span
              className='ui-input-red-star'
              style={{ marginLeft: '4px' }}>
              *
            </span>
          ) : null}
        </UIText>
      </UIFlexBox>

      <div className='ui-select-wrapper'>
        <select
          id={id}
          className='chosen-select'
          multiple={isMulti}
          data-placeholder={placeholder}
          value={privateValue}
          onChange={() => {}}>
          {options}
        </select>

        <div
          className={`ui-select-error ${privateErrorMessage ? 'shown' : ''}`}>
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
              <UIImage
                src={RTIconSource.AlertIcon}
                color='red'/>
            </UIToolTip>
          </UIFlexBox>
        </div>
      </div>
    </UIFlexBox>
  )
}

export default UIKeyboardSelect
