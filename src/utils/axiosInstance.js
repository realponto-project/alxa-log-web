import axios from 'axios'
import { pathOr } from 'ramda'

const baseURL = `${process.env.REACT_APP_API_URL}/api`

const axiosInstance = axios.create({ baseURL })

axiosInstance.interceptors.request.use((config) => ({
  ...config,
  headers: {
    ...config.headers,
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
}))

axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
  const statusCode = pathOr(null, ['response', 'status'], error)

  if (statusCode === 401 || statusCode === 403) {
    window.onerror(`authorization: ${statusCode}`, window.location.href)
    window.location.href = '/#/login'
  }
  return Promise.reject(error.response);
})



export default axiosInstance
