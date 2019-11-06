import React from 'react'
import styled from 'styled-components'

const NavBottom = () => {
  return (
    <>
      <MyGroupsNav>
        <h1>Nav top</h1>
      </MyGroupsNav>
      <BottomNav>
        <h1>Nav Bottom</h1>
      </BottomNav>
    </>
  )
}

const MyGroupsNav = styled.div`
  background-color: blue;
  color: white;
  padding: 7px;
  margin-bottom: 5px;
`

const BottomNav = styled.div`
  background-color: blue;
  color: white;
  padding: 7px;
`

export default NavBottom
