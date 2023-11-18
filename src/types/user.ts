export interface GetUserResponseDTO {
  id: number
  createdAt: Date
  updatedAt: Date
  mbti: string
  nickname: string
  feedWritingCount: number
  lastFeedWrittenAt: Date
}

export interface PostUsersResponseDTO {
  mbti: string
  nickname: string
  token: string
}

export interface PostUsersRequestDTO {
  mbti: string
  agreementTerms: true
}
