import { Typography } from '@/bds/Typography/Typography'
import * as Styles from './Empty.styles'

interface Props {
  text: string
}

export default function Empty({ text }: Props) {
  return (
    <Styles.Container>
      <Typography size={'P'} color={'gray200'}>
        {text}
      </Typography>
    </Styles.Container>
  )
}
