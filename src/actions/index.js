import * as actionTypes from './actionTypes'
import axios from 'components/utils/axiosWithoutAuth'
import { axiosWithAuth } from '../components/utils/axiosWithAuth'
import { Mixpanel } from '../components/analytics/Mixpanel'
import MixpanelMessages from '../components/analytics/MixpanelMessages'

export const updateSocket = data => dispatch => {
  dispatch({ type: actionTypes.UPDATE_SOCKET, payload: data })
}

export const fetchGroupPosts = id => async dispatch => {
  try {
    dispatch({ type: actionTypes.FETCH_POSTS_REQUEST })
    const posts = await axios.get(`/posts/group/${id}`)
    const sortedPost = posts.data.postsLoaded.sort((a, b) => a.id - b.id)
    dispatch({ type: actionTypes.FETCH_POSTS_SUCCESS, payload: sortedPost })
  } catch (err) {
    console.log(err)
    dispatch({ type: actionTypes.FETCH_POSTS_FAILURE, payload: err })
  }
}
export const createGroupPost = (token, data, socket) => async dispatch => {
  const { userId, groupId, post_content } = data
  if (token) {
    // If post content is not blank
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

        socket.emit('groupPost', {
          post: post.data.postResult,
          room: groupId,
        })

        Mixpanel.activity(userId, MixpanelMessages.POST_CREATED)
      } catch (err) {
        console.log(err)
        dispatch({ type: actionTypes.CREATE_POST_FAILURE, payload: err })
      }
    }
  }
}

export const receiveGroupPost = data => async dispatch => {
  console.log('DATA IN RECEIVE', data)
  await dispatch({ type: actionTypes.RECEIVE_POST_SUCCESS, payload: data.post })
}

export const receiveGroupReply = data => async dispatch => {
  console.log('DATA IN REPLY', data)
  await dispatch({
    type: actionTypes.RECEIVE_GROUP_REPLY_SUCCESS,
    payload: data.reply,
  })
}

export const receivePostReply = data => async dispatch => {
  console.log('DATA IN POST', data)
  await dispatch({
    type: actionTypes.RECEIVE_POST_REPLY_SUCCESS,
    payload: data.reply,
  })
}

export const receivingGroup = groupData => async dispatch => {
  const { user, group_id, fromGroupView, socket } = groupData
  try {
    await dispatch({ type: actionTypes.ADD_GROUP_REQUEST })
    const result = await axios.post(`/groups_users/search`, {
      user_id: user.id,
      group_id,
    })
    const relation = result.data.relationExists
    if (relation) {
      const data = relation[0]
      console.log('data', data)
      const { group_name, group_image, group_id, user_type } = data
      const addedGroup = {
        name: group_name,
        image: group_image,
        id: group_id,
        user_type: user_type,
      }
      socket.emit('join.groups', addedGroup.id)
      await dispatch({
        type: actionTypes.ADD_GROUP_SUCCESS,
        payload: addedGroup,
      })
      await dispatch({
        type: actionTypes.CLEAN_UP_PENDING_GROUP_REQUESTS,
        payload: group_id,
      })
      if (fromGroupView) {
        await dispatch({
          type: actionTypes.ADD_MEMBER_SUCCESS,
          payload: user,
        })
        await dispatch({
          type: actionTypes.EDIT_MEMBER_TYPE_SUCCESS,
          payload: addedGroup.user_type,
        })
      }
    } else {
      throw new Error()
    }
  } catch (err) {
    console.log(err)
    await dispatch({ type: actionTypes.ADD_GROUP_FAILURE, payload: err })
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
      console.log('NOTIFIC', notifications)
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
  const { user, sender_id, group_id } = data
  await dispatch(joinGroup(data))
  Mixpanel.activity(user.id, MixpanelMessages.INVITE_ACCEPT)
  await dispatch(deleteInvite(token, user.id, sender_id, group_id, true))
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
  const { user, id, user_id, group_id } = data
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
      socket.emit('groupPost', {
        likeType: like.data.likeResult,
        room: group_id,
        type: 'like',
      })
    } catch (err) {
      console.log(err)
      dispatch({ type: actionTypes.POST_LIKE_FAILURE, payload: err })
    }
  }
}

export const receiveLike = data => dispatch => {
  dispatch({ type: actionTypes.RECEIVE_LIKE_SUCCESS, payload: data.likeType })
}

export const dislikePost = (
  token,
  data,
  group_id,
  socket
) => async dispatch => {
  if (token) {
    try {
      dispatch({ type: actionTypes.POST_UNLIKE_REQUEST })
      const unLike = await axiosWithAuth([token]).delete(`/posts_likes/${data}`)
      dispatch({
        type: actionTypes.POST_UNLIKE_SUCCESS,
        payload: unLike.data.deleted[0],
      })
      socket.emit('groupPost', {
        likeType: unLike.data.deleted[0],
        room: group_id,
        type: 'dislike',
      })
    } catch (err) {
      console.log(err)
    }
  }
}

