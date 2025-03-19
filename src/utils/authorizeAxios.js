import axios from 'axios'
import { interceptorLoadingElements } from './formatters'
import { logoutUserAPI } from '~/redux/user/userSlice'
import { refreshTokenAPI } from '~/apis'
import toast from 'react-hot-toast'

let axiosreduxStore
export const injectStore = (mainStore) => { axiosreduxStore = mainStore }

const authorizeAxiosInstance = axios.create({})

authorizeAxiosInstance.defaults.timeout = 1000 * 60 * 10

authorizeAxiosInstance.defaults.withCredentials = true

// Add a request interceptor
authorizeAxiosInstance.interceptors.request.use((config) => {
  // Prevent spam clicks
  interceptorLoadingElements(true)
  return config
}, (error) => {
  // Do something with request error
  return Promise.reject(error)
})

let refreshTokenPromise = null

// Add a response interceptor
authorizeAxiosInstance.interceptors.response.use((response) => {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Prevent spam clicks
  interceptorLoadingElements(false)
  return response
}, (error) => {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  interceptorLoadingElements(false)

  if (error.response?.status === 401) axiosreduxStore.dispatch(logoutUserAPI(false))

  const originalRequests = error.config
  if (error.response?.status === 410 && !originalRequests._retry) {
    originalRequests._retry = true

    if (!refreshTokenPromise) {
      refreshTokenPromise = refreshTokenAPI()
        .then(data => {
          return data?.accessToken
        })
        .catch((_err) => {
          axiosreduxStore.dispatch(logoutUserAPI(false))
          return Promise.reject(_err)
        })
        .finally(() => { refreshTokenPromise = null })
    }

    return refreshTokenPromise.then(accessToken => {
      // originalRequests.headers.Authorization = `Bearer ${accessToken}`
      return authorizeAxiosInstance(originalRequests)
    })
  }

  let errorMessage = error?.message
  if (error?.response?.data?.message) {
    errorMessage = error?.response?.data?.message
  }
  if (error.response?.status !== 410) toast.error(errorMessage)
  return Promise.reject(error)
})


export default authorizeAxiosInstance