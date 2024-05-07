import { memo, useEffect, useState } from 'react'
import BUG_ICON from '../styles/assets/img/icons/bug_icon.svg'
import UIText from './UIText'
const SURVEY_LINK: URL = new URL(
  'https://docs.google.com/forms/d/1BoPssczay40UGPLuNz2agRDhEEOZ0E1ywVwvu6xxqeE/edit?usp=sharing_eil_m&ts=62b4e613&urp=gmail_link'
)

type Props = {
  targetDate: Date
  preText?: string
  postText?: Props['preText']
}
function UICountDown({ targetDate, preText, postText }: Props) {
  const countDownDate = new Date(targetDate).getTime()

  var elapsed = countDownDate - new Date().getTime()
  if (elapsed > 0) {
    const [countDown, setCountDown] = useState(
      countDownDate - new Date().getTime()
    )

    useEffect(() => {
      const interval = setInterval(() => {
        setCountDown(countDownDate - new Date().getTime())
      }, 1000)

      return () => clearInterval(interval)
    }, [countDownDate])

    return getReturnValues(preText, countDown)
  } else {
    return <UIText size={16}>{postText}</UIText>
  }
}

function getReturnValues(text: Props['preText'], countDown: number) {
  // calculate time left
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24))
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  )
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000)

  return (
    <UIText>
      {text} {days} d {hours} h {minutes} m
    </UIText>
  )
}

export default memo(UICountDown)
