import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import useGetToken from "../utils/useGetToken";

const GroupList = () => {
  const [data, setData] = useState({ groups: [] });

  const [token] = useGetToken();

  useEffect(() => {
    const fetchData = async () => {
      const groups = await axiosWithAuth([token]).post(
        "http://localhost:5000/api/groups",
        {
          group_name: ""
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
      {data.groups.map(group => {
        return <div className="group"> {group.group_name} </div>;
      })}
    </div>
  );
};

export default GroupList;
