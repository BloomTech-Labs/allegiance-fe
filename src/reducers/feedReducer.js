import * as indexTypes from '../actions/actionTypes';
import * as feedTypes from '../components/feed/actions/actionTypes'

const initialState = {
  posts: [],
}

export const feedReducer = (state = initialState, action) => {
  switch (action.type) {
    case feedTypes.FETCH_FEED_SUCCESS:
      return {
        ...state,
        posts: action.payload,
      }
    case feedTypes.RECEIVE_FEED_LIKE_SUCCESS:
    case indexTypes.POST_LIKE_SUCCESS:
      return {
        ...state,
        posts: state.posts.map(post => {
          if (post.id === action.payload.post_id) {
            return {
              ...post,
              likes: [...post.likes, action.payload],
            }
          }
          return post;
        })
      }
    case feedTypes.RECEIVE_FEED_DISLIKE_SUCCESS:
    case indexTypes.POST_UNLIKE_SUCCESS:
      return {
        ...state,
        posts: state.posts.map(post => {
          if (post.id === action.payload.post_id) {
            return {
              ...post,
              likes: post.likes.filter(like => like.id !== action.payload.id),
            }
          }
          return post;
        })
      }
    case feedTypes.RECEIVE_FEED_REPLY_SUCCESS:
      return {
        ...state,
        posts: state.posts.map(post => {
          if (post.id === action.payload.post_id) {
            return {
              ...post,
              replies: [...post.replies, action.payload],
            }
          }
          return post;
        })
      }
    case feedTypes.RECEIVE_FEED_POST_SUCCESS:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      }
    default:
      return state
  }
}