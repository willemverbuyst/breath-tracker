import { useContext } from 'react'
import { ContainerContext } from './Container'

export const TimerButton = (): JSX.Element => {
  const { stateTimer, handleTimer } = useContext(ContainerContext)

  return <button onClick={handleTimer}>{stateTimer}</button>
}
