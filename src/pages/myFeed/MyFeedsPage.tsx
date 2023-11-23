/* eslint-disable @typescript-eslint/no-misused-promises */
import Empty from '@/components/template/Empty/Empty'
import { FeedCard } from '@/pages/feed/components/molcules/FeedCard/FeedCard'
import { useGetUserFeedsQuery } from '@/store/asyncSlice/asyncSlice'
import { getUserInfo } from '@/utils/storage'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

export default function MyFeedsPage() {
  const [userName, setUserName] = useState<string>('')

  const { data, isSuccess } = useGetUserFeedsQuery()

  const navigate = useNavigate()

  const goToFeedDetail = (feedId: number): void => {
    // setSelectedFeed(feedId)
    console.log(feedId)
    navigate('/')
  }

  useEffect(() => {
    const currentUserName = getUserInfo()
    currentUserName && setUserName(currentUserName)
  }, [])

  return (
    <Container>
      {/* {!location && !error && <Loading />} */}
      {isSuccess && data.data.length === 0 && <Empty text='작성하신 피드가 존재하지 않습니다. ' />}
      {isSuccess &&
        data.data.length > 0 &&
        data.data.map((feed) => (
          <FeedCard
            key={feed.id}
            geoMarkId={feed.geoMarkId}
            activity={feed.activity}
            name={userName}
            dong={feed.geoMarkRegion}
            activationAt={feed.activationAt}
            createdAt={feed.createdAt}
            content={feed.content}
            viewCount={feed.viewCount}
            recommendCount={feed.recommendCount}
            commentCount={feed.commentCount}
            selectFeed={goToFeedDetail}
          />
        ))}
    </Container>
  )
}

const Container = styled.div`
  height: 100%;
  padding: 20px 0px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  overflow: auto;
  background-color: rgba(248, 248, 248, 1);
`
