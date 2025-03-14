import { toast } from 'react-toastify'
import authorizeAxiosInstance from '~/utils/authorizeAxios'
import { API_ROOT } from '~/utils/constants'

// Moved to redux
// export const fetchBoardDetailsAPI = async (boardId) => {
//   const response = await authorizeAxiosInstance.get(`${API_ROOT}/v1/boards/${boardId}`)
//   return response.data
// }

export const updateBoardDetailsAPI = async (boardId, updateData) => {
  const response = await authorizeAxiosInstance.put(`${API_ROOT}/v1/boards/${boardId}`, updateData)
  return response.data
}

export const moveCardToDiffColAPI = async (updateData) => {
  const response = await authorizeAxiosInstance.put(`${API_ROOT}/v1/boards/supports/moving_card`, updateData)
  return response.data
}

export const createNewColAPI = async (newColData) => {
  const response = await authorizeAxiosInstance.post(`${API_ROOT}/v1/columns/`, newColData)
  return response.data
}

export const updateColDetailsAPI = async (columnId, updateData) => {
  const response = await authorizeAxiosInstance.put(`${API_ROOT}/v1/columns/${columnId}`, updateData)
  return response.data
}

export const deleteColDetailsAPI = async (columnId) => {
  const response = await authorizeAxiosInstance.delete(`${API_ROOT}/v1/columns/${columnId}`)
  return response.data
}

export const createNewCardAPI = async (newCardData) => {
  const response = await authorizeAxiosInstance.post(`${API_ROOT}/v1/cards/`, newCardData)
  return response.data
}

export const registerUserAPI = async (registerData) => {
  const response = await authorizeAxiosInstance.post(`${API_ROOT}/v1/users/register`, registerData)
  toast.success('Account created successfully! Please check your email to verify your account!')
  return response.data
}

export const verifyUserAPI = async (verifyData) => {
  const response = await authorizeAxiosInstance.put(`${API_ROOT}/v1/users/verify`, verifyData)
  toast.success('Account verified successfully! Now you can login to enjoy our services! Have a good day!')
  return response.data
}

export const refreshTokenAPI = async () => {
  const response = await authorizeAxiosInstance.get(`${API_ROOT}/v1/users/refresh-token`)
  return response.data
}

export const fetchBoardsAPI = async (searchPath) => {
  const response = await authorizeAxiosInstance.get(`${API_ROOT}/v1/boards${searchPath}`)
  return response.data
}

export const createNewBoardAPI = async (data) => {
  const response = await authorizeAxiosInstance.post(`${API_ROOT}/v1/boards/`, data)
  toast.success('Board created successfully!')
  return response.data
}

export const updateCardDetailsAPI = async (cardId, updateData) => {
  const response = await authorizeAxiosInstance.put(`${API_ROOT}/v1/cards/${cardId}`, updateData)
  return response.data
}

export const inviteUserToBoardAPI = async (data) => {
  const response = await authorizeAxiosInstance.post(`${API_ROOT}/v1/invitations/board`, data)
  toast.success('Invitation sent successfully!')
  return response.data
}