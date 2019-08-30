import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import useGetToken from "../utils/useGetToken";
import styled from "styled-components";

import GroupCard from "./GroupCard";

const NearbyGroups = () => {
  const [data, setData] = useState({ groups: [] });

  const [token] = useGetToken();

  useEffect(() => {
    const fetchData = async () => {
      const groups = await axiosWithAuth([token]).post(`/groups/search`, {
        column: "location",
        row: "89103"
      });
      console.log("DATA", groups.data);
      setData({ groups: groups.data.groupByFilter });
    };

    fetchData();
  }, [token]);

  if (!data.groups) {
    return <div>Loading Groups...</div>;
  }
  return (
    <NearbyGroupsContainer>
      <h3>GROUPS NEAR YOU</h3>
      {data.groups.map(group => {
        return <GroupCard group={group} key={group.id} />;
      })}
    </NearbyGroupsContainer>
  );
};

const NearbyGroupsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  margin-top: 1vh;
`;

export default NearbyGroups;
