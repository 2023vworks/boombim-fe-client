/* eslint-disable multiline-ternary */
import Icon from '@/bds/Icon/Icon'
import { Map } from '@/components/template/Map/Map'
import useMaps from '@/hooks/useMaps'
import { useLazyGetMarksQuery } from '@/store/asyncSlice/asyncSlice'
import { type RootState, useAppSelector } from '@/store/store'
import theme from '@/styles/theme'
import * as Styles from './MainPage.styled'
import { type Position, type BoundPosition, MAP_UNION_TYPE } from '@/types/map'
import { useEffect, useState } from 'react'

export const MainPage = (): React.ReactNode => {
  // State
  const { map, containerRef, movePosition, setMarker, setCircle, pickMarker } = useMaps()
  const [currentBounds, setCurrentBounds] = useState<BoundPosition>()
  const [currentCenterPosition, setCurrentCenterPosition] = useState<Position>()

  const currentGeoLocation = useAppSelector((state) => state.map.currentGeoLocation)
  const currentMapType = useAppSelector((state: RootState) => state.map.mapType)

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
    const result = trigger({
      size: 90,
      minX: currentBounds.southWestPosition.lng,
      minY: currentBounds.southWestPosition.lat,
      maxX: currentBounds.northEastPosition.lng,
      maxY: currentBounds.northEastPosition.lat,
    }).unwrap()
    console.log(result)
  }, [map, currentBounds, currentCenterPosition])

  useEffect(() => {
    if (!map || !currentGeoLocation) return
    movePosition(currentGeoLocation)
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

  useEffect(() => {
    if (map && currentMapType === MAP_UNION_TYPE.PICKMARK) {
      kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
        pickMarker(mouseEvent.latLng)
      })

      const center = map.getCenter()

      map.setDraggable(false)
      map.setZoomable(false)
      setCircle({ lat: center.getLat(), lng: center.getLng(), radius: 30 })
    }
  }, [currentMapType, map])

  return (
    <Styles.Container>
      <Map
        markers={data?.data}
        maxLevel={4}
        minLevel={2}
        map={map}
        containerRef={containerRef}
        onDrageEnd={handleDragEnd}
      />
      {currentMapType === MAP_UNION_TYPE.PICKMARK && (
        <Styles.ButtonBox>
          <Styles.ButtonWraaper onClick={() => console.log('first')}>
            <Icon iconType='WHITE_CHECK' fillColor={theme.color.black} width='24px' height='24px' />
          </Styles.ButtonWraaper>
          <Styles.ButtonWraaper>
            <Icon iconType='CANCEL' fillColor={theme.color.white} width='24px' height='24px' />
          </Styles.ButtonWraaper>
        </Styles.ButtonBox>
      )}
    </Styles.Container>
  )
}
