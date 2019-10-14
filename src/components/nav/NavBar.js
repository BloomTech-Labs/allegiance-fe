import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth0 } from '../auth/react-auth0-wrapper'
import { useSelector } from 'react-redux'
import { axiosWithAuth } from '../utils/axiosWithAuth'
import useGetToken from '../utils/useGetToken'

import styled from 'styled-components'
import { Icon, Loader } from 'semantic-ui-react'
import IconButton from '@material-ui/core/IconButton'
import { ArrowBack } from '@material-ui/icons'

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
  const userId = useSelector(state => state.userReducer.loggedInUser.id)
  const timeStamp = useSelector(
    state => state.userReducer.loggedInUser.notification_check
  )
  const [token] = useGetToken()

  useEffect(() => {
    // Obtain array of group ids where user has a relation for axios feed call
    const mappedGroupIds = userGroups.map(group => {
      return group.id
    })
    // Fetch notifications related data
    const fetchData = async () => {
      if (token) {
        try {
          const response = await axiosWithAuth([token]).post(`/feed`, {
            group_id: mappedGroupIds,
            interval: 48,
          })
          // Filter out activity performed by the user, current filter uses activity's
          // created_at - in future if allowing content updates, use updated_at
          if (response) {
            const filtered = response.data.allActivity.filter(
              act =>
                userId !== act.user_id &&
                userId !== act.liker_id &&
                // Notification_checks default to null for new users, thus the need for || check
                (act.created_at > timeStamp || timeStamp === null)
            )
            setNavNotifications(filtered)
          }
        } catch (error) {
          console.log(error)
        }
      }
    }
    fetchData()
  }, [token, userGroups, userId, timeStamp])

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
    <>
      <TopNav>
        {pathname === '/home' && <p>Fan Feed</p>}
        {pathname === '/groups' && <p>Groups</p>}
        {pathname.includes('/group/') &&
          TopNavItem('back to groups', '/groups', 'Group')}
        {pathname === '/creategroup' && <p>Create Group</p>}
        {pathname === '/notifications' && <p>Notifications</p>}
        {pathname === '/profile' && <p>Profile</p>}
        {pathname === '/makeprofile' &&
          TopNavItem('back to profile', '/profile', 'Edit Profile')}
        {pathname.includes('/editgroup/') &&
          TopNavItem(
            'back to group',
            groupId === 0 ? '/groups' : `/group/${groupId}`,
            'Edit Group'
          )}
        {pathname.includes('/post') &&
          TopNavItem('back to group', `/group/${groupId}`, 'Post')}
        {pathname === '/makeallegiance' && <p>Edit Allegiances</p>}
      </TopNav>
      <BottomNav>
        {/* If user is authenticated, show links to navigate app */}
        {isAuthenticated && (
          <Nav>
            <NavLeft>
              <MenuItem to='/home'>
                <NavIcon size='large' name='home' alt={'Home'} />
              </MenuItem>
              <MenuItem to='/groups'>
                <NavIcon size='large' name='group' alt={'Groups'} />
              </MenuItem>
              <MenuItem to='/notifications'>
                {/* Placeholder to keep alignment of icon center as desired */}
                <PlaceHolder />
                <NavIcon
                  size='large'
                  name='bell outline'
                  number={navNotifications.length}
                  alt={'Notifications'}
                />
                {/* Notification count only shows when not navigated to notification 
                component and when there is more than zero notifications to show */}
                {pathname !== '/notifications' &&
                  navNotifications.length > 0 && (
                    <NotificationNumber>
                      {navNotifications.length}
                    </NotificationNumber>
                  )}
                {/* Placeholder to keep alignment of icon center as desired */}
                {(pathname === '/notifications' ||
                  navNotifications.length === 0) && <PlaceHolder />}
              </MenuItem>
              <MenuItem to='/profile'>
                <NavIcon size='large' name='user' alt={'Profile'} />
              </MenuItem>
            </NavLeft>
            <NavRight>
              <LogOut onClick={() => logoutWithRedirect()}>Logout</LogOut>
            </NavRight>
          </Nav>
        )}
      </BottomNav>
    </>
  )
}

const TopNav = styled.div`
  display: flex;
  justify-content: center;
  height: 6%;
  align-items: center;
  font-weight: bold;
  color: white;
  position: fixed;
  background-color: #1b4570;
  top: 0;
  width: 100%;
  z-index: 2;
  -webkit-transition: height 0.2s ease-in-out;
  transition: height 0.2s ease-in-out;
  border-radius: 0;
  p {
    width: 70%;
    margin: 0;
  }
  @media (max-width: 320px) {
    max-width: 320px;
  }
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
  background-color: #1b4570;
`

const NavLeft = styled.div`
  display: flex;
  flex: 1 1 0;
  width: 85%;
`

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

const NavRight = styled.div`
  display: flex;
  color: white;
  width: 15%;
`

const LogOut = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
`

export default NavBar
