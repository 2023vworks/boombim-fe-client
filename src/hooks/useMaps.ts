import { type MapSize, setMapSize } from '@/store/slices/map.slice'
import { useAppDispatch } from '@/store/store'
import { useEffect, useRef, useState } from 'react'

export const MAP_ID = 'map'

interface ResponseType {
  map: kakao.maps.Map | null
  containerRef: React.RefObject<HTMLDivElement> | null
  setSize: (props: MapSize) => void
  movePosition: (props: Position) => void
  setMarker: (props: Marker) => void
}

export interface Marker {
  position: Position
  img?: kakao.maps.MarkerImage
  clickable?: boolean
  onClick: () => void
}

export interface Position {
  lat: number
  lng: number
}

/**
 * @ Update Map Center (완)
 * @ Update Style Options (완)
 * @ Set isPanto (완)
 * @ Event onDragEnd (완)
 * @ Event onClick (완)
 * @ Set Max Zoom Level (완)
 * @ Set Min Zoom Level (완)
 * @ Set Zoom Level (완)
 * @ Set Draggable (완)
 * @ Set Custom Marker (완)
 * * Set Polygon (완)
 */

export default function useMaps(): ResponseType {
  const [map, setMap] = useState<kakao.maps.Map | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null) as React.RefObject<HTMLDivElement>
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (containerRef !== null) {
      const container = new kakao.maps.Map(containerRef.current as HTMLElement, {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
      })

      setMap(container)
    }
  }, [containerRef])

  const setSize = ({ width, height }: MapSize): void => {
    dispatch(setMapSize({ width, height }))
  }

  const movePosition = ({ lat, lng }: Position): void => {
    if (map) {
      const position = new kakao.maps.LatLng(lat, lng)
      map.panTo(position)
    }
  }

  const setMarker = ({ img, position, clickable = true, onClick }: Marker): void => {
    if (map) {
      const marker = new kakao.maps.Marker({
        map,
        image: img,
        position: new kakao.maps.LatLng(position.lat, position.lng),
        clickable,
      })
      kakao.maps.event.addListener(marker, 'click', onClick)

      marker.setMap(map)
    }
  }

  return { map, containerRef, setSize, movePosition, setMarker }
}
