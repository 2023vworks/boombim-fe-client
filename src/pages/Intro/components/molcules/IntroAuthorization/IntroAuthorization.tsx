import { Button } from '@/bds/Button/Button'
import * as Styles from './IntroAuthorization.styles'
import { Typography } from '@/bds/Typography/Typography'

interface Props {
  onNext: () => void
}

export const IntroAuthorization = ({ onNext }: Props): React.ReactNode => {
  return (
    <Styles.Container>
      <Styles.DescriptionSection>
        <Typography size={'P'}> 붐빔을 즐기기 위해 필요한 권한들을 안내드려요 😊</Typography>
        <Styles.SubTitle>
          <Typography size={'P'} fontWeight={700}>
            📍 위치 <Styles.TitleOption>(선택)</Styles.TitleOption>
          </Typography>
        </Styles.SubTitle>
        <Styles.Detail>
          <Typography size={'SMALL'}>사용자의 위치를 기반으로 주변 피드 탐색 및 글 작성</Typography>
          <Typography size={'SMALL'} fontWeight={300}>
            위치 접근 권한을 동의하지 않으신 경우, 서비스 내에서 글을 등록
          </Typography>
          <Typography size={'SMALL'} fontWeight={300}>
            하실 수 없습니다.
          </Typography>
        </Styles.Detail>
        <Styles.SubTitle>
          <Typography size={'P'} fontWeight={700}>
            📷 카메라 <Styles.TitleOption>(선택)</Styles.TitleOption>{' '}
          </Typography>
        </Styles.SubTitle>
        <Styles.Detail>
          <Typography size={'SMALL'}>글 작성 시 첨부하기 위한 사진 촬영</Typography>
          <Typography size={'SMALL'} fontWeight={300}>
            추후 글 작성 시 동의 여부를 결정하실 수 있습니다.
          </Typography>
        </Styles.Detail>
      </Styles.DescriptionSection>
      <Styles.ButtonSection>
        <Button text='권한 동의하기' onClick={onNext} width={320} height={42} buttonType='PRIMARY' />
      </Styles.ButtonSection>
    </Styles.Container>
  )
}
