import React from 'react'
import ComingSoon from '../assets/ComingSoon.svg'
import { Image } from 'semantic-ui-react'
import styled from 'styled-components'

const UnderConstruction = props => {
  return (
    <ConstructionDiv>
      <h1>Feature Coming Soon!</h1>
      <Image src={ComingSoon} alt={'Under Construction'} />
    </ConstructionDiv>
  )
}

const ConstructionDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 80vh;
  width: 95%;
  margin: auto;
`

export default UnderConstruction
