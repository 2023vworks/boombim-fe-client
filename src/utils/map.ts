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
