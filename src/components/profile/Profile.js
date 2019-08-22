import React from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {
	const loggedInUser = useSelector(state => state.userReducer.loggedInUser);

	return (
		<>
			<img src={loggedInUser.picture} alt="Profile" />

			<h2>{loggedInUser.name}</h2>
			<p>{loggedInUser.email}</p>
			<code>{JSON.stringify(loggedInUser, null, 2)}</code>
		</>
	);
};

export default Profile;
