import { userService } from './../../services'
import { USER_ACTIONS, COMMON_ACTIONS } from './../../constants'


const getUsers= () => {
  return (dispatch: (arg0: { type: string, data?: any, error?: string }) => void) => {
    dispatch({ type: USER_ACTIONS.GET_USERS + COMMON_ACTIONS.REQUEST })
    userService.getUsers()
      .then((res) => {
        dispatch({ type: USER_ACTIONS.GET_USERS + COMMON_ACTIONS.SUCCESS, data: res.data })
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
        dispatch({ type: USER_ACTIONS.GET_USERS + COMMON_ACTIONS.ERROR })
      })
  }
}
 

export const userActions = {
  getUsers
}
