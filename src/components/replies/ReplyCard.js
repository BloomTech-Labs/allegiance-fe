import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import styled from 'styled-components'
import { makeStyles } from '@material-ui/core/styles'

import avi from '../../assets/walter-avi.png'
import { ThumbUp, DeleteOutline } from '@material-ui/icons'
import IconButton from '@material-ui/core/IconButton'
import Avatar from '@material-ui/core/Avatar'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { axiosWithAuth } from '../utils/axiosWithAuth'
import useGetToken from '../utils/useGetToken'
import Moment from 'react-moment'
import Tooltip from '@material-ui/core/Tooltip'
import { likeReply, dislikeReply } from 'actions'

const ReplyCard = props => {
  const {
    first_name,
    last_name,
    image,
    id,
    reply_content,
    user_id,
    replyLikes,
    created_at,
  } = props.reply

  const dispatch = useDispatch()
  const user = useSelector(state => state.userReducer.loggedInUser)
  const socket = useSelector(state => state.socketReducer.socket)
  const replyLikeId = replyLikes.find(like => like.user_id === user.id)
  // Obtaining the current users status within the current group
  const userGroups = useSelector(state => state.userReducer.loggedInGroups)
  const { group_id } = props.post
  const userStatus =
    userGroups.filter(group => group.id === group_id).length > 0
      ? userGroups.filter(group => group.id === group_id)[0].user_type
      : null

  // Fetches Auth0 token for axios call
  const [token] = useGetToken()
  // For Styled components -- see bottom of page

  const classes = useStyles()
  // Functions for liking & unliking replies
  async function addReplyLike(e) {
    e.preventDefault()
    const data = {
      user_id, // id of user who owns the entity
      user, // id of user who is liking an entity
      id,
    }
    dispatch(likeReply(token, data, socket))
  }

  async function unLikeReply(e) {
    dispatch(dislikeReply(token, replyLikeId.id))
  }

  const deleteReply = async () => {
    const reply = await axiosWithAuth([token]).delete(`/replies/${id}`)
    if (reply) {
      props.setSubmitted(true)
    }
  }

  return (
    <div className={'reply-div'}>
      <BubbleContainer user={user.id === user_id ? 'mine' : 'yours'} key={id}>
        <Avatar
          className={classes.avatar}
          src={!image ? avi : image}
          alt={'Avatar'}
        />
        <Tooltip title={<Moment format='LLLL'>{created_at}</Moment>}>
          <Content
            className={classes.content}
            color={user.id === user_id ? 'me' : 'you'}
          >
            <Typography
              className={classes.typography2}
              variant='body1'
              color='textPrimary'
              component='p'
            >
              {first_name} {last_name}
            </Typography>
            <Typography
              className={classes.typography}
              variant='body2'
              color='textSecondary'
              component='p'
            >
              {reply_content}
            </Typography>
          </Content>
        </Tooltip>
        <Activity>
          {!replyLikeId && (
            <div>
              <IconButton
                className={classes.icon}
                aria-label='add to favorites'
                onClick={addReplyLike}
                style={{ backgroundColor: 'transparent' }}
              >
                <ThumbUp
                  className={classes.unlikedIcon}
                  style={{ backgroundColor: 'transparent' }}
                />
              </IconButton>
              <IconButton className={classes.countIcon}>
                <h4> {replyLikes.length} </h4>
              </IconButton>
            </div>
          )}
          {replyLikeId && (
            <div>
              <IconButton
                className={classes.icon}
                aria-label='add to favorites'
                onClick={unLikeReply}
                style={{ backgroundColor: 'transparent' }}
              >
                <ThumbUp
                  className={classes.likedIcon}
                  style={{ backgroundColor: 'transparent' }}
                />
              </IconButton>
              <IconButton
                className={classes.countIcon}
                style={{ backgroundColor: 'transparent' }}
              >
                <h4> {replyLikes.length} </h4>
              </IconButton>
            </div>
          )}

          {(user.id === user_id || userStatus === 'admin') && (
            <IconButton
              onClick={() => deleteReply()}
              aria-label='settings'
              className={classes.icon}
              style={{ backgroundColor: 'transparent' }}
            >
              <DeleteOutline />
            </IconButton>
          )}
        </Activity>
      </BubbleContainer>
    </div>
  )
}

// Material UI Styling
// const primary = red[600]
const primary = '#4267b2'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  content: {
    maxWidth: '70%',
    margin: '10px 0',
    padding: '10px',
    display: 'block',
    position: 'relative',
    wordWrap: 'break-word',
    borderRadius: '5px',
    boxShadow: '0 0 6px #b2b2b2',
    '&:last-child': {
      paddingBottom: '10px',
    },
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    backgroundColor: 'white',
  },
  dense: {
    marginTop: theme.spacing(2),
  },
  menu: {
    width: 200,
  },
  margin: {
    margin: theme.spacing(1),
  },
  avatar: {
    margin: 3,
    width: 60,
    height: 60,
  },
  typography: {
    fontSize: 13,
    color: 'black',
    padding: 0,
  },
  typography2: {
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
  },
  likedIcon: {
    margin: 0,
    marginBottom: 0,
    padding: 0,
    color: primary,
  },
  unlikedIcon: {
    margin: 0,
    marginBottom: 0,
    padding: 0,
    color: 'grey',
  },
  countIcon: {
    margin: 0,
    marginBottom: 3,
    padding: 0,
  },
  icon: {
    margin: 0,
    marginBottom: 0,
    padding: 0,
  },
}))

const BubbleContainer = styled.div`
  display: flex;
  align-items: center;
  &:last-child {
    padding-bottom: 0;
  }
  flex-direction: ${props => {
    return props.user === 'mine' ? 'row-reverse' : 'row'
  }};
  justify-content: ${props => {
    return props.user === 'yours' ? 'flex-start' : 'none'
  }};
`

const Content = styled(CardContent)`
  background-color: ${props => {
    return props.color === 'me' ? '#8f5db7' : '#f2f2f2'
  }};
`

const Activity = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
`

export default ReplyCard
