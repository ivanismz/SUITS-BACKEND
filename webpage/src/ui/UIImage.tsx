import * as React from 'react'

type Props = {
  variant?: 'square' | 'round';
  fillWithCropFocus?:
    | 'leftTop'
    | 'leftBottom'
    | 'rightTop'
    | 'rightBottom'
    | 'center';
  src: string;
  height?: React.CSSProperties['height'];
  width?: React.CSSProperties['width'];
  alt?: string;
  color?: 'dark-blue' | 'orange' | 'red' | 'green' | 'blue' | 'grey' | 'light-blue';
  onClick?: () => void;
};

function UIImage({
  variant,
  fillWithCropFocus,
  src,
  alt,
  height,
  width,
  color,
  onClick,
}: Props) {
  const style: React.CSSProperties = {}
  style.height = height
  style.width = width
  if (fillWithCropFocus) {
    style.objectFit = 'cover'
    switch (fillWithCropFocus) {
      case 'leftTop':
        style.objectPosition = '0% 0%'
        break
      case 'leftBottom':
        style.objectPosition = '0% 100%'
        break
      case 'rightTop':
        style.objectPosition = '100%% 0%'
        break
      case 'rightBottom':
        style.objectPosition = '100% 100%'
        break
      case 'center':
        style.objectPosition = '50% 50%'
        break
    }
  }
  return (
    <img
      className={
        'ui-image ' +
        (variant ?? 'square ') +
        (color ?? '') +
        (onClick ? ' interactive' : '')
      }
      src={src}
      alt={alt}
      style={style}
      onClick={onClick}/>
  )
}

export default UIImage
