import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import logo from 'assets/logo192.png'
import jersey from 'assets/jersey.png'
const NavLeft = props => {
  const userIn = useSelector(state => state.userReducer.loggedInUser)

  if (userIn) {
    return (
      <StyledNavLeft>
        <ul>
          <li>
            <NavLink to='/home'>
              <img
                src={logo}
                style={{ width: '25px' }}
                alt={'Allegiance Logo'}
              />
              <span>Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink to='/groups'>
              <img src={jersey} style={{ width: '25px' }} alt={'Team Jersey'} />
              <span>Discover</span>
            </NavLink>
          </li>
        </ul>
      </StyledNavLeft>
    )
  } else {
    return (
      <StyledNavLeft>
        <ul>
          <li>
            <NavLink to='/'>
              <img src={logo} style={{ width: '25px' }} alt={'Team'} />
              <span>Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink to='/groups'>
              <img src={jersey} style={{ width: '25px' }} alt={'Team Jersey'} />
              <span>Discover</span>
            </NavLink>
          </li>
        </ul>
      </StyledNavLeft>
    )
  }
}
export default withRouter(NavLeft)

const StyledNavLeft = styled.div`
  width: 100%;
  display: flex;
  height: 45px;
  ul {
    display: flex;
    color: white;
    margin: 0;
    padding: 0;
    height: %100;
    justify-content: space-evenly;
    width: 225px;
    list-style-type: none;
    li {
      display: block;
      list-style-type: none;
      a {
        display: flex;
        height: 100%;
        justify-content: center;
        align-items: center;
      }
      span {
        color: white;
        margin-left: 5px;
        font-size: 20px;
      }
    }
  }
  .tab {
    display: flex;
  }
`
