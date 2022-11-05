import { useContext } from 'react'
import { ContainerContext } from './Container'

export const TimerButton = () => {
  const { stateTimer, handleTimer } = useContext(ContainerContext)

  return <button onClick={handleTimer}>{stateTimer}</button>
}
