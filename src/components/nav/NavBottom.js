import React from 'react'
import GroupAccordion from './GroupAccordion'
import AllegianceAccordion from './AllegianceAccordion'

const NavBottom = () => {
  return (
    <div style={{ position: 'sticky', top: 64, left: 0, zIndex: '1' }}>
      <GroupAccordion />
      <AllegianceAccordion />
    </div>
  )
}

export default NavBottom
