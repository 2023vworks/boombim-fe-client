import { MAP_ID, type Marker } from '@/hooks/useMaps'
import { useAppSelector } from '@/store/store'
import { useEffect } from 'react'

interface Props {
  minLevel?: number
  maxLevel?: number
  currentZoomLevel?: number
  draggable?: boolean
  markers?: Marker[]
  containerRef: React.RefObject<HTMLDivElement> | null
  map: kakao.maps.Map | null

  onDrageEnd?: () => void
  onClick?: () => void
}

export const Map = ({
  containerRef,
  map,
  minLevel,
  maxLevel,
  currentZoomLevel,
  draggable,
  markers,
  onDrageEnd,
  onClick,
}: Props): React.ReactNode => {
  const { width, height } = useAppSelector((state) => state.map)

  // Set Drag-End Event
  useEffect(() => {
    if (!onDrageEnd || !map) return

    kakao.maps.event.addListener(map, 'dragend', onDrageEnd)

    return () => {
      kakao.maps.event.removeListener(map, 'dragend', onDrageEnd)
    }
  }, [map])

  // Set Min Zoom-level, Max Zoom-level
  useEffect(() => {
    if (!map) return

    console.log('hit')
    if (minLevel) {
      map?.setMinLevel(minLevel)
    }
    if (maxLevel) {
      map?.setMaxLevel(maxLevel)
    }
    map?.setMinLevel(2)
    map?.setMaxLevel(5)
  }, [minLevel, maxLevel, map])

  // Set Current Zoom Level
  useEffect(() => {
    if (currentZoomLevel) {
      map?.setLevel(currentZoomLevel)
    }
  }, [currentZoomLevel, map])

  // Set Draggable
  useEffect(() => {
    if (draggable) {
      map?.setDraggable(draggable)
    }
  }, [draggable, map])

  useEffect(() => {
    if (map) {
      map.relayout()
    }
  }, [width, height])

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

  useEffect(() => {
    if (!markers || !map) return
    markers.forEach((marker) => {
      setMarker({ position: { lat: marker.position.lat, lng: marker.position.lng }, onClick: marker.onClick })
    })
  }, [markers, map])

  return <div id={MAP_ID} ref={containerRef} onClick={onClick} style={{ width, height }}></div>
}
