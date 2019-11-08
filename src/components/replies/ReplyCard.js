import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import styled from 'styled-components'
import { Comment, Icon, Label } from 'semantic-ui-react'
import { axiosWithAuth } from '../utils/axiosWithAuth'
import useGetToken from '../utils/useGetToken'
import Moment from 'react-moment'
import { likeReply, dislikeReply } from 'actions'

const ReplyCard = props => {
  const {
    first_name,
    last_name,
    image,
    id,
    reply_content,
    user_id,
    replyLikes,
    created_at,
  } = props.reply

  const dispatch = useDispatch()
  const user = useSelector(state => state.userReducer.loggedInUser)
  const socket = useSelector(state => state.socketReducer.socket)
  const replyLikeId = replyLikes.find(like => like.user_id === user.id)

  // Fetches Auth0 token for axios call
  const [token] = useGetToken()

  // Functions for liking & unliking replies
  async function addReplyLike(e) {
    e.preventDefault()
    const data = {
      user_id, // id of user who owns the entity
      user, // id of user who is liking an entity
      id,
    }
    dispatch(likeReply(token, data, socket))
  }

  async function unLikeReply(e) {
    dispatch(dislikeReply(token, replyLikeId.id))
  }

  const deleteReply = async () => {
    const reply = await axiosWithAuth([token]).delete(`/replies/${id}`)
    if (reply) {
      props.setSubmitted(true)
    }
  }

  return (
    <CommentCard>
      <Comment>
        <Comment.Avatar src={image} />
        <Comment.Content>
          <HeaderWrapper>
            <Comment.Author as='a'>{`${first_name} ${last_name}`}</Comment.Author>
            <Icon link name='trash alternate' onClick={deleteReply} />
          </HeaderWrapper>
          <CommentText>{reply_content}</CommentText>
          <Comment.Actions>
            <ActionsWrapper>
              <Comment.Action>
                <LikesWrapper>
                  <Label
                    onClick={replyLikeId ? unLikeReply : addReplyLike}
                    style={{ fontSize: '1.2rem' }}
                    color={replyLikeId ? 'blue' : ''}
                  >
                    <Icon name='thumbs up' />
                    {replyLikes.length}
                  </Label>
                </LikesWrapper>
              </Comment.Action>
              <Comment.Metadata>
                <Moment fromNow>{created_at}</Moment>
              </Comment.Metadata>
            </ActionsWrapper>
          </Comment.Actions>
        </Comment.Content>
      </Comment>
    </CommentCard>
  )
}

const CommentText = styled(Comment.Text)`
  margin-top: 5px !important;
  margin-right: 30px !important;
`

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

const LikesWrapper = styled.div`
  display: flex;
  font-size: 1.4rem;
  vertical-align: middle;
`

const CommentCard = styled.div`
  background: white;
  border-radius: 4px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  padding: 20px 10px 5px 10px;
  margin-top: 15px;
`

const ActionsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
`

export default ReplyCard
