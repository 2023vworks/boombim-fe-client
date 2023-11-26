import { createSlice } from '@reduxjs/toolkit'

interface InitialState {
  isConfirmService: boolean
}

const initialState: InitialState = {
  isConfirmService: false,
}

const introSlice = createSlice({
  name: 'introSlice',
  initialState,
  reducers: {
    confirmService(state) {
      state.isConfirmService = true
    },
    unConfirmService(state) {
      state.isConfirmService = false
    },
  },
})

export const { confirmService, unConfirmService } = introSlice.actions
export default introSlice.reducer
