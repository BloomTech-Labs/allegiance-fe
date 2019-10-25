import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import styled from 'styled-components'

const NavLeft = props => {
  const { location } = props

  return <StyledMiddleNav>Allegiance</StyledMiddleNav>
}
export default withRouter(NavLeft)

const StyledMiddleNav = styled.h1`
  color: black;
  display: flex;
  text-align: center;
  width: 100%;
`
