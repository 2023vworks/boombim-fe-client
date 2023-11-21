import { useEffect, useState } from 'react'
import useGeoLocation from '@/hooks/useGeoLocation'
// import Loading from '@/components/atoms/Loading/Loading'
import { FeedCard } from '@/pages/feed/components/molcules/FeedCard/FeedCard'
import * as Styles from './FeedsPage.styled'
import { useNavigate } from 'react-router-dom'
import { useGetFeedsQuery } from '@/store/asyncSlice/asyncSlice'
import { getRectangleCoordinates } from '@/utils/map'
// import { Loading } from '@/components/atom/Loading/Loading'

export const FeedsPage = (): React.ReactNode => {
  const navigate = useNavigate()

  const [currentDongs, setCurrentDongs] = useState<string[]>([])
  const [querySkip, setQuerySkip] = useState<boolean>(true)

  const { location, error } = useGeoLocation()
  //   const { setSelectedFeed } = useFeed()

  const geocoder = new kakao.maps.services.Geocoder()

  const getDongName = async (dongCor: { lat: number; lng: number }): Promise<string> => {
    return await new Promise<string>((resolve, reject) => {
      geocoder.coord2RegionCode(dongCor.lat, dongCor.lng, (e) => {
        if (e[1]) {
          resolve(e[1].region_3depth_name)
        } else {
          reject(new Error('Unable to determine the region name'))
        }
      })
    })
  }

  const goToFeedDetail = (feedId: number): void => {
    // setSelectedFeed(feedId)
    navigate('/')
  }

  const { isSuccess, data } = useGetFeedsQuery(
    {
      page: 1,
      pageSize: 10,
      centerX: location?.lat ?? 127.10160361906075,
      centerY: location?.lng ?? 37.511235775127325,
      regionType: 'H',
      dongs: currentDongs,
    },
    { skip: querySkip },
  )

  useEffect(() => {
    let nearbyDongCors: Array<{
      lat: number
      lng: number
    }> = []

    if (error) {
      nearbyDongCors = getRectangleCoordinates({
        currentLat: 127.1016036190607,
        currentLng: 37.51123577512732,
        radiusInMeters: 300,
      })
    }
    if (location.lat !== 0 && location.lng !== 0) {
      nearbyDongCors = getRectangleCoordinates({
        currentLat: location.lat,
        currentLng: location.lng,
        radiusInMeters: 300,
      })
    }

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
    if (currentDongs.length !== 0) {
      setQuerySkip(false)
    }
  }, [currentDongs])

  return (
    <Styles.Container>
      {/* {!location && !error && <Loading />} */}
      {isSuccess &&
        data.data.map((feed) => (
          <FeedCard
            key={feed.id}
            geoMarkId={feed.geoMarkId}
            activity={feed.activity}
            name={`${feed.user.mbtiType}#${feed.user.nickname}`}
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
