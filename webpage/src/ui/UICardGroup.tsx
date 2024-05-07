import { ReactElement } from 'react'
import { UICardProps } from './UICard'

type UICardGroupProps = {
    direction?: 'row' | 'column';
    children: ReactElement<UICardProps | UICardGroupProps> |
    ReactElement<UICardProps | UICardGroupProps>[];
    style?: React.CSSProperties
}

function UICardGroup({ direction = 'row', children, style } : UICardGroupProps): ReactElement<UICardGroupProps> {
  return <div className='ui-card-group' style={{ ...style, flexDirection: direction }}>{children}</div>
}

export default UICardGroup