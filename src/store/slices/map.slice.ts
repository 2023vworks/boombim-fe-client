import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface MapInitialState {
  width: string
  height: string
}

export interface MapSize {
  width?: string
  height?: string
}

const initialState: MapInitialState = { width: '100%', height: '100%' }

const mapSlice = createSlice({
  name: 'mapSlice',
  initialState,
  reducers: {
    setMapSize(state, action: PayloadAction<MapSize>) {
      if (action.payload.width) {
        state.width = action.payload.width
      }
      if (action.payload.height) {
        state.height = action.payload.height
      }
    },
  },
})

export const { setMapSize } = mapSlice.actions
export default mapSlice.reducer
