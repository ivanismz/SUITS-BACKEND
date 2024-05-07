import { memo } from 'react'

type Props = {
  variant?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'secondary'
    | 'default'
    | 'error-text'
    | 'success-text';
  bold?: boolean;
  italic?: boolean;
  underscore?: boolean;
  children?: any;
  size?: 12 | 16 | 20 | 24 | 28 | 32 | 36 | 40;
  textAlign?: 'left' | 'center' | 'right';
};

function UIText({
  variant = 'default',
  bold,
  italic,
  underscore,
  children,
  size,
  textAlign = 'left',
}: Props) {
  const style = {
    fontSize: size ?? 16,
    textAlign: textAlign,
  }

  const returnJSX = (
    <div
      className={
        'ui-text ' +
        variant +
        (italic ? ' italic' : '') +
        (bold ? ' bold' : '') +
        (underscore ? ' underscore' : '')
      }
      style={style}>
      {children}
    </div>
  )
  return children ? returnJSX : null
}

export default memo(UIText)
