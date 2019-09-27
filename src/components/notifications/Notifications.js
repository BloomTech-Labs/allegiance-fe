import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import useGetToken from "../utils/useGetToken";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Loader } from "semantic-ui-react";
import moment from "moment";

import { UPDATE_USER } from "../../reducers/userReducer";

import NotificationsCard from "./NotificationsCard";

const Notifications = () => {
	const [notifications, setNotifications] = useState();
	// Keep track of when notifications component mounts so that timestamp
	// can be passed to the put in the cleanup useEffect
	const [mountTime, setMountTime] = useState();
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
					setNotifications(response.data.allActivity);
					// Record timestamp upon component mount
					setMountTime(moment().toISOString());
				} catch (error) {
					console.log(error);
				}
			}
		};
		fetchData();
	}, [token, userGroups]);

	// Retrieve email and location as those are required by JOI check on backend
	const { email, location } = useSelector(
		state => state.userReducer.loggedInUser
	);

	const dispatch = useDispatch();
	// Cleanup useEffect to change notification check time, we do this on component un-mount
	// instead of mount so that different styling can be applied to new vs old notifications
	useEffect(() => {
		return async () => {
			if (token && userId && mountTime) {
				try {
					const response = await axiosWithAuth([token]).put(
						`/users/${userId}`,
						{
							email,
							location,
							// Set timestamp to when component mounted in case activity occurred while
							// user was in the notifications tab, so that those activities aren't missed
							notification_check: mountTime
						}
					);
					dispatch({ type: UPDATE_USER, payload: response.data.updated });
				} catch (error) {
					console.log(error);
				}
			}
		};
	}, [dispatch, email, location, userId, token, mountTime]);

	if (!notifications) {
		return (
			<Loader active size="large">
				Loading
			</Loader>
		);
	}

	// Filter out activity performed by the user, future versions should combine likes on same post/reply
	const filteredNotifications = notifications.filter(
		act => userId !== act.user_id && userId !== act.liker_id
	);

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
