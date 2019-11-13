import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useAuth0 } from '../auth/react-auth0-wrapper'

export const AvatarPopup = ({ user }) => {
  const id = user.id
  const { logout } = useAuth0()
  const logoutWithRedirect = () =>
    logout({
      returnTo: window.location.origin,
    })

  return (
    <StyledAvatarPopup>
      <div className='arrow-up'></div>
      <div className='user-details'>
        <div className='avatar-wrapper'>
          <Link to={`/profile/${id}`}>
            <img className='avatar-image' src={user.image} alt='avatar' />
          </Link>
        </div>
        <div className='user-info'>
          <Link to={`/profile/${id}`} className='username'>
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
  width: 220px;
  height: 152px;
  top: 0;
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
    right: 15%;
    z-index: 60;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid white;
  }
  .user-details {
    display: flex;
    border-bottom: 1px solid #e6e6e6;
  }
  .avatar-wrapper {
    width: 60px;
    height: 49px;
  }
  .avatar-image {
    border-radius: 4px;
  }
  .user-info {
    margin-left: 10px;
  }
  .username {
    font-weight: bold;
    color: #0077b3;
    &:hover {
      text-decoration: underline;
    }
  }
  .location {
    font-size: 12px;
    font-weight: bold;
  }
  .logout,
  .settings,
  .add-business {
    color: #0073bb;
    display: block;
    cursor: pointer;
    padding-bottom: 12px;
    &:hover {
      text-decoration: underline;
    }
  }
  .add-business {
    margin-top: 12px;
    font-weight: bold;
  }
  .settings {
    margin-top: 12px;
    border-bottom: 1px solid #e6e6e6;
    font-weight: bold;
  }
  .logout {
    padding-top: 12px;
  }
`
