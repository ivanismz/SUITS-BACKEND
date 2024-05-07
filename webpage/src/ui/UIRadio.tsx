import { useCallback, useContext } from 'react'
import { UIRadioGroupContext } from './UIRadioGroup'

export type UIRadioProps = {
  name: any;
  label: string;
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
};

export function UIRadio({ name, label, onClick }: UIRadioProps) {
  const { radioGroupValue, setRadioGroupValue } =
     useContext(UIRadioGroupContext)
  const isMulti = Array.isArray(radioGroupValue)
  const checked =
    name === radioGroupValue || (isMulti && radioGroupValue.includes(name))
  const privateOnClick = useCallback(
    (e: React.MouseEvent<HTMLInputElement>) => {
      setRadioGroupValue(name)
      onClick?.(e)
    },
    [setRadioGroupValue, onClick, name]
  )
  return (
    <div
      className={`ui-radio ${checked ? 'checked' : ''}`}
      onClick={privateOnClick}
    >
      {label}
    </div>
  )
}
