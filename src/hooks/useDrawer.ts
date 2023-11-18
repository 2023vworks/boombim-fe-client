import { openModal, closeModal, type MODAL_TYPE } from '@/store/slices/modal.slice'
import { useDispatch } from 'react-redux'

function useDrawer() {
  const dispatch = useDispatch()

  const handleOpenDrawer = (type: MODAL_TYPE, props: any) => {
    dispatch(openModal({ modalType: type, props }))
  }

  const handleCloseDrawer = () => {
    dispatch(closeModal())
  }

  return { openDrawer: handleOpenDrawer, closeDrawer: handleCloseDrawer }
}

export default useDrawer
