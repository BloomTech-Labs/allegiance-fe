import React from 'react'
import styled from 'styled-components'
import { NavLink, withRouter } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { Menu } from 'semantic-ui-react'

const Navigation = () => {
  return (
    <>
      <StyledMenuItem>
        <StyledNavLink activeClassName='active' to='/home'>
          <NavItem>DASHBOARD</NavItem>
        </StyledNavLink>
      </StyledMenuItem>
      <StyledMenuItem>
        <StyledNavLink to='/groups'>
          <NavItem>DISCOVER</NavItem>
        </StyledNavLink>
      </StyledMenuItem>
    </>
  )
}

const StyledMenuItem = styled(Menu.Item)`
  align-self: center !important;
  font-size: 2rem !important;
`

const NavItem = styled.span`
padding-top: 0
padding-bottom: 0

  &:hover {
    text-shadow:0px 0px 2px #fff; !important
  }
  // &:before, &:after {
  //     position: absolute !important
  //     left: 0px !important
  //     width: 100% !important
  //     height: 2px  !important
  //     background: #fff !important
  //     content: "", !important
  //     opacity: 0 !important
  //     transition: all 0.3s !important
  // }

  // &:before {
  //     top: 0px !important
  //     transform: translateY(10px) !important
  // }
  // &:after {
  //     bottom: 0px !important
  //     transform: translateY(-10px) !important
  // }
  // &:hover:before, &:hover:after  {
  //     opacity: 1 !important
  //     transform: translateY(0px) !important
  // }
`

const StyledNavLink = styled(NavLink)`
  color: white !important;

  //   &.active {
  //     font-weight: bold;
  //   }
`

export default withRouter(Navigation)
