/* eslint-disable @typescript-eslint/no-invalid-void-type */
import {
  type ErrorResponseDTO,
  type GetFeedActivationTimeResultType,
  type GetFeedDetailResultType,
  type GetFeedsResultType,
  type GetFeedsRequestType,
  type PostFeedCommentResultType,
  type PostFeedCommentRequestType,
  type PostFeedResultType,
  type PostFeedRequestType,
  type GetFeedCommentResultType,
  type GetFeedCommentsRequestType,
  type PostFeedRecommendResultType,
  type PostFeedUnRecommendResultType,
  type PostFeedReportRequestType,
  type GetMarkersResultType,
  type GetMarkersRequestType,
  type PostUserResultType,
  type PostUserRequestType,
  type GetUserResultType,
  type PostUploadRequestType,
  type GetUserFeedsResultType,
} from '@/types/api'

import { getAccessToken } from '@/utils/storage'

import { type BaseQueryFn, createApi, type FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl = 'https://api.boomb.im/api'

export const boombimApi = createApi({
  reducerPath: 'boombimApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      getAccessToken() && headers.set('Authorization', `Bearer ${getAccessToken()}`)
      return headers
    },
  }) as BaseQueryFn<string | FetchArgs, unknown, ErrorResponseDTO>,
  tagTypes: ['PostComment', 'PostFeed'],
  endpoints: (builder) => ({
    /**
     * * FEED DOMAIN
     */
    /**
     * @ Feed List 조회
     */
    getFeeds: builder.query<GetFeedsResultType, GetFeedsRequestType>({
      query: (params) => {
        return {
          url: '/feeds',
          method: 'GET',
          params,
        }
      },
      providesTags: (result, id) => [{ type: 'PostFeed' }],
    }),

    /**
     * @ Feed 상세 조회(FeedID로 조회)
     */
    getFeedDetail: builder.query<GetFeedDetailResultType, number>({
      query: (id) => {
        return {
          url: `feeds/${id}`,
          method: 'GET',
        }
      },
    }),

    /**
     * @ Feed 상세 조회 (GeoMarkId로 조회)
     */
    getFeedDetailByMarkerId: builder.query<GetFeedDetailResultType, number>({
      query: (id) => {
        return {
          url: '/feeds/search',
          method: 'GET',
          params: { geoMarkId: id },
        }
      },
    }),

    /**
     * @ Feed 활성 시간 조회
     */
    getFeedActivationTime: builder.query<GetFeedActivationTimeResultType, number>({
      query: (id) => {
        return {
          url: `feeds/${id}/activation-time`,
          method: 'GET',
        }
      },
    }),

    /**
     * @ Feed Detail > Comment List 조회
     */
    getFeedComments: builder.query<GetFeedCommentResultType, GetFeedCommentsRequestType>({
      query: ({ id, params }) => {
        return {
          url: `/feeds/${id}/comments`,
          method: 'GET',
          params,
        }
      },
      providesTags: (result, id) => [{ type: 'PostComment' }],
    }),

    /**
     * @ Feed 생성
     */
    postFeed: builder.mutation<PostFeedResultType, PostFeedRequestType>({
      query: (body) => {
        return {
          url: '/feeds',
          method: 'POST',
          body,
        }
      },
      invalidatesTags: ['PostFeed'],
    }),

    /**
     * @ Feed Detail > Comments 생성
     */
    postFeedComments: builder.mutation<PostFeedCommentResultType, PostFeedCommentRequestType>({
      query: ({ id, body }) => {
        return {
          url: `feeds/${id}/comments`,
          method: 'POST',
          body,
        }
      },
      invalidatesTags: ['PostComment'],
    }),

    /**
     * @ Feed 추천
     */
    postFeedRecommend: builder.mutation<PostFeedRecommendResultType, number>({
      query: (id) => {
        return {
          url: `/feeds/${id}/recommend`,
          method: 'POST',
        }
      },
    }),

    /**
     * @ Feed 비추천
     */
    postFeedUnRecommend: builder.mutation<PostFeedUnRecommendResultType, number>({
      query: (id) => {
        return {
          url: `/feeds/${id}/unrecommend`,
          method: 'POST',
        }
      },
    }),

    /**
     * @ Feed 신고
     */
    postFeedReport: builder.mutation<null, PostFeedReportRequestType>({
      query: ({ id, body }) => {
        return {
          url: `/feeds/${id}/report`,
          method: 'POST',
          body,
        }
      },
    }),

    /**
     * * MARK DOMAIN
     */

    /**
     * @ 활성화된 Mark List 조회
     */
    getMarks: builder.query<GetMarkersResultType, GetMarkersRequestType>({
      query: (params) => {
        return {
          url: 'geo-marks/',
          params,
          method: 'GET',
        }
      },
    }),

    /**
     * * USER DOMAIN
     */

    /**
     * @ User 조회
     */
    getUser: builder.query<GetUserResultType, void>({
      query: () => {
        return {
          url: '/users/me',
          method: 'GET',
        }
      },
    }),

    getUserFeeds: builder.query<GetUserFeedsResultType, void>({
      query: () => {
        return {
          url: '/users/me/feeds',
          method: 'GET',
        }
      },
    }),

    /**
     * @ User 회원가입
     */
    postUser: builder.mutation<PostUserResultType, PostUserRequestType>({
      query: (body) => {
        return {
          url: '/users',
          method: 'POST',
          body,
        }
      },
    }),
    deleteUser: builder.mutation<null, void>({
      query: () => {
        return {
          url: '/users/me',
          method: 'DELETE',
        }
      },
    }),

    /**
     * * FILE UPLOAD DOMAIN
     */

    /**
     * @ Image File 업로드
     */
    // [Upload] 관련 post api
    postUploadImages: builder.mutation<null, PostUploadRequestType>({
      query: ({ id, body }) => {
        return {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
          url: `/feeds/${id}/images`,
          method: 'POST',
          body,
        }
      },
    }),
  }),
})

export const {
  useGetFeedsQuery,
  useGetFeedDetailQuery,
  useGetFeedDetailByMarkerIdQuery,
  useGetFeedActivationTimeQuery,
  useGetFeedCommentsQuery,
  usePostFeedMutation,
  usePostFeedCommentsMutation,
  usePostFeedRecommendMutation,
  usePostFeedUnRecommendMutation,
  usePostFeedReportMutation,
  useGetMarksQuery,
  useGetUserQuery,
  useGetUserFeedsQuery,
  usePostUserMutation,
  useDeleteUserMutation,
  usePostUploadImagesMutation,
  useLazyGetMarksQuery,
  useLazyGetFeedDetailByMarkerIdQuery,
  useLazyGetFeedCommentsQuery,
} = boombimApi
