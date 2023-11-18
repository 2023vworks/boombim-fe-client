import { openModal, closeModal, type MODAL_TYPE } from '@/store/slices/modal.slice'
import { useDispatch } from 'react-redux'

function useModal() {
  const dispatch = useDispatch()

  const handleOpenModal = (type: MODAL_TYPE, props: any) => {
    dispatch(openModal({ modalType: type, props }))
  }

  const handleCloseModal = () => {
    dispatch(closeModal())
  }

  return { openModal: handleOpenModal, closeModal: handleCloseModal }
}

export default useModal
