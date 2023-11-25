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
import CancelIcon from '@assets/icons/cancel.svg?react'
import ArrowUpIcon from '@assets/icons/arrow-up.svg?react'
import CameraIcon from '@assets/icons/camera.svg?react'
import AlertCircleIcon from '@assets/icons/ico-alert-circle.svg?react'
import FillCommentIcon from '@assets/icons/ico-fill-comment.svg?react'
import ArrowLeftIcon from '@assets/icons/ico-arrow-left.svg?react'

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
  ALERT_CIRCLE: 'ALERT_CIRCLE',
  FILL_COMMENT: 'FILL_COMMENT',
  ARROW_LEFT: 'ARROW_LEFT',
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
      case ICON_UNION_TYPE.SHARE:
        return ShareIcon
      case ICON_UNION_TYPE.BELL:
        return BellIcon
      case ICON_UNION_TYPE.GRID:
        return GridIcon
      case ICON_UNION_TYPE.MAP:
        return MapIcon
      case ICON_UNION_TYPE.PLUS_CIRCLE:
        return PlusCircleIcon
      case ICON_UNION_TYPE.USER:
        return UserIcon
      case ICON_UNION_TYPE.SMILE:
        return SmileIcon
      case ICON_UNION_TYPE.THUMBS_DOWN:
        return ThumbsDownIcon
      case ICON_UNION_TYPE.THUMBS_UP:
        return ThumbsUpIcon
      case ICON_UNION_TYPE.WHITE_CHECK:
        return WhiteCheckIcon
      case ICON_UNION_TYPE.COMMENT:
        return CommentIcon
      case ICON_UNION_TYPE.MY_LOCATION_CIRCLE:
        return MyLocationCircleIcon
      case ICON_UNION_TYPE.MY_LOCATION:
        return MyLocationIcon
      case ICON_UNION_TYPE.EYE:
        return EyeIcon
      case 'CANCEL':
        return CancelIcon
      case 'ARROW_UP':
        return ArrowUpIcon
      case 'CAMERA':
        return CameraIcon
      case ICON_UNION_TYPE.ALERT_CIRCLE:
        return AlertCircleIcon
      case ICON_UNION_TYPE.FILL_COMMENT:
        return FillCommentIcon
      case ICON_UNION_TYPE.ARROW_LEFT:
        return ArrowLeftIcon
    }
  }

  const SelectedIcon = selectedIcon(iconType)
  return <SelectedIcon stroke={strokeColor} fill={fillColor} width={width} height={height} />
}

export default Icon