export const receiveDislike = data => dispatch => {
  dispatch({
    type: actionTypes.RECEIVE_DISLIKE_SUCCESS,
    payload: data.likeType,
  })
}

export const fetchPost = id => async dispatch => {
  try {
    dispatch({ type: actionTypes.FETCH_POST_REQUEST })
    const response = await axios.get(`/posts/${id}`)
    console.log('reponse', response)
    const postObj = response.data.postLoaded
    dispatch({ type: actionTypes.FETCH_POST_SUCCESS, payload: postObj })
    console.log(postObj)
    return postObj
  } catch (err) {
    dispatch({ type: actionTypes.FETCH_POST_FAILURE, payload: err })
  }
}
export const likeReply = (token, data, socket) => async dispatch => {
  const { user, id, user_id, group_id, post_id } = data
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
    socket.emit('groupPost', {
      room: group_id,
      likeType: { ...like.data.likeResult, post_id },
      type: 'reply_like',
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

export const receiveReplyLike = data => dispatch => {
  dispatch({ type: actionTypes.RECEIVE_REPLY_LIKE, payload: data.likeType })
}

export const createReply = (token, data, socket) => async dispatch => {
  const { user, user_id, id, reply_content, group } = data
  dispatch({ type: actionTypes.CREATE_REPLY_REQUEST })
  try {
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
      Mixpanel.activity(user.id, MixpanelMessages.REPLY_CREATED)
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
      socket.emit('replyPost', {
        room: group,
        reply: post.data.reply,
      })
    }
  } catch (err) {
    console.log(err);
  }
}

export const deleteReply = id => async dispatch => {
  try {
    await dispatch({ type: actionTypes.DELETE_REPLY_REQUEST })
    await axios.delete(`/replies/${id}`)
    await dispatch({ type: actionTypes.DELETE_REPLY_SUCCESS, payload: id })
  } catch (err) {
    await dispatch({ type: actionTypes.DELETE_REPLY_FAILURE })
  }
}

export const dislikeReply = (token, id, data, socket) => async dispatch => {
  const { group_id, post_id } = data
  dispatch({ type: actionTypes.REPLY_DISLIKE_REQUEST })
  const unLike = await axiosWithAuth([token]).delete(`/replies_likes/${id}`)
  console.log(unLike.data.deleted[0], 'delete data')
  dispatch({
    type: actionTypes.REPLY_DISLIKE_SUCCESS,
    payload: unLike.data.deleted[0],
  })
  socket.emit('groupPost', {
    room: group_id,
    likeType: { ...unLike.data.deleted[0], post_id },
    type: 'reply_dislike',
  })
}

export const receiveReplyDislike = data => dispatch => {
  dispatch({ type: actionTypes.RECEIVE_REPLY_DISLIKE, payload: data.likeType })
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
      Mixpanel.activity(privateGroupID, MixpanelMessages.REQUEST_SENT)
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
  try {
    const group = await axios.get(`/groups/${id}`)
    dispatch({ type: actionTypes.FETCH_GROUP_SUCCESS, payload: group.data })
    console.log(group.data)
  } catch (err) {
    dispatch({ type: actionTypes.FETCH_GROUP_FAILURE, payload: err })
  }
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
    const editGroup = await axios.put(`/groups/${groupId}`, {
      image,
      description,
      group_name,
      location,
      acronym,
      privacy_setting,
      creator_id,
    })
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
    await dispatch({ type: actionTypes.ADD_GROUP_REQUEST })
    const newGroup = await axios.post('/groups', groupData)
    console.log('creating new group', newGroup)
    const createdGroup = newGroup.data.newGroup
    if (createdGroup) {
      const addedGroup = {
        name: createdGroup.group_name,
        image: createdGroup.image,
        id: createdGroup.id,
        user_type: 'admin',
      }
      console.log('new group created', addedGroup)
      await dispatch({
        type: actionTypes.ADD_GROUP_SUCCESS,
        payload: addedGroup,
      })
      Mixpanel.activity(createdGroup.id, MixpanelMessages.GROUP_CREATED)
      return addedGroup
    } else {
      throw new Error()
    }
  } catch (err) {
    await dispatch({
      type: actionTypes.ADD_GROUP_FAILURE,
      payload: err,
    })
  }
}

export const addToGroup = groupData => async dispatch => {
  const { group_id, invoker, user_id, socket } = groupData
  try {
    const deleted = await axios.delete(`/private/group/${group_id}/${user_id}`)
    if (deleted) {
      Mixpanel.activity(group_id, MixpanelMessages.REQUEST_ACCEPT)
      const notification = await axios.post(`/users/${user_id}/notifications`, {
        user_id,
        invoker_id: invoker.id,
        type_id: group_id,
        type: 'group_accepted',
      })
      const result = await axios.post(`/groups_users`, {
        user_id,
        group_id,
        user_type: 'member',
      })
      console.log('returning member?', result)
      const user = result.data.newGroupUsers
      dispatch({
        type: actionTypes.ADD_MEMBER_SUCCESS,
        payload: {
          ...user,
          location: user.user_location,
          status: user.user_type,
          name: `${user.first_name} ${user.last_name}`,
          image: user.user_image,
          id: user.user_id,
        },
      })
      console.log('emit socket', notification)
      socket.emit('send notification', {
        userIds: [user_id],
        notification: {
          ...notification.data,
          first_name: invoker.first_name,
          last_name: invoker.last_name,
          image: invoker.image,
        },
      })
    }
  } catch (err) {
    console.log(err)
  }
}

export const joinGroup = groupData => async dispatch => {
  const { user, group_id, fromGroupView, socket } = groupData
  const user_id = user.id
  try {
    await dispatch({ type: actionTypes.ADD_GROUP_REQUEST })
    const result = await axios.post(`/groups_users`, {
      user_id,
      group_id,
      user_type: 'member',
    })
    console.log('joining new group', result)
    const newGroup = result.data.newGroupUsers
    if (newGroup) {
      const addedGroup = {
        name: newGroup.group_name,
        image: newGroup.group_image,
        id: newGroup.group_id,
        user_type: newGroup.user_type,
      }
      console.log('new group joined', addedGroup)
      socket.emit('join.groups', addedGroup.id)
      await dispatch({
        type: actionTypes.ADD_GROUP_SUCCESS,
        payload: addedGroup,
      })
      Mixpanel.activity(user.id, MixpanelMessages.GROUP_JOINED)
      if (fromGroupView) {
        await dispatch({
          type: actionTypes.ADD_MEMBER_SUCCESS,
          payload: user,
        })
      }
      return addedGroup
    } else {
      throw new Error()
    }
  } catch (err) {
    await dispatch({
      type: actionTypes.ADD_GROUP_FAILURE,
      payload: err,
    })
  }
}

export const leaveGroup = data => async dispatch => {
  const { group_id, user_id } = data
  dispatch({ type: actionTypes.LEAVE_GROUP_REQUEST })
  const result = await axios.delete(
    `/groups_users/?group_id=${group_id}&user_id=${user_id}`
  )

  if (result.data) {
    dispatch({ type: actionTypes.LEAVE_GROUP_SUCCESS, payload: group_id })
    Mixpanel.activity(user_id, MixpanelMessages.GROUP_LEFT)
    dispatch({ type: actionTypes.REMOVE_MEMBER_SUCCESS, payload: user_id })
  }
}

export const removeMember = data => async dispatch => {
  try {
    const { group_id, user_id } = data
    const result = await axios.delete(
      `/groups_users/?group_id=${group_id}&user_id=${user_id}`
    )
    if (result) {
      dispatch({ type: actionTypes.REMOVE_MEMBER_SUCCESS, payload: user_id })
    }
  } catch (err) {
    dispatch({ type: actionTypes.REMOVE_MEMBER_FAILURE, payload: err })
  }
}

export const deleteGroup = groupId => async dispatch => {
  try {
    dispatch({ type: actionTypes.DELETE_GROUP_REQUEST })
    const deletedGroup = await axios.delete(`/groups/${groupId}`)
    if (deletedGroup) {
      dispatch({
        type: actionTypes.DELETE_GROUP_SUCCESS,
        payload: Number(groupId),
      })
    }
  } catch (err) {
    dispatch({ type: actionTypes.DELETE_GROUP_FAILURE, payload: err })
  }
}

export const fetchUserMembership = data => async dispatch => {
  const { group_id, user_id } = data

  dispatch({ type: actionTypes.FETCH_MEMBER_TYPE_REQUEST })

  try {
    const response = await axios.post(`/groups_users/search`, {
      user_id,
      group_id,
    })
    const relation = response.data.relationExists
    console.log('membership', relation)

    if (relation) {
      dispatch({
        type: actionTypes.FETCH_MEMBER_TYPE_SUCCESS,
        payload: relation[0],
      })
    } else {
      console.log('throwing err')
      throw new Error()
    }
  } catch (err) {
    dispatch({
      type: actionTypes.FETCH_MEMBER_TYPE_FAILURE,
      payload: err,
    })
  }
}

export const editUserMembership = data => async dispatch => {
  console.log('editing membership', data)
  const { user_type } = data
  await dispatch({ type: actionTypes.EDIT_MEMBER_TYPE_REQUEST })
  await dispatch({
    type: actionTypes.EDIT_MEMBER_TYPE_SUCCESS,
    payload: user_type,
  })
}

export const removeRequest = data => async dispatch => {
  dispatch({ type: actionTypes.REMOVE_REQUEST_REQUEST })
  const { group_id, user_id } = data
  try {
    const deleted = await axios.delete(`/private/group/${group_id}/${user_id}`)
    if (deleted) {
      dispatch({ type: actionTypes.REMOVE_REQUEST_SUCCESS, payload: user_id })
    } else {
      throw new Error()
    }
  } catch (err) {
    console.log(err)
    dispatch({ type: actionTypes.REMOVE_REQUEST_FAILURE, payload: err })
  }
}
