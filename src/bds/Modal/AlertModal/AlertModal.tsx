import { Typography } from '@/bds/Typography/Typography'
import * as Styles from './AlertModal.styles'
import { Button } from '@/bds/Button/Button'

interface Props {
  title: React.ReactNode
  description?: string
  confirmOption?: { text: string; onClick: () => void }
}

export const AlertModal = ({ title, description, confirmOption }: Props) => {
  const handleButtonClick = () => {
    confirmOption?.onClick()
  }
  return (
    <Styles.Container>
      <Styles.Top>
        {title}
        {description && (
          <Styles.Description>
            <Typography size='P' fontWeight={400} color='black' lineHeight={'21px'}>
              {description}
            </Typography>
          </Styles.Description>
        )}
      </Styles.Top>
      <Styles.Bottom>
        <Button buttonType='PRIMARY' text='닫기' width={278} onClick={handleButtonClick} height={42} />
      </Styles.Bottom>
    </Styles.Container>
  )
}
