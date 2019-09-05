import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";

import { axiosWithAuth } from "../utils/axiosWithAuth";
import useGetToken from "../utils/useGetToken";
import styled from "styled-components";

import GroupCard from "./GroupCard";

const NearbyGroups = () => {
  const [data, setData] = useState({ groups: [] });

  // Fetches Auth0 token for axios call
  const [token] = useGetToken();

  // Fetches user information from Redux
  const loggedInUser = useSelector(state => state.userReducer.loggedInUser);

  useEffect(() => {
    const fetchData = async () => {
      const groups = await axiosWithAuth([token]).post(`/groups/search`, {
        column: "location",
        row: loggedInUser.location
      });
      console.log("DATA", groups.data);
      setData({ groups: groups.data.groupByFilter });
    };

    fetchData();
  }, [token, loggedInUser]);

  if (!data.groups) {
    return <div>Loading Groups...</div>;
  }
  return (
    <SectionContainer>
      <NearbyGroupsContainer>
        {data.groups.map(group => {
          return <GroupCard minWidth="40%" group={group} key={group.id} />;
        })}
      </NearbyGroupsContainer>
    </SectionContainer>
  );
};

const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const NearbyGroupsContainer = styled.div`
  width: 98%;
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  margin-left: 1%;
  padding-bottom: 3%
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default NearbyGroups;
