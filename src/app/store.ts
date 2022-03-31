import {configureStore, ThunkAction, Action, getDefaultMiddleware } from '@reduxjs/toolkit'
import createSagaMiddleware from "redux-saga"

import contactReducer from '../slices/contactSlice'
import catsReducer from "../slices/catState"
import catSaga from "../slices/catSaga"

const sagaMiddleware = createSagaMiddleware()

const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];


export function makeStore() {
    const store = configureStore({
        reducer: {contact: contactReducer, cats: catsReducer},
        middleware
    })
    sagaMiddleware.run(catSaga)
    return store
}

const store = makeStore()

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    AppState,
    unknown,
    Action<string>>

export default store
