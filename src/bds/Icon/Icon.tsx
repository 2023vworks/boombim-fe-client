import { ReactComponent as ShareIcon } from '@assets/icons/share.svg'
import { ReactComponent as SmileIcon } from '@assets/icons/smile.svg'
import { ReactComponent as ThumbsDownIcon } from '@assets/icons/thumbs-down.svg'
import { ReactComponent as ThumbsUpIcon } from '@assets/icons/thumbs-up.svg'
import { ReactComponent as WhiteCheckIcon } from '@assets/icons/white-check.svg'

const ICON = {
  SHARE: 'SHARE',
  SMILE: 'SMILE',
  THUMBS_UP: 'THUMBS_UP',
  THUMBS_DOWN: 'THUMBS_DOWN',
  WHITE_CHECK: 'WHITE_CHECK',
} as const

export type ICON_TYPE = (typeof ICON)[keyof typeof ICON]

interface Props {
  icon: ICON_TYPE
  fillColor: string
  width?: string
  height?: string
}

const Icon = ({ icon, fillColor, width = '40px', height = '40px' }: Props) => {
  const selectedIcon = (iconType: ICON_TYPE) => {
    switch (iconType) {
      case 'SHARE':
        return ShareIcon
      case 'SMILE':
        return SmileIcon
      case 'THUMBS_DOWN':
        return ThumbsDownIcon
      case 'THUMBS_UP':
        return ThumbsUpIcon
      case 'WHITE_CHECK':
        return WhiteCheckIcon
    }
  }

  const SelectedIcon = selectedIcon(icon)
  return <SelectedIcon fill={fillColor} width={width} height={height} />
}

export default Icon
