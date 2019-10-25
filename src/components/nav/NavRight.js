import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { Avatar } from './Avatar'
import { Icon, Loader } from 'semantic-ui-react'

const NavRight = props => {
  const { location, user } = props

  return (
    <StyledNavRight>
      <ul>
        <li>
          <NavLink>
            <NavIcon
              size='large'
              name='bell outline'
              number={2}
              alt={'Notifications'}
            />
          </NavLink>
        </li>
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
