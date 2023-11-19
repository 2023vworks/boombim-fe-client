import { type Position } from '@/types/map'

export interface coord2RegionCodeReturnType {
  address_name: string
  code: string
  region_1depth_name: string
  region_2depth_name: string
  region_3depth_name: string
  region_4depth_name: string
  region_type: string
  x: number
  y: number
}

export const convertKorRegion = (position: Position, callback: (result: coord2RegionCodeReturnType[]) => void) => {
  const geocoder = new kakao.maps.services.Geocoder()

  geocoder.coord2RegionCode(position.lng, position.lat, (res) => {
    callback(res)
  })
}

export function getRectangleCoordinates({
  currentLat,
  currentLng,
  radiusInMeters,
}: {
  currentLat: number
  currentLng: number
  radiusInMeters: number
}) {
  // 오각형을 만들기 위한 각도 계산 (72도 간격)
  const angleStep = 360 / 5

  // 지구 반지름 (미터 단위)
  const earthRadius = 6378137

  // 오각형의 다섯 개의 꼭짓점 좌표를 담을 배열
  const pentagonCoordinates = []

  // 현재 위치를 중심으로 오각형의 다섯 개의 좌표를 계산
  for (let i = 0; i < 5; i++) {
    const angle = i * angleStep

    // 각도에 따른 위도, 경도 변화량 계산
    const latDelta = (radiusInMeters / earthRadius) * (180 / Math.PI)
    const lngDelta = (radiusInMeters / (earthRadius * Math.cos((Math.PI / 180) * currentLat))) * (180 / Math.PI)

    // 각도에 따른 좌표 계산
    const pointLat = currentLat + latDelta * Math.sin((angle * Math.PI) / 180)
    const pointLng = currentLng + lngDelta * Math.cos((angle * Math.PI) / 180)
    // 계산된 좌표를 배열에 추가
    pentagonCoordinates.push({ lat: pointLat, lng: pointLng })
  }

  return pentagonCoordinates
}
