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
    <div className="group-list">
      <h1>All Groups</h1>
      {data.groups.map(group => {
        return (
          <CardListContainer key={group.id}>
            <GroupCard group={group} />
            {/* <Link to={`/group/${group.id}`}>{group.group_name}</Link> */}
          </CardListContainer>
        );
      })}
    </div>
  );
};

const CardListContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export default GroupList;
