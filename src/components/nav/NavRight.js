import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import bell from 'a'
const NavRight = props => {
  const { location, user } = props

  return (
    <StyledNavRight>
      <ul>
        <li>
          <NavLink to='/notifications'>
            <IconButton />
          </NavLink>
        </li>
        <li>
          <NavLink>
            <img src={user.image} />
          </NavLink>
        </li>
      </ul>
    </StyledNavRight>
  )
}
export default withRouter(NavRight)

const StyledNavRight = styled.div`
  border: 2px solid pink;
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  ul {
    display: flex;
    color: white;
    margin: 0;
    border: 2px solid;
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
  img {
    border-radius: 50%;
    width: 42px;
    height: 45px;
  }
`
