/* eslint-disable multiline-ternary */
import Icon from '@/bds/Icon/Icon'
import { type ConvertedMarker, Map } from '@/components/template/Map/Map'
import useMaps from '@/hooks/useMaps'
import { useLazyGetMarksQuery } from '@/store/asyncSlice/asyncSlice'
import { useAppSelector, useAppDispatch } from '@/store/store'
import theme from '@/styles/theme'
import * as Styles from './MainPage.styled'
import { type Position, type BoundPosition, MAP_UNION_TYPE } from '@/types/map'
import { openDrawer } from '@/store/slices/drawer.slice'
import { setMapSize, setMapType, setNewMarker } from '@/store/slices/map.slice'
import { setSelectedMarker } from '@/store/slices/mark.slice'
import { useEffect, useState } from 'react'

export const MainPage = (): React.ReactNode => {
  // State
  const { map, containerRef, movePosition, drawCircleHole, newMarker, pickMarker, circle } = useMaps()
  const [currentBounds, setCurrentBounds] = useState<BoundPosition>()
  const [currentCenterPosition, setCurrentCenterPosition] = useState<Position>()
  const [convertedMarkers, setConvertedMarkers] = useState<ConvertedMarker[]>([])

  const currentGeoLocation = useAppSelector((state) => state.map.currentGeoLocation)
  const currentMapType = useAppSelector((state) => state.map.mapType)
  const isOpenDrawer = useAppSelector((state) => state.drawer.isOpen)
  const selectedMarker = useAppSelector((state) => state.marker)

  const { height } = useAppSelector((state) => state.map)
  const dispatch = useAppDispatch()

  const getCurrentBounds = (map: kakao.maps.Map) => {
    if (!map) return
    const bounds = map.getBounds()
    return {
      southWestPosition: {
        lat: bounds?.getSouthWest().getLat() ?? 0,
        lng: bounds?.getSouthWest().getLng() ?? 0,
      },
      northEastPosition: {
        lat: bounds?.getNorthEast().getLat() ?? 0,
        lng: bounds?.getNorthEast().getLng() ?? 0,
      },
    }
  }

  const [trigger, { data }] = useLazyGetMarksQuery()

  const reloadMap = () => {
    if (!map) return
    map.relayout()
  }

  const handleDragEnd = () => {
    if (!map) return
    const position = {
      lat: map.getCenter().getLat(),
      lng: map.getCenter().getLng(),
    }
    const moveLatLng = new kakao.maps.LatLng(position.lat, position.lng)

    const currentBounds = getCurrentBounds(map)
    setCurrentBounds(currentBounds as BoundPosition)

    setCurrentCenterPosition(position)
    map.setCenter(moveLatLng)
  }

  const handleCenterPosition = () => {
    if (!map) return

    const position = {
      lat: map.getCenter().getLat(),
      lng: map.getCenter().getLng(),
    }

    setCurrentCenterPosition(position)
    reloadMap()
  }

  const handlePickMarker = function (mouseEvent: { latLng: { Ma: number; La: number } }): void {
    pickMarker(mouseEvent.latLng)
  }

  const handleConfirmMark = (mark: kakao.maps.Marker | null): void => {
    if (!mark || !containerRef?.current) return

    const newMarkPosition = mark.getPosition()

    const moveMap = () => {
      map?.relayout()
      map?.panTo(newMarkPosition)
    }
    containerRef?.current.addEventListener('transitionend', moveMap, { once: true })

    if (height === '100%') {
      dispatch(setMapSize({ height: '40%' }))
    }

    dispatch(setNewMarker({ currentPickMarkerPosition: { x: newMarkPosition.getLng(), y: newMarkPosition.getLat() } }))
    dispatch(openDrawer({ drawerType: 'FEED_CREATE_TYPE' }))
  }

  const handleCancelMark = (): void => {
    dispatch(setMapType({ mapType: 'NORMAL' }))

    circle?.setMap(null)
    map?.setDraggable(true)
    map?.setZoomable(true)
    newMarker?.setMap(null)
  }

  const handleClickMark = (geoMarkId: number) => {
    if (!map || !containerRef?.current) return

    if (height === '100%') {
      dispatch(setMapSize({ height: '40%' }))
    }

    dispatch(setSelectedMarker({ selectedMarkerId: geoMarkId }))
    dispatch(openDrawer({ drawerType: 'DETAIL' }))
  }

  /**
   * @ 현재 실제 위치를 가지고 올때 지도를 재구성
   */
  useEffect(() => {
    if (!map || !currentGeoLocation) return
    movePosition(currentGeoLocation)
    map.relayout()
  }, [currentGeoLocation, map])

  /**
   * @ 보여지는 지도의 center가 변경될 때 지도를 재구성
   */
  useEffect(() => {
    if (!map) return
    map.relayout()
  }, [currentCenterPosition])

  /**
   * @ Map의 현재 bound set
   */
  useEffect(() => {
    if (!map) return
    const currentBounds = getCurrentBounds(map)
    setCurrentBounds(currentBounds as BoundPosition)
  }, [map])

  /**
   * @ Map의 transition이 끝날 때 center position을 설정하는 event 등록
   */
  useEffect(() => {
    if (!containerRef?.current) return
    containerRef?.current.addEventListener('transitionend', handleCenterPosition)

    return () => {
      if (!containerRef?.current) return
      containerRef?.current.removeEventListener('transitionend', handleCenterPosition)
    }
  }, [])

  /**
   * @ Map의 center positio과 bound가 변경될 때 markers 조회
   */
  useEffect(() => {
    if (!map || !currentBounds) return
    void trigger({
      size: 90,
      minX: currentBounds.southWestPosition.lng,
      minY: currentBounds.southWestPosition.lat,
      maxX: currentBounds.northEastPosition.lng,
      maxY: currentBounds.northEastPosition.lat,
    }).unwrap()
  }, [map, currentBounds, currentCenterPosition])

  /**
   * @ Map Type이 마커를 찍는 type으로 변경될 때 markers를 convert
   */
  useEffect(() => {
    if (!data) return

    let markers = []
    if (currentMapType === 'PICKMARK') {
      markers = data.data.map((marker) => {
        return { ...marker, opacity: 0.5, clickable: false }
      })
    } else {
      markers = [...data.data]
    }
    setConvertedMarkers(markers)
  }, [data, currentMapType])

  /**
   * @ Map Type이 Normal 변경될 때 지도를 이동 제한 해제, 원 지우시
   */
  useEffect(() => {
    if (map && currentMapType === MAP_UNION_TYPE.NORMAL && circle && newMarker) {
      circle.setMap(null)
      map.setDraggable(true)
      map.setZoomable(true)
      newMarker.setMap(null)
    }
  }, [currentMapType, map, circle, newMarker])

  /**
   * @ Map Type이 Pick marker로 변경될 때 지도를 이동, 확대 제한, 원 그리기
   */
  useEffect(() => {
    if (map && currentMapType === MAP_UNION_TYPE.PICKMARK && currentGeoLocation) {
      drawCircleHole({ lat: currentGeoLocation.lat, lng: currentGeoLocation.lng, radius: 25 })
      const currentCenter = new kakao.maps.LatLng(currentGeoLocation.lat, currentGeoLocation.lng)
      pickMarker(currentCenter)
      map.setCenter(currentCenter)
      map.setLevel(3)
      map.setDraggable(false)
      map.setZoomable(false)
    }
  }, [currentMapType, map, currentGeoLocation])

  /**
   * @ Map Type이 Pick marker로 변경될 때 원 내부 event( 마커 생성 ) 등록
   */
  useEffect(() => {
    if (map && currentMapType === MAP_UNION_TYPE.PICKMARK && !isOpenDrawer) {
      kakao.maps.event.addListener(map, 'click', handlePickMarker)
    }
    return () => {
      map && kakao.maps.event.removeListener(map, 'click', handlePickMarker)
    }
  }, [currentMapType, map, isOpenDrawer, newMarker])

  /**
   * @ 피드 모아보기에서 메인페이지 피드 상세로 이동
   */
  useEffect(() => {
    if (!map || !containerRef?.current || !selectedMarker.isFromFeeds || !selectedMarker.selectedMarkerId || !data) {
      return
    }

    if (data.data.length === 0) {
      alert('해당 마커가 존재하지 않습니다. ')
      return
    }

    const selectedMarkerInfo = data.data.filter((marker) => {
      return marker.id === selectedMarker.selectedMarkerId
    })

    if (selectedMarkerInfo.length === 0) {
      alert('해당 마커가 존재하지 않습니다. ')
      return
    }

    const newPosition = new kakao.maps.LatLng(selectedMarkerInfo[0].y, selectedMarkerInfo[0].x)
    const moveMap = () => {
      map?.relayout()
      map?.panTo(newPosition)
    }
    containerRef?.current.addEventListener('transitionend', moveMap, { once: true })

    handleClickMark(selectedMarker.selectedMarkerId)
  }, [selectedMarker, data])

  return (
    <Styles.Container>
      <Map
        convertedMarkers={convertedMarkers}
        maxLevel={4}
        minLevel={2}
        map={map}
        containerRef={containerRef}
        onDrageEnd={handleDragEnd}
        onClickMark={handleClickMark}
      />
      {currentMapType === MAP_UNION_TYPE.PICKMARK && (
        <Styles.ButtonBox>
          <Styles.ButtonWraaper
            $type={'MAIN'}
            onClick={() => {
              handleConfirmMark(newMarker)
            }}
          >
            <Icon
              iconType='WHITE_CHECK'
              fillColor={theme.color.mainColor}
              strokeColor={theme.color.white}
              width='24px'
              height='24px'
            />
          </Styles.ButtonWraaper>
          <Styles.ButtonWraaper
            $type={'SUB'}
            onClick={() => {
              handleCancelMark()
            }}
          >
            <Icon iconType='CANCEL' fillColor={theme.color.white} width='24px' height='24px' />
          </Styles.ButtonWraaper>
        </Styles.ButtonBox>
      )}
    </Styles.Container>
  )
}
