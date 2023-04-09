import { ACTION_STATUS } from '../../constants'
import { TRIP_ACTIONS, COMMON_ACTIONS } from './../../constants/action.constants'
import { TripSummaryStateDto } from './../../models/appState.models'
import { TripSummaryData, TripExpenseDataSet, TripExpenseData } from './../../models'

const INITIAL_STATE: TripSummaryStateDto = {
  tripList: {
    data: [],
    isLoading: false,
    status: null
  },
  deleteTrip: {
    isLoading: false,
    status: null
  },
  addTrip: {
    isLoading: false,
    status: null,
    data: {} as TripSummaryData
  },
  tripExpenseList: {
    data: [],
    isLoading: false,
    status: null
  },
  addTripExpense: {
    isLoading: false,
    status: null,
    data: {} as TripExpenseData
  },
  deleteTripExpense: {
    isLoading: false,
    status: null
  },
}
const tripReducer = (state = INITIAL_STATE, action: { type: string; data: any }): TripSummaryStateDto => {
  switch (action.type) {
    // GET_TRIPS
    case TRIP_ACTIONS.GET_TRIPS + COMMON_ACTIONS.REQUEST:
      return {
        ...state,
        tripList: {
          ...state.tripList,
          isLoading: true,
          status: ACTION_STATUS.LOADING
        }
      }
    case TRIP_ACTIONS.GET_TRIPS + COMMON_ACTIONS.SUCCESS:
      return {
        ...state,
        tripList: {
          data: action.data,
          isLoading: false,
          status: ACTION_STATUS.SUCCESS
        }
      }
    case TRIP_ACTIONS.GET_TRIPS + COMMON_ACTIONS.ERROR:
      return {
        ...state,
        tripList: {
          data: [],
          isLoading: false,
          status: ACTION_STATUS.ERROR
        }
      }

     // DELETE_TRIP
    case TRIP_ACTIONS.DELETE_TRIP + COMMON_ACTIONS.REQUEST:
      return {
        ...state,
        deleteTrip: {
          isLoading: true,
          status: ACTION_STATUS.LOADING
        }
      }
    case TRIP_ACTIONS.DELETE_TRIP + COMMON_ACTIONS.SUCCESS:
      return {
        ...state,
        deleteTrip: {
          isLoading: false,
          status: ACTION_STATUS.SUCCESS
        }
      }
    case TRIP_ACTIONS.DELETE_TRIP + COMMON_ACTIONS.ERROR:
      return {
        ...state,
        deleteTrip: {
          isLoading: false,
          status: ACTION_STATUS.ERROR
        }
      }
    
      // SAVE_UPDATE_TRIP
    case TRIP_ACTIONS.SAVE_UPDATE_TRIP + COMMON_ACTIONS.REQUEST:
        return {
          ...state,
          addTrip: {
            isLoading: true,
            status: ACTION_STATUS.LOADING,
            data: {} as TripSummaryData
          }
      }
    case TRIP_ACTIONS.SAVE_UPDATE_TRIP + COMMON_ACTIONS.SUCCESS:
        return {
          ...state,
          addTrip: {
            isLoading: false,
            status: ACTION_STATUS.SUCCESS,
            data: action.data
          }
      }
    case TRIP_ACTIONS.SAVE_UPDATE_TRIP + COMMON_ACTIONS.ERROR:
        return {
          ...state,
          addTrip: {
            isLoading: false,
            status: ACTION_STATUS.ERROR,
            data: {} as TripSummaryData
          }
      }

    // GET_TRIP_EXPENSES
    case TRIP_ACTIONS.GET_TRIP_EXPENSES + COMMON_ACTIONS.REQUEST:
      return {
        ...state,
        tripExpenseList: {
          ...state.tripExpenseList,
          isLoading: true,
          status: ACTION_STATUS.LOADING
        }
      }
    case TRIP_ACTIONS.GET_TRIP_EXPENSES + COMMON_ACTIONS.SUCCESS:
      return {
        ...state,
        tripExpenseList: {
          data: action.data,
          isLoading: false,
          status: ACTION_STATUS.SUCCESS
        }
      }
    case TRIP_ACTIONS.GET_TRIP_EXPENSES + COMMON_ACTIONS.ERROR:
      return {
        ...state,
        tripExpenseList: {
          data: [],
          isLoading: false,
          status: ACTION_STATUS.ERROR
        }
      }
    // SAVE_UPDATE_TRIP_EXPENSES
    case TRIP_ACTIONS.SAVE_UPDATE_TRIP_EXPENSES + COMMON_ACTIONS.REQUEST:
        return {
          ...state,
          addTripExpense: {
            isLoading: true,
            status: ACTION_STATUS.LOADING,
            data: {} as TripExpenseData
          }
      }
    case TRIP_ACTIONS.SAVE_UPDATE_TRIP_EXPENSES + COMMON_ACTIONS.SUCCESS:
        return {
          ...state,
          addTripExpense: {
            isLoading: false,
            status: ACTION_STATUS.SUCCESS,
            data: action.data
          }
      }
    case TRIP_ACTIONS.SAVE_UPDATE_TRIP_EXPENSES + COMMON_ACTIONS.ERROR:
        return {
          ...state,
          addTripExpense: {
            isLoading: false,
            status: ACTION_STATUS.ERROR,
            data: {} as TripExpenseData
          }
      }
    // DELETE_TRIP
    case TRIP_ACTIONS.DELETE_TRIP_EXPENSE + COMMON_ACTIONS.REQUEST:
      return {
        ...state,
        deleteTripExpense: {
          isLoading: true,
          status: ACTION_STATUS.LOADING
        }
      }
    case TRIP_ACTIONS.DELETE_TRIP_EXPENSE + COMMON_ACTIONS.SUCCESS:
      return {
        ...state,
        deleteTripExpense: {
          isLoading: false,
          status: ACTION_STATUS.SUCCESS
        }
      }
    case TRIP_ACTIONS.DELETE_TRIP_EXPENSE + COMMON_ACTIONS.ERROR:
      return {
        ...state,
        deleteTripExpense: {
          isLoading: false,
          status: ACTION_STATUS.ERROR
        }
      }
    default:
      return state
  }
}

export default tripReducer
