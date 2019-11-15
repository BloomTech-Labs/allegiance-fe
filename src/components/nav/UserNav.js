import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'
import { Avatar } from './Avatar'
import { Icon, Loader, Menu } from 'semantic-ui-react'
import { useAuth0 } from '../auth/react-auth0-wrapper'

const UserNav = props => {
  const { loginWithRedirect, loading } = useAuth0()
  const { location, user, unread } = props
  const { pathname } = location

  if (loading) {
    return (
      <Loader active size='large'>
        {' '}
        Loading{' '}
      </Loader>
    )
  }
  if (user) {
    return (
      <>
        <StyledMenuItem>
          <NavLink to='/notifications'>
            <BellWrapper>
              <NavIcon
                size='large'
                name='bell'
                number={10}
                alt={'Notifications'}
              />
            </BellWrapper>
          </NavLink>
          {pathname !== '/notifications' && unread > 0 && (
            <NotificationNumber>{unread}</NotificationNumber>
          )}
        </StyledMenuItem>
        <StyledAvatarWrapper>
          <Avatar user={user} />
        </StyledAvatarWrapper>
      </>
    )
  } else {
    return (
      <RegisterBtn onClick={() => loginWithRedirect({})}>Log In</RegisterBtn>
    )
  }
}

const StyledAvatarWrapper = styled(Menu.Item)`
  &:hover {
    cursor: pointer;
  }
  img {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, 0.3);
  }
`

const StyledMenuItem = styled(Menu.Item)`
  align-self: center !important;
`

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
`

const BellWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.8rem !important;
`

const NavIcon = styled(Icon)`
  color: #fff !important;
  &:hover {
    text-shadow: 0px 0px 2px #fff !important;
  }
`
const NotificationNumber = styled.div`
  width: 17px;
  height: 17px;
  color: whitesmoke;
  background-color: #ff0022;
  border-radius: 3px;
  position: absolute;
  top: 8px;
  right: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  font-size: 1.2rem;
  font-weight: 600;
  animation: ${pulse} 2s infinite;
`

const RegisterBtn = styled.button`
  height: 80%;
  border: none;
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.5);
  z-index: 1;
  width: 150px;
  color: white;
  background: #1a4571;
  font-size: 20px;
  font-family: 'Roboto', sans-serif;
  cursor: pointer;
  margin-top: 5px;
  &:hover {
    text-shadow: 0px 0px 2px #fff !important;
  }
`

export default withRouter(UserNav)
