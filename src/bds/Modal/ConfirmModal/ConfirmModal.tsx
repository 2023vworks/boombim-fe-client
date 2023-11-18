import { Button } from '@/bds/Button/Button'
import * as Styles from './ConfirmModal.styles'

interface Props {
  title: React.ReactNode
  confirmOption?: { text: string; onClick: () => void }
  cancleOption?: { text: string; onClick: () => void }
}

export const ConfirmModal = ({ title, confirmOption, cancleOption }: Props) => {
  return (
    <Styles.Container>
      <Styles.Top>{title}</Styles.Top>
      <Styles.Bottom>
        <Button buttonType='OUTLINE' width={278} text={confirmOption?.text} onClick={confirmOption?.onClick} />
        <Button buttonType='PRIMARY' width={278} text={cancleOption?.text} onClick={cancleOption?.onClick} />
      </Styles.Bottom>
    </Styles.Container>
  )
}
