import { createAsyncThunk } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import authorizeAxiosInstance from '~/utils/authorizeAxios'
import { API_ROOT } from '~/utils/constants'

// The initial state of the Slice in Redux
const initialState = {
  currNotifications: null
}

export const fetchInvitationsAPI = createAsyncThunk(
  'notifications/fetchInvitationsAPI',
  async () => {
    const response = await authorizeAxiosInstance.get(`${API_ROOT}/v1/invitations`)
    return response.data
  }
)

export const updateBoardInvitationAPI = createAsyncThunk(
  'notifications/updateBoardInvitationAPI',
  async ({ status, invitationId }) => {
    const response = await authorizeAxiosInstance.put(`${API_ROOT}/v1/invitations/board/${invitationId}`, { status })
    return response.data
  }
)

export const deleteInvitationAPI = createAsyncThunk(
  'notifications/deleteInvitationAPI',
  async (invitationId) => {
    const response = await authorizeAxiosInstance.delete(`${API_ROOT}/v1/invitations/${invitationId}`)
    return response.data
  }
)

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  // Reducers: Handle data from sync actions
  reducers: {
    clearCurrNotifications: (state) => {
      state.currNotifications = null
    },
    updateCurrNotifications: (state, action) => {
      state.currNotifications = action.payload
    },
    addNotification: (state, action) => {
      state.currNotifications.unshift(action.payload)
    }
  },
  // ExtraReducers: Handle data from async actions
  extraReducers: (builder) => {
    builder.addCase(fetchInvitationsAPI.fulfilled, (state, action) => {
      let incommingInvitations = action.payload

      // Update state
      state.currNotifications = Array.isArray(incommingInvitations) ? incommingInvitations.reverse() : []
    })
    builder.addCase(updateBoardInvitationAPI.fulfilled, (state, action) => {
      const incommingInvitation = action.payload
      const getInvitation = state.currNotifications.find(i => i._id === incommingInvitation._id)
      getInvitation.boardInvitation = incommingInvitation.boardInvitation
    })
    builder.addCase(deleteInvitationAPI.fulfilled, (state, action) => {
      const deletedInvitationId = action.payload
      state.currNotifications = state.currNotifications.filter(i => i._id !== deletedInvitationId)
    })
  }
})

// Action creators are generated for each case reducer function
export const {
  clearCurrNotifications,
  updateCurrNotifications,
  addNotification
} = notificationsSlice.actions

// Selectors:
export const selectCurrNotifications = state => state.notifications.currNotifications

export const notificationsReducer = notificationsSlice.reducer