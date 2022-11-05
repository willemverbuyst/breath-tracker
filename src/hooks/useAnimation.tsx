import { useLayoutEffect, useState } from 'react'
import styles from '../components/styles.module.css'

interface IProps {
  buttonRef: HTMLElement | null
}

export const useAnimation = ({ buttonRef }: IProps) => {
  const [animation, setAnimation] = useState<{ run: () => void } | null>(null)

  useLayoutEffect(() => {
    if (!buttonRef) {
      return
    }

    const run = () => {
      buttonRef.classList.add(styles.animated)
      setTimeout(() => {
        buttonRef.classList.remove(styles.animated)
      }, 1000)
    }
    setAnimation({ run })
  }, [buttonRef])
  return animation
}
