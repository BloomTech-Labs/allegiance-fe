import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Avatar from "@material-ui/core/Avatar";
import avi from "../../assets/walter-avi.png";
import blueGrey from "@material-ui/core/colors/blueGrey";

const blue = blueGrey[500];
const useStyles = makeStyles(theme => ({
  list: {
    width: 250
  },
  member: {
    borderBottom: "1px solid lightgray"
  },
  text: {
    fontWeight: "bolder",
    textAlign: "center"
  },
  avatar: {
    margin: 1,
    width: 60,
    height: 60
  },
  names: {
    fontSize: 15
  },
  trigger: {
    margin: theme.spacing(1),
    backgroundColor: blue,
    marginTop: 1
  }
}));

const MembersList = props => {
  const classes = useStyles();
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false
  });

  const toggleDrawer = (side, open) => event => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        {props.members.map(member => (
          <ListItem button key={member.id} className={classes.member}>
            <ListItemIcon>
              <Avatar
                className={classes.avatar}
                src={!member.image ? avi : member.image}
              />
            </ListItemIcon>
            <ListItemText primary={member.name} className={classes.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      <Button
        onClick={toggleDrawer("right", true)}
        variant="contained"
        size="small"
        className={classes.trigger}
      >
        {props.members.length} Members
      </Button>
      <SwipeableDrawer
        anchor="right"
        open={state.right}
        onClose={toggleDrawer("right", false)}
        onOpen={toggleDrawer("right", true)}
      >
        {sideList("right")}
      </SwipeableDrawer>
    </div>
  );
};

export default MembersList;
