import { type Position } from '@/types/map'
import { isEmptyString } from './common'
import { type Address, type RegionCode, type RoadAddress } from '../types/feed'

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

export async function getGeoData({ lng, lat }: { lat: number; lng: number }) {
  const geocoder = new kakao.maps.services.Geocoder()

  const address = new Promise<kakao.maps.services.Address>((resolve) => {
    geocoder.coord2Address(lng, lat, (body) => {
      resolve(body[0]['address'])
    })
  })

  const roadAddress = new Promise<kakao.maps.services.RoadAaddress | null>((resolve) => {
    geocoder.coord2Address(lng, lat, (body) => {
      resolve(body[0]['road_address'])
    })
  })

  const regionInfo = new Promise<kakao.maps.services.RegionCode[]>((resolve) => {
    geocoder.coord2RegionCode(lng, lat, (body) => {
      resolve(body)
    })
  })

  return await Promise.all([address, roadAddress, regionInfo])
}

export function convertAddress(address: kakao.maps.services.Address): Address {
  const convertedDomain: Address = {
    addressName: isEmptyString(address.address_name),
    region1DepthName: isEmptyString(address.region_1depth_name),
    region2DepthName: isEmptyString(address.region_2depth_name),
    region3DepthName: isEmptyString(address.region_3depth_name),
    mountainYn: isEmptyString(address.mountain_yn),
    mainAddressNo: isEmptyString(address.main_address_no),
    subAddressNo: isEmptyString(address.sub_address_no),
  }
  return convertedDomain
}

export function convertRoadAddress(roadAaddress: kakao.maps.services.RoadAaddress | null): RoadAddress | undefined {
  if (!roadAaddress) return undefined
  const convertedDomainRoadAddress: RoadAddress = {
    addressName: isEmptyString(roadAaddress.address_name),
    region1DepthName: isEmptyString(roadAaddress.region_1depth_name),
    region2DepthName: isEmptyString(roadAaddress.region_2depth_name),
    region3DepthName: isEmptyString(roadAaddress.region_3depth_name),
    roadName: isEmptyString(roadAaddress.road_name),
    undergroundYn: roadAaddress.underground_yn,
    mainBuildingNo: isEmptyString(roadAaddress.main_building_no),
    subBuildingNo: isEmptyString(roadAaddress.sub_building_no),
    buildingName: isEmptyString(roadAaddress.building_name),
    zoneNo: isEmptyString(roadAaddress.zone_no),
  }
  return convertedDomainRoadAddress
}

export function convertRegion(region: kakao.maps.services.RegionCode): RegionCode {
  const convertedDomainRegion: RegionCode = {
    regionType: isEmptyString(region.region_type),
    addressName: isEmptyString(region.address_name),
    region1DepthName: isEmptyString(region.region_1depth_name),
    region2DepthName: isEmptyString(region.region_2depth_name),
    region3DepthName: isEmptyString(region.region_3depth_name),
    region4DepthName: isEmptyString(region.region_4depth_name),
    code: isEmptyString(region.code),
    x: region.x,
    y: region.y,
  }
  return convertedDomainRegion
}
