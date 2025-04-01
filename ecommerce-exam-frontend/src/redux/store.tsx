import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/authentication/authSlice'
import productReducer from './features/products/productsSlice'
import cartReducer from './features/cartSlice/cartSlice'
import modalReducer from './features/modal/modalSlice'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    cart: cartReducer,
    modal: modalReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Custom hooks for use in components
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
