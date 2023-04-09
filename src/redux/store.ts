import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import ENV from './../.env'

let _applyMiddleware
_applyMiddleware = applyMiddleware(
  thunk
)

const store = createStore(
  rootReducer,
  _applyMiddleware
)


export default store
