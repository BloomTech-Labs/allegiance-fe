import { axiosWithAuth } from '../components/utils/axiosWithAuth'
import * as actionTypes from './actionTypes'
import { async } from 'q'
import axios from 'axios'
export const updateSocket = data => dispatch => {
  dispatch({ type: actionTypes.UPDATE_SOCKET, payload: data })
}
const log = console.log
export const fetchGroupPosts = id => async dispatch => {
  try {
    dispatch({ type: actionTypes.FETCH_POSTS_REQUEST })
    const posts = await axios.get(`http://localhost:5000/api/posts/group/${id}`)
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
export const joinGroup = (token, data) => async dispatch => {
  const { user_id, group_id, Mixpanel } = data
  if (token) {
    try {
      const result = await axiosWithAuth([token]).post(`/groups_users`, {
        user_id,
        group_id,
        user_type: 'member',
      })
      if (result.data.newGroupUsers) {
        const {
          group_name,
          group_image,
          group_id,
          user_type,
        } = result.data.newGroupUsers
        const addedGroup = {
          name: group_name,
          image: group_image,
          id: group_id,
          user_type: user_type,
        }
        dispatch({ type: actionTypes.ADD_GROUP_SUCCESS, payload: addedGroup })
        Mixpanel.activity(user_id, 'Joined Group')
      }
    } catch (err) {
      console.log(err)
      dispatch({ type: actionTypes.ADD_GROUP_FAILURE, payload: err })
    }
  }
}
export const fetchNotifications = (token, data) => async dispatch => {
  const { userId } = data
  if (token) {
    try {
      dispatch({ type: actionTypes.FETCH_NOTIFICATIONS_REQUEST })
      const notifications = await axiosWithAuth([token]).get(
        `/users/${userId}/notifications`
      )
      dispatch({
        type: actionTypes.FETCH_NOTIFICATIONS_SUCCESS,
        payload: notifications.data,
      })
      return notifications.data
    } catch (err) {
      console.log(err)
      dispatch({ type: actionTypes.FETCH_NOTIFICATIONS_FAILURE, payload: err })
    }
  }
}

export const fetchInvites = (token, data) => async dispatch => {
  const { userId } = data
  if (token) {
    try {
      dispatch({ type: actionTypes.FETCH_INVITES_REQUEST })
      const invites = await axiosWithAuth([token]).get(
        `/users/${userId}/invites`
      )
      dispatch({
        type: actionTypes.FETCH_INVITES_SUCCESS,
        payload: invites.data,
      })
    } catch (err) {
      console.log(err)
      dispatch({ type: actionTypes.FETCH_INVITES_FAILURE, payload: err })
    }
  }
}

export const CreateNotification = data => async dispatch => {
  dispatch({
    type: actionTypes.CREATE_NOTIFICATION_SUCCESS,
    payload: data['notification'],
  })
}
export const createInvite = data => async dispatch => {
  dispatch({
    type: actionTypes.CREATE_INVITE_SUCCESS,
    payload: data['invite'],
  })
}
export const deleteNotification = (token, notificationId) => async dispatch => {
  try {
    dispatch({ type: actionTypes.DELETE_NOTIFICATIONS_REQUEST })
    let del = await axiosWithAuth([token]).delete(
      `/notifications/${notificationId}`
    )
    dispatch({
      type: actionTypes.DELETE_NOTIFICATIONS_SUCCESS,
      payload: del.data,
    })
  } catch (err) {
    dispatch({ type: actionTypes.DELETE_NOTIFICATIONS_FAILURE, payload: err })
  }
}

export const acceptInvite = (token, data) => async dispatch => {
  const { user_id, sender_id, group_id } = data
  await dispatch(joinGroup(token, data))
  await dispatch(deleteInvite(token, user_id, sender_id, group_id, true))
}

export const declineInvite = (
  token,
  userId,
  senderId,
  groupId
) => async dispatch => {
  dispatch(deleteInvite(token, userId, senderId, groupId, false))
}

export const deleteInvite = (
  token,
  userId,
  senderId,
  groupId,
  accepted
) => async dispatch => {
  try {
    dispatch({ type: actionTypes.DELETE_INVITES_REQUEST })
    let del = await axiosWithAuth([token]).delete(
      `/groups/${groupId}/invitees/${userId}/${senderId}`
    )
    console.log('del:', del, 'del.data:', del.data)
    accepted
      ? dispatch({
          type: actionTypes.ACCEPT_INVITES_SUCCESS,
          payload: del.data,
        })
      : dispatch({
          type: actionTypes.DELETE_INVITES_SUCCESS,
          payload: del.data,
        })
  } catch (err) {
    dispatch({ type: actionTypes.DELETE_INVITES_FAILURE, payload: err })
  }
}

export const likePost = (token, data, socket) => async dispatch => {
  const { user, id, user_id } = data
  if (token) {
    try {
      dispatch({ type: actionTypes.POST_LIKE_REQUEST })
      const like = await axiosWithAuth([token]).post(
        `/posts_likes/post/${id}`,
        {
          user_id: user.id,
          post_id: id,
        }
      )
      if (like.data.likeResult) {
        if (user_id !== user.id) {
          const notification = await axiosWithAuth([token]).post(
            `/users/${user_id}/notifications`,
            {
              user_id,
              invoker_id: user.id,
              type_id: id,
              type: 'like',
            }
          )
          console.log('what is notification.data', notification.data)
          socket.emit('send notification', {
            userIds: [user_id],
            notification: {
              ...notification.data,
              first_name: user.first_name,
              last_name: user.last_name,
              image: user.image,
            },
            type: 'liked_post',
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
export const likeReply = (token, data, socket) => async dispatch => {
  const { user, id, user_id } = data
  dispatch({ type: actionTypes.REPLY_LIKE_REQUEST })
  const like = await axiosWithAuth([token]).post(`/replies_likes/reply/${id}`, {
    user_id: user.id,
    reply_id: id,
  })
  if (like.data.likeResult) {
    dispatch({
      type: actionTypes.REPLY_LIKE_SUCCESS,
      payload: like.data.likeResult,
    })
    if (user.id !== user_id) {
      const notification = await axiosWithAuth([token]).post(
        `/users/${user_id}/notifications`,
        {
          user_id,
          invoker_id: user.id,
          type_id: id,
          type: 'reply_like',
        }
      )
      socket.emit('send notification', {
        userIds: [user_id],
        notification: {
          ...notification.data,
          first_name: user.first_name,
          last_name: user.last_name,
          image: user.image,
        },
        type: 'liked_reply',
      })
    }
  }
}
export const createReply = (token, data, socket) => async dispatch => {
  const { user, user_id, id, reply_content } = data
  dispatch({ type: actionTypes.CREATE_REPLY_REQUEST })
  const post = await axiosWithAuth([token]).post(`/replies/post/${id}`, {
    user_id: user.id,
    post_id: id,
    reply_content: reply_content,
  })
  if (post.data.reply) {
    dispatch({
      type: actionTypes.CREATE_REPLY_SUCCESS,
      payload: post.data.reply,
    })
    if (user.id !== user_id) {
      const notification = await axiosWithAuth([token]).post(
        `/users/${user_id}/notifications`,
        {
          user_id,
          invoker_id: user.id,
          type_id: id,
          type: 'reply',
        }
      )
      socket.emit('send notification', {
        userIds: [user_id],
        notification: {
          ...notification.data,
          first_name: user.first_name,
          last_name: user.last_name,
          image: user.image,
        },
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
export const deleteGroupPost = (token, id) => async dispatch => {
  dispatch({ type: actionTypes.DELETE_POST_REQUEST })
  const deletedPost = await axiosWithAuth([token]).delete(`/posts/${id}`)
  if (deletedPost.data) {
    dispatch({
      type: actionTypes.DELETE_POST_SUCCESS,
      payload: deletedPost.data,
    })
  }
}
export const requestJoinPrivate = (token, data, socket) => async dispatch => {
  dispatch({ type: actionTypes.JOIN_PRIVATE_REQUEST })
  const { user, privateGroupID, adminIds } = data
  const userId = user.id
  try {
    const privateGroup = await axiosWithAuth([token]).post(
      `/private/group/${privateGroupID}`,
      {
        userId: userId.toString(),
        privateGroupID: privateGroupID,
      }
    )
    if (token && privateGroupID) {
      console.log('privateGroup:::', privateGroup.data[0])
      dispatch({
        type: actionTypes.JOIN_PRIVATE_SUCCESS,
        payload: privateGroup.data[0].group_id,
      })
      let notifications = []
      adminIds.forEach(id => {
        notifications.push(
          axiosWithAuth([token]).post(`/users/${id}/notifications`, {
            user_id: id,
            invoker_id: userId,
            type_id: privateGroupID,
            type: 'group_request',
          })
        )
      })
      Promise.all(notifications).then(values => {
        console.log('emit socket', values)
        socket.emit('send notification', {
          userIds: adminIds,
          notification: {
            ...values[0].data,
            first_name: user.first_name,
            last_name: user.last_name,
            image: user.image,
          },
        })
      })
    }
  } catch (err) {
    dispatch({ type: actionTypes.JOIN_PRIVATE_FAILURE, payload: err })
  }
}
export const cancelRequestJoinPrivate = (token, data) => async dispatch => {
  dispatch({ type: actionTypes.CANCEL_JOIN_PRIVATE_REQUEST })
  const { userId, privateGroupID } = data
  const cancelPrivateGroup = await axiosWithAuth([token]).delete(
    `/private/group/${privateGroupID}/${userId}`
  )
  if (token && privateGroupID) {
    console.log('cancelPrivateGroup', cancelPrivateGroup)
    try {
      dispatch({
        type: actionTypes.CANCEL_JOIN_PRIVATE_SUCCESS,
        payload: privateGroupID,
      })
    } catch (err) {
      dispatch({ type: actionTypes.CANCEL_JOIN_PRIVATE_FAILURE, payload: err })
    }
  }
}

export const fetchPrivateRequests = (token, data) => async dispatch => {
  dispatch({ type: actionTypes.FETCH_PRIVATE_REQUEST })

  if (token) {
    try {
      const { user_id } = data
      const pendingRequests = await axiosWithAuth([token]).get(
        `/users/${user_id}/group_requests`
      )
      const groupIds = pendingRequests.data.map(request => request.group_id)
      dispatch({ type: actionTypes.FETCH_PRIVATE_SUCCESS, payload: groupIds })
    } catch (err) {
      dispatch({ type: actionTypes.FETCH_PRIVATE_FAILURE, payload: err })
    }
  }
}

export const fetchGroup = id => async dispatch => {
  dispatch({ type: actionTypes.FETCH_GROUP_REQUEST })
  const group = await axios.get(`http://localhost:5000/api/groups/${id}`)
  dispatch({ type: actionTypes.FETCH_GROUP_SUCCESS, payload: group.data })
  console.log(group.data)
}

export const editGroup = (groupId, data) => async dispatch => {
  const {
    image,
    description,
    group_name,
    location,
    acronym,
    privacy_setting,
    creator_id,
  } = data
  await dispatch({ type: actionTypes.EDIT_GROUP_REQUEST })
  try {
    const editGroup = await axios.put(
      `http://localhost:5000/api/groups/${groupId}`,
      {
        image,
        description,
        group_name,
        location,
        acronym,
        privacy_setting,
        creator_id,
      }
    )
    console.log('EDIT DATA👙', editGroup.data)
    await dispatch({
      type: actionTypes.EDIT_GROUP_SUCCESS,
      payload: editGroup.data.updated,
    })
  } catch (err) {
    console.log(err)
    dispatch({ type: actionTypes.EDIT_GROUP_FAILURE, payload: err })
  }
}

export const createGroup = groupData => async dispatch => {
  try {
    await dispatch({ type: actionTypes.CREATE_GROUP_REQUEST })
    await dispatch({ type: actionTypes.ADD_GROUP_REQUEST })
    const newGroup = await axios.post(
      'http://localhost:5000/api/groups',
      groupData
    )
    console.log('creating new group', newGroup);
    const createdGroup = newGroup.data.newGroup;
    if (createdGroup) {
      const addedGroup = {
        name: createdGroup.group_name,
        image: createdGroup.image,
        id: createdGroup.id,
        user_type: 'admin',
      }
      console.log('new group created', addedGroup)
      await dispatch({
        type: actionTypes.CREATE_GROUP_SUCCESS,
        payload: addedGroup,
      })
      // dispatch({ type: types.ADD_GROUP_SUCCESS, payload: addedGroup })
      return addedGroup;
    } else {
      throw new Error();
    }
  } catch(err) {
    await dispatch({
      type: actionTypes.CREATE_GROUP_FAILURE,
      payload: err,
    })
  }
}
