import React from 'react'

export default function ProfilePostsCards(props) {
  console.log('Props from ProfilePostsCard:::::', props)
  return (
    <ui>
      <h1>
        {props.post.first_name} {props.post.last_name}
      </h1>
      <h1>{props.post.post_content}</h1>
    </ui>
  )
}
