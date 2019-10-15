import { axiosWithAuth } from '../components/utils/axiosWithAuth';
import * as actionTypes from './actionTypes';

export const fetchGroupPosts = (token, id) => async dispatch => {
    
    if (token)
    try {
      dispatch({ type: actionTypes.FETCH_POSTS_REQUEST })
      const posts = await axiosWithAuth([token]).get(`/posts/group/${id}`)
      const sortedPost = posts.data.postsLoaded.sort((a, b) => a.id - b.id)
      dispatch({ type: actionTypes.FETCH_POSTS_SUCCESS, payload: sortedPost })
    } catch {
      dispatch({ type: actionTypes.FETCH_POSTS_FAILURE })
    }
}