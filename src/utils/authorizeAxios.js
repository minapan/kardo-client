import axios from 'axios'
import { toast } from 'react-toastify'
import { interceptorLoadingElements } from './formatters'

const authorizeAxiosInstance = axios.create({

})

// Add a request interceptor
authorizeAxiosInstance.interceptors.request.use((config) => {
  // Prevent spam clicks
  interceptorLoadingElements(true)
  return config
}, (error) => {
  // Do something with request error
  return Promise.reject(error)
})

// Add a response interceptor
authorizeAxiosInstance.interceptors.response.use((response) => {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Prevent spam clicks
  interceptorLoadingElements(false)
  return response
}, (error) => {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  interceptorLoadingElements(false)
  let errorMessage = error?.message
  if (error?.response?.data?.message) {
    errorMessage = error?.response?.data?.message
  }
  if (error.response?.status !== 410) toast.error(errorMessage)
  return Promise.reject(error)
})

authorizeAxiosInstance.defaults.timeout = 1000 * 60 * 10

authorizeAxiosInstance.defaults.withCredentials = true

export default authorizeAxiosInstance