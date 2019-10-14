import React from 'react'
import { Image, Popup } from 'semantic-ui-react'

import styled from 'styled-components'

const GroupInfo = props => {
  return (
    <Allegiances>
      <h3>Allegiances</h3>
      <LogoHolder>
        {props.allegiances.map(al => (
          <ImageHolder key={al.id}>
            <Popup
              content='Allegiance'
              header={al.name}
              trigger={
                <Image
                  src={al.image}
                  size='mini'
                  circular
                  bordered
                  alt={al.name}
                />
              }
            />
          </ImageHolder>
        ))}
      </LogoHolder>
    </Allegiances>
  )
}

const Allegiances = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  h3 {
    margin: 0 auto;
  }
`
const ImageHolder = styled.div`
  margin: 0 0.4rem;
`

const LogoHolder = styled.div`
  display: flex;
  flexdirection: row;
  justify-content: center;
  margin-top: 1%;
`

export default GroupInfo
