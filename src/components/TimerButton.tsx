import { TimerState } from '../types'

export const TimerButton = ({
  stateTimer,
  handleTimer,
}: {
  stateTimer: TimerState
  handleTimer: () => void
}) => {
  return <button onClick={handleTimer}>{stateTimer}</button>
}
