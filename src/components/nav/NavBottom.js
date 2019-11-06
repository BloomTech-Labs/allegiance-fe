import React from 'react'
import styled from 'styled-components'
import GroupsNav from './GroupsNav'
import AllegianceNav from './AllegianceNav'

const NavBottom = () => {
  return (
    <>
      <TopNav>
        <GroupsNav />
      </TopNav>
      <BottomNav>
        <AllegianceNav />
      </BottomNav>
    </>
  )
}

const TopNav = styled.div`
  background-color: blue;
  color: white;
  padding: 7px;
  margin-bottom: 5px;
`

const BottomNav = styled.div`
  background-color: blue;
  color: white;
  padding: 7px;
  margin-bottom: 15px;
`

export default NavBottom
