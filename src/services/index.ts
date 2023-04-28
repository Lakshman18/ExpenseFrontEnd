import axios from 'axios'
import { APP_CONFIGS } from '../constants'
import { exceptionHandler } from '../core'

axios.defaults.baseURL = APP_CONFIGS.API_BASE
export const axiosPrivateInstance = axios.create()

// intercepting private API calls with Token
axiosPrivateInstance.interceptors.request.use(async (request) => {
  return request
}, (error) => {
  // eslint-disable-next-line no-console
  console.log('Request Error', error)
})

// intercepting Private API calls Errors
axiosPrivateInstance.interceptors.response.use(async (response) => {
  return response
}, async (error) => {
  return Promise.reject(await exceptionHandler.catchError(error.response))
})

export * from './trip.service'
export * from './installment.service'
export * from './user.service'
