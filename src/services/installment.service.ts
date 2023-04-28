import { AxiosResponse } from 'axios'
import axios from 'axios'
import { InstallmentData, InstallmentDataSet } from '../models'
 

const getInstallments = (): Promise<AxiosResponse<InstallmentDataSet[]>> => {
  return axios.get('/getInstallments')
}

const createInstallments = (saveObj: InstallmentData): Promise<AxiosResponse<InstallmentData>> => {
  return axios.post('/createInstallments', saveObj)
}

const deleteInstallements = (Id: string): Promise<AxiosResponse<void>> => {
  return axios.delete('/deleteInstallements/'+Id)
}

const isExistsInstallements = (Name: string): Promise<AxiosResponse<void>> => {
  return axios.post('/isExistsInstallements/'+Name)
}

export const installmentService = {
  getInstallments,
  createInstallments,
  deleteInstallements,
  isExistsInstallements
}
