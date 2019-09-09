import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import useGetToken from "../utils/useGetToken";

import GroupInfo from "./GroupInfo";
import GroupAllegiances from "./GroupAllegiances";
import PostsContainer from "../posts/PostsContainer";

import styled from "styled-components";
import { Divider } from "semantic-ui-react";

const GroupPage = props => {
  // Fetches Auth0 token for axios call
  const [token] = useGetToken();
  //   console.log("Token:", token);

  // Defines id to be group id from params
  const id = props.match.params.id;

  const [group, setGroup] = useState({});
  const [allegiances, setAllegiances] = useState([]);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    // Fetch group related data
    const fetchData = async () => {
      if (token) {
        const response = await axiosWithAuth([token]).get(`/groups/${id}`);
        setGroup(response.data.group);
        setAllegiances(response.data.allegiances);
        setMembers(response.data.members);
        console.log("data:", response.data);
      }
    };
    fetchData();
  }, [token, id]);

  if (Object.keys(group).length === 0) {
    return <div>Loading Group...</div>;
  }

  return (
    <GroupPageContainer>
      <GroupInfo group={group} members={members} />
      <GroupAllegiances allegiances={allegiances} />
      <SectionDivider />

      <PostsContainer groupId={group.id} members={members} />
    </GroupPageContainer>
  );
};

const GroupPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

const SectionDivider = styled(Divider)`
  margin: 0rem;
`;

export default GroupPage;
