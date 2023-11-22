import { type PayloadAction, createSlice } from '@reduxjs/toolkit'

export const UNION_DRAWER_TYPE = {
  FEED_DETAIL_TYPE: 'DETAIL',
  FEED_CREATE_TYPE: 'FEED_CREATE_TYPE',
} as const

type DrawerType = (typeof UNION_DRAWER_TYPE)[keyof typeof UNION_DRAWER_TYPE]

interface DrawerInitialState {
  isOpen: boolean
  drawerType: DrawerType | null
  id: number | null
}

const initialState: DrawerInitialState = {
  isOpen: false,
  drawerType: null,
  id: null,
}

const drawerSlice = createSlice({
  name: 'drawerSlice',
  initialState,
  reducers: {
    openDrawer(state, action: PayloadAction<{ drawerType: DrawerType; id: number }>) {
      const { drawerType, id } = action.payload
      state.drawerType = drawerType
      state.id = id
      state.isOpen = true
    },
    closeDrawer(state) {
      state.isOpen = false
      state.drawerType = null
      state.id = null
    },
  },
})

export const { openDrawer, closeDrawer } = drawerSlice.actions
export default drawerSlice.reducer
