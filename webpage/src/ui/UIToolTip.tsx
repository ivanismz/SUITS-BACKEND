type Props = {
  children: JSX.Element;
  message?: string|null;
  style?: React.CSSProperties;
};

export function UIToolTip({ message, children, style }: Props) {
  return (
    <div
      className='ui-tool-tip-wrapper'
      style={style}
    >
      {message ? (
        <>
          <span className='ui-tool-tip-pin' />

          <div className='ui-tool-tip'>
            <div className='ui-tool-tip-message'>
              {message}
            </div>
          </div>
        </>
      ) : null}

      {children}
    </div>
  )
}
