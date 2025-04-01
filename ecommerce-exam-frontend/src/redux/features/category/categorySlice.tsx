import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'

const backendApiUrl: string = process.env.NEXT_PUBLIC_BACKEND_API_URL || ''

const initialState = {
  categories: [],
}

interface newCategoryOrder {
  id: string
  categoryListingOrder: string
}

export const updateCategoriesOrder = createAsyncThunk(
  'categories/updateCategoriesOrder',
  async (
    params: {
      authToken?: string
      newCategoriesOrder?: newCategoryOrder[]
    } = {},
    thunkAPI
  ) => {
    const {
      authToken = '',
      newCategoriesOrder = [],
    }: { authToken?: string; newCategoriesOrder?: newCategoryOrder[] } = params

    if (!authToken) {
      throw new Error('No auth token provided')
    }

    try {
      const response = await axios.put(
        `${backendApiUrl}/categories/update-categories-order`,
        newCategoriesOrder,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken as string}`,
          },
        }
      )

      return response.data
    } catch (err) {
      if (err instanceof AxiosError) {
        console.error(
          'error updating categories listing order',
          err.toJSON?.() || err
        )
        return thunkAPI.rejectWithValue({ error: err.message })
      }
      console.error('unknown updating categories listing order', err)
      return thunkAPI.rejectWithValue({ error: 'an unknown error occurred' })
    }
  }
)




export const getCategories = createAsyncThunk(
  'categories/getCategories',
  async (
    params: {
      authToken?: string
      newCategoriesOrder?: newCategoryOrder[]
    } = {},
    thunkAPI
  ) => {
    const {
      authToken = '',
    }: { authToken?: string } = params

    if (!authToken) {
      throw new Error('No auth token provided')
    }

    try {
      const response = await axios(
        `${backendApiUrl}/categories`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken as string}`,
          },
        }
      )

      return response.data
    } catch (err) {
      if (err instanceof AxiosError) {
        console.error(
          'error updating categories listing order',
          err.toJSON?.() || err
        )
        return thunkAPI.rejectWithValue({ error: err.message })
      }
      console.error('unknown updating categories listing order', err)
      return thunkAPI.rejectWithValue({ error: 'an unknown error occurred' })
    }
  }
)




const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // uodate categories listing order:
      .addCase(updateCategoriesOrder.pending, (/*state*/) => {})
      .addCase(updateCategoriesOrder.fulfilled, (state, action) => {
        state.categories = action.payload
      })
      .addCase(updateCategoriesOrder.rejected, (/*state , action*/) => {})
      // get categories:
      .addCase(getCategories.pending, (/*state*/) => {})
      .addCase(getCategories.fulfilled, (state, action) => {
        state.categories = action.payload
      })
      .addCase(getCategories.rejected, (state /*, action*/) => {
        state.categories = []
      })
  },
})

export const {} = categorySlice.actions

export default categorySlice.reducer
