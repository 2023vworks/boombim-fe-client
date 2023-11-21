import * as Styles from './FeedHeader.styles'
import { NameTag } from '@/components/molcules/NameTag/NameTag'
import { elapsedTime } from '@/utils/time'
import { TimeCount } from '@/components/atom/TimeCount/TimeCount'
import { Typography } from '@/bds/Typography/Typography'

interface Props {
  activity: number
  name: string
  dong: string
  activationAt: string
  creactedAt: string
}

export const FeedHeader = ({ name, activity, dong, activationAt, creactedAt }: Props): React.ReactNode => {
  return (
    <Styles.Container>
      <Styles.InfoSection>
        <NameTag name={name} activity={activity} />
        <Styles.SubInfo>
          <Typography size={'XSMALL'} color='gray' fontWeight={300}>
            {`${dong}, ${elapsedTime(creactedAt)}`}
          </Typography>
        </Styles.SubInfo>
      </Styles.InfoSection>
      <Styles.ActiveTimeSection>
        <TimeCount compareTime={activationAt} />
      </Styles.ActiveTimeSection>
    </Styles.Container>
  )
}
