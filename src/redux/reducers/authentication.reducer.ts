import { ACTION_STATUS } from '../../constants'
import { AUTHENTICATION_ACTIONS, COMMON_ACTIONS } from './../../constants/action.constants'
import { AuthenticationStateDto } from './../../models/appState.models'
import { AuthenticationData } from './../../models'

const INITIAL_STATE: AuthenticationStateDto = {
  authData: {
    isLoading: false,
    status: null,
    data: {} as AuthenticationData
  }         
}
const authenticationReducer = (state = INITIAL_STATE, action: { type: string; data: any }): AuthenticationStateDto => {
  switch (action.type) {
    // GET_TRIPS
    case AUTHENTICATION_ACTIONS.AUTHENTICATE_USER + COMMON_ACTIONS.REQUEST:
      return {
        ...state,
        authData: {
          ...state.authData,
          isLoading: true,
          status: ACTION_STATUS.LOADING
        }
      }
    case AUTHENTICATION_ACTIONS.AUTHENTICATE_USER + COMMON_ACTIONS.SUCCESS:
      return {
        ...state,
        authData: {
          data: action.data,
          isLoading: false,
          status: ACTION_STATUS.SUCCESS
        }
      }
    case AUTHENTICATION_ACTIONS.AUTHENTICATE_USER + COMMON_ACTIONS.ERROR:
      return {
        ...state,
        authData: {
          data: {} as AuthenticationData,
          isLoading: false,
          status: ACTION_STATUS.ERROR
        }
      }

    default:
      return state
  }
}

export default authenticationReducer
