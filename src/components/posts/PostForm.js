import React from 'react'

import { useSelector } from 'react-redux'
import { axiosWithAuth } from '../utils/axiosWithAuth'
import useGetToken from '../utils/useGetToken'
import useForm from '../utils/useForm'
import styled from 'styled-components'
import { Mixpanel } from '../analytics/Mixpanel'

import { TextField, Fab } from '@material-ui/core/'
import { makeStyles } from '@material-ui/core/styles'
import AddIcon from '@material-ui/icons/Add'
import { green } from '@material-ui/core/colors'
import VerticalAlignBottomIcon from '@material-ui/icons/VerticalAlignBottom'

const PostForm = props => {
  const primary = green[500]
  // token for accessing authentication required backend routes
  const [token] = useGetToken()

  const userId = useSelector(state => state.userReducer.loggedInUser.id)
  // useForm custom hook and set timeout custom hook
  const { values, setValues, handleChange, handleSubmit } = useForm(submitPost)

  // callback function to handle submit
  async function submitPost(e) {
    const post = await axiosWithAuth([token]).post(
      `/posts/group/${props.groupId}`,
      {
        user_id: userId,
        group_id: props.groupId,
        post_content: values.post_content,
      }
    )
    if (post.data.postResult) {
      setValues('')
      props.setSubmitted(true)
      Mixpanel.activity(userId, 'Post Successfully Created.')
    }
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
      marginTop: 10,
      height: 30,
      width: 30,
    },
  }))

  const classes = useStyles()

  return (
    <FormContainer>
      <DownNav>
        <VerticalAlignBottomIcon
          className={classes.button}
          onClick={props.scrollToBottom}
        />
      </DownNav>
      <ReplyForm onSubmit={handleSubmit}>
        <InputDiv>
          <TextField
            id='outlined-textarea'
            required
            label='Post'
            placeholder='Write a post to the group...'
            multiline
            fullWidth
            className={classes.textField}
            margin='normal'
            variant='outlined'
            onChange={handleChange}
            name='post_content'
            value={values.post_content || ''}
          />
        </InputDiv>
        <Fab classes={{ root: classes.root }} type='submit' aria-label='Reply'>
          <AddIcon />
        </Fab>
      </ReplyForm>
    </FormContainer>
  )
}

const FormContainer = styled.div`
  display: flex;
  position: fixed;
  bottom: 6.5%;
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color: #dee4e7;
`
const DownNav = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 10%;
`
const ReplyForm = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  background-color: #dee4e7;
  align-items: center;
`
const InputDiv = styled.div`
  width: 75%;
  margin-right: 10px;
`

export default PostForm
