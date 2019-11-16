import React from 'react'
import styled from 'styled-components'
import { NavLink, withRouter } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'

import { Tablet } from '../utils/responsive'
import { Menu, Icon } from 'semantic-ui-react'

const Navigation = () => {
  const isTablet = useMediaQuery({
    query: Tablet,
  })

  return (
    <>
      <StyledMenuItem>
        <StyledNavLink to='/home'>
          {isTablet ? (
            <NavIcon name='home' size='large' />
          ) : (
            <NavItem>DASHBOARD</NavItem>
          )}
        </StyledNavLink>
      </StyledMenuItem>

      <StyledMenuItem>
        <StyledNavLink to='/groups'>
          {isTablet ? (
            <NavIcon name='globe' size='large' />
          ) : (
            <NavItem>DISCOVER</NavItem>
          )}
        </StyledNavLink>
      </StyledMenuItem>
    </>
  )
}

const StyledMenuItem = styled(Menu.Item)`
  align-self: center !important;
  font-size: 1.8rem !important;
`

const NavIcon = styled(Icon)`
  color: #fff !important;
  &:hover {
    text-shadow: 0px 0px 2px #fff !important;
  }
`

const NavItem = styled.span`
  padding-top: 0
  padding-bottom: 0
  font-size: 2rem !important

  &:hover {
    text-shadow: 0px 0px 2px #fff !important;
  }
`

const StyledNavLink = styled(NavLink)`
  color: white !important;
`

export default withRouter(Navigation)
