import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useAuth0 } from '../auth/react-auth0-wrapper'
import { Dropdown } from 'semantic-ui-react'

export const AvatarPopup = ({ user }) => {
  const { logout } = useAuth0()
  const logoutWithRedirect = () =>
    logout({
      returnTo: window.location.origin,
    })

  return (
    <StyledAvatarPopup>
      <div className='arrow-up'></div>
      <div className='user-details'>
        <div className='user-info'>
          <Link to='/profile' className='username'>
            {user.username}
          </Link>
        </div>
      </div>
      <Link className='settings' to='/makeprofile'>
        Account Settings
      </Link>
      <a className='logout' onClick={() => logoutWithRedirect()}>
        Logout
      </a>
    </StyledAvatarPopup>
  )
}

const StyledAvatarPopup = styled.div`
  position: absolute;
  cursor: default;
  width: 150px;
  height: auto;
  top: 5px;
  right: 0px;
  z-index: 50;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  padding: 12px;
  margin-top: 59px;
  border-radius: 3px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  .arrow-up {
    position: absolute;
    top: -10px;
    right: 41px;
    z-index: 60;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid white;
  }
  .user-details {
    display: flex;
  }
  .username {
    font-weight: 700;
  }
  .logout,
  .settings,
  .username {
    color: #0073bb;
    display: block;
    cursor: pointer;
    font-size: 1.4rem;
    &:hover {
      opacity: 0.8;
    }
  }
  .logout,
  .settings {
    margin: 20px 0;
  }
`
