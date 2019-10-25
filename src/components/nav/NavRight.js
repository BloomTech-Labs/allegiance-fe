import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { Avatar } from './Avatar'
const NavRight = props => {
  const { location, user } = props

  return (
    <StyledNavRight>
      <ul>
        <li>
          <NavLink>
            <Avatar user={user} />
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
    list-style-type: none;
    width: 100%;
    justify-content: flex-end;
    li {
      display: block;
      list-style-type: none;
      img {
        border-radius: 50%;
        width: 42px;
      }
    }
  }
`
