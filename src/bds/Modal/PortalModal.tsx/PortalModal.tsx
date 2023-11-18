/* eslint-disable @typescript-eslint/indent */
import { useAppSelector } from '@/store/store'
import { useCallback } from 'react'
import ReactDOM from 'react-dom'
import Modal from '../Modal/Modal'
import { AlertModal } from '../AlertModal/AlertModal'
import { ConfirmModal } from '../ConfirmModal/ConfirmModal'

export const PortalModal = () => {
  const { modalType, isOpen, props } = useAppSelector((state) => state.modal)

  const ModalComponent = useCallback(() => {
    switch (modalType) {
      case 'ALERT':
        return <AlertModal {...props} />
      case 'CONFIRM':
        return <ConfirmModal {...props} />
    }
  }, [modalType])

  const modalRoot = document.querySelector('#modal-root') as HTMLElement

  return isOpen
    ? ReactDOM.createPortal(
        <Modal>
          <ModalComponent />
        </Modal>,
        modalRoot,
      )
    : null
}
