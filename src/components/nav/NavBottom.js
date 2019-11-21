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

export default NavBottom
