/**
 * * Update Map Center
 * * Update Style Options
 * * Event onDragEnd
 * * Event onClick
 * * Set isPanto
 * * Set Zoom Level
 * * Set Draggable
 * * Set Max Zoom Level
 * * Set Polygon
 * * Set Custom Marker
 */

import { useEffect, useRef, useState } from 'react'

export const MAP_ID = 'map'
interface ResponseType {
  map: kakao.maps.Map | null
  containerRef: any
}

export default function useMaps(): ResponseType {
  const [map, setMap] = useState<kakao.maps.Map | null>(null)
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (containerRef !== null) {
      const container = new kakao.maps.Map(containerRef.current as HTMLElement, {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
      })

      setMap(container)
    }
  }, [containerRef])

  return { map, containerRef }
}
