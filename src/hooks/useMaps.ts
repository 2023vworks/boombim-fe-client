import { type MapSize, setMapSize } from '@/store/slices/map.slice'
import { useAppDispatch } from '@/store/store'
import theme from '@/styles/theme'
import { calculateCircleOutline, checkOutsidePolygon } from '@/utils/map'
import { useEffect, useRef, useState } from 'react'

const SONGPA_POSITION = [
  { lat: 37.49906574506561, lng: 127.16100515065362 },
  { lat: 37.48958280758275, lng: 127.1583847070467 },
  { lat: 37.48949762096449, lng: 127.1582263627206 },
  { lat: 37.48946562406761, lng: 127.15816702315806 },
  { lat: 37.489191285393275, lng: 127.15759688244725 },
  { lat: 37.48888462212912, lng: 127.15705637156921 },
  { lat: 37.48865845825414, lng: 127.15662757647468 },
  { lat: 37.48827676897261, lng: 127.15586291398593 },
  { lat: 37.488059993318686, lng: 127.15545167116943 },
  { lat: 37.4822219526267, lng: 127.14758794654554 },
  { lat: 37.48201386278581, lng: 127.14752532372928 },
  { lat: 37.47393041843933, lng: 127.14352658768819 },
  { lat: 37.46652048562006, lng: 127.12420687996774 },
  { lat: 37.490291165146715, lng: 127.1070069105918 },
  { lat: 37.50250336660556, lng: 127.07227112710223 },
  { lat: 37.5025351007596, lng: 127.07193771506664 },
  { lat: 37.524583355559585, lng: 127.0675010955701 },
  { lat: 37.5233348996862, lng: 127.07238659818249 },
  { lat: 37.52329143381706, lng: 127.07256967062911 },
  { lat: 37.52252800258502, lng: 127.07684463350947 },
  { lat: 37.52251471157542, lng: 127.07694554818833 },
  { lat: 37.53411286378134, lng: 127.09909522816754 },
  { lat: 37.53420990155196, lng: 127.09921415191215 },
  { lat: 37.54316586743777, lng: 127.10914270661993 },
  { lat: 37.51683494820216, lng: 127.14509193538302 },
]

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
  newMark: kakao.maps.Marker | null
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
  const [circle, setCircle] = useState<kakao.maps.Polygon | null>(null)
  const [newMark, setNewMarker] = useState<kakao.maps.Marker | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null) as React.RefObject<HTMLDivElement>
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (containerRef !== null) {
      const container = new kakao.maps.Map(containerRef.current as HTMLElement, {
        center: new kakao.maps.LatLng(37.511235775127325, 127.10160361906075),
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
      const circlePosition = calculateCircleOutline(lat, lng, radius)

      const circlePolygonPath = circlePosition.map((position) => {
        return new kakao.maps.LatLng(position.lat, position.lng)
      })

      const coverPolygonPath = SONGPA_POSITION.map((position) => {
        return new kakao.maps.LatLng(position.lat, position.lng)
      })

      const circlePolygon = new kakao.maps.Polygon({
        map,
        path: [coverPolygonPath, circlePolygonPath],
        strokeWeight: 2,
        strokeColor: theme.color.mainColor,
        strokeOpacity: 0.8,
        strokeStyle: 'longdash',
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

      const coverPolygonPath = SONGPA_POSITION.map((position) => {
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

    const mark = new kakao.maps.Marker({
      position: newMarkPosition,
    })

    mark.setMap(map)
    setNewMarker((prev) => {
      if (prev) {
        prev.setMap(null)
      }
      return mark
    })
  }

  return { map, containerRef, setSize, movePosition, setMarker, drawCircleHole, newMark, pickMarker, circle }
}
