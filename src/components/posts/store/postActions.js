import * as t from './postTypes'
import axios from 'components/utils/axiosWithoutAuth'
import MixpanelMessages from 'components/analytics/MixpanelMessages'
import { Mixpanel } from 'components/analytics/Mixpanel'

export const createGroupPost = (data, socket) => async dispatch => {
  const { userId, groupId, post_content, img } = data
  // If post content is not blank
  if (!post_content.match(/^\s+$/)) {
    try {
      dispatch({ type: t.CREATE_POST_REQUEST })
      const post = await axios.post(`/posts/group/${groupId}`, {
        user_id: userId,
        group_id: groupId,
        post_content: post_content,
        img,
      })
      console.log('before dispatch', post.data)
      dispatch({
        type: t.CREATE_POST_SUCCESS,
        payload: post.data.postResult,
      })

      socket.emit('groupPost', {
        post: post.data.postResult,
        room: groupId,
      })

      Mixpanel.activity(userId, MixpanelMessages.POST_CREATED)
    } catch (err) {
      console.log(err)
      dispatch({ type: t.CREATE_POST_FAILURE, payload: err })
    }
  }
}

export const deleteGroupPost = (token, id) => async dispatch => {
  dispatch({ type: t.DELETE_POST_REQUEST })
  const deletedPost = await axios.delete(`/posts/${id}`)
  if (deletedPost.data) {
    dispatch({
      type: t.DELETE_POST_SUCCESS,
      payload: deletedPost.data,
    })
  }
}
