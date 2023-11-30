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
          setError(err.message)
        },
      )
    } else {
      setError('Geolocation is not supported by this browser.')
    }
  }, [])

  return { location, error, trigerGetGeoLocation }
}
