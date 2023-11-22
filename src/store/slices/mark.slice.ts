import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface initialStateType {
  selectedMarker: null | number
}
const initialState: initialStateType = {
  selectedMarker: null,
}

const markerSlice = createSlice({
  name: 'markerSlice',
  initialState,
  reducers: {
    setSelectedMarker: (state, action: PayloadAction<number>) => {
      state.selectedMarker = action.payload
    },
  },
})

export const { setSelectedMarker } = markerSlice.actions
export default markerSlice.reducer
