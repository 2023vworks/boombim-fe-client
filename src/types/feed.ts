export interface GetFeedsResponseDTO {
  id: number
  createdAt: string
  updatedAt: string
  activity: number
  content: string
  hashTags: string[]
  activationAt: string
  recommendCount: number
  unrecommendCount: number
  reportCount: number
  viewCount: number
  commentCount: number
  user: {
    mbtiType: string
    nickname: string
  }
  geoMarkId: number
  geoMarkRegion: string
}

export interface GetFeedsRequsetDTO {
  regionType: 'H'
  dongs: string[]
  centerX: number
  centerY: number
  page: number
  pageSize: number
}

export interface GetFeedResponseDTO {
  id: number
  createdAt: string
  updatedAt: string
  activity: number
  content: string
  thumbnailImages: string[]
  images: string[]
  hashTags: string[]
  activationAt: string
  recommendCount: number
  unrecommendCount: number
  reportCount: number
  viewCount: number
  commentCount: number
  geoMarkId: number
  user: {
    mbtiType: string
    nickname: string
  }
  recommendHistories: GetFeedWithRecommendHistoryResponseDTO[]
  geoMark: {
    regionInfo: {
      id: number
      createdAt: string
      updatedAt: string
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
    address: {
      id: number
      createdAt: string
      updatedAt: string
      addressName: string
      region1DepthName: string
      region2DepthName: string
      region3DepthName: string
      mountainYn: string
      mainAddressNo: string
      subAddressNo: string
    }
    roadAddress: {
      id: number
      createdAt: string
      updatedAt: string
      addressName: string
      region1DepthName: string
      region2DepthName: string
      region3DepthName: string
      mountainYn: string
      mainAddressNo: string
      subAddressNo: string
    }
  }
}
interface GetFeedWithRecommendHistoryResponseDTO {
  id: string
  createdAt: Date
  updatedAt: Date
  type: 'Recommend' | 'Unrecommend'
  userId: number
}

export interface GetFeedActivationTimeResponseDTO {
  activationAt: string
  currentAt: string
}

export interface GetFeedCommentReponseDTO {
  content: string
  id: number
  createdAt: string
  updatedAt: string
  user: {
    mbtiType: string
    nickname: string
  }
}

export interface GetCommentsRequestDTO {
  size: number
  nextCursor?: number
}

export interface PostFeedResponseDTO {
  feedId: number
}

export interface PostFeedRequestDTO {
  content: string
  hashTags: string[]
  geoMark: {
    x: number
    y: number
    regionInfo: RegionCode
    address: Address
    roadAddress?: RoadAddress
  }
}

export interface PostCommentsResponseDTO {
  content: string
}

export interface PostFeedCommentReponseDTO {
  commentId: number
}

export interface PostRecommendResponseDTO {
  activationAt: Date
  currentAt: Date
}

export interface PostUnrecommendResponseDTO {
  activationAt: Date
  currentAt: Date
}

export interface PostFeedReportRequestDTO {
  reason: string
}

export interface RegionCode {
  regioninterface: string
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
