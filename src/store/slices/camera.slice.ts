import { createSlice } from '@reduxjs/toolkit'

interface CameraInitialState {
  isOpen: boolean
}

const initialState: CameraInitialState = {
  isOpen: false,
}

const cameraSlice = createSlice({
  name: 'cameraSlice',
  initialState,
  reducers: {
    openCamera(state) {
      state.isOpen = true
    },
    closeCamera(state) {
      state.isOpen = false
    },
  },
})

export const { openCamera, closeCamera } = cameraSlice.actions
export default cameraSlice.reducer
