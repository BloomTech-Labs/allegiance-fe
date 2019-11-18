import React, { useState } from 'react'
import { Accordion, Icon } from 'semantic-ui-react'
import MyGroups from '../profile/MyGroups'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import ProfileAllegiances from '../profile/ProfileAllegiances'

const AllegianceAccordion = () => {
  const loggedInGroups = useSelector(state => state.myGroups)
  const [activeIndex, setActiveIndex] = useState({ activeIndex: 0 })
  const handleClick = (e, titleProps) => {
    const { index } = titleProps

    const newIndex = activeIndex.activeIndex === index ? -1 : index
    setActiveIndex({ activeIndex: newIndex })
  }

  return (
    <StyledAccordion>
      <Accordion.Title
        active={activeIndex.activeIndex === 0}
        index={0}
        onClick={handleClick}
        className='title'
      >
        <Icon name='dropdown' />
        My My Alliances
      </Accordion.Title>
      <Accordion.Content
        active={activeIndex.activeIndex === 0}
        className='accordion-content'
      >
        <ProfileAllegiances content={loggedInGroups || []} type='group' />
      </Accordion.Content>
    </StyledAccordion>
  )
}

export default AllegianceAccordion

const StyledAccordion = styled(Accordion)`
  position: sticky;
  top: 64px;
  left: 0px;
  z-index: 1 !important;
  .title {
    color: #fff !important;
    background-color: #1a4571;
    &:hover {
      text-shadow: 0px 0px 5px #fff !important;
    }
  }
  .accordion-content {
    padding: 0px !important;
  }
`
