import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface Region {
  bupRegion: string
  hangRegoin: string
}

interface MapInitialState {
  width: string
  height: string
  currentRegion: Region
}

export interface MapSize {
  width?: string
  height?: string
}

const initialState: MapInitialState = {
  width: '100%',
  height: '100%',
  currentRegion: { bupRegion: '', hangRegoin: '' },
}

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
    setRegion(state, action: PayloadAction<Region>) {
      state.currentRegion = { bupRegion: action.payload.bupRegion, hangRegoin: action.payload.hangRegoin }
    },
  },
})

export const { setMapSize, setRegion } = mapSlice.actions
export default mapSlice.reducer
