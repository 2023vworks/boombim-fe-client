import { FeedHeader } from '@/components/molcules/FeedHeader/FeedHeader'
import * as Styles from './FeedCard.styles'
import { FeedContent } from '@/components/atom/FeedContent/FeedContent'
import { ICON_UNION_TYPE } from '@/bds/Icon/Icon'
import theme from '@/styles/theme'
import { FeedInfo, type InfoProps } from '@/components/atom/FeedInfo/FeedInfo'

interface Props {
  activity: number
  name: string
  dong: string
  content: string
  recommendCount: number
  viewCount: number
  commentCount: number
  geoMarkId: number
  activationAt: string
  createdAt: string
  selectFeed: (id: number) => void
}

export const FeedCard = ({
  activity,
  name,
  dong,
  content,
  viewCount,
  commentCount,
  recommendCount,
  geoMarkId,
  selectFeed,
  activationAt,
  createdAt,
}: Props): React.ReactNode => {
  const FEED_INFOS: InfoProps[] = [
    {
      infoType: 'recommend',
      isReadOnly: true,
      infoContent: recommendCount,
      iconStyle: {
        iconType: ICON_UNION_TYPE.THUMBS_UP,
        fillColor: theme.color.white,
        width: '12px',
        height: '12px',
      },
    },
    {
      infoType: 'comment',
      isReadOnly: true,
      infoContent: commentCount,
      iconStyle: {
        iconType: ICON_UNION_TYPE.COMMENT,
        fillColor: theme.color.white,
        width: '12px',
        height: '12px',
      },
    },
    {
      infoType: 'view',
      isReadOnly: true,
      infoContent: viewCount,
      iconStyle: {
        iconType: ICON_UNION_TYPE.EYE,
        fillColor: theme.color.white,
        width: '12px',
        height: '12px',
      },
    },
  ]

  return (
    <Styles.Container
      onClick={() => {
        selectFeed(geoMarkId)
      }}
    >
      <FeedHeader activity={activity} name={name} dong={dong} creactedAt={createdAt} activationAt={activationAt} />
      <FeedContent content={content} isEllipsis={true} />
      <FeedInfo infos={FEED_INFOS} />
    </Styles.Container>
  )
}
