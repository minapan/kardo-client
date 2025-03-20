import { createAsyncThunk } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'
import authorizeAxiosInstance from '~/utils/authorizeAxios'
import { API_ROOT } from '~/utils/constants'

// The initial state of the Slice in Redux
const initialState = {
  currUser: null
}

export const loginUserAPI = createAsyncThunk(
  'user/loginUserAPI',
  async (data) => {
    const response = await authorizeAxiosInstance.post(`${API_ROOT}/v1/users/login`, data)
    return response.data
  }
)

export const logoutUserAPI = createAsyncThunk(
  'user/logoutUserAPI',
  async (showSuccess = true) => {
    const response = await authorizeAxiosInstance.put(`${API_ROOT}/v1/users/logout`)
    if (showSuccess) toast.success('Logout successfully!')
    return response.data
  }
)

export const updateUserAPI = createAsyncThunk(
  'user/updateUserAPI',
  async (data) => {
    const response = await authorizeAxiosInstance.put(`${API_ROOT}/v1/users/update`, data)
    return response.data
  }
)

export const setup2FaAPI = createAsyncThunk(
  'user/setup2FaAPI',
  async (otpToken) => {
    const response = await authorizeAxiosInstance.post(`${API_ROOT}/v1/users/setup_2fa`, { otpToken })
    return response.data
  }
)

export const verify2FaAPI = createAsyncThunk(
  'user/verify2FaAPI',
  async (otpToken ) => {
    const response = await authorizeAxiosInstance.put(`${API_ROOT}/v1/users/verify_2fa`, { otpToken })
    return response.data
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  // Reducers: Handle data from sync actions
  reducers: {},
  // ExtraReducers: Handle data from async actions
  extraReducers: (builder) => {
    builder.addCase(loginUserAPI.fulfilled, (state, action) => {
      const user = action.payload // action.payload = the data returned by the API (response.data)

      // Update state
      state.currUser = user
    })
    builder.addCase(logoutUserAPI.fulfilled, (state) => {
      // Update state
      state.currUser = null
    })
    builder.addCase(updateUserAPI.fulfilled, (state, action) => {
      const user = action.payload
      state.currUser = user
    }),
    builder.addCase(setup2FaAPI.fulfilled, (state, action) => {
      const user = action.payload
      state.currUser = user
    }),
    builder.addCase(verify2FaAPI.fulfilled, (state, action) => {
      const user = action.payload
      state.currUser = user
    })
  }
})

// Action creators are generated for each case reducer function
// export const {} = userSlice.actions

// Selectors:
export const selectCurrUser = state => state.user.currUser

export const userReducer = userSlice.reducer