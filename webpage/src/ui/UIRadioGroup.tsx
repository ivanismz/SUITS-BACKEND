import {
  createContext,
  useCallback,
  useContext,
  useEffect,
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

export type UIRadioGroupConfig = {
  name: string;
  label?: string;
  isRequired?: boolean;
  onChange?: (value: any) => void;
  isMulti?: boolean;
  direction?: 'row' | 'column';
  variant?: 'primary' | 'secondary';
  grow?: React.CSSProperties['flexGrow'];
  errorMessage?: string;
  value?: any;
  gap?: 0 | 4 | 8 | 12 | 16;
  fontSize?: 16 | 18 | 20 | 22 | 24;
};
type Props = UIRadioGroupConfig & {
  children: JSX.Element | JSX.Element[];
};
type IUIRadioGroupContext = {
  radioGroupValue: any;
  setRadioGroupValue: (value: any) => void;
};

export const UIRadioGroupContext = createContext({} as IUIRadioGroupContext)

function UIRadioGroup({
  name,
  label,
  children,
  onChange,
  gap,
  fontSize,
  grow,
  direction,
  errorMessage,
  value,
  variant = 'primary',
  isMulti = false,
  isRequired = false,
}: Props) {
  const [privateValue, setPrivateValue] = useState<any | any[]>(
    isMulti ? [] : null
  )
  const [dirty, setDirty] = useState(false)
  const dispatch = useDispatch()
  const formContext = useContext(UIFormContext)
  const cacheContext = useContext(CacheContext)
  useEffect(() => {
    setPrivateValue(isMulti ? [] : null)
  }, [isMulti])

  useEffect(() => {
    setPrivateValue(value ?? (isMulti ? [] : null))
    formOnChange(name, value)
    if (formContext) {
      const { requiredItems, setRequiredItems } = formContext
      if (isRequired && !requiredItems.includes(name)) {
        requiredItems.push(name)
        setRequiredItems(requiredItems)
      }
    }
  }, [name, value])
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
        dispatch(setItem({ name, value }))
      }
    },
    [cacheContext]
  )
  const privateOnChange = useCallback(
    (value: any) => {
      let currentValue = privateValue
      if (isMulti) {
        currentValue = [...privateValue]
        if (!currentValue.includes(value)) currentValue.push(value)
        else currentValue.splice(currentValue.indexOf(value), 1)
      } else currentValue = currentValue === value ? null : value

      setPrivateValue(currentValue)
      setDirty(true)
      cacheOnChange(name, currentValue)
      formOnChange(name, currentValue)
      onChange?.(currentValue)
    },
    [cacheOnChange, formOnChange, onChange, privateValue, name]
  )

  const privateErrorMessage =
    errorMessage ||
    (isRequired &&
      (privateValue === null ||
        (Array.isArray(privateValue) && privateValue.length === 0)) &&
      (dirty || formContext?.isSubmitAttempted))
      ? 'This field is required.'
      : ''

  return (
    <UIFlexBox
      direction='column'
      style={{ flexGrow: grow, transition: 'all linear 0.5s' }}>
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

      <UIRadioGroupContext.Provider
        value={{
          radioGroupValue: privateValue,
          setRadioGroupValue: privateOnChange,
        }}>
        <div className='ui-radio-group-wrapper'>
          <div
            className={`ui-radio-group ${variant}`}
            style={{ flexDirection: direction, fontSize, gap }}>
            {children}
          </div>

          <div
            className={`ui-radio-group-error ${
              privateErrorMessage ? 'shown' : ''
            }`}>
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
      </UIRadioGroupContext.Provider>
    </UIFlexBox>
  )
}
export default UIRadioGroup
