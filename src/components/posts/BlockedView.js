import React from 'react'
import styled from 'styled-components'
import LockIcon from '@material-ui/icons/Lock'
import { withRouter } from 'react-router-dom'

const BlockedView = () => {
  return (
    <BlockedContainer>
      <Content>
        <LockIcon style={{ fontSize: 60 }} />
        <h2>You must be a member of this group to see the content!</h2>
      </Content>
    </BlockedContainer>
  )
}

const BlockedContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  background-size: cover;
  overflow: hidden;
  height: 47vh;
  bottom: 169px;
`

const Content = styled.div`
  padding-top: 5vh;
  width: 80%;
  position: relative;
`

export default withRouter(BlockedView)
