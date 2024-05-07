import UIText from './UIText'

type Props = {
    color?: 'red' | 'orange' | 'green' | 'blue' | 'grey'
    text: string
}

function UITag({ color = 'grey', text }: Props) {
  return <div className={'ui-tag ' + color}><UIText bold size={12}>{text}</UIText></div>
}

export default UITag