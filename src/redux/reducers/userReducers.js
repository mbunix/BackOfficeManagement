import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAIL,
  USER_LOGOUT
} from '../../helpers/constants/userconstants.js'

export const userSignUpReducer = (state = {}, actions) => {
  switch (actions.type) {
    case USER_SIGNUP_REQUEST:
      return { loading: true }
    case USER_SIGNUP_SUCCESS:
      return { loading: false, userInfo: actions.payload }
    case USER_SIGNUP_FAIL:
      return { loading: false, error: actions.payload }
    default:
      return state
  }
}
export const userLoginReducer = (state = {}, actions) => {
  switch (actions.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true }
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: actions.payload }
    case USER_LOGIN_FAIL:
      return { loading: false, error: actions.payload }
    case USER_LOGOUT:
      return {}
    default:
      return state
  }
}
