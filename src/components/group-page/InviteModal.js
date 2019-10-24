import React from 'react'
import { Button, Modal, Input, Icon } from 'semantic-ui-react'
import styled from 'styled-components'
import useForm from '../utils/useForm'

const InviteModal = () => {
  const { values, setValues, handleChange, handleSubmit } = useForm(sendInvite)

  function sendInvite() {
    console.log(values.email)
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

  return (
    <Modal trigger={<Button>Invite Users</Button>}>
      <Modal.Header>Select a user to invite</Modal.Header>
      <Modal.Content input>
        <ContentWrapper>
          <FormWrapper onSubmit={handleSubmit}>
            <Input
              icon='users'
              iconPosition='left'
              placeholder='Search users...'
              style={InputWidth}
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

export default InviteModal
