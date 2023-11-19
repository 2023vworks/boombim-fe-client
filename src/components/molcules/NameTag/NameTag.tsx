import { LevelIcon } from '@/components/atom/LevelIcon/LevelIcon'
import * as Styles from './NameTag.styles'
import { Typography } from '@/bds/Typography/Typography'

interface Props {
  name: string
  activity: number
}

export const NameTag = ({ name, activity }: Props): React.ReactNode => {
  return (
    <Styles.Container>
      <LevelIcon activity={activity ?? 1} />
      <Styles.NameSection>
        <Typography size={'SMALL'} fontWeight={700}>
          {name}
        </Typography>
      </Styles.NameSection>
    </Styles.Container>
  )
}
