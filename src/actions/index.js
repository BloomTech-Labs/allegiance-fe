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

export const fetchNotifications = (token, data) => async dispatch => {
  const { userId } = data;
  if (token) {
    try {
      dispatch({ type: actionTypes.FETCH_NOTICE_REQUEST })
      const notifications = await axiosWithAuth([token]).get(`/users/${userId}/notifications`);
      console.log(notifications);
      dispatch({
        type: actionTypes.FETCH_NOTICE_SUCCESS,
        payload: notifications.data,
      })
    } catch (err) {
      console.log(err)
      dispatch({ type: actionTypes.FETCH_NOTICE_FAILURE, payload: err })
    }
  }
}

export const likePost = (token, data) => async dispatch => {
  const { userId, id, user_id } = data
  console.log("likePost, userId, id, user_id:", userId, id, user_id)
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
      if(like.data.likeResult) {
        axiosWithAuth([token]).post(`/users/${user_id}/notifications`, {
            user_id,
            invoker_id: userId,
            type_id: id,
            type: 'like'
          })
      }
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


