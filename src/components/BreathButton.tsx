import { useContext } from 'react'
import { TimerState } from '../types'
import { ContainerContext } from './Container'
import styles from './styles.module.css'

export const BreathButton = (): JSX.Element => {
  const { stateTimer, handleClick, setRef } =
    ContainerContext && useContext(ContainerContext)

  return (
    <div
      ref={setRef}
      data-refkey="buttonRef"
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
