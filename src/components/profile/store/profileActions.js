import axios from 'components/utils/axiosWithoutAuth'
import * as types from './profileTypes'

export const fetchProfile = id => async dispatch => {
  dispatch({ type: types.FETCH_PROFILE_REQUEST })
  try {
    const result = await axios.post('/auth/profile', {
      id: id,
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

export const fetchProfilePosts = id => async dispatch => {
  dispatch({ type: types.FETCH_PROFILE_POSTS_REQUEST })
  // const userId = data.userId
  try {
    const result = await axios.get(`/posts/user/${id}`)
    dispatch({
      type: types.FETCH_PROFILE_POSTS_SUCCESS,
      payload: result.data.postsLoaded,
    })
  } catch (err) {
    dispatch({ type: types.FETCH_PROFILE_POSTS_FAILURE, payload: err })
    console.log("There was an issue retrieving the user's posts.")
  }
}
