import { RefObject, useLayoutEffect } from 'react'

export const useAnimation = (el: RefObject<HTMLElement> | null) => {
  useLayoutEffect(() => {
    if (!el) return
    const e = el?.current

    console.log('click', e)
  })
  return 'test'
}
