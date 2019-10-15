import { axiosWithAuth } from '../components/utils/axiosWithAuth'
import * as actionTypes from './actionTypes'

export const fetchGroupPosts = (token, id) => async dispatch => {
  if (token)
    try {
      dispatch({ type: actionTypes.FETCH_POSTS_REQUEST })
      const posts = await axiosWithAuth([token]).get(`/posts/group/${id}`)
      const sortedPost = posts.data.postsLoaded.sort((a, b) => a.id - b.id)
      dispatch({ type: actionTypes.FETCH_POSTS_SUCCESS, payload: sortedPost })
    } catch (err) {
      console.log(err)
      dispatch({ type: actionTypes.FETCH_POSTS_FAILURE })
    }
}

export const createGroupPost = (token, data) => async dispatch => {
  const { userId, groupId, post_content } = data
  if (token) {
    try {
      dispatch({ type: actionTypes.CREATE_POST_REQUEST })
      const post = await axiosWithAuth([token]).post(
        `/posts/group/${groupId}`,
        {
          user_id: userId,
          group_id: groupId,
          post_content: post_content,
        }
      )
      dispatch({
        type: actionTypes.CREATE_POST_SUCCESS,
        payload: post.data.postResult,
      })
    } catch (err) {
      console.log(err)
      dispatch({ type: actionTypes.CREATE_POST_FAILURE })
    }
  }
}

export const likePost = (token, data) => async dispatch => {
  const { userId, id } = data
  if (token) {
    try {
      dispatch({ type: actionTypes.POST_LIKE_REQUEST })
      const like = await axiosWithAuth([token]).post(
        `/posts_likes/post/${id}`,
        {
          user_id: userId,
          post_id: id,
        }
      )
      dispatch({
        type: actionTypes.POST_LIKE_SUCCESS,
        payload: like.data.likeResult,
      })
    } catch (err) {
      console.log(err)
      dispatch({ type: actionTypes.POST_LIKE_FAILURE })
    }
  }
}
