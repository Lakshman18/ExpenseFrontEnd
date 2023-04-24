import { installmentService } from './../../services'
import { INSTALLMENT_ACTIONS, COMMON_ACTIONS, NOTIFIER_VARIANT, NOTIFIER_ACTIONS } from './../../constants'
// import { NotifierMessageDto } from '../../models'
import {InstallmentData, InstallmentDataSet} from '../../models'


const getInstallments = () => {
  return (dispatch: (arg0: { type: string, data?: any, error?: string }) => void) => {
    dispatch({ type: INSTALLMENT_ACTIONS.GET_INSTALLMENTS + COMMON_ACTIONS.REQUEST })
    installmentService.getInstallments()
      .then((res) => {
        dispatch({ type: INSTALLMENT_ACTIONS.GET_INSTALLMENTS + COMMON_ACTIONS.SUCCESS, data: res.data })
      })
      .catch((error) => {
        // const _notifier: NotifierMessageDto = {
        //   message: error,
        //   options: {
        //     variant: NOTIFIER_VARIANT.ERROR,
        //     persist: true
        //   }
        // }
        // dispatch({ type: NOTIFIER_ACTIONS.TRIGGER_NOTIFIER_MESSAGE, data: _notifier })
        dispatch({ type: INSTALLMENT_ACTIONS.GET_INSTALLMENTS + COMMON_ACTIONS.ERROR })
      })
  }
}

const saveUpdateInstallment = (paylod: InstallmentData) => {
  return (dispatch: (arg0: { type: string, data?: any, error?: string }) => void) => {
    dispatch({ type: INSTALLMENT_ACTIONS.SAVE_UPDATE_INSTALLMENT + COMMON_ACTIONS.REQUEST })
    installmentService.createInstallments(paylod)
      .then((res) => {
        dispatch({ type: INSTALLMENT_ACTIONS.SAVE_UPDATE_INSTALLMENT + COMMON_ACTIONS.SUCCESS, data: res.data })
      })
      .catch((error) => {
        // const _notifier: NotifierMessageDto = {
        //   message: error,
        //   options: {
        //     variant: NOTIFIER_VARIANT.ERROR,
        //     persist: true
        //   }
        // }
        // dispatch({ type: NOTIFIER_ACTIONS.TRIGGER_NOTIFIER_MESSAGE, data: _notifier })
        dispatch({ type: INSTALLMENT_ACTIONS.SAVE_UPDATE_INSTALLMENT + COMMON_ACTIONS.ERROR })
      })
  }
}

const deleteInstallment = (installmentId: string) => {
  return (dispatch: (arg0: { type: string, data?: any, error?: string }) => void) => {
    dispatch({ type: INSTALLMENT_ACTIONS.DELETE_INSTALLMENT + COMMON_ACTIONS.REQUEST })
    installmentService.deleteInstallements(installmentId)
      .then((res) => {
        dispatch({ type: INSTALLMENT_ACTIONS.DELETE_INSTALLMENT + COMMON_ACTIONS.SUCCESS, data: res.data })
      })
      .catch((error) => {
        // const _notifier: NotifierMessageDto = {
        //   message: error,
        //   options: {
        //     variant: NOTIFIER_VARIANT.ERROR,
        //     persist: true
        //   }
        // }
        // dispatch({ type: NOTIFIER_ACTIONS.TRIGGER_NOTIFIER_MESSAGE, data: _notifier })
        dispatch({ type: INSTALLMENT_ACTIONS.DELETE_INSTALLMENT + COMMON_ACTIONS.ERROR })
      })
  }
}

export const installmentActions = {
  getInstallments,
  saveUpdateInstallment,
  deleteInstallment 
}
