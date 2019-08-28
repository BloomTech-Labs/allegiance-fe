import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import useGetToken from "../utils/useGetToken";
import styled from "styled-components";

import GroupCard from "./GroupCard";

const GroupList = () => {
  const [data, setData] = useState({ groups: [] });

  const [token] = useGetToken();

  useEffect(() => {
    const fetchData = async () => {
      const groups = await axiosWithAuth([token]).post(
        `/groups/search`,
        // "http://localhost:5000/api/groups/search",
        {
          column: "group_name",
          row: ""
        }
      );
      setData({ groups: groups.data.groupByFilter });
    };

    fetchData();
  }, [token]);
  console.log(data);
  if (!data.groups) {
    return <div>Loading Groups...</div>;
  }
  //Component should only show top 20 , load more button below. Should be sortable by recent activity/group size/allegiances
  return (
    <GroupListContainer>
      {data.groups.map(group => {
        return <GroupCard group={group} key={group.id} />;
      })}
    </GroupListContainer>
  );
};

const GroupListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  margin-top: 5vh;
`;

export default GroupList;
