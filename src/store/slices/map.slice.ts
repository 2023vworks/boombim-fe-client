import { type MAP_TYPE, type Position } from '@/types/map'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface Region {
  bupRegion: string
  hangRegoin: string
}

interface MapType {
  mapType: MAP_TYPE
}

interface MapInitialState {
  width: string
  height: string
  currentRegion: Region
  currentGeoLocation: Position | null
  mapType: MAP_TYPE
  currentPickMarkerPosition: { x: number; y: number }
}

export interface MapSize {
  width?: string
  height?: string
}

const initialState: MapInitialState = {
  width: '100%',
  height: '100%',
  currentRegion: { bupRegion: '', hangRegoin: '' },
  currentGeoLocation: null,
  mapType: 'NORMAL',
  currentPickMarkerPosition: { x: 0, y: 0 },
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
    setCurrentGeoLocation(state, action: PayloadAction<Position>) {
      state.currentGeoLocation = { ...action.payload }
    },
    setMapType(state, action: PayloadAction<MapType>) {
      state.mapType = action.payload.mapType
    },
    pickMarker(state, action: PayloadAction<Pick<MapInitialState, 'currentPickMarkerPosition'>>) {
      state.currentPickMarkerPosition = action.payload.currentPickMarkerPosition
    },
  },
})

export const { setMapSize, setRegion, setCurrentGeoLocation, setMapType } = mapSlice.actions
export default mapSlice.reducer
