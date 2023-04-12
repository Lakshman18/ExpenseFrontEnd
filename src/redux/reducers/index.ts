import { combineReducers } from 'redux'
import tripReducer from './trip.reducer'
import authenticationReducer from './authentication.reducer'


const rootReducer = combineReducers({
  trip: tripReducer,
  authentication: authenticationReducer
})

export default rootReducer
