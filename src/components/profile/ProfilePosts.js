import React from 'react'
import pic from 'assets/undraw/noPosts.svg'
import ProfilePostCard from './ProfilePostCard'
import styled from 'styled-components'

export const ProfilePosts = ({ posts, name }) => {
  if (posts.length) {
    return (
      <ProfilePostsContainer>
        {posts.map((post, id) => {
          return <ProfilePostCard key={id} post={post} />
        })}
      </ProfilePostsContainer>
    )
  }
  if (posts.length === 0) {
    return (
      <ProfilePostsContainer>
        <Join>{name} has no posts</Join>
        <Img src={pic} />
      </ProfilePostsContainer>
    )
  }
}

const ProfilePostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 800px;
`
const Img = styled.img`
  width: 70%;
  height: 70vh;
`
const Join = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: bold;
  letter-spacing: adjusting;
  font-size: 2rem;
`
