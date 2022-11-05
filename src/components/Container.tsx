import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useAnimation } from '../hooks/useAnimation'
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
  setRef?: (node: HTMLElement | null) => void
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
  const [{ buttonRef }, setRefState] = useState({ buttonRef: null })

  const setRef = useCallback((node: HTMLElement | null) => {
    if (node && node.dataset && typeof node.dataset.refkey === 'string') {
      const key = node.dataset.refkey as string
      setRefState((previousState) => ({
        ...previousState,
        [key]: node,
      }))
    }
  }, [])

  const animation = useAnimation({ buttonRef })

  const componentJustMounted = useRef(true)
  useEffect(() => {
    if (!componentJustMounted.current && animation) {
      animation.run()
    }
    componentJustMounted.current = false
  }, [containerState.count])

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
    () => ({ ...containerState, handleClick, handleTimer, setRef }),
    [containerState, handleClick, handleTimer, setRef]
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
