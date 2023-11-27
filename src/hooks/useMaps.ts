import { SEOUL_POSITION } from '@/constants/position'
import { type MapSize, setMapSize } from '@/store/slices/map.slice'
import { useAppDispatch } from '@/store/store'
import theme from '@/styles/theme'
import { calculateCircleOutline, checkOutsidePolygon } from '@/utils/map'
import { useEffect, useRef, useState } from 'react'
import marker_level_1 from '@/assets/images/marker_level_1.png'

export const MAP_ID = 'map'

interface ResponseType {
  map: kakao.maps.Map | null
  circle: kakao.maps.Polygon | null
  containerRef: React.RefObject<HTMLDivElement> | null
  setSize: (props: MapSize) => void
  movePosition: (props: Position) => void
  setMarker: (props: Marker) => void
  drawCircleHole: ({ lat, lng, radius }: { lat: number; lng: number; radius: number }) => void
  pickMarker: (position: any) => void
  newMarker: kakao.maps.Marker | null
}

export interface Marker {
  position: Position
  img?: kakao.maps.MarkerImage
  opacity?: number
  clickable?: boolean
  onClick: () => void
}

export interface Position {
  lat: number
  lng: number
}

export default function useMaps(): ResponseType {
  const [map, setMap] = useState<kakao.maps.Map | null>(null)
  const [circle, setCircle] = useState<kakao.maps.Polygon | null>(null)
  const [newMarker, setNewMarker] = useState<kakao.maps.Marker | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null) as React.RefObject<HTMLDivElement>
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (containerRef !== null) {
      const container = new kakao.maps.Map(containerRef.current as HTMLElement, {
        center: new kakao.maps.LatLng(37.511235775127325, 127.10160361906075),
        disableDoubleClick: true,
        level: 4,
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

  const drawCircleHole = ({ lat, lng, radius }: { lat: number; lng: number; radius: number }): void => {
    if (map) {
      const coverPolygonPath = SEOUL_POSITION.map((position) => {
        return new kakao.maps.LatLng(position.lat, position.lng)
      })

      const circlePosition = calculateCircleOutline(lat, lng, radius)

      const circlePolygonPath = circlePosition.map((position) => {
        return new kakao.maps.LatLng(position.lat, position.lng)
      })

      const circlePolygon = new kakao.maps.Polygon({
        map,
        path: [coverPolygonPath, circlePolygonPath],
        strokeWeight: 2,
        strokeColor: theme.color.gray,
        strokeOpacity: 0.7,
        fillColor: theme.color.gray,
        fillOpacity: 0.7,
      })

      setCircle(circlePolygon)
      circlePolygon.setMap(map)
    }
  }

  const pickMarker = (position: { Ma: number; La: number }): void => {
    const newMarkPosition = new kakao.maps.LatLng(position.Ma, position.La)

    if (circle) {
      const circlePolygonPath = circle.getPath()[1]

      const coverPolygonPath = SEOUL_POSITION.map((position) => {
        return new kakao.maps.LatLng(position.lat, position.lng)
      })

      if (checkOutsidePolygon(newMarkPosition, circlePolygonPath)) {
        alert('영역 이외는 핀 지정이 불가능합니다. ')
        return
      }
      if (checkOutsidePolygon(newMarkPosition, coverPolygonPath)) {
        alert('해당 지역는 서비스 지역이 아닙니다.')
        return
      }
    }
    const imageSize = new kakao.maps.Size(40, 45)
    const markImg = new kakao.maps.MarkerImage(marker_level_1, imageSize)

    const mark = new kakao.maps.Marker({
      position: newMarkPosition,
      image: markImg,
    })

    mark.setMap(map)
    setNewMarker((prev) => {
      if (prev) {
        prev.setMap(null)
      }
      return mark
    })
  }

  return { map, containerRef, setSize, movePosition, setMarker, drawCircleHole, newMarker, pickMarker, circle }
}
