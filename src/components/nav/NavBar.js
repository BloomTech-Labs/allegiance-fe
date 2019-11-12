import React, { useEffect } from 'react'
import { useAuth0 } from '../auth/react-auth0-wrapper'
import { useSelector, useDispatch } from 'react-redux'
import useGetToken from '../utils/useGetToken'
import NavLeft from './NavLeft'
import NavRight from './NavRight'
import styled from 'styled-components'
import { Loader } from 'semantic-ui-react'
import {
  CreateNotification,
  createInvite,
  fetchNotifications,
  fetchInvites,
  receiveGroupPost,
  receiveLike,
  receiveDislike,
  receiveReplyLike,
  receiveReplyDislike,
} from 'actions'
import {
  SET_UNREAD_NOTIFICATION_NUM,
  INCREMENT_UNREAD_NOTIFICATION_NUM,
} from 'actions/actionTypes'
import { fetchPrivateRequests, receivingGroup } from 'actions'

const NavBar = props => {
  const { location } = props
  const user = useSelector(state => state.userReducer.loggedInUser)
  const timeStamp = useSelector(
    state => state.userReducer.loggedInUser.notification_check
  )
  const socket = useSelector(state => state.socketReducer.socket)
  const notifications = useSelector(state => state.notifyReducer.notifications)
  const dispatch = useDispatch()
  const [token] = useGetToken()
  const { loading } = useAuth0()

  useEffect(() => {
    if (user) {
      const fetchRequests = async () => {
        await dispatch(fetchPrivateRequests(token, { user_id: user.id }))
      }
      fetchRequests()
    }
  }, [user, dispatch, token])

  useEffect(() => {
    const fetchData = async () => {
      if (token && user) {
        try {
          const data = {
            userId: user.id,
          }
          if (!notifications.length) {
            const response = await dispatch(fetchNotifications(token, data))
            const unreadNum = response.filter(
              notify => notify.created_at > timeStamp || timeStamp === null
            ).length
            dispatch({
              type: SET_UNREAD_NOTIFICATION_NUM,
              payload: unreadNum,
            })
          }
          dispatch(fetchInvites(token, data))
        } catch (error) {
          console.log(error)
        }
      }
    }
    fetchData()
    socket.on('new notification', async data => {
      console.log('new notification data', data)
      await dispatch(CreateNotification(data))
      if (location.pathname !== '/notifications') {
        dispatch({
          type: INCREMENT_UNREAD_NOTIFICATION_NUM,
          payload: 1,
        })
      }

      if (data.notification.type === 'group_accepted') {
        const group_id = data.notification.type_id
        dispatch(
          receivingGroup({
            user,
            group_id,
            fromGroupView: window.location.pathname.includes(
              `/group/${group_id}`
            ),
          })
        )
      }
    })
    socket.on('event', data => {
      console.log(data)
    })
    socket.on('new invite', async data => {
      await dispatch(createInvite(data))
      // i don't want to increment unread num if I am viewing the notifications
      if (location.pathname !== '/notifications') {
        dispatch({
          type: INCREMENT_UNREAD_NOTIFICATION_NUM,
          payload: 1,
        })
      }
    })
    socket.on('groupPost', data => {
      console.log('data', data)
      if (
        location.pathname ===
          `/post/${data.likeType ? data.likeType.post_id : data.post.id}` ||
        location.pathname === `/group/${data.room}`
      )
        if (data.type === 'like') {
          dispatch(receiveLike(data))
        } else if (data.type === 'dislike') {
          dispatch(receiveDislike(data))
        } else if (data.type === 'reply_like') {
          dispatch(receiveReplyLike(data))
        } else if (data.type === 'reply_dislike') {
          dispatch(receiveReplyDislike(data))
        } else {
          dispatch(receiveGroupPost(data))
        }
    })
    return () => {
      socket.off('new notification')
      socket.off('new invite')
      socket.off('event')
      socket.off('groupPost')
    }
  }, [
    user,
    token,
    timeStamp,
    socket,
    dispatch,
    props.location.pathname,
    location.pathname,
    notifications.length,
  ])

  if (loading) {
    return (
      <Loader active size='large'>
        {' '}
        Loading{' '}
      </Loader>
    )
  }
  return (
    <Sticky>
      <NavLeft />
      <NavRight user={user} />
    </Sticky>
  )
}

const Sticky = styled.nav`
  position: sticky;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1;
  margin: 0 auto;
  height: 55px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1a4570;
  color: white;
`

export default NavBar
