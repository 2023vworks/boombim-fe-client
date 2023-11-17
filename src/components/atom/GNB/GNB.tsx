import { Typography } from '@/bds/Typography/Typography'
import * as Styles from './GNB.styles'
import useGeoLocation from '@/hooks/useGeoLocation'
import { useEffect } from 'react'
import { convertKorRegion, type coord2RegionCodeReturnType } from '@/utils/map'
import { setRegion } from '@/store/slices/map.slice'
import { useAppDispatch, useAppSelector } from '@/store/store'

export const GNB = (): React.ReactNode => {
  const { location, error } = useGeoLocation()
  const currentRegion = useAppSelector((state) => state.map.currentRegion)
  const dispatch = useAppDispatch()

  const regionCallbackHandler = (res: coord2RegionCodeReturnType[]) => {
    dispatch(setRegion({ bupRegion: res[0].region_3depth_name, hangRegoin: res[1].region_3depth_name }))
  }

  useEffect(() => {
    if (error) return

    convertKorRegion(location, regionCallbackHandler)
  }, [location])

  return (
    <Styles.Container>
      <Styles.Header>
        <Typography size='H5' fontWeight={700} color={'black'}>
          {!location.lat ? '위치 정보를 불러오고 있습니다.' : currentRegion.hangRegoin ?? currentRegion.bupRegion}
        </Typography>
      </Styles.Header>
      <Styles.DisplayBoard></Styles.DisplayBoard>
    </Styles.Container>
  )
}