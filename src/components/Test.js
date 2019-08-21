import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "./auth/react-auth0-wrapper";

import { Mixpanel } from "./analytics/Mixpanel";

const Test = () => {
  const [data, setData] = useState({ users: [] });
  const { getTokenSilently } = useAuth0();
  useEffect(() => {
    Mixpanel.track("Hello mixpanel!");
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const token = await getTokenSilently();
      const result = await axios(
        "http://localhost:5000/users",
        // "https://labs15-allegiance.herokuapp.com/users"
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log(result);
      setData(result.data);
    };

    fetchData();
  }, []);

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
