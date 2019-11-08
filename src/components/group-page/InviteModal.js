import React, { useState } from 'react'
import { Button, Modal, Input, Icon, Label } from 'semantic-ui-react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import useForm from '../utils/useForm'
import useGetToken from '../utils/useGetToken'
import { axiosWithAuth } from '../utils/axiosWithAuth'
import { Mixpanel } from '../analytics/Mixpanel'
import MixpanelMessages from '../analytics/MixpanelMessages'

const InviteModal = props => {
  const { id, group_name, image } = props.group
  const [token] = useGetToken()
  const loggedInUser = useSelector(state => state.userReducer.loggedInUser)
  const socket = useSelector(state => state.socketReducer.socket)
  const { values, isLoading, setLoading, handleChange, handleSubmit } = useForm(
    sendInvite
  )
  const [response, setResponse] = useState(null)

  async function sendInvite() {
    try {
      const result = await axiosWithAuth(token).post(`/groups/${id}/invitees`, {
        sender_id: loggedInUser.id,
        username: values.username,
      })
      const userId = result.data[0].user_id
      setResponse({
        isError: false,
        message: 'Invite Successfully Sent!',
      })
      Mixpanel.activity(loggedInUser.id, MixpanelMessages.INVITE_SENT)
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
      const error = err.response.data.message
      setResponse({
        isError: true,
        message: error || 'Unsuccessful Invite',
      })
      console.log(err.response)
    } finally {
      setLoading(false)
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
              placeholder='Enter a username...'
              style={InputWidth}
              onChange={handleChange}
              value={values.username || ''}
              name='username'
              autoFocus={true}
            />
            <Button
              color='blue'
              loading={isLoading}
              animated
              style={ButtonSpacing}
            >
              <Button.Content visible>Send Invite</Button.Content>
              <Button.Content hidden>
                <Icon name='arrow right' />
              </Button.Content>
            </Button>
            {response && (
              <Label basic color={response.isError ? 'red' : 'green'}>
                {response.message}
              </Label>
            )}
          </FormWrapper>
          <Modal.Description>
            <DescriptionP>
              Send an invite to notify a user to join your group.
            </DescriptionP>
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
