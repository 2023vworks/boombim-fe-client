import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface MapInitialState {
  width: string
  height: string
}

const initialState: MapInitialState = { width: '500px', height: '500px' }

const mapSlice = createSlice({
  name: 'mapSlice',
  initialState,
  reducers: {
    setMapSize(state, action: PayloadAction<{ width: string; height: string }>) {
      console.log('hitslice', action)
      state.width = action.payload.width
      state.height = action.payload.height
    },
  },
})

export const { setMapSize } = mapSlice.actions
export default mapSlice.reducer
