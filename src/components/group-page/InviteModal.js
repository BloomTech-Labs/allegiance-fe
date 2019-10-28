import React, { useEffect } from 'react'
import { Button, Modal, Input, Icon } from 'semantic-ui-react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import useForm from '../utils/useForm'
import useGetToken from '../utils/useGetToken'
import { axiosWithAuth } from '../utils/axiosWithAuth'

const InviteModal = props => {
  const { id, group_name, image } = props.group
  const [token] = useGetToken()
  const loggedInUser = useSelector(state => state.userReducer.loggedInUser)
  const socket = useSelector(state => state.socketReducer.socket)
  const { values, setValues, handleChange, handleSubmit } = useForm(sendInvite)

  async function sendInvite() {
    try {
      const result = await axiosWithAuth(token).post(`/groups/${id}/invitees`, {
        sender_id: loggedInUser.id,
        email: values.email,
      })
      const userId = result.data[0].user_id
      console.log(result.data)
      socket.emit('send invite', {
        userIds: [userId],
        invite: {
          ...result.data[0],
          group_name,
          image,
          first_name: loggedInUser.first_name,
          last_name: loggedInUser.last_name,
        },
      })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Modal trigger={<Button>Invite Users</Button>}>
      <Modal.Header>Select a user to invite</Modal.Header>
      <Modal.Content>
        <ContentWrapper>
          <FormWrapper onSubmit={handleSubmit}>
            <Input
              icon='users'
              iconPosition='left'
              placeholder='Search users...'
              style={InputWidth}
              onChange={handleChange}
              value={values.email || ''}
              name='email'
            />
            <Button animated style={ButtonSpacing}>
              <Button.Content visible>Send Invite</Button.Content>
              <Button.Content hidden>
                <Icon name='arrow right' />
              </Button.Content>
            </Button>
          </FormWrapper>
          <Modal.Description>
            {/* <descriptionP>
                Once you've selected a user you wish to invite, click invite to send them an invitation to your group.
            </descriptionP> */}
          </Modal.Description>
        </ContentWrapper>
      </Modal.Content>
    </Modal>
  )
}

const DescriptionP = styled.p``
const ContentWrapper = styled.div``
const FormWrapper = styled.form`
  padding-top: 15px;
  padding-bottom: 15px;
`
const ButtonSpacing = {
  marginLeft: '10px',
}
const InputWidth = {
  width: '200px',
}

export default InviteModal
