import React, { useState, useEffect, useRef, createRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import { VIEW_REPLIES } from '../../reducers/navReducer'
import * as types from 'actions/actionTypes'
import styled from 'styled-components'
import { Loader } from 'semantic-ui-react'
import { green } from '@material-ui/core/colors'
import { TextField, Fab } from '@material-ui/core/'
import { makeStyles } from '@material-ui/core/styles'
import { Add, VerticalAlignBottom } from '@material-ui/icons/'
import { Mixpanel } from '../analytics/Mixpanel'

import { axiosWithAuth } from '../utils/axiosWithAuth'
import useGetToken from '../utils/useGetToken'
import useForm from '../utils/useForm'

import PostCard from '../posts/PostCard'
import ReplyCard from './ReplyCard'
import { fetchPost, createReply, fetchUserMembership } from 'actions'

const ReplyContainer = props => {
  // const [post, setPost] = useState()
  const post = useSelector(state => state.group.post)
  const [submitted, setSubmitted] = useState(false)
  const id = props.match.params.id

  const user = useSelector(state => state.userReducer.loggedInUser)
  const socket = useSelector(state => state.socketReducer.socket)
  const group = useSelector(state => state.group)
  const dispatch = useDispatch()

  // useForm custom hook and set timeout custom hook
  const { values, setValues, handleChange, handleSubmit } = useForm(submitReply)
  // Fetches Auth0 token for axios call
  const [token] = useGetToken()

  useEffect(() => {
    // Fetch group related data
    dispatch(fetchPost(id)).then(res => {
      console.log('res', res)
      console.log(post && post.group_id)
      dispatch(
        fetchUserMembership({ group_id: res.group_id, user_id: user.id })
      )
    })
  }, [])

  // token, id, submitted, dispatch

  // callback function to handle submit
  async function submitReply(e) {
    const data = {
      user,
      id,
      reply_content: values.reply_content,
      user_id: post.user_id,
    }
    dispatch(createReply(token, data, socket))
    //   Mixpanel.activity(userId, 'Reply Successfully Created.')
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
      marginTop: 10,
      height: 30,
      width: 30,
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
  useEffect(
    () => {
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
    }
    // No dependency array included as scrollRef render should only occur once (upon navigation from feed or notification)
  )

  // Create ref and scrollToBottom function to allow scroll to bottom button
  const repliesEndRef = useRef(null)
  const scrollToBottom = () => {
    if (repliesEndRef.current)
      repliesEndRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  // Obtain groups the user has a relation to, check for membership after post is loaded
  const userGroups = useSelector(state => state.myGroups)

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
      {!!Object.values(post).length && (
        <PostCard post={post} setSubmitted={setSubmitted} group={group} />
      )}

      {(membership === 'admin' || membership === 'member') && (
        <ContainerBottom>
          <DownNav>
            <VerticalAlignBottom
              className={classes.button}
              onClick={scrollToBottom}
            />
          </DownNav>
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
            <Fab
              classes={{ root: classes.root }}
              type='submit'
              aria-label='Reply'
            >
              <Add />
            </Fab>
          </ReplyForm>
        </ContainerBottom>
      )}

      {sortedReplies && (
        <ReplyCardsContainer>
          {sortedReplies.map(reply => {
            return (
              <div ref={replyRefs[reply.id]} key={reply.id}>
                <ReplyCard
                  reply={reply}
                  setSubmitted={setSubmitted}
                  post={post}
                  group={group}
                />
              </div>
            )
          })}
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
  justify-content: flex-start;
`
const ReplyCardsContainer = styled.div`
  width: 100%;
  height: 100%;
  padding-bottom: 18%;
`
const ContainerBottom = styled.div`
  z-index: 0;
  display: flex;
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

export default ReplyContainer
