import React from 'react'
import { Modal, Button, Header } from 'semantic-ui-react'

const DeleteGroup = props => {
  return (
    <Modal
      closeIcon
      trigger={
        <Button color='red' type='button'>
          Delete Group
        </Button>
      }
      basic
      size='small'
    >
      <Header icon='trash' content='Permanently Delete Group' />
      <Modal.Content>
        <p>
          Clicking Delete will permanently delete your group. Clicking the X
          will cancel the deletion.
        </p>
      </Modal.Content>
      <Modal.Actions>
        <Button color='red' onClick={() => props.delete()}>
          Delete
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default DeleteGroup
