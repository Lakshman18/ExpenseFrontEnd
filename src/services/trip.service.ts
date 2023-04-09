import { AxiosResponse } from 'axios'
import axios from 'axios'
import { TripSummaryData, TripExpenseDataSet, TripExpenseData } from '../models'
// import { axiosPrivateInstance } from './index'

const getTrips = (): Promise<AxiosResponse<TripSummaryData[]>> => {
  return axios.get('/getTrips')
}

const deleteTrip = (tripId: string): Promise<AxiosResponse<void>> => {
  return axios.delete('/deleteTrip/'+tripId)
}

const saveUpdateTrip = (saveTripObj: TripSummaryData): Promise<AxiosResponse<TripSummaryData>> => {
  return axios.post('/createTrips', saveTripObj)
}

const getTripExpenses = (tripId: string): Promise<AxiosResponse<TripExpenseDataSet[]>> => {
  return axios.get('/getTripExpensess/'+tripId)
}

const saveUpdateTripExpense = (saveTripObj: TripExpenseData): Promise<AxiosResponse<TripExpenseData>> => {
  return axios.post('/createTripExpenses', saveTripObj)
}

const deleteTripExpense = (tripExpenseId: string): Promise<AxiosResponse<void>> => {
  return axios.delete('/deleteTripExpense/'+tripExpenseId)
}

export const tripService = {
  getTrips,
  deleteTrip,
  saveUpdateTrip,
  getTripExpenses,
  saveUpdateTripExpense,
  deleteTripExpense
}
