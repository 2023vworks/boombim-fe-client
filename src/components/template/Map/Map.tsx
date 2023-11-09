import { useEffect } from 'react'

export const Map = (): React.ReactNode => {
  useEffect(() => {
    const options = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    }
    const container = document.getElementById('map')
    const map = new window.kakao.maps.Map(container, options)
  }, [])

  // const mapRef = useRef<HTMLDivElement | null>(null)

  return <div id='map' style={{ width: '500px', height: '500px' }}></div>
}
