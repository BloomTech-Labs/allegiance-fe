import React, { useState, useEffect } from "react"
import { axiosWithAuth } from "../utils/axiosWithAuth";
import axios from "axios"
import useGetToken from "../utils/useGetToken";

const GroupList = () => {
    const [data, setData] = useState();

    const [token] = useGetToken();



    useEffect(() => {
        const fetchData = async () => {
            const groups = await axios.post("https://labs15-allegiance-staging.herokuapp.com/api/groups", { group_name: "Cha" });
            setData(groups.data);
        };

        fetchData();
    }, [token]);

    console.log(data);

    if (!data) {
        return <div>Loading App...</div>;
    }

    return (
        <div className="group-list">
            {data.groupByFilter.map(group => {
                return <div className="group" key={group.id}> {group.group_name} </div>;
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

//useEffect(() => {
  //  const fetchData = async () => {
    ///    const groups = await axiosWithAuth([token]).get("/groups", { body: { group_name: "Chargers" } });
       // setData(groups.data);
    //};