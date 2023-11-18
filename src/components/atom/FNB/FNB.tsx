import { openModal } from '@/store/slices/modal.slice'
import * as Styles from './FNB.styles'
import Icon, { type ICON_TYPE } from '@/bds/Icon/Icon'
import { useAppDispatch } from '@/store/store'
import theme from '@/styles/theme'
import { useMemo } from 'react'

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
  const FNB_NAVIGATIONS: FNBNavigation[] = useMemo(
    () => [
      {
        icon: {
          iconType: 'MAP',
          fillColor: theme.color.white,
          width: '24px',
          height: '24px',
        },
        onClick: () => {
          console.log('share')
        },
      },
      {
        icon: {
          iconType: 'GRID',
          fillColor: theme.color.white,
          width: '24px',
          height: '24px',
        },
        onClick: () => {
          console.log('share')
        },
      },
      {
        icon: {
          iconType: 'PLUS_CIRCLE',
          fillColor: theme.color.white,
          width: '40px',
          height: '40px',
        },
        onClick: () => {
          handleButton()
        },
      },
      {
        icon: {
          iconType: 'BELL',
          fillColor: theme.color.white,
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
          width: '24px',
          height: '24px',
        },
        onClick: () => {
          console.log('share')
        },
      },
    ],
    [],
  )

  const dispatch = useAppDispatch()
  const handleButton = () => {
    dispatch(
      openModal({
        modalType: 'CONFIRM',
        props: {
          title: <>hi</>,
          confirmOption: {
            text: '계속 작성하기',
            onClick: () => {
              console.log('hit')
            },
          },
          cancleOption: {
            text: '작성 중단하기',
            onClick: () => {
              console.log('중단하기')
            },
          },
        },
      }),
    )
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
