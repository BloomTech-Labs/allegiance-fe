import React, { useSelector } from 'react'
import axios from 'components/utils/axiosWithoutAuth'
import * as types from './profileTypes'

export const fetchProfile = loggedInUser => async dispatch => {
  try {
    dispatch({ type: types.FETCH_PROFILE_REQUEST })
    const result = await axios.post('/auth', {
      email: loggedInUser.email,
    })
    dispatch({
      type: types.FETCH_PROFILE_SUCCESS,
      payload: result.data.userInfo,
    })
  } catch (err) {
    dispatch({ type: types.FETCH_PROFILE_FAILURE, payload: err })
    console.log("There was an issue retrieving the user's profile.")
  }
}
