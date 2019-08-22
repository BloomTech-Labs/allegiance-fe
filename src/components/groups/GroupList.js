import React, { useState, useEffect } from "react";
import axios from "axios";
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
  return (
    <div className="group-list">
      {data.groups.map(group => {
        return <div className="group"> {group.group_name} </div>;
      })}
    </div>
  );
};

export default GroupList;

// useEffect(() => {
//     const fetchData = async () => {
//       const groups = await axiosWithAuth(token).get("/groups");
//       setData(groups.data);
//     };

// useEffect(() => {
//     const fetchData = async () => {
//       const groups = await axios.get("http://localhost:5000/api/groups");
//       setData(groups.data);
//     };
