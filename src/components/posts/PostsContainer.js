import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import useGetToken from '../utils/useGetToken'
import styled from 'styled-components'
import { Paper } from '@material-ui/core'
import * as types from 'actions/actionTypes'
import PostForm from './PostForm'
import PostCard from './PostCard'
import { fetchGroupPosts } from 'actions'
const PostsContainer = props => {
  // Fetches Auth0 token for axios call
  const { posts } = props
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
            return <PostCard post={post} key={post.id} />
          })
        ) : (
          <PaperContainer elevation={20}>
            <h2>Nobody has posted yet!</h2>
          </PaperContainer>
        )}
      </PostListContainer>
      <div ref={postsEndRef} />
      {(membership === 'admin' || membership === 'member') && (
        <PostForm groupId={props.groupId} scrollToBottom={scrollToBottom} />
      )}
    </PostsWrapper>
  )
}
const PostListContainer = styled.div`
  width: 100%;
  display: flex;
  border: 2px solid pink;
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
