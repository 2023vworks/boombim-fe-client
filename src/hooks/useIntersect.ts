import { useEffect, useCallback, useRef } from 'react'

type IntersectHandler = (entry: IntersectionObserverEntry, observer: IntersectionObserver) => void

interface Props {
  onIntersect: IntersectHandler
  options?: IntersectionObserverInit
}

export default function useIntersect({ onIntersect, options }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const callback = useCallback(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) onIntersect(entry, observer)
      })
    },
    [onIntersect],
  )

  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(callback, options)
    observer.observe(ref.current)
    return () => {
      observer.disconnect()
    }
  }, [ref, options, callback])

  return ref
}
