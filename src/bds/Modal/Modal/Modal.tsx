import { closeModal } from '@/store/slices/modal.slice'
import { useAppDispatch } from '@/store/store'
import * as Styles from './Modal.styles'

interface Props {
  children: React.ReactNode
}

function Modal({ children }: Props) {
  const dispatch = useAppDispatch()
  const handleClose = () => {
    dispatch(closeModal())
  }

  return (
    <>
      <Styles.Overlay
        onClick={(e) => {
          handleClose()
          e.preventDefault()
        }}
      />
      <Styles.ModalWrap>
        <Styles.Contents>{children}</Styles.Contents>
      </Styles.ModalWrap>
    </>
  )
}

export default Modal
