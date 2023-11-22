/* eslint-disable multiline-ternary */
import Icon from '@/bds/Icon/Icon'
import { Map } from '@/components/template/Map/Map'
import useMaps from '@/hooks/useMaps'
import { useLazyGetMarksQuery } from '@/store/asyncSlice/asyncSlice'
import { type RootState, useAppSelector, useAppDispatch } from '@/store/store'
import theme from '@/styles/theme'
import * as Styles from './MainPage.styled'
import { type Position, type BoundPosition, MAP_UNION_TYPE } from '@/types/map'
import { openDrawer } from '@/store/slices/drawer.slice'
import { setMapSize } from '@/store/slices/map.slice'
import { setSelectedMarker } from '@/store/slices/mark.slice'
import { useAppDispatch, useAppSelector } from '@/store/store'
import { type Position, type BoundPosition } from '@/types/map'
import { useEffect, useState } from 'react'
import { setMapType, setNewMarker } from '@/store/slices/map.slice'
import { openDrawer } from '@/store/slices/drawer.slice'

export const MainPage = (): React.ReactNode => {
  // State
  const { map, containerRef, movePosition, setMarker, drawCircleHole, newMark, pickMarker, circle } = useMaps()
  const [currentBounds, setCurrentBounds] = useState<BoundPosition>()
  const [currentCenterPosition, setCurrentCenterPosition] = useState<Position>()

  const currentGeoLocation = useAppSelector((state) => state.map.currentGeoLocation)
  const currentMapType = useAppSelector((state) => state.map.mapType)
  const isOpenDrawer = useAppSelector((state) => state.drawer.isOpen)

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

  useEffect(() => {
    if (!map) return
    const currentBounds = getCurrentBounds(map)
    setCurrentBounds(currentBounds as BoundPosition)
  }, [map])

  const [trigger, { data }] = useLazyGetMarksQuery()

  useEffect(() => {
    if (!map || !currentBounds) return
    void trigger({
      size: 90,
      minX: currentBounds.southWestPosition.lng,
      minY: currentBounds.southWestPosition.lat,
      maxX: currentBounds.northEastPosition.lng,
      maxY: currentBounds.northEastPosition.lat,
    }).unwrap()
    const position = {
      lat: map.getCenter().getLat(),
      lng: map.getCenter().getLng(),
    }
    const moveLatLon = new kakao.maps.LatLng(position.lat, position.lng)
    map.setCenter(moveLatLon)
  }, [map, currentBounds, currentCenterPosition])

  useEffect(() => {
    if (!map || !currentGeoLocation) return
    movePosition(currentGeoLocation)
    map.relayout()
  }, [currentGeoLocation])

  const handleDragEnd = () => {
    if (!map) return
    const position = {
      lat: map.getCenter().getLat(),
      lng: map.getCenter().getLng(),
    }
    const moveLatLon = new kakao.maps.LatLng(position.lat, position.lng)

    const currentBounds = getCurrentBounds(map)
    setCurrentBounds(currentBounds as BoundPosition)

    setCurrentCenterPosition(position)
    map.setCenter(moveLatLon)
  }

  const handlePickMarker = function (mouseEvent: { latLng: { Ma: number; La: number } }): void {
    pickMarker(mouseEvent.latLng)
  }

  const handleConfirmMark = (mark: kakao.maps.Marker | null): void => {
    if (!mark) return
    const markPosition = mark.getPosition()
    dispatch(setNewMarker({ currentPickMarkerPosition: { x: markPosition.getLng(), y: markPosition.getLat() } }))
    dispatch(openDrawer({ drawerType: 'FEED_CREATE_TYPE' }))
  }

  const handleCancelMark = (): void => {
    dispatch(setMapType({ mapType: 'NORMAL' }))
  }

  useEffect(() => {
    if (map && currentMapType === MAP_UNION_TYPE.PICKMARK) {
      const center = map.getCenter()
      drawCircleHole({ lat: center.getLat(), lng: center.getLng(), radius: 25 })
      map.setLevel(3)
      map.setDraggable(false)
      map.setZoomable(false)
    }
  }, [currentMapType, map])

  useEffect(() => {
    if (map && currentMapType === MAP_UNION_TYPE.NORMAL && circle && newMark) {
      circle.setMap(null)
      map.setDraggable(true)
      map.setZoomable(true)
      newMark.setMap(null)
    }
  }, [currentMapType, map, circle, newMark])

  useEffect(() => {
    if (map && currentMapType === MAP_UNION_TYPE.PICKMARK && !isOpenDrawer) {
      kakao.maps.event.addListener(map, 'click', handlePickMarker)
    }
    return () => {
      map && kakao.maps.event.removeListener(map, 'click', handlePickMarker)
    }
  }, [currentMapType, map, isOpenDrawer, newMark])

  useEffect(() => {
    if (!map) return
    map.relayout()
  }, [currentCenterPosition])

  const handleClickMark = (geoMarkId: number, posiiton: Position) => {
    if (!map || !containerRef?.current) return

    if (height === '100%') {
      dispatch(setMapSize({ height: '40%' }))
    }

    dispatch(setSelectedMarker(geoMarkId))
    dispatch(openDrawer({ drawerType: 'DETAIL', id: geoMarkId }))
  }

  return (
    <Styles.Container>
      <Map
        markers={data?.data}
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
              handleConfirmMark(newMark)
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
