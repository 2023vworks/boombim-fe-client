import * as Styles from './FNB.styles'
import Icon, { type ICON_TYPE } from '@/bds/Icon/Icon'
import { useAppDispatch } from '@/store/store'
import theme from '@/styles/theme'
import { useMemo } from 'react'
import { setMapType } from '@/store/slices/map.slice'
import { useNavigate } from 'react-router-dom'

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
          console.log('share')
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

  const handleRouteMyPage = () => {
    navigate('/my-page')
  }

  const handleSwitchPickMap = () => {
    navigate('/')
    dispatch(setMapType({ mapType: 'PICKMARK' }))
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
