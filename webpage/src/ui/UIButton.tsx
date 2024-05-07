import React from 'react'
import { UIToolTip } from './UIToolTip'

type Props = {
  autoFocus?: boolean;
  disabled?: boolean;
  disabledMessage?: string;
  isLoading?: boolean;
  form?: string;
  name?: string;
  text: string;
  type?: 'submit' | 'reset';
  variant?: 'primary' | 'secondary';
  grow?: React.CSSProperties['flexGrow'];
  dot?: boolean;
  margin?: 0 | 4 | 8 | 12 | 16;
  fontSize?: 16 | 18 | 20 | 22 | 24;
  onClick?: () => void;
};

function UIButton({
  autoFocus,
  disabled,
  disabledMessage,
  isLoading,
  name,
  text,
  form,
  type,
  variant,
  grow,
  dot,
  margin,
  fontSize,
  onClick,
}: Props) {
  return (
    <UIToolTip
      message={disabled ? disabledMessage : null}
      style={{
        display: 'flex',
        flexGrow: grow,
        transition: 'all linear 0.2s',
      }}>
      <button
        type='button'
        className={'ui-button ' + (variant ?? 'primary') + (dot ? ' red-dot' : '')}
        autoFocus={autoFocus}
        disabled={disabled}
        name={name}
        form={form}
        onClick={() => {
          if (!disabled)
            onClick?.()

        }}
        style={{ fontSize, margin }}>
        {text}
      </button>
    </UIToolTip>
  )
}

export default UIButton
