'use client'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createWrapper } from 'next-redux-wrapper'
import {
  userLoginReducer,
  userSignUpReducer
} from '../reducers/userReducers.js'

const initialState = {}

const reducer = combineReducers({
  userSignUp: userSignUpReducer,
  userLogin: userLoginReducer
})

const middleware = [thunk]

export const store = createStore(
  reducer,
  initialState, // Updated the variable name here
  composeWithDevTools(applyMiddleware(...middleware))
)

const makeStore = () => {
  const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
  )

  return store
}

export const wrapper = createWrapper(makeStore)
