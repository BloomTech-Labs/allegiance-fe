import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const loggedInUser = useSelector(state => state.userReducer.loggedInUser);

  console.log(loggedInUser);

  return (
    <>
      <img src={loggedInUser.picture} alt="Profile" />
      <div>
        {loggedInUser.first_name}
        {loggedInUser.last_name}
        {loggedInUser.bio}
      </div>
      {/*<MyAllegiances/>*/}
      {/*<MyGroups/>*/}
      <code>{JSON.stringify(loggedInUser, null, 2)}</code>
    </>
  );
};

export default Profile;
