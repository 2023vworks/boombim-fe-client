import { Button } from '@/bds/Button/Button'
import * as Styles from './ConfirmModal.styles'
import { Typography } from '@/bds/Typography/Typography'

interface Props {
  title: React.ReactNode
  description?: string
  confirmOption?: { text: string; onClick: () => void }
  cancleOption?: { text: string; onClick: () => void }
}

export const ConfirmModal = ({ title, description, confirmOption, cancleOption }: Props) => {
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
        <Button buttonType='OUTLINE' width={278} text={confirmOption?.text} onClick={confirmOption?.onClick} />
        <Button buttonType='PRIMARY' width={278} text={cancleOption?.text} onClick={cancleOption?.onClick} />
      </Styles.Bottom>
    </Styles.Container>
  )
}
