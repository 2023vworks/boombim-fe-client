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
  setCircle: ({ lat, lng, radius }: { lat: number; lng: number; radius: number }) => void
  pickMarker: (position: any) => void
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

  function calculateCircleOutline(centerX: number, centerY: number, radius: number) {
    const numPoints = 100 // 외곽선 좌표를 근사화하기 위해 사용할 점의 수
    const circleOutline = []

    for (let i = 0; i < numPoints; i++) {
      const angle = (i / numPoints) * 2 * Math.PI
      const lat = centerX + radius * 0.0001 * Math.cos(angle)
      const lng = centerY + radius * 0.00012 * Math.sin(angle)

      // 마이너스 좌표 무시
      if (lat >= 0 && lng >= 0) {
        circleOutline.push({ lat, lng })
      }
    }

    return circleOutline
  }

  const setCircle = ({ lat, lng, radius }: { lat: number; lng: number; radius: number }): void => {
    if (map) {
      const circlePosition = calculateCircleOutline(lat, lng, radius)

      const circlePolygonPath = circlePosition.map((position) => {
        return new kakao.maps.LatLng(position.lat, position.lng)
      })

      const circlePolygon = new kakao.maps.Polygon({
        path: circlePolygonPath,
        strokeWeight: 3, // 선의 두께입니다
        strokeColor: '#39DE2A', // 선의 색깔입니다
        strokeOpacity: 0.8, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
        strokeStyle: 'longdash', // 선의 스타일입니다
        fillOpacity: 0.7, // 채우기 불투명도 입니다
      })
      circlePolygon.setMap(map)
    }
  }

  const pickMarker = (position: any): void => {
    const newMarkPosition = new kakao.maps.LatLng(position.Ma, position.La)

    const newMark = new kakao.maps.Marker({
      position: newMarkPosition,
    })

    newMark.setMap(map)
  }

  return { map, containerRef, setSize, movePosition, setMarker, setCircle, pickMarker }
}
