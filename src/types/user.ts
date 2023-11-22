export interface GetUserResponseDTO {
  id: number
  createdAt: Date
  updatedAt: Date
  mbti: string
  nickname: string
  feedWritingCount: number
  lastFeedWrittenAt: Date
}

export interface GetUserFeedsResponseDTO {
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
  geoMarkId: number
  geoMarkRegion: string
}

export interface GetUserFeedsRequestDTO {
  page: number
  pageSize: number
}

export interface PostUsersResponseDTO {
  mbti: string
  nickname: string
  token: string
}

export interface PostUsersRequestDTO {
  mbtiType: string
  agreementTerms: true
}
