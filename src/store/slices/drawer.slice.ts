import { type PayloadAction, createSlice } from '@reduxjs/toolkit'

export const UNION_DRAWER_TYPE = {
  FEED_DETAIL_TYPE: 'DETAIL',
  FEED_CREATE_TYPE: 'FEED_CREATE_TYPE',
} as const

type DrawerType = (typeof UNION_DRAWER_TYPE)[keyof typeof UNION_DRAWER_TYPE]

interface DrawerInitialState {
  isOpen: boolean
  drawerType: DrawerType | null
}

const initialState: DrawerInitialState = {
  isOpen: false,
  drawerType: null,
}

const modalSlice = createSlice({
  name: 'drawerSlice',
  initialState,
  reducers: {
    openDrawer(state, action: PayloadAction<Pick<DrawerInitialState, 'drawerType'>>) {
      const { drawerType } = action.payload
      state.drawerType = drawerType
      state.isOpen = true
    },
    closeDrawer(state) {
      state.isOpen = false
      state.drawerType = null
    },
  },
})

export const { openDrawer, closeDrawer } = modalSlice.actions
export default modalSlice.reducer
