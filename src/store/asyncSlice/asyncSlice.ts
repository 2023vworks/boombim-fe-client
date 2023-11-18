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
} from '@/types/api'

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
          params,
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
          params,
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
          body,
        }
      },
      invalidatesTags: ['PostFeed'],
    }),
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
          body,
        }
      },
    }),
    // [Marker] 관련 get api
    getMarks: builder.query<getMarkersResultType, getMarkersRequestType>({
      query: (params) => {
        return {
          url: 'geo-marks/',
          params,
          method: 'GET',
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
    // [User] 관련 post api
    postUser: builder.mutation<postUserResultType, postUserRequestType>({
      query: (body) => {
        return {
          url: '/users',
          method: 'POST',
          body,
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
  usePostUserMutation,
  usePostUploadImagesMutation,
} = boombimApi
