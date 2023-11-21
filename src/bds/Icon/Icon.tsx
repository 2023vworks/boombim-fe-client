import MyLocationCircleIcon from '@assets/icons/ico-my-location-circle.svg?react'
import MyLocationIcon from '@assets/icons/ico-my-location.svg?react'
import EyeIcon from '@assets/icons/ico-eye.svg?react'
import ShareIcon from '@assets/icons/share.svg?react'
import SmileIcon from '@assets/icons/smile.svg?react'
import ThumbsDownIcon from '@assets/icons/thumbs-down.svg?react'
import ThumbsUpIcon from '@assets/icons/thumbs-up.svg?react'
import WhiteCheckIcon from '@assets/icons/white-check.svg?react'
import BellIcon from '@assets/icons/bell.svg?react'
import GridIcon from '@assets/icons/grid.svg?react'
import MapIcon from '@assets/icons/map.svg?react'
import PlusCircleIcon from '@assets/icons/plus_circle.svg?react'
import UserIcon from '@assets/icons/user.svg?react'
import CommentIcon from '@assets/icons/message-square.svg?react'
import CancelIcon from '@assets/icons/cancel.svg?react'
import ArrowUpIcon from '@assets/icons/arrow-up.svg?react'
import CameraIcon from '@assets/icons/camera.svg?react'

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
  CANCEL: 'CANCEL',
  ARROW_UP: 'ARROW_UP',
  CAMERA: 'CAMERA',
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
      case 'CANCEL':
        return CancelIcon
      case 'ARROW_UP':
        return ArrowUpIcon
      case 'CAMERA':
        return CameraIcon
    }
  }

  const SelectedIcon = selectedIcon(iconType)
  return <SelectedIcon stroke={strokeColor} fill={fillColor} width={width} height={height} />
}

export default Icon
