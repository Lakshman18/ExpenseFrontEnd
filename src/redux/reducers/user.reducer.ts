import { ACTION_STATUS } from '../../constants'
import { USER_ACTIONS, COMMON_ACTIONS } from './../../constants/action.constants'
import { UserStateDto } from './../../models/appState.models'
import { UserData } from '../../models'

const INITIAL_STATE: UserStateDto = { 
  userList: {
    data: [],
    isLoading: false,
    status: null
  }
}
const userReducer = (state = INITIAL_STATE, action: { type: string; data: any }): UserStateDto => {
  switch (action.type) {

    // GET_USERS
    case USER_ACTIONS.GET_USERS + COMMON_ACTIONS.REQUEST:
      return {
        ...state,
        userList: {
          ...state.userList,
          isLoading: true,
          status: ACTION_STATUS.LOADING
        }
      }
    case USER_ACTIONS.GET_USERS + COMMON_ACTIONS.SUCCESS:
      return {
        ...state,
        userList: {
          data: action.data,
          isLoading: false,
          status: ACTION_STATUS.SUCCESS
        }
      }
    case USER_ACTIONS.GET_USERS + COMMON_ACTIONS.ERROR:
      return {
        ...state,
        userList: {
          data: [],
          isLoading: false,
          status: ACTION_STATUS.ERROR
        }
      }

    default:
      return state
  }
}

export default userReducer
