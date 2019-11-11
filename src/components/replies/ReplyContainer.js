import React, { useEffect, useRef, createRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { Loader, Comment } from 'semantic-ui-react'
import { green } from '@material-ui/core/colors'
import { TextField, Fab } from '@material-ui/core/'
import { makeStyles } from '@material-ui/core/styles'
import { Add, VerticalAlignBottom } from '@material-ui/icons/'
import useGetToken from '../utils/useGetToken'
import useForm from '../utils/useForm'
import Button from '@material-ui/core/Button'
import SendIcon from '@material-ui/icons/Send'
import PostCard from '../posts/PostCard'
import ReplyCard from './ReplyCard'
import {
  fetchPost,
  createReply,
  fetchUserMembership,
  receivePostReply,
} from 'actions'

const ReplyContainer = props => {
  const post = useSelector(state => state.group.post)
  const id = props.match.params.id
  const user = useSelector(state => state.userReducer.loggedInUser)
  const socket = useSelector(state => state.socketReducer.socket)
  const group = useSelector(state => state.group)
  const dispatch = useDispatch()
  const { values, handleChange, handleSubmit } = useForm(submitReply)
  const [token] = useGetToken()

  useEffect(() => {
    dispatch(fetchPost(id)).then(res => {
      dispatch(
        fetchUserMembership({ group_id: res.group_id, user_id: user.id })
      )
      socket.on('replyPost', data => {
        console.log('replyPost2', data)
        dispatch(receivePostReply(data))
      })
    })
    return () => {
      socket.off('replyPost')
    }
  }, [dispatch, id, user.id])

  async function submitReply(e) {
    const data = {
      user,
      id,
      reply_content: values.reply_content,
      user_id: post.user_id,
      group: group.id,
    }
    dispatch(createReply(token, data, socket))
  }

  // Material UI
  const primary = green[500]
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
      margin: theme.spacing(1),
      backgroundColor: '#1A4570',
      marginTop: '15px',
    },
  }))

  const classes = useStyles()

  // CreateRef for scrolling from Links
  const replyRefs = post.replies
    ? post.replies.reduce((acc, value) => {
        acc[value.id] = createRef()
        return acc
      }, {})
    : null

  // On component mount, if a replyNumber is received from props, scroll the reply into view
  useEffect(() => {
    if (props.location.replyNumber && replyRefs !== null) {
      let yCoordinate
      const scrollRef = () => {
        // Subtract 50 px to account for padding top from top nav bar
        const yOffset = -50
        window.scrollTo({
          top: yCoordinate + yOffset,
          behavior: 'smooth',
        })
      }

      // Set ycoord to position of reply using replyNumber from props
      yCoordinate =
        replyRefs[props.location.replyNumber].current.getBoundingClientRect()
          .top + window.pageYOffset

      scrollRef()
      // Set replyNumber to null to prevent re-render and scrollRef() when typing
      props.location.replyNumber = null
    }
  })

  // Create ref and scrollToBottom function to allow scroll to bottom button
  const repliesEndRef = useRef(null)

  const scrollToBottom = () => {
    if (repliesEndRef.current)
      repliesEndRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  if (!post) {
    return (
      <Loader active size='large'>
        Loading
      </Loader>
    )
  }

  // Checking to see if current user is a member of current group
  // If they are undefined, we set membership to a string so we don't get an error
  let membership = group.memberType

  // Sort replies by id (which is chronological)
  const sortedReplies = post.replies
    ? post.replies.sort((a, b) => a.id - b.id).reverse()
    : null

  return (
    <ReplyViewContainer>
      {!!Object.values(post).length && <PostCard post={post} group={group} />}

      {(membership === 'admin' || membership === 'member') && (
        <ContainerBottom>
          <ReplyForm onSubmit={handleSubmit}>
            <InputDiv>
              <TextField
                id='outlined-textarea'
                required
                label='Reply to post'
                placeholder='Reply...'
                multiline
                fullWidth
                className={classes.textField}
                margin='normal'
                variant='outlined'
                onChange={handleChange}
                name='reply_content'
                value={values.reply_content || ''}
              />
            </InputDiv>
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
        </ContainerBottom>
      )}
      {sortedReplies && (
        <ReplyCardsContainer>
          <Comment.Group size='large' style={{ width: '100%' }}>
            {sortedReplies.map(reply => {
              return (
                <div ref={replyRefs[reply.id]} key={reply.id}>
                  <ReplyCard reply={reply} post={post} group={group} />
                </div>
              )
            })}
          </Comment.Group>
        </ReplyCardsContainer>
      )}
      <div ref={repliesEndRef} />
    </ReplyViewContainer>
  )
}

const ReplyViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #dee4e7;
  min-height: 87vh;
`
const ReplyCardsContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 75%;
  height: 100%;
  padding-bottom: 18%;
  font-size: 1.4rem;
  max-width: 800px;
  @media (max-width: 500px) {
    min-width: 350px;
    width: 95%;
  }
`
const ContainerBottom = styled.div`
  z-index: 0;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color: #dee4e7;
`

const ReplyForm = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 801px;

  background-color: #dee4e7;
  align-items: center;
`

const InputDiv = styled.div`
  width: 75%;
  margin-right: 10px;
`

export default ReplyContainer
