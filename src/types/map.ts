export interface Position {
  lat: number
  lng: number
}

export interface BoundPosition {
  southWestPosition: Position
  northEastPosition: Position
}

export const MAP_UNION_TYPE = {
  NORMAL: 'NORMAL',
  PICKMARK: 'PICKMARK',
} as const

export type MAP_TYPE = (typeof MAP_UNION_TYPE)[keyof typeof MAP_UNION_TYPE]

export interface RegionCode {
  regionType: string
  addressName: string
  region1DepthName: string
  region2DepthName: string
  region3DepthName: string
  region4DepthName: string
  code: string
  x: number
  y: number
}

export interface Address {
  addressName: string
  region1DepthName: string
  region2DepthName: string
  region3DepthName: string
  mountainYn: string
  mainAddressNo: string
  subAddressNo: string
}

export interface RoadAddress {
  addressName: string
  region1DepthName: string
  region2DepthName: string
  region3DepthName: string
  roadName: string
  undergroundYn: 'Y' | 'N'
  mainBuildingNo: string
  subBuildingNo: string
  buildingName: string
  zoneNo: string
}
