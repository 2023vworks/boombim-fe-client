import { useEffect, useState } from 'react'
import useGeoLocation from '@/hooks/useGeoLocation'
import { FeedCard } from '@/pages/feed/components/molcules/FeedCard/FeedCard'
import * as Styles from './FeedsPage.styled'
import { useNavigate } from 'react-router-dom'
import { useGetFeedsQuery } from '@/store/asyncSlice/asyncSlice'
import { getRectangleCoordinates } from '@/utils/map'
import Empty from '@/components/template/Empty/Empty'
import { useAppDispatch } from '@/store/store'
import { setSelectedMarker } from '@/store/slices/mark.slice'
import { setCurrentDongList } from '@/store/slices/map.slice'
import { INITIAL_POSITION } from '@/constants/position'

export const FeedsPage = (): React.ReactNode => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [currentDongs, setCurrentDongs] = useState<string[]>([])
  const [querySkip, setQuerySkip] = useState<boolean>(true)

  const { location, error } = useGeoLocation()

  const geocoder = new kakao.maps.services.Geocoder()

  const getDongName = async (dongCor: { lat: number; lng: number }): Promise<string> => {
    return await new Promise<string>((resolve, reject) => {
      geocoder.coord2RegionCode(dongCor.lng, dongCor.lat, (e) => {
        if (e[1]) {
          resolve(e[1].region_3depth_name)
        } else {
          reject(new Error('Unable to determine the region name'))
        }
      })
    })
  }

  const goToFeedDetail = (feedId: number): void => {
    dispatch(setSelectedMarker({ selectedMarkerId: feedId, isFromFeeds: true }))
    navigate('/')
  }

  const { isSuccess, data } = useGetFeedsQuery(
    {
      page: 1,
      pageSize: 10,
      centerX: location?.lng ?? INITIAL_POSITION.lng,
      centerY: location?.lat ?? INITIAL_POSITION.lat,
      regionType: 'H',
      dongs: currentDongs,
    },
    { skip: querySkip },
  )

  useEffect(() => {
    const nearbyDongCors = getRectangleCoordinates({
      currentLat: location ? location.lat : INITIAL_POSITION.lat,
      currentLng: location ? location.lng : INITIAL_POSITION.lng,
      radiusInMeters: 300,
    })

    const nearbyDongNames = nearbyDongCors.map(async (nearbyDongCor) => await getDongName(nearbyDongCor))

    Promise.all(nearbyDongNames)
      .then((dongName) => {
        setCurrentDongs(dongName)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [location, error])

  useEffect(() => {
    dispatch(setCurrentDongList({ list: currentDongs }))
    if (currentDongs.length !== 0) {
      setQuerySkip(false)
    }
  }, [currentDongs])

  return (
    <Styles.Container>
      {isSuccess && data.data.length === 0 && <Empty text={'주위에 아무 피드도 없어요. 🥲'} />}
      {isSuccess &&
        data.data.map((feed) => (
          <FeedCard
            key={feed.id}
            geoMarkId={feed.geoMarkId}
            activity={feed.activity}
            name={feed.user ? `${feed.user.mbtiType}#${feed.user.nickname}` : '떠나간 유저'}
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
    </Styles.Container>
  )
}
