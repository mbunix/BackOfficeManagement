import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createWrapper } from 'next-redux-wrapper'
import {
  userLoginReducer,
  userSignUpReducer
} from '../reducers/userReducers.js'
// initial states here
const initalState = {}

const reducer = combineReducers({
  userSignUp: userSignUpReducer,
  userLogin: userLoginReducer
})
// middleware
const middleware = [thunk]

// creating store
export const store = createStore(
  reducer,
  initalState,
  composeWithDevTools(applyMiddleware(...middleware))
)

// assigning store to next wrapper
const makeStore = () => store

export const wrapper = createWrapper(makeStore)
