import { axiosWithAuth } from '../components/utils/axiosWithAuth'
import * as actionTypes from './actionTypes'
import { async } from 'q'

export const updateSocket = data => dispatch => {
  dispatch({ type: actionTypes.UPDATE_SOCKET, payload: data })
}

const log = console.log

export const fetchGroupPosts = (token, id) => async dispatch => {
  if (token)
    try {
      dispatch({ type: actionTypes.FETCH_POSTS_REQUEST })
      const posts = await axiosWithAuth([token]).get(`/posts/group/${id}`)
      const sortedPost = posts.data.postsLoaded.sort((a, b) => a.id - b.id)
      dispatch({ type: actionTypes.FETCH_POSTS_SUCCESS, payload: sortedPost })
    } catch (err) {
      console.log(err)
      dispatch({ type: actionTypes.FETCH_POSTS_FAILURE, payload: err })
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
      dispatch({ type: actionTypes.CREATE_POST_FAILURE, payload: err })
    }
  }
}

export const fetchNotifications = (token, data) => async dispatch => {
  const { userId } = data
  if (token) {
    try {
      dispatch({ type: actionTypes.FETCH_NOTICE_REQUEST })
      const notifications = await axiosWithAuth([token]).get(
        `/users/${userId}/notifications`
      )
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
      if (like.data.likeResult) {
        if (user_id !== userId) {
          axiosWithAuth([token]).post(`/users/${user_id}/notifications`, {
            user_id,
            invoker_id: userId,
            type_id: id,
            type: 'like',
          })
        }
      }
      dispatch({
        type: actionTypes.POST_LIKE_SUCCESS,
        payload: like.data.likeResult,
      })
    } catch (err) {
      console.log(err)
      dispatch({ type: actionTypes.POST_LIKE_FAILURE, payload: err })
    }
  }
}
export const dislikePost = (token, data) => async dispatch => {
  if (token) {
    try {
      dispatch({ type: actionTypes.POST_UNLIKE_REQUEST })
      const unLike = await axiosWithAuth([token]).delete(`/posts_likes/${data}`)
      dispatch({
        type: actionTypes.POST_UNLIKE_SUCCESS,
        payload: unLike.data.deleted[0],
      })
    } catch (err) {
      console.log(err)
    }
  }
}
export const fetchPost = (token, id) => async dispatch => {
  if (token) {
    try {
      dispatch({ type: actionTypes.FETCH_POST_REQUEST })
      const response = await axiosWithAuth([token]).get(`/posts/${id}`)
      const postObj = response.data.postLoaded
      dispatch({ type: actionTypes.FETCH_POST_SUCCESS, payload: postObj })
    } catch (err) {
      dispatch({ type: actionTypes.FETCH_POST_FAILURE, payload: err })
    }
  }
}

export const likeReply = (token, data) => async dispatch => {
  const { userId, id, user_id } = data
  dispatch({ type: actionTypes.REPLY_LIKE_REQUEST })
  const like = await axiosWithAuth([token]).post(`/replies_likes/reply/${id}`, {
    user_id: userId,
    reply_id: id,
  })
  if (like.data.likeResult) {
    dispatch({
      type: actionTypes.REPLY_LIKE_SUCCESS,
      payload: like.data.likeResult,
    })
    if (userId !== user_id) {
      axiosWithAuth([token]).post(`/users/${user_id}/notifications`, {
        user_id,
        invoker_id: userId,
        type_id: id,
        type: 'reply_like',
      })
    }
  }
}

export const createReply = (token, data) => async dispatch => {
  const { userId, user_id, id, reply_content } = data
  dispatch({ type: actionTypes.CREATE_REPLY_REQUEST })
  const post = await axiosWithAuth([token]).post(`/replies/post/${id}`, {
    user_id: userId,
    post_id: id,
    reply_content: reply_content,
  })

  if (post.data.reply) {
    dispatch({
      type: actionTypes.CREATE_REPLY_SUCCESS,
      payload: post.data.reply,
    })
  if (userId !== user_id) {
    axiosWithAuth([token]).post(`/users/${user_id}/notifications`, {
      user_id,
      invoker_id: userId,
      type_id: id,
      type: 'reply',
      })
    }
  }
}

export const dislikeReply = (token, id) => async dispatch => {
  dispatch({ type: actionTypes.REPLY_DISLIKE_REQUEST })
  const unLike = await axiosWithAuth([token]).delete(`/replies_likes/${id}`)
  console.log(unLike.data.deleted[0], 'delete data')
  dispatch({
    type: actionTypes.REPLY_DISLIKE_SUCCESS,
    payload: unLike.data.deleted[0],
  })
}
