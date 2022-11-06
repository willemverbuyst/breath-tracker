import { useContext } from 'react'
import { ContainerContext } from './Container'
import styles from './styles.module.css'

interface IProps {
  style?: { [key: string]: string }
  className?: string
}

export const BreathCount = ({
  style: userStyles = {},
  className,
}: IProps): JSX.Element => {
  const { count } = useContext(ContainerContext)
  const classNames = [styles.count, className].join(' ').trim()

  return (
    <div style={userStyles} className={classNames}>
      {count}
    </div>
  )
}
