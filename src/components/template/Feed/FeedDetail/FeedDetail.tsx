/* eslint-disable @typescript-eslint/no-misused-promises */
import { useGetFeedCommentsQuery, useLazyGetFeedDetailByMarkerIdQuery } from '@/store/asyncSlice/asyncSlice'
import { useAppDispatch, useAppSelector } from '@/store/store'
import { useEffect, useState } from 'react'
import * as Styles from './FeedDetail.styles'
import Icon, { ICON_UNION_TYPE } from '@/bds/Icon/Icon'
import CommentItem from '@/components/molcules/CommentItem/CommentItem'
import theme from '@/styles/theme'
import Input from '@/bds/Input/Input'
import useIntersect from '@/hooks/useIntersect'
import UserInteractionBox from '@/components/organism/UserInteractionBox/UserInteractionBox'
import { INTERACTION_UNION_TYPE } from '@/constants/feed'
import { closeDrawer } from '@/store/slices/drawer.slice'
import useUserInteraction from '@/hooks/useUserInteraction'
import { setMapSize } from '@/store/slices/map.slice'
import { FeedCard } from '@/pages/feed/components/molcules/FeedCard/FeedCard'

const INTERACTION_CONFIG = [
  { interactionType: INTERACTION_UNION_TYPE.SHARE },
  { interactionType: INTERACTION_UNION_TYPE.USER_REPORT },
  { interactionType: INTERACTION_UNION_TYPE.UN_RECOMMEND },
  { interactionType: INTERACTION_UNION_TYPE.RECOMMEND },
]

export const FeedDetail = () => {
  const dispatch = useAppDispatch()
  const geoMarkId = useAppSelector((state) => state.marker.selectedMarker)
  const [state, setState] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [commentConfig, setCommentConfig] = useState<{
    size: number
    nextCursor?: number
  }>({ size: 10 })
  const { sendFeedComment } = useUserInteraction()

  const [trigger, { data }] = useLazyGetFeedDetailByMarkerIdQuery()
  useEffect(() => {
    if (!geoMarkId) return
    void trigger(geoMarkId).unwrap()
  }, [geoMarkId])

  const {
    data: commentList,
    isSuccess: isSuccessCommentList,
    isFetching: isCommentListFetching,
  } = useGetFeedCommentsQuery({
    id: geoMarkId as number,
    params: {
      size: 10,
    },
  })

  const intersectRef = useIntersect({
    onIntersect: async (entry, observer) => {
      if (!isSuccessCommentList) return
      observer.unobserve(entry.target)
      if (!isCommentListFetching && commentConfig.size <= commentList?.data.length) {
        setCommentConfig((prev) => {
          return { ...prev, size: prev.size + 10 }
        })
      }
    },
  })

  const handleClickCloseDrawer = () => {
    dispatch(setMapSize({ height: '100%' }))
    dispatch(closeDrawer())
  }

  return (
    <Styles.Container>
      <Styles.TopLeftButton>
        <div
          onClick={handleClickCloseDrawer}
          style={{
            width: '40px',
            height: '40px',
            backgroundColor: 'white',
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Icon
            iconType={ICON_UNION_TYPE.ARROW_LEFT}
            width='24px'
            height='24px'
            fillColor='white'
            strokeColor='black'
          />
        </div>
      </Styles.TopLeftButton>
      <Styles.ContentSection>
        {data && (
          <FeedCard
            activity={data?.data[0].activity}
            name={`${data?.data[0].user.mbtiType}#${data?.data[0].user.nickname}`}
            dong={data.data[0].geoMark.regionInfo.region3DepthName}
            content={data.data[0].content}
            viewCount={data.data[0].viewCount}
            recommendCount={data.data[0].recommendCount}
            geoMarkId={data.data[0].geoMarkId}
            activationAt={data.data[0].activationAt}
            createdAt={data.data[0].createdAt}
            unRecommendCount={data.data[0].unrecommendCount}
            thumbnailImages={data.data[0].thumbnailImages}
          />
        )}
      </Styles.ContentSection>
      <Styles.CommentSection>
        {commentList?.data.map((comment) => (
          <CommentItem
            key={comment.id}
            type='NORMAL'
            name={comment.user.mbtiType}
            description={comment.content}
            time='방금전'
          />
        ))}
        <Styles.IntersectTarget ref={intersectRef} />
      </Styles.CommentSection>
      <Styles.InteractionSection>
        {state && (
          <Styles.InputSection>
            <Input autoFocus onChange={setInputValue} />
          </Styles.InputSection>
        )}
        <Styles.ButtonSection>
          <Styles.Left>
            <UserInteractionBox interactionConfigs={INTERACTION_CONFIG} />
          </Styles.Left>

          <div
            onClick={() => {
              setState((prev) => !prev)
              if (state) sendFeedComment(inputValue, geoMarkId as number)
            }}
          >
            <Icon
              iconType={ICON_UNION_TYPE.FILL_COMMENT}
              strokeColor={theme.color.white}
              fillColor={theme.color.mainColor}
              width='38px'
              height='38px'
            />
          </div>
        </Styles.ButtonSection>
      </Styles.InteractionSection>
    </Styles.Container>
  )
}
