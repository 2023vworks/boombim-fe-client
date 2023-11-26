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

  const reloadMap = () => {
    if (!map) return
    map.relayout()
  }

  useEffect(() => {
    if (!containerRef?.current) return
    containerRef?.current.addEventListener('transitionend', handleCenterPosition)

    return () => {
      if (!containerRef?.current) return
      containerRef?.current.removeEventListener('transitionend', handleCenterPosition)
    }
  }, [])

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
    // map.relayout()
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
    if (map && currentMapType === MAP_UNION_TYPE.NORMAL && circle && newMarker) {
      circle.setMap(null)
      map.setDraggable(true)
      map.setZoomable(true)
      newMarker.setMap(null)
    }
  }, [currentMapType, map, circle, newMarker])

  useEffect(() => {
    if (map && currentMapType === MAP_UNION_TYPE.PICKMARK && !isOpenDrawer) {
      kakao.maps.event.addListener(map, 'click', handlePickMarker)
    }
    return () => {
      map && kakao.maps.event.removeListener(map, 'click', handlePickMarker)
    }
  }, [currentMapType, map, isOpenDrawer, newMarker])

  useEffect(() => {
    if (!map) return
    map.relayout()
  }, [currentCenterPosition])

  const handleClickMark = (geoMarkId: number) => {
    if (!map || !containerRef?.current) return

    if (height === '100%') {
      dispatch(setMapSize({ height: '40%' }))
    }

    dispatch(setSelectedMarker(geoMarkId))
    dispatch(openDrawer({ drawerType: 'DETAIL' }))
  }

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
