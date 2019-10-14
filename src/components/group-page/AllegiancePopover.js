import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Paper,
  Grow,
  FormControlLabel,
  Avatar,
  Typography,
} from '@material-ui/core/'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'

const useStyles = makeStyles(theme => ({
  root: {
    height: 40,
  },
  avatar: {
    margin: 3,
    marginRight: 0,
    width: 60,
    height: 60,
    marginBottom: 2,
  },
  container: {
    display: 'flex',
  },
  typography: {
    fontSize: 14,
    color: 'black',
    display: 'flex',
    zIndex: 1,
    margin: 0,
  },
  paper: {
    margin: theme.spacing(1),
    display: 'flex',
    zIndex: 1,
  },
}))

const SimpleGrow = props => {
  const classes = useStyles()
  const [checked, setChecked] = React.useState(false)

  function handleChange() {
    setChecked(prev => !prev)
  }

  return (
    <div className={classes.root}>
      <FormControlLabel
        control={<ArrowDropDownIcon checked={checked} onClick={handleChange} />}
        label='Allegiances'
      />
      <div className={classes.container}>
        <Grow in={checked}>
          {props.allegiances.length > 0 ? (
            <Paper elevation={4} className={classes.paper}>
              {props.allegiances.map(al => (
                <Avatar
                  key={al.id}
                  src={al.image}
                  className={classes.avatar}
                  alt={al.name}
                />
              ))}
            </Paper>
          ) : (
            <Typography
              className={classes.typography}
              variant='body1'
              color='textSecondary'
              component='p'
            >
              No Allegiances Yet!
            </Typography>
          )}
        </Grow>
      </div>
    </div>
  )
}

export default SimpleGrow
