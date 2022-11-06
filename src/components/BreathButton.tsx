import { useContext } from 'react'
import { TimerState } from '../types'
import { ContainerContext } from './Container'
import styles from './styles.module.css'

interface IProps {
  style?: { [key: string]: string }
  className?: string
}

export const BreathButton = ({
  style: userStyles = {},
  className,
}: IProps): JSX.Element => {
  const { stateTimer, handleClick, setRef } =
    ContainerContext && useContext(ContainerContext)
  stateTimer === TimerState.Start ? styles.breathing : ''
  const classNames = [
    styles.container,
    stateTimer === TimerState.Start ? styles.breathing : '',
    className,
  ]
    .join(' ')
    .trim()

  return (
    <div
      style={userStyles}
      ref={setRef}
      data-refkey="buttonRef"
      className={classNames}
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
