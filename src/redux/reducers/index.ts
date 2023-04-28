import { combineReducers } from 'redux'
import tripReducer from './trip.reducer'
import installmentReducer from './installment.reducer'
import authenticationReducer from './authentication.reducer'
import userReducer from './user.reducer'



const rootReducer = combineReducers({
  trip: tripReducer,
  installment: installmentReducer,
  authentication: authenticationReducer,
  user: userReducer
})

export default rootReducer
