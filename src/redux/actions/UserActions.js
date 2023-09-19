import axios from 'axios'
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAIL
} from '../../constants/userconstants.js'

import api from '../../utils/api.js'

export const login = (email, password) => async dispatch => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
      payload: { email, password }
    })

    const formData = new URLSearchParams()
    formData.append('email', email)
    formData.append('password', password)

    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }

    const { data } = await axios.post(
      `${api}/users/login`,
      formData.toString(),
      config
    )

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}
export const loginwithGoogle = googleResponse => {
  return async dispatch => {
    if (typeof googleResponse === 'undefined') {
      googleResponse = []
    }

    dispatch({ type: GOOGLE_OAUTH2, googleResponse })
  }
}

export const logout = () => dispatch => {
  localStorage.removeItem('userInfo')
  dispatch({ type: USER_LOGOUT })
  dispatch({ type: USER_DETAILS_RESET })
  dispatch({ type: USER_LIST_RESET })
  document.location.href = '/login'
}

export const SignUp = (name, password, email) => async dispatch => {
  if (!name || !password || !email) {
    dispatch({
      type: USER_SIGNUP_FAIL,
      payload: 'Name, password, and email are required'
    })
    return
  }
  try {
    dispatch({
      type: USER_SIGNUP_REQUEST
    })

    const formData = new URLSearchParams()
    formData.append('name', name)
    formData.append('password', password)
    formData.append('email', email)

    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }

    const { data } = await axios.post(
      `${api}/users`,
      formData.toString(),
      config
    )

    dispatch({
      type: USER_SIGNUP_SUCCESS,
      payload: data
    })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_SIGNUP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}
