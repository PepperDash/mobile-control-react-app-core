import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from './rootReducer.ts'

export const store = configureStore({
    reducer: rootReducer,
})
