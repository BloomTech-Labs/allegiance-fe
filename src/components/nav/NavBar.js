import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth0 } from '../auth/react-auth0-wrapper'
import { useSelector, useDispatch } from 'react-redux'
import { axiosWithAuth } from '../utils/axiosWithAuth'
import useGetToken from '../utils/useGetToken'
import NavLeft from './NavLeft'
import styled from 'styled-components'
import { Icon, Loader } from 'semantic-ui-react'
import IconButton from '@material-ui/core/IconButton'
import { ArrowBack } from '@material-ui/icons'
import NavRight from './NavRight'
import {
  CreateNotification,
  createInvite,
  fetchNotifications,
  fetchInvites,
} from 'actions'
import {
  SET_UNREAD_NOTIFICATION_NUM,
  INCREMENT_UNREAD_NOTIFICATION_NUM,
} from 'actions/actionTypes'
import NavMiddle from './NavMiddle'
import { Mixpanel } from '../analytics/Mixpanel'
import { fetchPrivateRequests, receivingGroup } from 'actions'

const NavBar = props => {
  const { location } = props

  const { isAuthenticated, logout } = useAuth0()
  // Obtain last viewed replies thread's group_id from redux
  const groupId = useSelector(state => state.navReducer.groupID)

  // Retrieve notifications while not on notifications tab to update number counter on icon
  const [navNotifications, setNavNotifications] = useState()
  // Retrieve all groups where user has a relation
  const userGroups = useSelector(state => state.userReducer.loggedInGroups)
  const user = useSelector(state => state.userReducer.loggedInUser)
  const timeStamp = useSelector(
    state => state.userReducer.loggedInUser.notification_check
  )
  const socket = useSelector(state => state.socketReducer.socket)
  const notifications = useSelector(state => state.notifyReducer.notifications)

  const invites = useSelector(state => state.notifyReducer.invites)

  const dispatch = useDispatch()
  const [token] = useGetToken()

  useEffect(() => {
    if (user) {
      const fetchRequests = async () => {
        await dispatch(fetchPrivateRequests(token, { user_id: user.id }))
      }
      fetchRequests()
    }
  }, [user])

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
          console.log(invites)
        } catch (error) {
          console.log(error)
        }
      }
    }
    fetchData()
    socket.on('new notification', async data => {
      console.log('new notification data', data)
      await dispatch(CreateNotification(data))
      // i don't want to increment unread num if I am viewing the notifications
      if (location.pathname !== '/notifications') {
        dispatch({
          type: INCREMENT_UNREAD_NOTIFICATION_NUM,
          payload: 1,
        })
      }

      if (data.notification.type === 'group_accepted') {
        const group_id = data.notification.type_id
        dispatch(receivingGroup({
          user,
          group_id,
          fromGroupView: window.location.pathname.includes(`/group/${group_id}`)
        }))
      }
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
    return () => {
      socket.off('new notification')
      socket.off('new invite')
    }
  }, [user, token, timeStamp, socket, dispatch, props.location.pathname])

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
