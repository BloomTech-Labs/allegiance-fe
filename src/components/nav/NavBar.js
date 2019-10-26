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
<<<<<<< HEAD
import NavRight from './NavRight'
import { CreateNotification, fetchNotifications } from 'actions/index'
import {
  SET_UNREAD_NOTIFICATION_NUM,
  INCREMENT_UNREAD_NOTIFICATION_NUM,
} from 'actions/actionTypes'
import NavMiddle from './NavMiddle'

const NavBar = props => {
  const { location } = props
=======

import { fetchNotifications, fetchInvites } from 'actions/index'

const NavBar = () => {
>>>>>>> 14ee7ae5177d74139a8f30b709f6e2bdc4c4a328
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
<<<<<<< HEAD
=======
  const invites = useSelector(state => state.notifyReducer.invites)
>>>>>>> 14ee7ae5177d74139a8f30b709f6e2bdc4c4a328
  const dispatch = useDispatch()
  const [token] = useGetToken()

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
            await dispatch({
              type: SET_UNREAD_NOTIFICATION_NUM,
              payload: unreadNum,
            })
          }
<<<<<<< HEAD
=======
          dispatch(fetchInvites(token, data))
          dispatch(fetchNotifications(token, data))
          console.log(invites)
          console.log(notifications)
>>>>>>> 14ee7ae5177d74139a8f30b709f6e2bdc4c4a328
        } catch (error) {
          console.log(error)
        }
      }
    }
    fetchData()
    socket.on('new notification', async data => {
      await dispatch(CreateNotification(data.notification))
      // i don't want to increment unread num if I am viewing the notifications
      if (location.pathname !== '/notifications') {
        await dispatch({
          type: INCREMENT_UNREAD_NOTIFICATION_NUM,
          payload: 1,
        })
      }
    })
    return () => {
      socket.off('new notification')
    }
<<<<<<< HEAD
  }, [user, token, timeStamp, socket, dispatch, props.location.pathname])
=======
  }, [userId, token, timeStamp, socket, dispatch])

  useEffect(() => {
    if (token) {
      const filtered = notifications.filter(
        notify => notify.created_at > timeStamp || timeStamp === null
      )

      setNavNotifications(filtered)
    }
  }, [notifications, timeStamp, token])

  // Define location for conditional top nav bar rendering
  const { pathname } = window.location
  // Helper for conditional top nav bar rendering when using id params in pathname
  const TopNavItem = (label, link, title) => (
    <>
      <IconBut
        aria-label={label}
        as={Link}
        to={link}
        style={{ color: 'white', marginTop: '1%' }}
      >
        <ArrowBack />
      </IconBut>
      <p>{title}</p>
      <TopNavRight />
    </>
  )

  if (!navNotifications) {
    return (
      <Loader active size='large'>
        Loading
      </Loader>
    )
  }

  // Setting notifications to empty array allows for elimination of notification
  // icon number upon mount and solves axios PUT lag upon notifications un-mount
  if (pathname === '/notifications' && navNotifications.length > 0)
    setNavNotifications([])
>>>>>>> 14ee7ae5177d74139a8f30b709f6e2bdc4c4a328

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
