import type {AppState, AppThunk} from '../app/store'


import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'


export interface catState {
    cats: any
    isLoading: boolean
}

const initialState: catState = {
    cats: null,
    isLoading: false
}

export const catState = createSlice({
    name: 'cats',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        getCatsFetch: (state) => {
            state.isLoading = true;
        },
        getCatsSuccess: (state, action) => {
            state.cats = action.payload;
            state.isLoading = false;
        },
        getCatsFailure: (state) => {
            state.isLoading = false;
        },
    },
})

export const {getCatsFetch, getCatsSuccess, getCatsFailure} = catState.actions

export default catState.reducer