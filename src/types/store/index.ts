import SocketClient from '../../utils/socket.ts'
import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from './rootReducer.ts'
// import socketMiddleware from '../middleware/socketMiddleware'

const socket = new SocketClient()

export const store = configureStore({
    reducer: rootReducer,
//   middleware: [socketMiddleware(socket), ...getDefaultMiddleware()],
})