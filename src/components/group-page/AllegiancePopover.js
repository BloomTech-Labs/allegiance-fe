import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import Paper from "@material-ui/core/Paper";
import Grow from "@material-ui/core/Grow";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles(theme => ({
  root: {
    height: 40
  },
  avatar: {
    margin: 3,
    marginRight: 0,
    width: 60,
    height: 60,
    marginBottom: 2
  },
  container: {
    display: "flex"
  },
  paper: {
    margin: theme.spacing(1)
  }
}));

const SimpleGrow = props => {
  const classes = useStyles();
  const [checked, setChecked] = React.useState(false);

  function handleChange() {
    setChecked(prev => !prev);
  }

  return (
    <div className={classes.root}>
      <FormControlLabel
        control={<Switch checked={checked} onChange={handleChange} />}
        label="Allegiances"
      />
      <div className={classes.container}>
        <Grow in={checked}>
          <Paper elevation={4} className={classes.paper}>
            {props.allegiances.map(al => (
              <Avatar key={al.id} src={al.image} className={classes.avatar} />
            ))}
          </Paper>
        </Grow>
      </div>
    </div>
  );
};

export default SimpleGrow;
