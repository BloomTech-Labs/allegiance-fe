import React from "react";
import { useSelector } from 'react-redux'

const Profile2 = () => {

	const user = useSelector(state => state.userReducer.loggedInUser);

	if (!user) {
		return <div>Loading...</div>;
	}

	console.log(user);

	return (
		<>
			<img src={user.picture} alt="Profile" />

			<h2>{user.name}</h2>
			<p>{user.email}</p>
			<code>{JSON.stringify(user, null, 2)}</code>
		</>
	);
};

export default Profile2;
