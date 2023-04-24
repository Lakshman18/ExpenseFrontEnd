import { combineReducers } from 'redux'
import tripReducer from './trip.reducer'
import installmentReducer from './installment.reducer'
import authenticationReducer from './authentication.reducer'


const rootReducer = combineReducers({
  trip: tripReducer,
  installment: installmentReducer,
  authentication: authenticationReducer
})

export default rootReducer
