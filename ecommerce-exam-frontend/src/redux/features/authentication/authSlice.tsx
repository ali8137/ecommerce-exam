// 'use client'

import axios, { AxiosError } from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// sign up
// login/sign in
// logout

const url = 'http://localhost:8080/api'
// TODO: it is better to add the above url in the development .env.development file

// Load token from localStorage if it exists
// const token: string = typeof window !== "undefined" ? localStorage.getItem('token') || '' : ''

interface AuthState {
  token: string | null
  isAuthenticated: boolean
}

const initialState: AuthState = {
  token: null,
  isAuthenticated: false as boolean,
}

interface LoginParams {
  email?: string
  password?: string
}

// login:
export const login = createAsyncThunk(
  'auth/authenticate',
  async (params: LoginParams = {}, thunkAPI) => {
    try {
      const { email = '', password = '' } = params

      const response = await axios.post(
        `${url}/auth/authenticate`,
        { email: email, password: password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      return response.data
    } catch (err) {
      if (err instanceof AxiosError) {
        console.error('login error', err.toJSON?.() || err)
        return thunkAPI.rejectWithValue({ error: err.message })
      }
      console.error('unknown login error', err)
      return thunkAPI.rejectWithValue({ error: 'an unknown error occurred' })
    }
  }
)

interface registerParams {
  firstName?: string
  lastName?: string
  email?: string
  password?: string
}

// TODO: when a user registers, create a cart for him
// register:
export const register = createAsyncThunk(
  'auth/register',
  async (params: registerParams = {}, thunkAPI) => {
    try {
      const {
        firstName = '',
        lastName = '',
        email = '',
        password = '',
      } = params

      const response = await axios.post(
        `${url}/auth/register`,
        {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      return response.data
    } catch (err) {
      if (err instanceof AxiosError) {
        console.error('error registering', err.toJSON?.() || err)
        return thunkAPI.rejectWithValue({ error: err.message })
      }
      console.error('error registering', err)
      return thunkAPI.rejectWithValue({ error: 'an unknown error occurred' })
    }
  }
)

interface isUserAuthenticatedParams {
  token?: string
}

// check if the token is expired:
export const isUserAuthenticated = createAsyncThunk(
  'auth/isUserAuthenticated',
  // async (_ /*params = {}*/, thunkAPI) => {
  async (params: isUserAuthenticatedParams = {}, thunkAPI) => {

    const { token = '' } = params

    // check if there is token:
    if (!token) {
      return false
    }

    // check if the token is expired:
    try {
      // TODO: for better readability, the below is better to be written as `${}` rather than ""
      const response = await axios(
        `${url}/auth/isTokenExpired/${token}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      return !response.data
    } catch (err) {
      if (err instanceof AxiosError) {
        console.error(
          'error checking if the user is authenticated',
          err.toJSON?.() || err
        )
        return thunkAPI.rejectWithValue({ error: err.message })
      }
      console.error('unknown error checking if the user is authenticated', err)
      return thunkAPI.rejectWithValue({ error: 'an unknown error occurred' })
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state /*, action*/) => {
      state.token = null
      state.isAuthenticated = false
      localStorage.removeItem('token') // remove token
    },
  },
  extraReducers: (builder) => {
    builder
      // login:
      .addCase(login.pending, (/*state*/) => {})
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.accessToken
        localStorage.setItem('token', action.payload.accessToken) // store token
      })
      .addCase(login.rejected, (/*state, action*/) => {})
      // register:
      .addCase(register.pending, (/*state*/) => {})
      .addCase(register.fulfilled, (state, action) => {
        state.token = action.payload.accessToken
        localStorage.setItem('token', action.payload.accessToken) // store token
      })
      .addCase(register.rejected, (/*state, action*/) => {})
      // isTokenExpired:
      .addCase(isUserAuthenticated.pending, (/*state*/) => {})
      .addCase(isUserAuthenticated.fulfilled, (state, action) => {
        if (action.payload === false) {
          state.token = null
          state.isAuthenticated = false
          localStorage.removeItem('token') // remove token
        }
      })
      .addCase(isUserAuthenticated.rejected, (/*state, action*/) => {})
  },
})

export const { logout } = authSlice.actions

export default authSlice.reducer
