import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'

const backendApiUrl: string = process.env.NEXT_PUBLIC_BACKEND_API_URL || ''

const initialState = {
  cartItems: [],
  subTotalPrice: 0,
  // totalAmount: 0,
}

interface Token {
  authToken?: string
}

// the below function will always return an array of one cart
// get the cart items inside the cart:
export const getCartItems = createAsyncThunk(
  'cart/getCartItems',
  async (params: Token = {}, thunkAPI) => {
    const { authToken = '' } = params

    try {
      const response = await axios(`${backendApiUrl}/cart/get-carts`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      })

      return response.data
    } catch (err) {
      if (err instanceof AxiosError) {
        console.error('error fetching cart items', err.toJSON?.() || err)
        return thunkAPI.rejectWithValue({ error: err.message })
      }
      console.error('unknown error fetching cart items', err)
      return thunkAPI.rejectWithValue({ error: 'an unknown error occurred' })
    }
  }
)

interface Product {
  authToken?: string
  productId?: string
}

// add cart item:
export const addToCart = createAsyncThunk(
  'cart/addToCartRequest',
  async (params: Product = {}, thunkAPI) => {
    try {
      const { authToken = '', productId = '' } = params

      console.log("authToken", authToken || "no token")

      console.log('product id', productId)

      const response = await axios.post(
        `${backendApiUrl}/cart/add-cart-item`,
        { product: { id: productId as string } },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      // TODO: replace adding the jwt token here by adding/attaching it through a global interceptor

      // TODO: replace the above by using axios instance (that is axios.create()) (and if wanted, add the interceptor) and then apply the get, post, put, delete methods

      return response.data
    } catch (err) {
      if (err instanceof AxiosError) {
        console.error('error adding a cart item', err.toJSON?.() || err)
        return thunkAPI.rejectWithValue({ error: err.message })
      }
      console.error('unknown error adding a cart item', err)
      return thunkAPI.rejectWithValue({ error: 'an unknown error occurred' })
    }
  }
)

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get user cart(s):
      .addCase(getCartItems.pending, (/*state*/) => {})
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.cartItems = action.payload[0].cartItems
        state.subTotalPrice = action.payload[0].totalPrice
      })
      .addCase(getCartItems.rejected, (state /*, action*/) => {
        state.cartItems = []
        state.subTotalPrice = 0
      })
      // add product to cart:
      .addCase(addToCart.pending, (/*state*/) => {})
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cartItems = action.payload[0].cartItems
        state.subTotalPrice = action.payload[0].totalPrice
      })
      .addCase(addToCart.rejected, (state /*, action*/) => {
        state.cartItems = []
      })
  },
})

export const {} = cartSlice.actions

export default cartSlice.reducer
