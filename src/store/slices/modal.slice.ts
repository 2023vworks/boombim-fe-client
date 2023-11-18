import { type PayloadAction, createSlice } from '@reduxjs/toolkit'

interface ModalInitialState {
  isOpen: boolean
  modalType: MODAL_TYPE
  props: {
    title: React.ReactNode
    description?: string
    confirmOption?: { text: string; onClick: () => void }
    cancleOption?: { text: string; onClick: () => void }
  }
}

const initialState: ModalInitialState = {
  isOpen: false,
  modalType: 'ALERT',
  props: { title: '' },
}

const modalSlice = createSlice({
  name: 'modalSlice',
  initialState,
  reducers: {
    openModal(state, action: PayloadAction<Pick<ModalInitialState, 'modalType' | 'props'>>) {
      const { modalType, props } = action.payload
      state.modalType = modalType
      state.props = props
      state.isOpen = true
    },
    closeModal(state) {
      state.isOpen = false
    },
  },
})

export const { openModal, closeModal } = modalSlice.actions
export default modalSlice.reducer

export const MODAL = {
  ALERT: 'ALERT',
  CONFIRM: 'CONFIRM',
} as const

export type MODAL_TYPE = (typeof MODAL)[keyof typeof MODAL]
