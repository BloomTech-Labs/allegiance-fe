import React from 'react'
import styled from 'styled-components'
import replies from '../../assets/replies.png'
import LockIcon from '@material-ui/icons/Lock'
import { Button } from 'semantic-ui-react'
import { join } from 'path';
import useGetToken from '.utils/useGetToken'
import { useSelector, useDispatch } from 'react-redux'
import { requestJoinPrivate } from 'actions'

const fb ='#4267b2'


const BlockedView = props => {
  const [token] = useGetToken()
  const userId = useSelector(state => state.userReducer.loggedInUser.id)
  const dispatch = useDispatch()
  const privateGroupId = props.privateGroupId.find(privateId => privateId.id === privateId)
  
  async function joinGroup(e){
    e.preventDefault()
    console.log('joinGroup fired e:', e)
    await dispatch(requestJoinPrivate(token, privateGroupId.id, userId))
  }

  return (
    <BlockedContainer>
      <Content>
        <LockIcon style={{ fontSize: 60 }} />
        <h2>You must be a member of this group to see the content!</h2>
        <Button color='blue' onClick={() => joinGroup()}>Request To Join Group</Button>
      </Content>
    </BlockedContainer>
  )
}

const BlockedContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  background: url(${replies}) !important;
  background-size: cover;
  overflow: hidden;
  position: absolute;
  height: 47vh;
  bottom: 169px;
`

const Content = styled.div`
  padding-top: 5vh;
  width: 80%;
  position: relative;
  z-index: 1;
`

export default BlockedView
