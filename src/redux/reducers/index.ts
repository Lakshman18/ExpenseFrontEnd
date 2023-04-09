import { combineReducers } from 'redux'
import tripReducer from './trip.reducer'

const rootReducer = combineReducers({
  trip: tripReducer,
})

export default rootReducer
