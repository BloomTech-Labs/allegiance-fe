import { axiosWithAuth } from '../components/utils/axiosWithAuth'
import * as actionTypes from './actionTypes'
import { async } from 'q'
// import axios from 'axios'

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
    if (!post_content.match(/^\s+$/)) {
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
}

export const fetchNotifications = (token, data) => async dispatch => {
  const { userId } = data
  if (token) {
    try {
      dispatch({ type: actionTypes.FETCH_NOTICE_REQUEST })
      const notifications = await axiosWithAuth([token]).get(
        `/users/${userId}/notifications`
      )
      console.log(notifications)
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

export const deleteNotification = (token, notificationId) => async dispatch => {
  try {
    dispatch({ type: actionTypes.DELETE_NOTIFICATION_REQUEST })
    let del = await axiosWithAuth([token]).delete(
      `/notifications/${notificationId}`
    )
    console.log('del:', del, 'del.data:', del.data)
    dispatch({
      type: actionTypes.DELETE_NOTIFICATION_SUCCESS,
      payload: del.data,
    })
  } catch (err) {
    dispatch({ type: actionTypes.DELETE_NOTIFICATION_FAILURE, payload: err })
  }
}

// export function deleteNotification(token, notificationId) {
//   if (token) {
//     axiosWithAuth([token]).delete(`/notifications/${notificationId}`)
//   }
// }

export const likePost = (token, data, socket) => async dispatch => {
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
          await axiosWithAuth([token]).post(`/users/${user_id}/notifications`, {
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
      socket.emit('send notification', { userIds: [user_id] })
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

export const likeReply = (token, data, socket) => async dispatch => {
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
    socket.emit('send notification', { userIds: [user_id] })
  }
}

export const createReply = (token, data, socket) => async dispatch => {
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
      await axiosWithAuth([token]).post(`/users/${user_id}/notifications`, {
        user_id,
        invoker_id: userId,
        type_id: id,
        type: 'reply',
      })
    }
    socket.emit('send notification', { userIds: [user_id] })
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
