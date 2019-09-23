import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import useGetToken from "../utils/useGetToken";
import { useSelector } from "react-redux";
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
import red from "@material-ui/core/colors/red";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

const blue = blueGrey[500];
const primary = red[500];
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
  remove: {
    color: primary
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
  // Defines membership status for logged in user

  const userGroups = useSelector(state => state.userReducer.loggedInGroups);
  const group_id = props.group_id;
  const userStatus =
    userGroups.filter(group => group.id === group_id).length > 0
      ? userGroups.filter(group => group.id === group_id)[0].user_type
      : null;

  // Retrieve current logged in userId
  const userId = useSelector(state => state.userReducer.loggedInUser.id);
  // Fetches Auth0 token for axios call
  const [token] = useGetToken();

  const classes = useStyles();
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false
  });

  async function removeMember(e, user_id) {
    e.preventDefault();
    if (token) {
      const result = await axiosWithAuth([token]).delete(`/groups_users/`, {
        data: {
          user_id,
          group_id
        }
      });
      if (
        result.data.message === "The user to group pairing has been deleted."
      ) {
        props.setTrigger(true);
      }
    }
  }

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

  // Sorting members list alphabetically
  props.members.sort((a, b) => (a.name < b.name ? -1 : 1));
  // Sorting list by membership status to put admins at the top
  const sortedMembers = props.members.sort((a, b) =>
    a.status < b.status ? -1 : 1
  );

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        {sortedMembers.map(member => (
          <ListItem button key={member.id} className={classes.member}>
            <ListItemIcon>
              <Avatar
                className={classes.avatar}
                src={!member.image ? avi : member.image}
              />
            </ListItemIcon>
            <ListItemText primary={member.name} className={classes.text} />
            {userStatus === "admin" && member.id !== userId && (
              <HighlightOffIcon
                onClick={e => removeMember(e, member.id)}
                className={classes.remove}
              />
            )}
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
        {props.members.length}{" "}
        {props.members.length === 1 ? "Member" : "Members"}
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
