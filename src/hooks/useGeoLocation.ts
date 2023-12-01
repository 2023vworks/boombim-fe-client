import { INITIAL_POSITION } from '@/constants/position'
import { type Position } from '@/types/map'
import { INITIAL_USER, getCookie } from '@/utils/storage'
import { useEffect, useState } from 'react'

export default function useGeoLocation() {
  const [location, setLocation] = useState<Position | null>(null)
  const [error, setError] = useState('')

  const trigerGetGeoLocation = (
    successCallback: (position: { lat: number; lng: number }) => void,
    errorCallback: (error: GeolocationPositionError | string) => void,
  ): void => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          successCallback({ lat: position.coords.latitude, lng: position.coords.longitude })
        },
        (error) => {
          errorCallback(error)
        },
      )
    } else {
      errorCallback('Geolocation is not supported by this browser.')
    }
  }

  useEffect(() => {
    if (getCookie(INITIAL_USER) === null) return
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        (err) => {
          // !! 위치 권한 비허용 - 초기 잠실 좌표 설정
          setLocation({
            lat: INITIAL_POSITION.lat,
            lng: INITIAL_POSITION.lng,
          })
          setError(err.message)
        },
      )
    } else {
      setError('Geolocation is not supported by this browser.')
    }
  }, [])

  return { location, error, trigerGetGeoLocation }
}
