import { TimerState } from '../types'
import styles from './styles.module.css'

export const BreathButton = ({
  stateTimer,
  handleClick,
}: {
  stateTimer: TimerState
  handleClick: () => void
}) => {
  return (
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
  )
}
