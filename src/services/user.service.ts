import { AxiosResponse } from 'axios'
import axios from 'axios'
import { UserData } from '../models'
 

const getUsers = (): Promise<AxiosResponse<UserData[]>> => {
  return axios.get('/getUsers')
}
 
export const userService = {
  getUsers
}
