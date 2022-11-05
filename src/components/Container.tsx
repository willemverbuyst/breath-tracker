import { useEffect, useRef, useState } from 'react'
import styles from './styles.module.css'

enum TimerState {
  Start = 'start',
  Stop = 'stop',
  Reset = 'reset',
}

interface IProps {
  num: number
}

const Clock = ({ num }: IProps) => {
  const [time, setTime] = useState('00:00')

  useEffect(() => {
    const minutes = Math.floor(num / 60)

    const min = minutes < 10 ? `0${minutes}` : `${minutes}`
    const sec = num % 60 < 10 ? `0${num % 60}` : `${num % 60}`

    setTime(`${min}:${sec}`)
  }, [num])

  return <div className={styles.clock}>{time}</div>
}

export default function Container() {
  const [count, setCount] = useState(0)
  const [duration, setDuration] = useState(0)
  const [stateTimer, setStateTimer] = useState(TimerState.Start)
  const timer = useRef(0)

  const handleClick = () => {
    setCount((previous) => previous + 1)
  }

  const startTimer = () => {
    setStateTimer(TimerState.Stop)
    timer.current = setInterval(() => {
      setDuration((previous) => previous + 1)
    }, 1000)
  }

  const handleTimer = () => {
    if (stateTimer === TimerState.Start) {
      startTimer()
    } else if (stateTimer === TimerState.Stop) {
      clearInterval(timer.current)
      setStateTimer(TimerState.Reset)
    } else {
      setCount(0)
      setDuration(0)
      setStateTimer(TimerState.Start)
    }
  }

  return (
    <div>
      <button onClick={handleTimer}>{stateTimer}</button>
      <Clock num={duration} />
      <div
        className={`${styles.container} ${
          stateTimer === TimerState.Start ? styles.breathing : ''
        }`}
      >
        <button
          onClick={handleClick}
          className={styles.button}
          disabled={stateTimer !== TimerState.Stop}
        >
          breath
        </button>
      </div>
      {count}
    </div>
  )
}
