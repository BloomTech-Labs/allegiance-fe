import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { ADD_GROUP, LEAVE_GROUP } from "../../reducers/userReducer";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { makeStyles } from "@material-ui/core/styles";
import useGetToken from "../utils/useGetToken";
import Button from "@material-ui/core/Button";
import red from "@material-ui/core/colors/red";
import blue from "@material-ui/core/colors/blue";

import { Mixpanel } from "../analytics/Mixpanel";

import styled from "styled-components";

const MembershipStatus = props => {
  // const [isLoading, setLoading] = useState(false);
  const [userType, setUserType] = useState();
  const [relation, setRelation] = useState();
  const dispatch = useDispatch();

  // Fetches Auth0 token for axios call
  const [token] = useGetToken();

  // Fetches user information from Redux
  const loggedInUser = useSelector(state => state.userReducer.loggedInUser);

  useEffect(() => {
    // Fetch user type and groups_users id
    const fetchDataUserType = async () => {
      if (token) {
        const response = await axiosWithAuth([token]).post(
          `/groups_users/search`,
          {
            user_id: loggedInUser.id,
            group_id: props.group_id
          }
        );
        if (response.data.relationExists) {
          setUserType(response.data.relationExists[0].user_type);
          setRelation(response.data.relationExists[0].id);
        } else {
          setUserType("non-member");
        }
      }
    };
    fetchDataUserType();
  }, [token, props.group_id, loggedInUser, userType]);

  async function joinGroup(e) {
    e.preventDefault();
    // setLoading(true);
    if (token) {
      const result = await axiosWithAuth([token]).post(`/groups_users`, {
        user_id: loggedInUser.id,
        group_id: props.group_id,
        user_type: "member"
      });
      if (result.data.newGroupUsers) {
        setUserType("member");
        const addedGroup = {
          name: result.data.newGroupUsers.group_name,
          image: result.data.newGroupUsers.group_image,
          id: result.data.newGroupUsers.group_id,
          user_type: result.data.newGroupUsers.user_type
        };
        dispatch({ type: ADD_GROUP, payload: addedGroup });
        Mixpanel.activity(loggedInUser.id, "Joined Group");
      }
    }
  }

  async function joinGroupInvite(e) {
    e.preventDefault();
    if (token) {
      const result = await axiosWithAuth([token]).put(
        `/groups_users/${relation}`,
        {
          user_id: loggedInUser.id,
          group_id: props.group_id,
          user_type: "member"
        }
      );
      if (result.data.updated) {
        setUserType("member");
      }
    }
  }

  async function leaveGroup(e) {
    e.preventDefault();
    if (token) {
      const result = await axiosWithAuth([token]).delete(
        `/groups_users/${relation}`
      );
      if (
        result.data.message === "The user to group pairing has been deleted."
      ) {
        setUserType("non-member");
        dispatch({ type: LEAVE_GROUP, payload: props.group_id });
        Mixpanel.activity(loggedInUser.id, "Left Group");
      }
    }
  }

  const primary = red[600];
  const accent = blue[400];
  const useStyles = makeStyles(theme => ({
    leave: {
      margin: theme.spacing(1),
      backgroundColor: primary
    },
    join: {
      margin: theme.spacing(1),
      backgroundColor: accent
    },
    extendedIcon: {
      marginRight: theme.spacing(1)
    }
  }));

  const classes = useStyles();

  return (
    <GroupMemberStatus>
      {userType && (
        <>
          {userType === "admin" && (
            <>
              <Membership>Admin</Membership>
              {/* <Button action={"leave"} >
								Leave
							</Button> */}
              <Button
                onClick={e => leaveGroup(e)}
                variant="contained"
                size="small"
                className={classes.leave}
              >
                Leave
              </Button>
            </>
          )}
          {userType === "invited" && (
            <>
              <Membership>Invited</Membership>
              <Button1 action={"join"} onClick={e => joinGroupInvite(e)}>
                Join
              </Button1>
            </>
          )}
          {userType === "member" && (
            <>
              <Membership>Member</Membership>
              {/* <Button1 action={"leave"} onClick={e => leaveGroup(e)}>
                Leave
              </Button1> */}
              <Button
                onClick={e => leaveGroup(e)}
                variant="contained"
                size="small"
                className={classes.leave}
              >
                Leave
              </Button>
              {/* Test buttons to change status to invite or admin */}
              {/* <button onClick={e => invite(e)}>Invite</button>
							<button onClick={e => admin(e)}>Admin</button> */}
            </>
          )}
        </>
      )}
      {userType === "non-member" && (
        <>
          <NotMember>Holder</NotMember>
          {/* <Button1 action={"join"} onClick={e => joinGroup(e)}>
            Join
		  </Button1> */}
          <Button
            onClick={e => joinGroup(e)}
            variant="contained"
            size="small"
            // color="primary"
            className={classes.join}
          >
            Join
          </Button>
        </>
      )}
    </GroupMemberStatus>
  );
};

const GroupMemberStatus = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Membership = styled.div`
  margin: 4% auto;
  width: 80%;  
  color: grey;
  border: 1px solid grey
  border-radius: 10%;
`;

const NotMember = styled.div`
  margin: 4% auto;
  width: 80%;
  color: white;
`;

const Button1 = styled.div`
  margin: 4% auto;
  width: 80%;
  color: #f2f2f2;
  border-radius: 10%;
  background-color: ${props => {
    if (props.action === "join") return "#5eaeff";
    if (props.action === "leave") return "#F03737";
  }};
  padding: 1% 0;
`;

export default MembershipStatus;
