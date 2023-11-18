import { Button } from '@/bds/Button/Button'
import * as Styles from './IntroStart.styles'
import { Typography } from '@/bds/Typography/Typography'

interface Props {
  onNext: () => void
}

export const IntroStart = ({ onNext }: Props): React.ReactNode => {
  return (
    <Styles.Container>
      <Styles.Wrapper>
        <Styles.DescriptionSection>
          <Typography size={'P'}> 오프라인의 복작거림을 온라인에서도,</Typography>
          <Typography size={'P'}>
            실황 커뮤니티 <Styles.BoldTypo>붐빔</Styles.BoldTypo>에 오신 것을 환영합니다! 🎉
          </Typography>
        </Styles.DescriptionSection>
        <Button text='시작하기' onClick={onNext} width={250} height={42} buttonType='PRIMARY' />
      </Styles.Wrapper>
    </Styles.Container>
  )
}
