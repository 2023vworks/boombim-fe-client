import {
  type PostFeedRequestDTO,
  type GetFeedActivationTimeResponseDTO,
  type GetFeedCommentReponseDTO,
  type GetFeedResponseDTO,
  type GetFeedsResponseDTO,
  type PostFeedCommentReponseDTO,
  type PostFeedResponseDTO,
  type PostRecommendResponseDTO,
  type PostUnrecommendResponseDTO,
  type GetFeedsRequsetDTO,
  type GetCommentsRequestDTO,
  type PostCommentsResponseDTO,
  type PostFeedReportRequestDTO,
} from '@/types/feed'

import { type GetGeoMarksResponseDTO, type GetGeoMarksRequestDTO } from '@/types/marker'
import {
  type GetUserFeedsRequestDTO,
  type GetUserFeedsResponseDTO,
  type GetUserResponseDTO,
  type PostUsersRequestDTO,
  type PostUsersResponseDTO,
} from '@/types/user'

// response error

export interface ErrorResponseDTO {
  data: { error: string; message: string; statusCode: number }
  status: number
}

// 피드 get

export interface GetFeedsResultType {
  data: GetFeedsResponseDTO[]
}

export interface GetFeedsRequestType extends GetFeedsRequsetDTO {}

export interface GetFeedDetailResultType {
  data: GetFeedResponseDTO[]
}

export interface GetFeedActivationTimeResultType {
  data: GetFeedActivationTimeResponseDTO
}

export interface GetFeedCommentResultType {
  data: GetFeedCommentReponseDTO[]
}

export interface GetFeedCommentsRequestType {
  id: number
  params: GetCommentsRequestDTO
}

// 피드 post

export interface PostFeedResultType {
  data: PostFeedResponseDTO
}

export interface PostFeedRequestType extends PostFeedRequestDTO {}

export interface PostFeedCommentResultType {
  data: PostFeedCommentReponseDTO
}

export interface PostFeedCommentRequestType {
  id: number
  body: PostCommentsResponseDTO
}

export interface PostFeedRecommendResultType {
  data: PostRecommendResponseDTO
}

export interface PostFeedUnRecommendResultType {
  data: PostUnrecommendResponseDTO
}

export interface PostFeedReportRequestType {
  id: number
  body: PostFeedReportRequestDTO
}

// 마커 post

export interface GetMarkersResultType {
  data: GetGeoMarksResponseDTO[]
}

export interface GetMarkersRequestType extends GetGeoMarksRequestDTO {}

// 유저 get

export interface GetUserResultType {
  data: GetUserResponseDTO
}

export interface GetUserFeedsResultType {
  data: GetUserFeedsResponseDTO[]
}

export interface GetUserFeedsRequestType extends GetUserFeedsRequestDTO {}

// 유저 post

export interface PostUserResultType {
  data: PostUsersResponseDTO
}

export interface PostUserRequestType extends PostUsersRequestDTO {}

// upload post

export interface PostUploadRequestType {
  id: number
  body: FormData
}
