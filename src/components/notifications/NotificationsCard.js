import React from 'react'
import { withRouter } from 'react-router'
import { useSelector } from 'react-redux'

import Moment from 'react-moment'

import styled from 'styled-components'
import { makeStyles } from '@material-ui/core/styles'
import { Card, Avatar, Tooltip } from '@material-ui/core/'

const NotificationsCard = props => {
  // De-structure props to gain access to keys
  const {
    // note: various other key/value pairs available, see postman documentation
    id,
    first_name,
    last_name,
    user_image,
    liker_id,
    liker_name,
    liker_image,
    poster_id,
    poster_name,
    replier_id,
    replier_name,
    post_id,
    post_content,
    reply_id,
    reply_content,
    created_at,
    tag,
    group_image,
    acronym,
  } = props.activity

  // Material UI styling
  const useStyles = makeStyles({
    newCard: {
      display: 'flex',
      width: '90%',
      backgroundColor: '#FFFFE0',
    },
    card: {
      display: 'flex',
      width: '90%',
    },
    avatar: {
      marginRight: 0,
      marginLeft: 0,
      height: 50,
      width: 50,
    },
    content: {
      color: 'black',
      fontSize: 16,
    },
  })

  const classes = useStyles()

  // fullName is needed here as if content is post or reply, there is no liker/poster, only first name and last name
  const fullName = first_name + ' ' + last_name

  // Streamline post id and reply id for linking
  let postId
  if (tag === 'post') {
    postId = id
  }
  if (tag === 'reply' || tag === 'replyLike' || tag === 'postLike') {
    postId = post_id
  }
  let replyId
  if (tag === 'reply') {
    replyId = id
  }
  if (tag === 'replyLike') {
    replyId = reply_id
  }

  // Maintain max allowable content length for posts and replies
  let postContent, replyContent
  if (post_content) postContent = post_content.slice(0, 20)
  if (reply_content) replyContent = reply_content.slice(0, 20)
  if (post_content && post_content.length > 20) postContent += '...'
  if (reply_content && reply_content.length > 20) replyContent += '...'

  // Onclick handler for notifications to direct user to correct app path
  const goToPost = e => {
    e.stopPropagation()
    props.history.push({
      pathname: `/post/${postId}`,
      // Provide replyId if appropriate for scrolling into focus upon navigation
      replyNumber: replyId || null,
    })
  }

  // Grab notification timestamp from user
  const timeStamp = useSelector(
    state => state.userReducer.loggedInUser.notification_check
  )
  let checkIfNew
  if (created_at <= timeStamp) checkIfNew = false
  // Notification_checks default to null for new users, thus the need for control flow here
  if (created_at > timeStamp || timeStamp === null) checkIfNew = true

  return (
    <NotificationCardDiv onClick={e => goToPost(e)}>
      <Card className={checkIfNew ? classes.newCard : classes.card}>
        <CardIcon>
          <Avatar
            aria-label='author_avatar'
            className={classes.avatar}
            src={liker_image || user_image}
            alt={'Avatar'}
          />
        </CardIcon>
        <CardMessage>
          <div>
            <span>{liker_name || fullName}</span>{' '}
            {tag === 'post' && <>made a post: {postContent}</>}
            {tag === 'reply' && <>replied to a post: {replyContent}</>}
            {tag === 'postLike' && (
              <>
                liked {liker_id === poster_id && 'their own'}
                {liker_id !== poster_id && (
                  <span>{poster_name}'s</span>
                )} post: {postContent}
              </>
            )}
            {tag === 'replyLike' && (
              <>
                liked {liker_id === replier_id && 'their own'}
                {liker_id !== replier_id && <span>{replier_name}'s</span>}{' '}
                reply: {replyContent}
              </>
            )}{' '}
            <p>
              <Tooltip title={<Moment format='LLLL'>{created_at}</Moment>}>
                <Moment fromNow>{created_at}</Moment>
              </Tooltip>
            </p>
          </div>
        </CardMessage>
        <CardGroup>
          <Avatar
            aria-label='group_avatar'
            className={classes.avatar}
            src={group_image}
            alt={'Avatar'}
          />
          <p>{acronym}</p>
        </CardGroup>
      </Card>
    </NotificationCardDiv>
  )
}

const NotificationCardDiv = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 0.4rem;
  text-align: left;
  div {
    color: black;
    span {
      text-transform: capitalize;
      font-weight: bold;
    }
    p {
      color: gray;
      font-size: 12;
      margin: 0;
    }
  }
`

const CardIcon = styled.div`
  display: flex;
  justify-content: center;
  width: 20%;
  margin: 1%;
`

const CardMessage = styled.div`
  width: 60%;
  display: flex;
  margin: 1%;
  overflow: hidden;
`

const CardGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20%;
  margin: 1%;
`

export default withRouter(NotificationsCard)
