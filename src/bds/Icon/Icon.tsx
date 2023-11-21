import ShareIcon from '@assets/icons/ico-share.svg?react'
import SmileIcon from '@assets/icons/ico-smile.svg?react'
import ThumbsDownIcon from '@assets/icons/ico-thumbs-down.svg?react'
import ThumbsUpIcon from '@assets/icons/ico-thumbs-up.svg?react'
import WhiteCheckIcon from '@assets/icons/ico-check.svg?react'
import BellIcon from '@assets/icons/ico-bell.svg?react'
import GridIcon from '@assets/icons/ico-grid.svg?react'
import MapIcon from '@assets/icons/ico-map.svg?react'
import PlusCircleIcon from '@assets/icons/ico-plus-circle.svg?react'
import UserIcon from '@assets/icons/ico-user.svg?react'
import CommentIcon from '@assets/icons/ico-message-square.svg?react'
import MyLocationCircleIcon from '@assets/icons/ico-my-location-circle.svg?react'
import MyLocationIcon from '@assets/icons/ico-my-location.svg?react'
import EyeIcon from '@assets/icons/ico-eye.svg?react'

export const ICON_UNION_TYPE = {
  SHARE: 'SHARE',
  SMILE: 'SMILE',
  THUMBS_UP: 'THUMBS_UP',
  THUMBS_DOWN: 'THUMBS_DOWN',
  WHITE_CHECK: 'WHITE_CHECK',
  BELL: 'BELL',
  GRID: 'GRID',
  MAP: 'MAP',
  PLUS_CIRCLE: 'PLUS_CIRCLE',
  USER: 'USER',
  COMMENT: 'COMMENT',
  MY_LOCATION_CIRCLE: 'MY_LOCATION_CIRCLE',
  MY_LOCATION: 'MY_LOCATION',
  EYE: 'EYE',
} as const

export type ICON_TYPE = (typeof ICON_UNION_TYPE)[keyof typeof ICON_UNION_TYPE]

interface Props {
  iconType: ICON_TYPE
  fillColor?: string
  strokeColor?: string
  width?: string
  height?: string
}

const Icon = ({ iconType, fillColor, strokeColor, width = '40px', height = '40px' }: Props) => {
  const selectedIcon = (icon: ICON_TYPE) => {
    switch (icon) {
      case 'SHARE':
        return ShareIcon
      case 'BELL':
        return BellIcon
      case 'GRID':
        return GridIcon
      case 'MAP':
        return MapIcon
      case 'PLUS_CIRCLE':
        return PlusCircleIcon
      case 'USER':
        return UserIcon
      case 'SMILE':
        return SmileIcon
      case 'THUMBS_DOWN':
        return ThumbsDownIcon
      case 'THUMBS_UP':
        return ThumbsUpIcon
      case 'WHITE_CHECK':
        return WhiteCheckIcon
      case 'COMMENT':
        return CommentIcon
      case 'MY_LOCATION_CIRCLE':
        return MyLocationCircleIcon
      case 'MY_LOCATION':
        return MyLocationIcon
      case 'EYE':
        return EyeIcon
    }
  }

  const SelectedIcon = selectedIcon(iconType)
  return <SelectedIcon stroke={strokeColor} fill={fillColor} width={width} height={height} />
}

export default Icon
