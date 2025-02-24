import { createAsyncThunk } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
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
  }
})

// Action creators are generated for each case reducer function
// export const {} = userSlice.actions

// Selectors:
export const selectCurrUser = state => state.user.currUser

export const userReducer = userSlice.reducer