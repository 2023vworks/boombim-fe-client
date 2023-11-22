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
      state.props.title = props.title
      state.props.description = props.description
      state.props = props
      state.isOpen = true
    },
    closeModal(state) {
      state.isOpen = false
    },
    resetModalState(state) {
      return Object.assign(state, initialState)
    },
  },
})

export const { openModal, closeModal, resetModalState } = modalSlice.actions
export default modalSlice.reducer

export const MODAL = {
  ALERT: 'ALERT',
  CONFIRM: 'CONFIRM',
} as const

export type MODAL_TYPE = (typeof MODAL)[keyof typeof MODAL]
