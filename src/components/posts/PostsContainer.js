import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { axiosWithAuth } from '../utils/axiosWithAuth'
import useGetToken from '../utils/useGetToken'
import styled from 'styled-components'
import { Paper } from '@material-ui/core'

import PostForm from './PostForm'
import PostCard from './PostCard'

const PostsContainer = props => {
  // Fetches Auth0 token for axios call
  const [token] = useGetToken()
  const [posts, setPosts] = useState([])
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const id = props.groupId
      if (token)
        try {
          const posts = await axiosWithAuth([token]).get(`/posts/group/${id}`)
          setPosts(posts.data.postsLoaded.sort((a, b) => a.id - b.id))
          setSubmitted(false)
        } catch {
          setPosts([])
          setSubmitted(false)
        }
    }
    fetchData()
  }, [token, submitted, props.groupId])

  // Create ref and scrollToBottom function to align view upon entering tab and on new posts
  const postsEndRef = useRef(null)

  const scrollToBottom = () => {
    if (postsEndRef.current) {
      postsEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Obtain groups the user has a relation to
  const userGroups = useSelector(state => state.userReducer.loggedInGroups)
  // checking to see if current user is a member of current group
  const currentUserType = userGroups.find(group => group.id === props.groupId)
  // if they are undefined, we set membership to a string so we don't get an error
  let membership
  if (currentUserType === undefined) {
    membership = 'non-member'
  } else {
    membership = currentUserType.user_type
  }

  return (
    <PostsWrapper>
      <PostListContainer>
        {posts.length > 0 ? (
          posts.map(post => {
            return (
              <PostCard post={post} key={post.id} setSubmitted={setSubmitted} />
            )
          })
        ) : (
          <PaperContainer elevation={20}>
            <h2>Nobody has posted yet!</h2>
          </PaperContainer>
        )}
      </PostListContainer>

      <div ref={postsEndRef} />

      {(membership === 'admin' || membership === 'member') && (
        <PostForm
          setSubmitted={setSubmitted}
          groupId={props.groupId}
          scrollToBottom={scrollToBottom}
        />
      )}
    </PostsWrapper>
  )
}

const PostListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #dee4e7;
  padding-bottom: 15%;
`
const PostsWrapper = styled.div`
  background-color: #dee4e7;
`
const PaperContainer = styled(Paper)`
  padding: 3.5rem;
`

export default PostsContainer
