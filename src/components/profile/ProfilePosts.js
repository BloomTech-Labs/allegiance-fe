import React from 'react'
import pic from 'assets/undraw/noPosts.svg'
import ProfilePostCard from './ProfilePostCard'

export const ProfilePosts = ({ posts }) => {
  if (posts.length) {
    posts.map((post, id) => {
      return <ProfilePostCard key={id} post={post} />
    })
  }
  if (posts.length === 0) {
    return <img src={pic} />
  }
}
