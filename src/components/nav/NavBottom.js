import React from 'react'
import GroupAccordion from './GroupAccordion'
import AllegianceAccordion from './AllegianceAccordion'
import styled from 'styled-components'
import { Loader, Menu, Icon, Modal } from 'semantic-ui-react'

const NavBottom = () => {
  return (
    <div>
      <GroupAccordion />
      <AllegianceAccordion />
    </div>
  )
}

const StickyNav = styled(Menu)`
  position: sticky;
  top: 0;
  left: 0;
  z-index: 10 !important;
  font-family: 'Roboto', sans-serif !important;
  /* background-color: #4483cd !important; */
  background-color: brown !important;
  border-radius: 0px !important;
  border: none !important;
  font-size: 1.4rem !important;
  margin-bottom: 0 !important;
`

// ***ADD THESE 2 BACK IF WE ADD ALLEGIANCE TO NAV***
// const BottomNav = styled.div`
//   background-color: blue;
//   color: white;
//   padding: 7px;
//   margin-bottom: 15px;
// `

export default NavBottom
