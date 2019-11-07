import React from 'react'
import styled from 'styled-components'
import GroupsNav from './GroupsNav'
import NavAccordion from './NavAccordion'

// ***ADD THESE 2 BACK IF WE ADD ALLEGIANCE TO NAV***
// import AllegianceNav from './AllegianceNav'

const NavBottom = () => {
  return (
    <>
      <NavAccordion />
    </>
  )
}

const TopNav = styled.div`
  background-color: blue;
  color: white;
  padding: 7px;
  margin-bottom: 5px;
`
// ***ADD THESE 2 BACK IF WE ADD ALLEGIANCE TO NAV***
// const BottomNav = styled.div`
//   background-color: blue;
//   color: white;
//   padding: 7px;
//   margin-bottom: 15px;
// `

export default NavBottom
