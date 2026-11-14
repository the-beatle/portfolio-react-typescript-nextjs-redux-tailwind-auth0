import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

import contactReducer from '../slices/contactSlice'

export function makeStore() {
  return configureStore({
    reducer: { contact: contactReducer },
  })
}

const store = makeStore()

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>

export default store
