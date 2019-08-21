import React, { useState, useEffect } from "react";

import { axiosWithAuth } from "./utils/axiosWithAuth"
import useGetToken from "./utils/useGetToken";

import { Mixpanel } from "./analytics/Mixpanel";

const Test = () => {

  const [data, setData] = useState({ users: [] });

  useEffect(() => {
    Mixpanel.track("Hello mixpanel!");
  }, []);

  const [token] = useGetToken()

  useEffect(() => {
    const fetchData = async () => {
      const users = await axiosWithAuth([token]).get('/users')
      setData(users.data)
    };

    fetchData();
  }, [token]);

  console.log(data);

  return (
    <div>
      {data.users.map(user => (
        <div key={user.id}>
          {user.username}, {user.email}, {user.location}
        </div>
      ))}
    </div>
  );
};

export default Test;
