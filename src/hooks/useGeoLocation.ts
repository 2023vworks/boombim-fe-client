import { type Position } from '@/types/map'
import { INITIAL_USER, getCookie } from '@/utils/storage'
import { useEffect, useState } from 'react'

export default function useGeoLocation() {
  const [location, setLocation] = useState<Position>({ lat: 0, lng: 0 })
  const [error, setError] = useState('')

  useEffect(() => {
    if (getCookie(INITIAL_USER) === null) return
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position)
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

  return { location, error }
}
