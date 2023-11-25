import { type AnyAction, type ThunkDispatch, configureStore } from '@reduxjs/toolkit'
import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import mapSlice from './slices/map.slice'
import modalSlice from './slices/modal.slice'
import { boombimApi } from '@/store/asyncSlice/asyncSlice'
import drawerSlice from './slices/drawer.slice'
import imageSlice from '@/store/slices/image.slice'
import cameraSlice from '@/store/slices/camera.slice'
import markerSlice from './slices/mark.slice'

const store = configureStore({
  reducer: {
    map: mapSlice,
    modal: modalSlice,
    camera: cameraSlice,
    drawer: drawerSlice,
    image: imageSlice,
    marker: markerSlice,
    [boombimApi.reducerPath]: boombimApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(boombimApi.middleware),
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = (): ThunkDispatch<any, undefined, AnyAction> => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
