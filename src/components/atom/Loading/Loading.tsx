import { Typography } from '@/bds/Typography/Typography'
import * as Styles from './Loading.styles'
import fireImage from '@/assets/images/fireAni.gif'

export const Loading = (): React.ReactNode => {
  return (
    <Styles.Container>
      <Styles.LodaingAnimation src={fireImage} alt='로딩 에니메이션 이미지' />
      <Styles.DescriptionBox>
        <Typography size={'P'} fontWeight={700}>
          현재 위치를 불러오고있습니다.
        </Typography>
        <Typography size={'P'} fontWeight={700}>
          조금만 기다려주세요.
        </Typography>
      </Styles.DescriptionBox>
    </Styles.Container>
  )
}
