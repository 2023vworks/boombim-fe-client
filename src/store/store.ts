import { type AnyAction, type ThunkDispatch, configureStore } from '@reduxjs/toolkit'
import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import mapSlice from './slices/map.slice'
import modalSlice from './slices/modal.slice'

const store = configureStore({
  reducer: { map: mapSlice, modal: modalSlice },
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = (): ThunkDispatch<any, undefined, AnyAction> => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
