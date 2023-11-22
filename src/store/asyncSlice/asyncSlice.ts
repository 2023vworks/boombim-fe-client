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
  type getMarkersResultType,
  type getMarkersRequestType,
  type postUserResultType,
  type postUserRequestType,
  type getUserResultType,
  type postUploadRequestType,
  type GetUserFeedsResultType,
  type GetUserFeedsRequestType,
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
    // [Feed] 관련 get apis
    getFeeds: builder.query<GetFeedsResultType, GetFeedsRequestType>({
      query: (params) => {
        return {
          url: '/feeds',
          method: 'GET',
          params: { ...params },
        }
      },
      providesTags: (result, id) => [{ type: 'PostFeed' }],
    }),
    getFeedDetail: builder.query<GetFeedDetailResultType, number>({
      query: (id) => {
        return {
          url: `feeds/${id}`,
          method: 'GET',
        }
      },
    }),
    getFeedDetailByMarkerId: builder.query<GetFeedDetailResultType, number>({
      query: (id) => {
        return {
          url: '/feeds/search',
          method: 'GET',
          params: { geoMarkId: id },
        }
      },
    }),
    getFeedActivationTime: builder.query<GetFeedActivationTimeResultType, number>({
      query: (id) => {
        return {
          url: `feeds/${id}/activation-time`,
          method: 'GET',
        }
      },
    }),
    getFeedComments: builder.query<GetFeedCommentResultType, GetFeedCommentsRequestType>({
      query: ({ id, params }) => {
        return {
          url: `/feeds/${id}/comments`,
          method: 'GET',
          params: { ...params },
        }
      },
      providesTags: (result, id) => [{ type: 'PostComment' }],
    }),
    // [Feed] 관련 post apis
    postFeed: builder.mutation<PostFeedResultType, PostFeedRequestType>({
      query: (body) => {
        return {
          url: '/feeds',
          method: 'POST',
          body: { ...body },
        }
      },
      invalidatesTags: ['PostFeed'],
    }),
    postFeedComments: builder.mutation<PostFeedCommentResultType, PostFeedCommentRequestType>({
      query: ({ id, body }) => {
        return {
          url: `feeds/${id}/comments`,
          method: 'POST',
          body: { ...body },
        }
      },
      invalidatesTags: ['PostComment'],
    }),
    postFeedRecommend: builder.mutation<PostFeedRecommendResultType, number>({
      query: (id) => {
        return {
          url: `/feeds/${id}/recommend`,
          method: 'POST',
        }
      },
    }),
    postFeedUnRecommend: builder.mutation<PostFeedUnRecommendResultType, number>({
      query: (id) => {
        return {
          url: `/feeds/${id}/unrecommend`,
          method: 'POST',
        }
      },
    }),
    postFeedReport: builder.mutation<null, PostFeedReportRequestType>({
      query: ({ id, body }) => {
        return {
          url: `/feeds/${id}/report`,
          method: 'POST',
          body: { ...body },
        }
      },
    }),
    // [Marker] 관련 get api
    getMarks: builder.query<getMarkersResultType, getMarkersRequestType>({
      query: (params) => {
        return {
          url: 'geo-marks/',
          method: 'GET',
          params: { ...params },
        }
      },
    }),
    // [User] 관련 get api
    getUser: builder.query<getUserResultType, null>({
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
    // [User] 관련 post api
    postUser: builder.mutation<postUserResultType, postUserRequestType>({
      query: (body) => {
        return {
          url: '/users',
          method: 'POST',
          body: { ...body },
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
    // [Upload] 관련 post api
    postUploadImages: builder.mutation<null, postUploadRequestType>({
      query: ({ id, body }) => {
        return {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
          url: `/feeds/${id}/images`,
          method: 'POST',
          body: { ...body },
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
} = boombimApi
