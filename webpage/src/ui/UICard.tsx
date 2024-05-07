import React from 'react'

export type UICardProps = {
  children?: JSX.Element[] | JSX.Element;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
};

function UICard({ children, style, className, onClick}: UICardProps) {
  return (
    <div className={'ui-card ' + (className ?? '')} style={style} onClick={onClick}>
      {children}
    </div>
  )
}

export default UICard
