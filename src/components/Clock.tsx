import { useEffect, useState } from 'react'
import styles from './styles.module.css'

export const Clock = ({ num }: { num: number }) => {
  const [time, setTime] = useState('00:00')

  useEffect(() => {
    const minutes = Math.floor(num / 60)

    const min = minutes < 10 ? `0${minutes}` : `${minutes}`
    const sec = num % 60 < 10 ? `0${num % 60}` : `${num % 60}`

    setTime(`${min}:${sec}`)
  }, [num])

  return <div className={styles.clock}>{time}</div>
}