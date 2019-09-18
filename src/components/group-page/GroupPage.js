import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import useGetToken from "../utils/useGetToken";
import { useDispatch, useSelector } from "react-redux";
import { VIEW_GROUP } from "../../reducers/navReducer";

import GroupInfo from "./GroupInfo";
import PostsContainer from "../posts/PostsContainer";

import styled from "styled-components";
import { Paper } from "@material-ui/core";
import { Loader } from "semantic-ui-react";
import BlockedView from "../posts/BlockedView";

const GroupPage = props => {
  // Fetches Auth0 token for axios call
  const [token] = useGetToken();

  // Defines id to be group id from params
  const id = parseInt(props.match.params.id);
  const userId = useSelector(state => state.userReducer.loggedInUser.id);
  const userGroups = useSelector(state => state.userReducer.loggedInGroups);

  const [group, setGroup] = useState({});
  const [allegiances, setAllegiances] = useState([]);
  const [members, setMembers] = useState([]);
  const [trigger, setTrigger] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch group related data
    const fetchData = async () => {
      if (token) {
        try {
          const response = await axiosWithAuth([token]).get(`/groups/${id}`);
          setGroup(response.data.group);
          setAllegiances(response.data.allegiances);
          setMembers(response.data.members);
          const groupId = response.data.group.id;
          dispatch({ type: VIEW_GROUP, payload: groupId });
          setTrigger(false);
        } catch {
          dispatch({ type: VIEW_GROUP, payload: 0 });
          setTrigger(false);
        }
      }
    };
    fetchData();
  }, [token, id, dispatch, trigger]);

  if (Object.keys(group).length === 0) {
    return (
      <Loader active size="large">
        Loading
      </Loader>
    );
  }
  // checking to see if current user is a member of current group
  const currentUserType = userGroups.find(group => group.id === id);
  // if they are undefined, we set membership to a string so we don't get an error
  let membership;
  if (currentUserType === undefined) {
    membership = "non-member";
  } else {
    membership = currentUserType.user_type;
  }

  return (
    <GroupPageContainer>
      <PaperContainer elevation={3}>
        <GroupInfo
          group={group}
          members={members}
          allegiances={allegiances}
          setTrigger={setTrigger}
        />
      </PaperContainer>
      {group.privacy_setting === "public" ||
      membership === "member" ||
      membership === "admin" ? (
        <PostsContainer groupId={group.id} members={members} />
      ) : (
        <BlockedView />
      )}
    </GroupPageContainer>
  );
};

const GroupPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  background-color: #dee4e7;
  min-height: 87vh;
  justify-content: flex-start;
`;

const PaperContainer = styled(Paper)`
  margin-bottom: 5%;
`;

export default GroupPage;
