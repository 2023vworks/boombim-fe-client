import { Button } from '@/bds/Button/Button'
import * as Styles from './IntroDescription.styles'
import { Typography } from '@/bds/Typography/Typography'

interface Props {
  onNext: () => void
}

export const IntroDescription = ({ onNext }: Props): React.ReactNode => {
  return (
    <Styles.Container>
      <Styles.DescriptionSection>
        <Typography size={'P'}>
          안녕하세요,<Styles.BoldTypo>붐빔</Styles.BoldTypo>입니다. <br />
        </Typography>
        <br />
        <Typography size={'P'}>
          붐빔은 <Styles.BoldTypo>지금</Styles.BoldTypo> 내 근처에 일어나고 있는 일들에 집중하고,
        </Typography>
        <Typography size={'P'}>다른 사람들이 알았으면 하거나 함께 하고 싶은 것을</Typography>
        <Typography size={'P'}>지도상에 표시 📍 하며 공유하는 커뮤니티입니다.</Typography>
        <br />
        <br />
        <Typography size={'P'}>현재는 서비스 초기 단계로, 일부 지역(서울 일부)만</Typography>
        <Typography size={'P'}>서비스를 진행하고 있어요. 차례차례 영역을 넓혀 갈</Typography>
        <Typography size={'P'}> 예정이니 기대해 주세요😊</Typography>
      </Styles.DescriptionSection>
      <Styles.ButtonSection>
        <Button text='다음' onClick={onNext} width={320} height={42} buttonType='PRIMARY' />
      </Styles.ButtonSection>
    </Styles.Container>
  )
}
