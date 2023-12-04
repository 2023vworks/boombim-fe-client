import { Button } from '@/bds/Button/Button'
import * as Styles from './IntroAuthorization.styles'
import { Typography } from '@/bds/Typography/Typography'
import { useAppDispatch } from '@/store/store'
import { setCurrentGeoLocation, setRegion } from '@/store/slices/map.slice'
import { convertKorRegion, type coord2RegionCodeReturnType } from '@/utils/map'

interface Props {
  onNext: () => void
}

export const IntroAuthorization = ({ onNext }: Props): React.ReactNode => {
  const dispatch = useAppDispatch()

  const regionCallbackHandler = (res: coord2RegionCodeReturnType[]) => {
    dispatch(setCurrentGeoLocation({ lng: res[0].x, lat: res[0].y }))
    dispatch(setRegion({ bupRegion: res[0].region_3depth_name, hangRegoin: res[1].region_3depth_name }))
  }

  const requestLocation = async () => {
    return await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          convertKorRegion(
            {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
            regionCallbackHandler,
          )
          resolve('위치 권한 허용')
        },
        () => {
          reject(Error('위치 권한 허용을 하지 않는다면, 앱 이용에 제한이 있을 수 있습니다.'))
        },
      )
    })
  }

  const requestCamera = async () => {
    return await new Promise((resolve, reject) => {
      navigator.mediaDevices
        .getUserMedia({ video: { width: 400, height: 400 } })
        .then(() => {
          resolve('카메라 권한 허용')
        })
        .catch(() => {
          reject(Error('카메라 권한 허용을 하지 않는다면, 앱 이용에 제한이 있을 수 있습니다.'))
        })
    })
  }

  const authorizationHandler = (): void => {
    const authorizations = [requestLocation(), requestCamera()]

    Promise.allSettled(authorizations)
      .then((res) => {
        res.forEach((res) => {
          res.status === 'rejected' && alert(res.reason)
        })
      })
      .catch(() => {
        console.log('권한 허용에 실패하였습니다.')
      })
      .finally(() => {
        onNext()
      })
  }

  return (
    <Styles.Container>
      <Styles.Wrapper>
        <Styles.Title>
          <Typography size={'P'}> 붐빔을 즐기기 위해 필요한 권한들을 안내드려요 😊</Typography>
        </Styles.Title>
        <Styles.DescriptionSection>
          <Styles.DetailTitle>
            <Typography size={'P'} fontWeight={700}>
              📍 위치 <Styles.OptionalTitle>(선택)</Styles.OptionalTitle>
            </Typography>
          </Styles.DetailTitle>
          <Styles.DetailDescriptionSection>
            <Typography size={'SMALL'}>사용자의 위치를 기반으로 주변 피드 탐색 및 글 작성</Typography>
            <Typography size={'SMALL'} fontWeight={300}>
              위치 접근 권한을 동의하지 않으신 경우, 서비스 내에서 글을 등록
            </Typography>
            <Typography size={'SMALL'} fontWeight={300}>
              하실 수 없습니다.
            </Typography>
          </Styles.DetailDescriptionSection>
          <Styles.DetailTitle>
            <Typography size={'P'} fontWeight={700}>
              📷 카메라 <Styles.OptionalTitle>(선택)</Styles.OptionalTitle>
            </Typography>
          </Styles.DetailTitle>
          <Styles.DetailDescriptionSection>
            <Typography size={'SMALL'}>글 작성 시 첨부하기 위한 사진 촬영</Typography>
            <Typography size={'SMALL'} fontWeight={300}>
              추후 글 작성 시 동의 여부를 결정하실 수 있습니다.
            </Typography>
          </Styles.DetailDescriptionSection>
        </Styles.DescriptionSection>
        <Styles.ButtonSection>
          <Button text='권한 동의하기' onClick={authorizationHandler} width={320} height={42} buttonType='PRIMARY' />
        </Styles.ButtonSection>
      </Styles.Wrapper>
    </Styles.Container>
  )
}
