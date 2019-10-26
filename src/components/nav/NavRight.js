import React, { useEffect, useState } from 'react'
import { NavLink, withRouter, Link } from 'react-router-dom'
import styled from 'styled-components'
import { Avatar } from './Avatar'
import { Icon, Loader } from 'semantic-ui-react'
import { useSelector, useDispatch } from 'react-redux'
const NavRight = props => {
  const notifyReducer = useSelector(state => state.notifyReducer)
  const dispatch = useDispatch()
  const { location, user } = props
  const { pathname } = location

  useEffect(() => {}, [notifyReducer])

  return (
    <StyledNavRight>
      <ul>
        <li>
          <NavLink to='/notifications'>
            <MenuItem to='/notifications'>
              {/* Placeholder to keep alignment of icon center as desired */}
              <PlaceHolder />
              <NavIcon
                size='large'
                name='bell outline'
                number={10}
                alt={'Notifications'}
              />
              {/* Notification count only shows when not navigated to notification 
                component and when there is more than zero notifications to show */}
              {pathname !== '/notifications' && notifyReducer.unread > 0 && (
                <NotificationNumber>{notifyReducer.unread}</NotificationNumber>
              )}
              {/* Placeholder to keep alignment of icon center as desired */}
              {(pathname === '/notifications' ||
                notifyReducer.notifications.length === 0) && <PlaceHolder />}
            </MenuItem>
          </NavLink>
        </li>
        <li className='avatar'>
          <Avatar user={user} />
        </li>
      </ul>
    </StyledNavRight>
  )
}
export default withRouter(NavRight)

const StyledNavRight = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;

  ul {
    display: flex;
    color: white;
    height: %100;
    list-style-type: none;
    justify-content: space-between;
    width: 120px;
    li {
      list-style-type: none;
      display: flex;
      align-items: center;
      .avatar {
        &:hover {
          cursor: pointer;
        }
      }
      a {
        font-size: 1.9rem;
      }
      img {
        border-radius: 50%;
        width: 4.5rem;
      }
    }
  }
`

const NavIcon = styled(Icon)`
  color: white;
`
const MenuItem = styled(Link)`
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
`
const PlaceHolder = styled.div`
  width: 30%;
  text-decoration: none;
  background-color: #1b4570;
  color: #1b4570;
`
const NotificationNumber = styled.div`
  width: 17px;
  height: 23px;
  color: whitesmoke;
  background-color: #f03737;
  border-radius: 50%;
  border: 2px solid green;
  position: relative;
  top: -11px;
  left: -14px;
`
