import * as types from 'actions/actionTypes'

const initialState = {
  posts: [],
  arePostsLoading: false,
  post: {},
  error: '',
  acronym: null,
  created_at: null,
  creator_id: null,
  description: null,
  group_name: null,
  id: null,
  image: null,
  location: null,
  privacy_setting: null,
  updated_at: null,
  allegiances: [],
  members: [],
  reqs: [],
  memberType: null,
}
export const groupReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.DELETE_REPLY_SUCCESS:
      return {
        ...state,
        post: {
          ...state.post,
          replies: state.post.replies.filter(
            reply => reply.id !== action.payload
          ),
        },
      }
    case types.FETCH_POSTS_REQUEST:
      return {
        ...state,
        arePostsLoading: true,
      }
    case types.FETCH_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.payload,
        arePostsLoading: false,
      }
    case types.FETCH_POSTS_FAILURE:
      return {
        ...state,
        error: action.payload,
        arePostsLoading: false,
      }
    case types.RECEIVE_POST_SUCCESS:
    case types.CREATE_POST_SUCCESS:
      return {
        ...state,
        posts: [...state.posts, action.payload],
      }
    case types.CREATE_POST_FAILURE:
      return {
        ...state,
        error: action.payload,
      }
    case types.RECEIVE_LIKE_SUCCESS:
    case types.POST_LIKE_SUCCESS:
      const newState = state.posts.filter(obj => {
        if (obj.id === action.payload.post_id) {
          obj.likes.push(action.payload)
          return obj
        }
        return obj
      })
      return {
        ...state,
        posts: newState,
        post: {
          ...state.post,
          likes: state.post.likes ? [...state.post.likes, action.payload] : [],
        },
      }
    case types.RECEIVE_DISLIKE_SUCCESS:
    case types.POST_UNLIKE_SUCCESS:
      const filterPosts = state.posts.filter(obj => {
        if (obj.id === action.payload.post_id) {
          obj.likes = obj.likes.filter(
            likeObj => likeObj.id !== action.payload.id
          )
          return obj
        }
        return obj
      })
      return {
        ...state,
        posts: filterPosts,
        post: {
          ...state.post,
          likes: state.post.likes
            ? state.post.likes.filter(obj => obj.id !== action.payload.id)
            : null,
        },
      }
    case types.RECEIVE_REPLY_DISLIKE:
    case types.REPLY_DISLIKE_SUCCESS:
      return {
        ...state,
        post: {
          ...state.post,
          replies: state.post.replies.filter(obj => {
            if (obj.id === action.payload.reply_id) {
              obj.replyLikes = obj.replyLikes.filter(
                likeObj => likeObj.id !== action.payload.id
              )
              return obj
            }
            return obj
          }),
        },
      }
    case types.RECEIVE_REPLY_LIKE:
    case types.REPLY_LIKE_SUCCESS:
      return {
        ...state,
        post: {
          ...state.post,
          replies: state.post.replies.filter(obj => {
            if (obj.id === action.payload.reply_id) {
              obj.replyLikes.push(action.payload)
              return obj
            }
            return obj
          }),
        },
      }
    case types.CLEAR_POSTS:
      return initialState
    case types.FETCH_POST_SUCCESS:
      return {
        ...state,
        post: action.payload,
      }
    case types.RECEIVE_POST_REPLY_SUCCESS:
    case types.CREATE_REPLY_SUCCESS:
      return {
        ...state,
        post: {
          ...state.post,
          replies: [...state.post.replies, action.payload],
        },
      }
    case types.POST_LIKE_FAILURE:
      return {
        ...state,
        error: action.payload,
      }
    case types.FETCH_GROUP_SUCCESS:
      return {
        ...state,
        ...action.payload.group,
        members: action.payload.members,
        allegiances: action.payload.allegiances,
        reqs: action.payload.reqs,
      }
    case types.DELETE_POST_SUCCESS:
      console.log(action.payload)
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.payload.id),
      }
    case types.FETCH_POST_FAILURE:
      return {
        ...state,
        error: action.payload,
      }
    case types.EDIT_GROUP_SUCCESS:
      return {
        ...state,
        ...action.payload,
      }
    case types.ADD_MEMBER_SUCCESS:
      return {
        ...state,
        members: [...state.members, action.payload],
      }
    case types.REMOVE_MEMBER_SUCCESS:
      return {
        ...state,
        members: state.members.filter(member => member.id !== action.payload),
      }
    case types.REMOVE_MEMBER_FAILURE:
      return {
        ...state,
        error: action.payload,
      }
    case types.FETCH_MEMBER_TYPE_SUCCESS:
      return {
        ...state,
        memberType: action.payload.user_type,
      }
    case types.EDIT_MEMBER_TYPE_SUCCESS:
      return {
        ...state,
        memberType: action.payload,
      }
    case types.REMOVE_REQUEST_SUCCESS:
      return {
        ...state,
        reqs: state.reqs.filter(req => req.id !== action.payload),
      }
    case types.RECEIVE_GROUP_REPLY_SUCCESS:
      return {
        ...state,
        posts: state.posts.map(post => {
          if (post.id === action.payload.post_id) {
            return { ...post, replies: [...post.replies, action.payload] }
          } else {
            return post
          }
        }),
      }
    default:
      return state
  }
}
