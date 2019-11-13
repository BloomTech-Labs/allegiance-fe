import * as actionTypes from './actionTypes'
import axios from 'components/utils/axiosWithoutAuth'

export const fetchFeed = data => async dispatch => {
  try {
    await dispatch({ type: actionTypes.FETCH_FEED_REQUEST })
    const feed = await axios.post('/feed', data)
    console.log(feed);
    await dispatch({ type: actionTypes.FETCH_FEED_SUCCESS, payload: feed.data })
  } catch (err) {
    await dispatch({ type: actionTypes.FETCH_FEED_FAILURE, payload: err })
  }
}

export const receiveFeedReply = data => async dispatch => {
  await dispatch({
    type: actionTypes.RECEIVE_FEED_REPLY_SUCCESS,
    payload: data.reply,
  })
}

export const receiveFeedPost = data => async dispatch => {
  await dispatch({ type: actionTypes.RECEIVE_FEED_POST_SUCCESS, payload: data.post })
}

export const receiveFeedLike = data => async dispatch => {
  await dispatch({ type: actionTypes.RECEIVE_FEED_LIKE_SUCCESS, payload: data.likeType })
}

export const receiveFeedDislike = data => async dispatch => {
  await dispatch({ type: actionTypes.RECEIVE_FEED_DISLIKE_SUCCESS, payload: data.likeType })
}
