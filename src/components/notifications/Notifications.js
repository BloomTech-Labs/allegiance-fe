import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import useGetToken from "../utils/useGetToken";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Loader } from "semantic-ui-react";
import NotificationsCard from "./NotificationsCard";

const Notifications = () => {
	const [notifications, setNotifications] = useState();
	const userGroups = useSelector(state => state.userReducer.loggedInGroups);
	const userId = useSelector(state => state.userReducer.loggedInUser.id);

	// Fetches Auth0 token for axios call
	const [token] = useGetToken();

	useEffect(() => {
		// Fetch notifications related data
		const mappedGroupIds = userGroups.map(group => {
			return group.id;
		});
		const fetchData = async () => {
			if (token) {
				try {
					const response = await axiosWithAuth([token]).post(`/feed`, {
						group_id: mappedGroupIds,
						interval: 48
					});
					console.log("res.data", response.data);
					setNotifications(response.data.allActivity);
				} catch {}
			}
		};
		fetchData();
	}, [token, userGroups]);

	useEffect(() => {
		return () => {
			console.log("cleaned up");
		};
	}, []);

	if (!notifications) {
		return (
			<Loader active size="large">
				Loading
			</Loader>
		);
	}

	// Filter out activity performed by the user
	const filteredNotifications = notifications.filter(
		act => userId !== act.user_id && userId !== act.liker_id
	);

	console.log(filteredNotifications);

	return (
		<Container>
			{filteredNotifications.map(activity => (
				<NotificationsCard
					activity={activity}
					key={activity.tag + activity.id}
				/>
			))}
		</Container>
	);
};

const Container = styled.div`
	background-color: whitesmoke;
`;

export default Notifications;
