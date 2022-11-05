import { createContext, useRef, useState, useMemo } from 'react'
import { TimerState } from '../types'
import { BreathButton } from './BreathButton'
import { BreathCount } from './BreathCount'
import { Clock } from './Clock'
import { TimerButton } from './TimerButton'

interface Context {
  count: number
  num: number
  stateTimer: TimerState
  handleClick?: () => void
  handleTimer?: () => void
}

const initialState = { count: 0, num: 0, stateTimer: TimerState.Start }

export const ContainerContext = createContext<Context>(initialState)
const { Provider } = ContainerContext

const Container = ({ children }: { children: JSX.Element[] }) => {
  const [containerState, setContainerState] = useState<{
    count: number
    num: number
    stateTimer: TimerState
  }>(initialState)

  const timer = useRef(0)
  const startTimer = () => {
    setContainerState(
      (previous) =>
        previous && {
          ...previous,
          stateTimer: TimerState.Stop,
        }
    )
    timer.current = setInterval(() => {
      setContainerState(
        (previous) =>
          previous && {
            ...previous,
            num: previous.num + 1,
          }
      )
    }, 1000)
  }

  const handleClick = () => {
    setContainerState(
      (previous) =>
        previous && {
          ...previous,
          count: previous.count + 1,
        }
    )
  }

  const handleTimer = () => {
    if (containerState.stateTimer === TimerState.Start) {
      startTimer()
    } else if (containerState.stateTimer === TimerState.Stop) {
      clearInterval(timer.current)
      setContainerState(
        (previous) =>
          previous && {
            ...previous,
            stateTimer: TimerState.Reset,
          }
      )
    } else {
      setContainerState(
        (previous) =>
          previous && {
            ...previous,
            count: 0,
            num: 0,
          }
      )
      setContainerState(
        (previous) =>
          previous && {
            ...previous,
            stateTimer: TimerState.Start,
          }
      )
    }
  }

  const memoizedValue = useMemo(
    () => ({ ...containerState, handleClick, handleTimer }),
    [containerState, handleClick, handleTimer]
  )

  return (
    <Provider value={memoizedValue}>
      <div>{children}</div>
    </Provider>
  )
}

Container.Clock = Clock
Container.BreathButton = BreathButton
Container.BreathCount = BreathCount
Container.TimerButton = TimerButton

export const BreathContainer = () => {
  return (
    <Container>
      <Container.TimerButton />
      <Container.Clock />
      <Container.BreathButton />
      <Container.BreathCount />
    </Container>
  )
}
