import * as React from 'react'

import { Link } from 'react-router-dom'
import { UIToolTip } from './UIToolTip'

type Props = {
  children?: any;
  navigate: string;
  disabled?: boolean;
  disabledMessage?: string;
  variant?: 'primary' | 'secondary';
};

function UILink({
  children,
  navigate,
  disabled,
  disabledMessage,
  variant,
}: Props) {
  let linkComponent: any
  React.Children.map(children, child => {
    linkComponent = child
  })

  return (
    <UIToolTip
      message={disabled ? disabledMessage : null}
      style={{ display: 'inline', transition: 'all linear 0.2s' }}
    >
      {disabled ? (
        <div className='ui-link disabled'>
          {children}
        </div>
      ) : (
        <Link
          className={`ui-link ${variant ? ` ${variant}` : ' primary'}`}
          to={navigate}
        >
          {children}
        </Link>
      )}
    </UIToolTip>
  )
}

export default UILink
