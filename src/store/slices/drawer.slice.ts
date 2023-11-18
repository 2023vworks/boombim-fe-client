import { type PayloadAction, createSlice } from '@reduxjs/toolkit'

interface DrawerInitialState {
  isOpen: boolean
  props: any
}

const initialState: DrawerInitialState = {
  isOpen: false,
  props: '',
}

const modalSlice = createSlice({
  name: 'drawerSlice',
  initialState,
  reducers: {
    openDrawer(state, action: PayloadAction<Pick<DrawerInitialState, 'props'>>) {
      const { props } = action.payload
      state.props = props
      state.isOpen = true
    },
    closeDrawer(state) {
      state.isOpen = false
    },
  },
})

export const { openDrawer, closeDrawer } = modalSlice.actions
export default modalSlice.reducer
