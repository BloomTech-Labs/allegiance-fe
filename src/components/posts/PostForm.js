import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import useGetToken from '../utils/useGetToken'
import useForm from '../utils/useForm'
import styled from 'styled-components'
import { createGroupPost } from 'actions'
import { TextField, Fab } from '@material-ui/core/'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import SendIcon from '@material-ui/icons/Send'
import { makeStyles } from '@material-ui/core/styles'
import AddIcon from '@material-ui/icons/Add'
import { green } from '@material-ui/core/colors'
import VerticalAlignBottomIcon from '@material-ui/icons/VerticalAlignBottom'

import { Input } from 'semantic-ui-react'

const PostForm = props => {
  const primary = green[500]
  // token for accessing authentication required backend routes
  const [token] = useGetToken()
  const dispatch = useDispatch()
  const userId = useSelector(state => state.userReducer.loggedInUser.id)
  const socket = useSelector(state => state.socketReducer.socket)
  // useForm custom hook and set timeout custom hook
  const { values, handleChange, handleSubmit } = useForm(submitPost)

  // callback function to handle submit
  async function submitPost(e) {
    const { groupId } = props
    var data = {
      userId,
      groupId,
      post_content: values.post_content,
    }
    await dispatch(createGroupPost(token, data, socket))
  }

  // Material UI
  const useStyles = makeStyles(theme => ({
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      backgroundColor: 'white',
    },
    root: {
      background: primary,
      margin: theme.spacing(1),
    },
    button: {
      backgroundColor: '#1A4570',
      height: '35px',
      width: '100px',
      marginLeft: '10px',
    },
  }))

  const classes = useStyles()

  return (
    <FormContainer>
      <ReplyForm onSubmit={handleSubmit}>
        <Input
          placeholder='Add a post'
          onChange={handleChange}
          name='post_content'
          value={values.post_content || ''}
          required
          style={{ width: '75%' }}
        />
        <Button
          size='large'
          variant='contained'
          color='primary'
          className={classes.button}
          endIcon={<SendIcon />}
          type='submit'
          aria-label='Reply'
        >
          Send
        </Button>
      </ReplyForm>
    </FormContainer>
  )
}

const FormContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color: #e8edf1;
`
const DownNav = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 10%;
`
const ReplyForm = styled.form`
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 801px;
  background-color: #e8edf1;
  align-items: center;
`
const InputDiv = styled.div`
  width: 75%;
  margin-right: 10px;
`

export default PostForm
