// import axios from 'axios'
// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// const initialState = {
//   products: [],
//   paginationData: {},
//   product: null,
//   isLoading: false,
//   // TODO: developer-constraint: isLoading is used for all the above data variables. in case the
// }

// // get all products category-wise, filtered, sorted and paginated:
// export const getProducts = createAsyncThunk(
//   'products/getProducts',
//   async (params = {}, thunkAPI) => {
//     try {
//       const {
//         categoryId = null,
//         colors = [],
//         sizes = [],
//         pricesData = [],

//         pageNumber = 0,
//         pageSize = 10,
//         sortBy = 'id',
//         sortDirection = 'ASC',
//       } = params

//       const queryParams = new URLSearchParams()
//       if (categoryId) queryParams.append('categoryId', categoryId)
//       if (colors.length > 0) queryParams.append('colors', colors.join(','))
//       if (sizes.length > 0) queryParams.append('sizes', sizes.join(','))
//       if (pricesData.length > 0)
//         queryParams.append('pricesData', pricesData.join(','))
//       // if (pageNumber)
//       queryParams.append('page', pageNumber)
//       // if (pageSize)
//       queryParams.append('pageSize', pageSize)
//       // if (sortBy)
//       queryParams.append('sortBy', sortBy)
//       queryParams.append('sortDirection', sortDirection)

//       // TODO: for better readability, the below is better to be written as `${}` rather than ""
//       const response = await axios(
//         url + '/products-criteria-apiV2?' + queryParams.toString(),
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             // Authorization: `Bearer ${authToken}`,
//             Authorization: `Bearer ${authToken()}`,
//           },
//         }
//       )

//       // TODO: replace adding the jwt token here by adding/attaching it through a global interceptor
//       // TODO: replace the above by using axios instance (that is axios.create()) (and if wanted, add the interceptor) and then apply the get, post, put, delete methods

//       // console.log('product slice auth token', authToken())

//       return response.data
//     } catch (err) {
//       console.error('error fetching products', err.toJSON?.() || err)
//       return thunkAPI.rejectWithValue({ error: err.message })
//     }
//   }
// )

// // get one product by id:
// export const getProductById = createAsyncThunk(
//   'products/getProductById',
//   async (params = {}, thunkAPI) => {
//     try {
//       const { productId = null } = params

//       // TODO: for better readability, the below is better to be written as `${}` rather than ""
//       const response = await axios(url + '/' + productId, {
//         headers: {
//           'Content-Type': 'application/json',
//           // Authorization: `Bearer ${authToken}`,
//           Authorization: `Bearer ${authToken()}`,
//         },
//       })

//       // TODO: replace adding the jwt token here by adding/attaching it through a global interceptor
//       // TODO: replace the above by using axios instance (that is axios.create()) (and if wanted, add the interceptor) and then apply the get, post, put, delete methods

//       return response.data
//     } catch (error) {
//       return thunkAPI.rejectWithValue({ error: error.message })
//     }
//   }
// )

// const productsSlice = createSlice({
//   name: 'products',
//   initialState,
//   extraReducers: (builder) => {
//     builder
//       // get all products category-wise, filtered, sorted and paginated:
//       .addCase(getProducts.pending, (state) => {
//         state.isLoading = true
//       })
//       .addCase(getProducts.fulfilled, (state, action) => {
//         state.isLoading = false
//         state.products = action.payload.content
//         state.paginationData = action.payload.page
//       })
//       .addCase(getProducts.rejected, (state /*, action*/) => {
//         state.isLoading = false
//         state.products = []
//         state.paginationData = {}
//       })
//       // get one product by id:
//       .addCase(getProductById.pending, (state) => {
//         state.isLoading = true
//       })
//       .addCase(getProductById.fulfilled, (state, action) => {
//         state.isLoading = false
//         state.product = action.payload
//       })
//       .addCase(getProductById.rejected, (state /*, action*/) => {
//         state.isLoading = false
//         state.product = {}
//       })
//   },
// })

// export default productsSlice.reducer
