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
import ViewIcon from '@assets/icons/view.svg?react'
import CommentIcon from '@assets/icons/message-square.svg?react'

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
  VIEW: 'VIEW',
  COMMENT: 'COMMENT',
} as const

export type ICON_TYPE = (typeof ICON_UNION_TYPE)[keyof typeof ICON_UNION_TYPE]

interface Props {
  iconType: ICON_TYPE
  fillColor: string
  width?: string
  height?: string
}

const Icon = ({ iconType, fillColor, width = '40px', height = '40px' }: Props) => {
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
      case 'VIEW':
        return ViewIcon
      case 'COMMENT':
        return CommentIcon
    }
  }

  const SelectedIcon = selectedIcon(iconType)
  return <SelectedIcon fill={fillColor} width={width} height={height} />
}

export default Icon
