import { tripService } from './../../services'
import { TRIP_ACTIONS, COMMON_ACTIONS, NOTIFIER_VARIANT, NOTIFIER_ACTIONS } from './../../constants'
// import { NotifierMessageDto } from '../../models'
import {TripSummaryData, TripExpenseData} from '../../models'

const getTrips = () => {
  return (dispatch: (arg0: { type: string, data?: any, error?: string }) => void) => {
    dispatch({ type: TRIP_ACTIONS.GET_TRIPS + COMMON_ACTIONS.REQUEST })
    tripService.getTrips()
      .then((res) => {
        dispatch({ type: TRIP_ACTIONS.GET_TRIPS + COMMON_ACTIONS.SUCCESS, data: res.data })
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
        dispatch({ type: TRIP_ACTIONS.GET_TRIPS + COMMON_ACTIONS.ERROR })
      })
  }
}

const deleteTrip = (tripId: string) => {
  return (dispatch: (arg0: { type: string, data?: any, error?: string }) => void) => {
    dispatch({ type: TRIP_ACTIONS.DELETE_TRIP + COMMON_ACTIONS.REQUEST })
    tripService.deleteTrip(tripId)
      .then((res) => {
        dispatch({ type: TRIP_ACTIONS.DELETE_TRIP + COMMON_ACTIONS.SUCCESS, data: res.data })
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
        dispatch({ type: TRIP_ACTIONS.DELETE_TRIP + COMMON_ACTIONS.ERROR })
      })
  }
}

const saveUpdateTrip = (paylod: TripSummaryData) => {
  return (dispatch: (arg0: { type: string, data?: any, error?: string }) => void) => {
    dispatch({ type: TRIP_ACTIONS.SAVE_UPDATE_TRIP + COMMON_ACTIONS.REQUEST })
    tripService.saveUpdateTrip(paylod)
      .then((res) => {
        dispatch({ type: TRIP_ACTIONS.SAVE_UPDATE_TRIP + COMMON_ACTIONS.SUCCESS, data: res.data })
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
        dispatch({ type: TRIP_ACTIONS.SAVE_UPDATE_TRIP + COMMON_ACTIONS.ERROR })
      })
  }
}

const getTripExpenses = (tripId: string) => {
  return (dispatch: (arg0: { type: string, data?: any, error?: string }) => void) => {
    dispatch({ type: TRIP_ACTIONS.GET_TRIP_EXPENSES + COMMON_ACTIONS.REQUEST })
    tripService.getTripExpenses(tripId)
      .then((res) => {
        dispatch({ type: TRIP_ACTIONS.GET_TRIP_EXPENSES + COMMON_ACTIONS.SUCCESS, data: res.data })
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
        dispatch({ type: TRIP_ACTIONS.GET_TRIP_EXPENSES + COMMON_ACTIONS.ERROR })
      })
  }
}

const saveUpdateTripExpense = (paylod: TripExpenseData) => {
  return (dispatch: (arg0: { type: string, data?: any, error?: string }) => void) => {
    dispatch({ type: TRIP_ACTIONS.SAVE_UPDATE_TRIP_EXPENSES + COMMON_ACTIONS.REQUEST })
    tripService.saveUpdateTripExpense(paylod)
      .then((res) => {
        dispatch({ type: TRIP_ACTIONS.SAVE_UPDATE_TRIP_EXPENSES + COMMON_ACTIONS.SUCCESS, data: res.data })
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
        dispatch({ type: TRIP_ACTIONS.SAVE_UPDATE_TRIP_EXPENSES + COMMON_ACTIONS.ERROR })
      })
  }
}

const deleteTripExpense = (tripExpenseId: string) => {
  return (dispatch: (arg0: { type: string, data?: any, error?: string }) => void) => {
    dispatch({ type: TRIP_ACTIONS.DELETE_TRIP_EXPENSE + COMMON_ACTIONS.REQUEST })
    tripService.deleteTripExpense(tripExpenseId)
      .then((res) => {
        dispatch({ type: TRIP_ACTIONS.DELETE_TRIP_EXPENSE + COMMON_ACTIONS.SUCCESS, data: res.data })
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
        dispatch({ type: TRIP_ACTIONS.DELETE_TRIP_EXPENSE + COMMON_ACTIONS.ERROR })
      })
  }
}

export const tripActions = {
  getTrips,
  deleteTrip,
  saveUpdateTrip,
  getTripExpenses,
  saveUpdateTripExpense,
  deleteTripExpense
}
