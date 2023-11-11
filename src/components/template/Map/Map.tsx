import useMaps, { MAP_ID } from '@/hooks/useMaps'
import { useAppSelector } from '@/store/store'
import { useEffect } from 'react'

export const Map = (): React.ReactNode => {
  const { containerRef, map } = useMaps()
  const { width, height } = useAppSelector((state) => state.map)

  useEffect(() => {
    console.log(width, height)
    console.log('hit ')
    if (map !== null) {
      map.relayout()
    }
  }, [width, height])

  return <div id={MAP_ID} ref={containerRef} style={{ width, height }}></div>
}
