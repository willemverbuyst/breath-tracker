import { useContext } from 'react'
import { ContainerContext } from './Container'
import styles from './styles.module.css'

export const BreathCount = () => {
  const { count } = useContext(ContainerContext)

  return <div className={styles.count}>{count}</div>
}
