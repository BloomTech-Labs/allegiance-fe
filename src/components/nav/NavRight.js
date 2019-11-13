import React, { useEffect } from 'react'
import { NavLink, withRouter, Link } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'
import { Avatar } from './Avatar'
import { Icon, Loader } from 'semantic-ui-react'
import { useSelector } from 'react-redux'
import { useAuth0 } from '../auth/react-auth0-wrapper'

const NavRight = props => {
  const { loginWithRedirect } = useAuth0()
  const notifyReducer = useSelector(state => state.notifyReducer)
  const userIn = useSelector(state => state.userReducer.loggedInUser)
  const { location, user } = props
  const { pathname } = location
  const { loading } = useAuth0()

  useEffect(() => {}, [notifyReducer])
  if (loading) {
    return (
      <Loader active size='large'>
        {' '}
        Loading{' '}
      </Loader>
    )
  }
  if (userIn) {
    return (
      <StyledNavRight>
        <ul>
          <li>
            <NavLink to='/notifications'>
              {/* Placeholder to keep alignment of icon center as desired */}
              {/* <PlaceHolder /> */}
              <BellWrapper>
                <NavIcon
                  size='large'
                  name='bell'
                  number={10}
                  alt={'Notifications'}
                />
              </BellWrapper>

              {/* Notification count only shows when not navigated to notification 
                  component and when there is more than zero notifications to show */}
              {pathname !== '/notifications' && notifyReducer.unread > 0 && (
                <NotificationNumber>{notifyReducer.unread}</NotificationNumber>
              )}
              {/* Placeholder to keep alignment of icon center as desired */}
              {/* {(pathname === '/notifications' ||
                notifyReducer.notifications.length === 0) && <PlaceHolder />} */}
            </NavLink>
          </li>
          <li className='avatar'>
            <Avatar user={user} />
          </li>
        </ul>
      </StyledNavRight>
    )
  } else {
    return (
      <RegisterBtn onClick={() => loginWithRedirect({})}>Log In</RegisterBtn>
    )
  }
}
export default withRouter(NavRight)

const pulse = keyframes`
  0% {

    box-shadow: 0 0 0 0 rgba(255, 0, 34, 0.4);
  }
  70% {

    box-shadow: 0 0 0 10px rgba(255, 0, 34, 0);
  } 
  100% {

    box-shadow: 0 0 0 0 rgba(255, 0, 34, 0);
  }
}
`
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
    align-items: center;
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
        display: flex;
        align-items: center;
        justify-content: center;
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
`
const BellWrapper = styled.div``

const NavIcon = styled(Icon)`
  color: #f0f0f0;
  &:hover {
    color: white;
  }
`

const PlaceHolder = styled.div`
  width: 30%;
  text-decoration: none;
  background-color: #1b4570;
  color: #1b4570;
`
const NotificationNumber = styled.div`
  width: 17px;
  height: 17px;
  color: whitesmoke;
  background-color: #ff0022;
  border-radius: 3px;
  position: absolute;
  top: 8px;
  right: 81px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  font-size: 1.2rem;
  font-weight: 600;
  animation: ${pulse} 2s infinite;
`
const RegisterBtn = styled.button`
  height: 53px;
  border: none;
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.5);
  z-index: 1
  width: 163px;
  color: white;
  background: #4483cd;
  font-size: 20px;
  font-family: 'Roboto', sans-serif;
`
