import { useRef, useState } from 'react'
import { TimerState } from '../types'
import { BreathButton } from './BreathButton'
import { BreathCount } from './BreathCount'
import { Clock } from './Clock'
import { TimerButton } from './TimerButton'

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
      <TimerButton stateTimer={stateTimer} handleTimer={handleTimer} />
      <Clock num={duration} />
      <BreathButton stateTimer={stateTimer} handleClick={handleClick} />
      <BreathCount count={count} />
    </div>
  )
}
