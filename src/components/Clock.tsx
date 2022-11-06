import { useContext, useEffect, useState } from 'react'
import { ContainerContext } from './Container'
import styles from './styles.module.css'

interface IProps {
  style?: { [key: string]: string }
  className?: string
}

export const Clock = ({
  style: userStyles = {},
  className,
}: IProps): JSX.Element => {
  const { num } = useContext(ContainerContext)
  const [time, setTime] = useState('00:00')
  const classNames = [styles.clock, className].join(' ').trim()

  useEffect(() => {
    const minutes = Math.floor(num / 60)

    const min = minutes < 10 ? `0${minutes}` : `${minutes}`
    const sec = num % 60 < 10 ? `0${num % 60}` : `${num % 60}`

    setTime(`${min}:${sec}`)
  }, [num])

  return (
    <div style={userStyles} className={classNames}>
      {time}
    </div>
  )
}
