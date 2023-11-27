import { MAP_ID, type Marker } from '@/hooks/useMaps'
import { useAppSelector } from '@/store/store'
import { type Position } from '@/types/map'
import { type GetGeoMarksResponseDTO } from '@/types/marker'
import { useEffect, useState } from 'react'
import marker_level_1 from '@/assets/images/marker_level_1.png'
import marker_level_2 from '@/assets/images/marker_level_2.png'
import marker_level_3 from '@/assets/images/marker_level_3.png'
import marker_level_4 from '@/assets/images/marker_level_4.png'
import marker_level_5 from '@/assets/images/marker_level_5.png'

export interface ConvertedMarker extends GetGeoMarksResponseDTO {
  opacity?: number
  clickable?: boolean
}

interface Props {
  minLevel?: number
  maxLevel?: number
  currentZoomLevel?: number
  draggable?: boolean
  convertedMarkers?: ConvertedMarker[]
  containerRef: React.RefObject<HTMLDivElement> | null
  map: kakao.maps.Map | null

  onDrageEnd?: () => void
  onClick?: () => void
  onClickMark: (geoMarkId: number, position: Position) => void
}

export const Map = ({
  containerRef,
  map,
  minLevel,
  maxLevel,
  currentZoomLevel,
  draggable,
  convertedMarkers,
  onDrageEnd,
  onClick,
  onClickMark,
}: Props): React.ReactNode => {
  const { width, height } = useAppSelector((state) => state.map)
  const [markers, setMarkers] = useState<Array<kakao.maps.Marker | null>>([])

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
    if (!containerRef?.current) return
    if (map) {
      if (height === '100%') {
        map.setDraggable(true)
      } else {
        map.setDraggable(false)
      }
    }
  }, [width, height])

  const makeMarker = ({ img, position, opacity = 1, clickable = true, onClick }: Marker): kakao.maps.Marker | null => {
    if (!map) return null
    const marker = new kakao.maps.Marker({
      map,
      image: img,
      opacity,
      position: new kakao.maps.LatLng(position.lat, position.lng),
      clickable,
    })
    kakao.maps.event.addListener(marker, 'click', onClick)
    return marker
  }

  useEffect(() => {
    if (!convertedMarkers || !map) return
    const newMarkers = convertedMarkers.map((marker) => {
      return makeMarker({
        position: { lat: marker.y, lng: marker.x },
        img: selectMarkerImage(marker.activity),
        opacity: marker.opacity ?? 1,
        clickable: marker.clickable ?? true,
        onClick: () => {
          handleClickMarker(map, { lat: marker.y, lng: marker.x }, marker.id)
        },
      })
    })

    setMarkers((prevMarkers) => {
      if (prevMarkers) {
        prevMarkers.forEach((marker) => {
          if (!marker) return
          marker.setMap(null)
        })
      }
      return newMarkers
    })
  }, [convertedMarkers, map])

  useEffect(() => {
    if (!map) return

    markers.forEach((marker) => {
      if (!marker) return
      marker.setMap(map)
    })
  }, [markers, map])

  const handleClickMarker = (map: kakao.maps.Map, position: Position, geoMarkId: number): void => {
    if (!containerRef?.current) return
    const newPosition = new kakao.maps.LatLng(position.lat, position.lng)
    const moveMap = () => {
      map?.relayout()
      map.panTo(newPosition)
    }
    containerRef?.current.addEventListener('transitionend', moveMap, { once: true })

    onClickMark(geoMarkId, position)
  }

  const selectMarkerImage = (activity: number) => {
    const imageSize = new kakao.maps.Size(25, 30)
    switch (activity) {
      case 1:
        return new kakao.maps.MarkerImage(marker_level_1, imageSize)
      case 2:
        return new kakao.maps.MarkerImage(marker_level_2, imageSize)
      case 3:
        return new kakao.maps.MarkerImage(marker_level_3, imageSize)
      case 4:
        return new kakao.maps.MarkerImage(marker_level_4, imageSize)
      case 5:
        return new kakao.maps.MarkerImage(marker_level_5, imageSize)
    }
  }

  return <div id={MAP_ID} ref={containerRef} onClick={onClick} style={{ width, height, transition: 'all 0.3s' }}></div>
}
