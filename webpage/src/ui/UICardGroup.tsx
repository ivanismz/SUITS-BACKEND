import { ReactElement } from 'react'
import { UICardProps } from './UICard'

type UICardGroupProps = {
    direction?: 'row' | 'column';
    children: ReactElement<UICardProps | UICardGroupProps> |
    ReactElement<UICardProps | UICardGroupProps>[];
    style?: React.CSSProperties;
    className?: string;
}

function UICardGroup({ direction = 'row', children, style, className } : UICardGroupProps): ReactElement<UICardGroupProps> {
  return <div className={'ui-card-group ' + (className ?? '')} style={{ ...style, flexDirection: direction }}>{children}</div>
}

export default UICardGroup