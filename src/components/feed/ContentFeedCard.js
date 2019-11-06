import React from 'react'
import { withRouter } from 'react-router-dom'

import Moment from 'react-moment'

import styled from 'styled-components'
import { makeStyles } from '@material-ui/core/styles'
import {
  Card,
  CardActionArea,
  CardContent,
  Avatar,
  Typography,
  Tooltip,
} from '@material-ui/core'
import SmsOutlinedIcon from '@material-ui/icons/SmsOutlined'

const useStyles = makeStyles({
  card: {
    width: '60vw',
    marginBottom: 20,
    margin: 'auto',
  },
  avatar: {
    marginRight: 15,
    marginLeft: 15,
  },
  headerAvatar: {
    marginRight: 4,
    marginLeft: 0,
    height: 20,
    width: 20,
  },
  button: {
    color: 'white',
    backgroundColor: '#1B4570',
  },
  content: {
    color: 'black',
    fontSize: 18,
  },
  groupAvatar: {
    marginRight: 15,
    marginLeft: 0,
    height: 20,
    width: 20,
  },
})

const ContentFeedCard = props => {
  const classes = useStyles(props)

  // Destructure props to gain access to keys
  const {
    // note: various other key/value pairs available, see postman documentation
    id,
    group_id,
    post_id,
    post_content,
    reply_content,
    created_at,
    first_name,
    last_name,
    user_image,
    tag,
    group_image,
    acronym,
  } = props.activity

  // Combine first and last name into a single variable
  const fullName =
    first_name && last_name
      ? first_name.charAt(0).toUpperCase() +
        first_name.slice(1) +
        ' ' +
        last_name.charAt(0).toUpperCase() +
        last_name.slice(1)
      : null

  const goToGroup = e => {
    e.preventDefault()
    e.stopPropagation()
    props.history.push(`/group/${group_id}`)
  }

  const goToPost = e => {
    e.stopPropagation()
    props.history.push({
      pathname: `/post/${postId}`,
      replyNumber: tag === 'reply' ? id : null,
    })
  }

  // defining post id for conditional render
  let postId
  if (tag === 'post') {
    postId = id
  }
  if (tag === 'reply') {
    postId = post_id
  }
  return (
    <CardDiv onClick={e => goToPost(e)}>
      <Card className={classes.card} raised={true}>
        <HeaderDiv>
          <HeaderIcon>
            <SmsOutlinedIcon className={classes.avatar} />
          </HeaderIcon>
          <HeaderContent>
            <Avatar
              className={classes.headerAvatar}
              src={user_image}
              alt={`${fullName}'s Image`}
            />
            <Typography>
              {fullName} {tag === 'post' && 'created a post...'}
              {tag === 'reply' && 'replied...'}
            </Typography>
          </HeaderContent>
        </HeaderDiv>
        <CardActionArea>
          <CardContent>
            <Typography
              variant='body2'
              color='textSecondary'
              component='p'
              className={classes.content}
            >
              {tag === 'post' && post_content}
              {tag === 'reply' && reply_content}
            </Typography>
          </CardContent>
        </CardActionArea>
        <Footer>
          <FooterTimeStamp>
            <Tooltip title={<Moment format='LLLL'>{created_at}</Moment>}>
              <Moment fromNow style={{ color: 'grey' }}>
                {created_at}
              </Moment>
            </Tooltip>
          </FooterTimeStamp>
          <GroupFooter onClick={e => goToGroup(e)}>
            <Avatar
              aria-label='recipe'
              className={classes.groupAvatar}
              src={group_image}
              alt={'Group Image'}
            />
            <p>{acronym}</p>
          </GroupFooter>
        </Footer>
      </Card>
    </CardDiv>
  )
}

const CardDiv = styled.div`
  display: flex;
  justify-content: center;
`

const HeaderDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 0.4rem 0;
  text-align: left;
  border-bottom: 1px solid lightgrey;
  p {
    color: gray;
  }
`

const HeaderIcon = styled.div`
  width: 15%;
`

const HeaderContent = styled.div`
  width: 80%;
  display: flex;
  margin-right: 2%;
  overflow: hidden;
`

const FooterTimeStamp = styled.div`
  width: 22%;
  color: grey;
  text-align: left;
`

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1% 6% 2% 4%;
  border-top: 1px solid lightgrey;
`

const GroupFooter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    color: black;
  }
`

export default withRouter(ContentFeedCard)
