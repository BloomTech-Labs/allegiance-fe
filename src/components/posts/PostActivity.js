// import React from 'react'
// this component does NOTHING
import { useSelector } from 'react-redux'
import { axiosWithAuth } from '../utils/axiosWithAuth'
import useGetToken from '../utils/useGetToken'

import styled from 'styled-components'
import {
  Favorite,
  FavoriteBorder,
  ChatBubbleOutline,
  DeleteOutline,
} from '@material-ui/icons'

const PostActivity = props => {
  const userId = useSelector(state => state.userReducer.loggedInUser.id)
  const [token] = useGetToken()
  const postLikeId = props.post.likes.find(like => like.user_id === userId)
  async function addLike(e) {
    e.preventDefault()
    console.log("add like function")
    const like = await axiosWithAuth([token]).post(
      `/posts_likes/post/${props.post.id}`,
      {
        user_id: userId,
        post_id: props.post.id,
      }
    )
    if (like.data.likeResult) {
      // axiosWithAuth([token]).post(`/users/${}/notifications`, {
      //   user_id: "",
      //   invoker: "",
      //   type_id: "",
      //   type: 'like'
      // })
      props.setSubmitted(true)
    }
  }

  async function unLike(e) {
    e.preventDefault()
    const unLike = await axiosWithAuth([token]).delete(
      `/posts_likes/${postLikeId.id}`
    )
    if (unLike) {
      props.setSubmitted(true)
    }
  }

  return (
    <ActivityContainer>
      <TopContainer>
        <h3>{props.post.likes.length} Likes</h3>
      </TopContainer>
      <hr />
      <BottomContainer>
        <LikeContainer>
          {!postLikeId && <FavoriteBorder onClick={addLike} />}
          {postLikeId && <Favorite onClick={unLike} />}
        </LikeContainer>

        <ChatBubbleOutline />
        <DeleteOutline onClick={() => props.deletePost(props.post.id)} />
      </BottomContainer>
    </ActivityContainer>
  )
}

const ActivityContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-top: 1px solid black;
  height: 7vh;
  hr {
    width: 90%;
    color: lightgray;
    margin: 0;
  }
`

const TopContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 3vh;
  h3 {
    padding: 10px;
  }
`

const BottomContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 4vh;
  justify-content: space-between;
  padding: 0 10px 0 10px;
  margin: 5px 0;
`

const LikeContainer = styled.div``

export default PostActivity
