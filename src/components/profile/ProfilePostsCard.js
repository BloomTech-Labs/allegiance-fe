import React from 'react'
import { Card, CardContent } from '@material-ui/core/'
import { makeStyles } from '@material-ui/core/styles'

export default function ProfilePostsCards(props) {
  const classes = useStyles()

  return (
    <Card raised className={classes.card}>
      <CardContent>
        <ui>
          <h1>{props.post.post_content}</h1>
        </ui>
      </CardContent>
    </Card>
  )
}

const useStyles = makeStyles(theme => ({
  card: {
    width: '95%',
    maxWidth: '800px',
    marginBottom: 20,
  },
}))
