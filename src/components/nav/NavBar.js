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
import { fetchNotifications } from 'actions/index'
import NavMiddle from './NavMiddle'

const NavBar = () => {
  const { isAuthenticated, logout } = useAuth0()
  // Obtain last viewed replies thread's group_id from redux
  const groupId = useSelector(state => state.navReducer.groupID)

  const logoutWithRedirect = () =>
    logout({
      returnTo: window.location.origin,
    })

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
  const dispatch = useDispatch()
  const [token] = useGetToken()

  useEffect(() => {
    const fetchData = async () => {
      if (token && user) {
        try {
          const data = {
            userId: user.id,
          }
          const response = await dispatch(fetchNotifications(token, data))
          console.log(response)
        } catch (error) {
          console.log(error)
        }
      }
    }
    fetchData()
    socket.on('new notification', fetchData)
    return () => {
      socket.off('new notification')
    }
  }, [user, token, timeStamp, socket, dispatch])

  useEffect(() => {
    if (token) {
      console.log(notifications)
      const filtered = notifications.filter(
        notify => notify.created_at > timeStamp || timeStamp === null
      )
      console.log(filtered)
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

const IconBut = styled(IconButton)`
  width: 15%;
`

const TopNavRight = styled.div`
  width: 15%;
`

const BottomNav = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 2;
  -webkit-transition: height 0.2s ease-in-out;
  transition: height 0.2s ease-in-out;
  border-radius: 0;
  max-height: 8%;
  @media (max-width: 320px) {
    max-width: 320px;
  }
`

const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
  height: 6.5vh;
`

// const NavLeft = styled.div`
//   display: flex;
//   flex: 1 1 0;
//   width: 85%;
// `

const MenuItem = styled(Link)`
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const NavIcon = styled(Icon)`
  color: white;
`

const PlaceHolder = styled.div`
  width: 30%;
  text-decoration: none;
  background-color: #1b4570;
  color: #1b4570;
`

const NotificationNumber = styled.div`
  width: 30%;
  padding: 1 3px;
  color: whitesmoke;
  background-color: #f03737;
  border-radius: 50%;
  position: relative;
  top: -11px;
  left: -14px;
`

// const NavRight = styled.div`
//   display: flex;
//   color: white;
//   width: 15%;
// `

const LogOut = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
`

export default NavBar
