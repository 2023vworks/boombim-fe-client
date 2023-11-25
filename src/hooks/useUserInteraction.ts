import {
  usePostFeedCommentsMutation,
  usePostFeedRecommendMutation,
  usePostFeedReportMutation,
  usePostFeedUnRecommendMutation,
} from '@/store/asyncSlice/asyncSlice'
import React from 'react'

export interface ShareProp {
  title: string
  text: string
}
export default function useUserInteraction() {
  const [postFeedComments] = usePostFeedCommentsMutation()
  const [postFeedRecommned] = usePostFeedRecommendMutation()
  const [postFeedUnRecommned] = usePostFeedUnRecommendMutation()
  const [postFeedReport] = usePostFeedReportMutation()

  const webShare = React.useCallback(async () => {
    try {
      if (window.navigator.share) {
        await window.navigator.share({
          url: window.location.href,
        })
      }
    } catch (e) {
      console.error(e)
    }
  }, [])

  const sendFeedComment = (value: string, id: number) => {
    void postFeedComments({ id, body: { content: value } })
  }

  const recommendFeed = React.useCallback((id: number) => {
    postFeedRecommned(id)
      .unwrap()
      .catch((err) => {
        alert(err.data.message)
      })
  }, [])

  const unRecommendFeed = React.useCallback((id: number) => {
    postFeedUnRecommned(id)
      .unwrap()
      .catch((err) => {
        alert(err.data.message)
      })
  }, [])

  const reportFeed = React.useCallback(
    (id: number, body: { reason: string }) => {
      postFeedReport({ id, body })
        .unwrap()
        .catch((err) => {
          alert(err.data.message)
        })
    },

    [],
  )

  return {
    webShare,
    recommendFeed,
    unRecommendFeed,
    reportFeed,
    sendFeedComment,
  }
}
