import * as Styles from './FNB.styles'
import Icon, { type ICON_TYPE } from '@/bds/Icon/Icon'
import { useAppDispatch } from '@/store/store'
import theme from '@/styles/theme'
import { useMemo } from 'react'
import { setMapType } from '@/store/slices/map.slice'
import { useNavigate } from 'react-router-dom'
// import { SEOUL_POSITION } from '@/constants/position'
// import { checkOutsidePolygon } from '@/utils/map'
// import useGeoLocation from '@/hooks/useGeoLocation'
import { closeModal, openModal } from '@/store/slices/modal.slice'

interface FNBNavigation {
  icon: {
    iconType: ICON_TYPE
    fillColor: string
    width?: string
    height?: string
  }
  onClick: () => void
}

export const FNB = () => {
  const navigate = useNavigate()

  // const { trigerGetGeoLocation } = useGeoLocation()

  const FNB_NAVIGATIONS: FNBNavigation[] = useMemo(
    () => [
      {
        icon: {
          iconType: 'MAP',
          fillColor: theme.color.white,
          strokeColor: theme.color.black,
          width: '24px',
          height: '24px',
        },
        onClick: () => {
          handleSwitchMap()
        },
      },
      {
        icon: {
          iconType: 'GRID',
          fillColor: theme.color.white,
          strokeColor: theme.color.black,
          width: '24px',
          height: '24px',
        },
        onClick: () => {
          handleRouteFeeds()
        },
      },
      {
        icon: {
          iconType: 'PLUS_CIRCLE',
          fillColor: theme.color.mainColor,
          strokeColor: theme.color.mainColor,
          width: '45px',
          height: '45px',
        },
        onClick: () => {
          handleSwitchPickMap()
        },
      },
      {
        icon: {
          iconType: 'BELL',
          fillColor: theme.color.white,
          strokeColor: theme.color.black,
          width: '24px',
          height: '24px',
        },
        onClick: () => {
          handleRouteAlramPage()
        },
      },
      {
        icon: {
          iconType: 'USER',
          fillColor: theme.color.white,
          strokeColor: theme.color.black,
          width: '24px',
          height: '24px',
        },
        onClick: () => {
          handleRouteMyPage()
        },
      },
    ],
    [],
  )

  const dispatch = useAppDispatch()

  const handleRouteAlramPage = () => {
    openDisableFeature()
  }

  const openDisableFeature = () => {
    dispatch(
      openModal({
        modalType: 'ALERT',
        props: {
          title: '🚧 지금은 공사중입니다',
          description: '해당 기능은 추후 업데이트될 예정입니다.',
          confirmOption: {
            text: '닫기',
            onClick: () => {
              dispatch(closeModal())
            },
          },
        },
      }),
    )
  }

  const handleRouteMyPage = () => {
    navigate('/my-page')
  }

  // !마커 생성 제한 로직

  // const getGeoLocationSuccessCallbackHandler = (position: { lat: number; lng: number }): void => {
  //   const currentPosition = new kakao.maps.LatLng(position.lat, position.lng)
  //   const coverPolygonPath = SEOUL_POSITION.map((position) => {
  //     return new kakao.maps.LatLng(position.lat, position.lng)
  //   })

  //   const isDisablePickMarker = checkOutsidePolygon(currentPosition, coverPolygonPath)
  //   if (isDisablePickMarker) {
  //     alert('지원하지 않는 지역입니다.')
  //   } else {
  //     navigate('/')
  //     dispatch(setMapType({ mapType: 'PICKMARK' }))
  //   }
  // }

  // const getGeoLocationFailCallbackHandler = (): void => {
  //   alert('위치 권한을 허용하지 않으면 이용에 제한이 있습니다.')
  // }

  const handleSwitchPickMap = (): void => {
    navigate('/')
    dispatch(setMapType({ mapType: 'PICKMARK' }))

    // trigerGetGeoLocation(getGeoLocationSuccessCallbackHandler, getGeoLocationFailCallbackHandler)
  }

  const handleSwitchMap = () => {
    navigate('/')
    dispatch(setMapType({ mapType: 'NORMAL' }))
  }

  const handleRouteFeeds = () => {
    navigate('/feed-list')
  }

  return (
    <Styles.Container>
      {FNB_NAVIGATIONS.map((nav) => {
        return (
          <Styles.NaviIcon key={nav.icon.iconType} onClick={nav.onClick}>
            <Icon {...nav.icon} />
          </Styles.NaviIcon>
        )
      })}
    </Styles.Container>
  )
}
