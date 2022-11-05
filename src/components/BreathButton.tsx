import { useContext } from 'react'
import { TimerState } from '../types'
import { ContainerContext } from './Container'
import styles from './styles.module.css'

export const BreathButton = () => {
  const { stateTimer, handleClick } =
    ContainerContext && useContext(ContainerContext)

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
