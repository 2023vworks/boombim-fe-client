import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface initialStateType {
  selectedMarkerId: null | number
  isFromFeeds: boolean
}
const initialState: initialStateType = {
  selectedMarkerId: null,
  isFromFeeds: false,
}

const markerSlice = createSlice({
  name: 'markerSlice',
  initialState,
  reducers: {
    setSelectedMarker: (state, action: PayloadAction<{ selectedMarkerId: number; isFromFeeds?: boolean }>) => {
      state.selectedMarkerId = action.payload.selectedMarkerId
      state.isFromFeeds = action.payload.isFromFeeds ?? false
    },
  },
})

export const { setSelectedMarker } = markerSlice.actions
export default markerSlice.reducer
