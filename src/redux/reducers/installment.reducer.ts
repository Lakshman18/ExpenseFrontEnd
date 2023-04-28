import { ACTION_STATUS } from '../../constants'
import { INSTALLMENT_ACTIONS, COMMON_ACTIONS } from './../../constants/action.constants'
import { InstallmentStateDto } from './../../models/appState.models'
import {InstallmentData, InstallmentDataSet} from '../../models'

const INITIAL_STATE: InstallmentStateDto = { 
  installmentList: {
    data: [],
    isLoading: false,
    status: null
  },
  addInstallment: {
    isLoading: false,
    status: null,
    data: {} as InstallmentData
  },
  deleteInstallment: {
    isLoading: false,
    status: null
  },
  isExist: {
    isLoading: false,
    status: null,
    data:true
  },
}
const installmentReducer = (state = INITIAL_STATE, action: { type: string; data: any }): InstallmentStateDto => {
  switch (action.type) {

    // GET_INSTALLMENTS
    case INSTALLMENT_ACTIONS.GET_INSTALLMENTS + COMMON_ACTIONS.REQUEST:
      return {
        ...state,
        installmentList: {
          ...state.installmentList,
          isLoading: true,
          status: ACTION_STATUS.LOADING
        }
      }
    case INSTALLMENT_ACTIONS.GET_INSTALLMENTS + COMMON_ACTIONS.SUCCESS:
      return {
        ...state,
        installmentList: {
          data: action.data,
          isLoading: false,
          status: ACTION_STATUS.SUCCESS
        }
      }
    case INSTALLMENT_ACTIONS.GET_INSTALLMENTS + COMMON_ACTIONS.ERROR:
      return {
        ...state,
        installmentList: {
          data: [],
          isLoading: false,
          status: ACTION_STATUS.ERROR
        }
      }

    // SAVE_UPDATE_INSTALLMENT
    case INSTALLMENT_ACTIONS.SAVE_UPDATE_INSTALLMENT + COMMON_ACTIONS.REQUEST:
        return {
          ...state,
          addInstallment: {
            isLoading: true,
            status: ACTION_STATUS.LOADING,
            data: {} as InstallmentData
          }
      }
    case INSTALLMENT_ACTIONS.SAVE_UPDATE_INSTALLMENT + COMMON_ACTIONS.SUCCESS:
        return {
          ...state,
          addInstallment: {
            isLoading: false,
            status: ACTION_STATUS.SUCCESS,
            data: action.data
          }
      }
    case INSTALLMENT_ACTIONS.SAVE_UPDATE_INSTALLMENT + COMMON_ACTIONS.ERROR:
        return {
          ...state,
          addInstallment: {
            isLoading: false,
            status: ACTION_STATUS.ERROR,
            data: {} as InstallmentData
          }
      }
      
    // DELETE_INSTALLMENT
    case INSTALLMENT_ACTIONS.DELETE_INSTALLMENT + COMMON_ACTIONS.REQUEST:
      return {
        ...state,
        deleteInstallment: {
          isLoading: true,
          status: ACTION_STATUS.LOADING
        }
      }
    case INSTALLMENT_ACTIONS.DELETE_INSTALLMENT + COMMON_ACTIONS.SUCCESS:
      return {
        ...state,
        deleteInstallment: {
          isLoading: false,
          status: ACTION_STATUS.SUCCESS
        }
      }
    case INSTALLMENT_ACTIONS.DELETE_INSTALLMENT + COMMON_ACTIONS.ERROR:
      return {
        ...state,
        deleteInstallment: {
          isLoading: false,
          status: ACTION_STATUS.ERROR
        }
      }

    // ISEXIST_INSTALLMENT
    case INSTALLMENT_ACTIONS.ISEXIST_INSTALLMENT + COMMON_ACTIONS.REQUEST:
      return {
        ...state,
        isExist: {
          isLoading: true,
          status: ACTION_STATUS.LOADING,
          data:true
        }
      }
    case INSTALLMENT_ACTIONS.ISEXIST_INSTALLMENT + COMMON_ACTIONS.SUCCESS:
      return {
        ...state,
        isExist: {
          isLoading: false,
          status: ACTION_STATUS.SUCCESS,
          data:action.data
        }
      }
    case INSTALLMENT_ACTIONS.ISEXIST_INSTALLMENT + COMMON_ACTIONS.ERROR:
      return {
        ...state,
        isExist: {
          isLoading: false,
          status: ACTION_STATUS.ERROR,
          data:true
        }
      }
    default:
      return state
  }
}

export default installmentReducer
