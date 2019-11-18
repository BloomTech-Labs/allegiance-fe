import React from 'react'
import GroupsAccordion from './GroupsAccordion'
import styled from 'styled-components'

// ***ADD THESE 2 BACK IF WE ADD ALLEGIANCE TO NAV***
import AllegianceAccordion from './AllegianceAccordion'

const NavBottom = () => {
  return (
    <>
      <GroupsAccordion />
      <AllegianceAccordion />
    </>
  )
}

// ***ADD THESE 2 BACK IF WE ADD ALLEGIANCE TO NAV***
// const BottomNav = styled.div`
//   background-color: blue;
//   color: white;
//   padding: 7px;
//   margin-bottom: 15px;
// `

export default NavBottom
