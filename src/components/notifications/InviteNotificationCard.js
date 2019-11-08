import React from 'react'
import { withRouter } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import useGetToken from '../utils/useGetToken'
import Moment from 'react-moment'

import styled from 'styled-components'
import { makeStyles } from '@material-ui/core/styles'
import { Card, Avatar, Tooltip } from '@material-ui/core/'

import { acceptInvite, declineInvite } from 'actions/index'
import { Mixpanel } from '../analytics/Mixpanel'

const InviteNotificationsCard = props => {
  // De-structure props to gain access to keys
  const {
    // note: various other key/value pairs available, see postman documentation
    user_id,
    sender_id,
    group_id,
    created_at,
    group_name,
    image,
    first_name,
    accepted,
  } = props.invite

  const dispatch = useDispatch()
  // Material UI styling
  const useStyles = makeStyles({
    newCard: {
      display: 'flex',
      justifyContent: 'space-evenly',
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

  const [token] = useGetToken()

  const classes = useStyles()

  // fullName is needed here as if content is post or reply, there is no liker/poster, only first name and last name
  //   const fullName = first_name + ' ' + last_name

  // Streamline post id and reply id for linking
  // let postId
  // if (tag === 'post') {
  //   postId = id
  // }
  // if (tag === 'reply' || tag === 'replyLike' || tag === 'postLike') {
  //   postId = post_id
  // }
  // let replyId
  // if (tag === 'reply') {
  //   replyId = id
  // }
  // if (tag === 'replyLike') {
  //   replyId = reply_id
  // }

  // Maintain max allowable content length for posts and replies
  //   let cutGroupName = ''
  //   if (group_name) cutGroupName = group_name.slice(0, 20)
  //   if (group_name && group_name.length > 20) cutGroupName += '...'

  // Onclick handler for notifications to direct user to correct app path
  const goToGroup = e => {
    e.stopPropagation()
    props.history.push({
      pathname: `/group/${group_id}`,
      // Provide replyId if appropriate for scrolling into focus upon navigation
      // replyNumber: replyId || null,
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
    <NotificationCardDiv>
      <Card
        onClick={e => goToGroup(e)}
        className={checkIfNew ? classes.newCard : classes.card}
      >
        <CardIcon>
          <Avatar
            aria-label='author_avatar'
            className={classes.avatar}
            src={image}
            alt={'Avatar'}
          />
        </CardIcon>
        {!accepted ? (
          <>
            <CardMessage>
              <div>
                <span>{first_name}</span> {<>invited you to a group</>}{' '}
                <p>
                  <Tooltip title={<Moment format='LLLL'>{created_at}</Moment>}>
                    <Moment fromNow>{created_at}</Moment>
                  </Tooltip>
                </p>
              </div>
            </CardMessage>
            <Accept
              onClick={evt => {
                evt.stopPropagation()
                const data = {
                  user: props.user,
                  sender_id,
                  group_id,
                  Mixpanel,
                }
                dispatch(acceptInvite(token, data))
              }}
            >
              ✔
            </Accept>
            <Decline
              onClick={evt => {
                evt.stopPropagation()
                dispatch(declineInvite(token, user_id, sender_id, group_id))
              }}
            >
              X
            </Decline>
          </>
        ) : (
          <CardMessage>
            <div>{<>You have joined {group_name}.</>} </div>
          </CardMessage>
        )}
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
  width: 40%;
  display: flex;
  margin: 1%;
  overflow: hidden;
`

// const CardGroup = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   width: 20%;
//   margin: 1%;
// `

const Accept = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: green;
  font-weight: 700;
  border-radius: 5px;
  color: white;
  width: 10%;
  margin: 1%;
  border-style: none;
`
const Decline = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: red;
  font-weight: 700;
  border-radius: 5px;
  color: white;
  width: 10%;
  margin: 1%;
  border-style: none;
`

export default withRouter(InviteNotificationsCard)
