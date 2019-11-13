import React, { useSelector } from 'react'
import axios from 'components/utils/axiosWithoutAuth'
import dispatch from 'dispatch'
import * as types from './profileTypes'

export const fetchProfile = async () => {
  const loggedInUser = useSelector(state => state.userReducer.loggedInUser)
  try {
    dispatch({ type: types.FETCH_PROFILE_REQUEST })
    const result = await axios.post(process.env.REACT_APP_AUTHURL, {
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
