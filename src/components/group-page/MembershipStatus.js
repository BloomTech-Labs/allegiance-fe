import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";

import styled from "styled-components";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import useGetToken from "../utils/useGetToken";

const MembershipStatus = props => {
	// const [isLoading, setLoading] = useState(false);
	const [userType, setUserType] = useState();
	const [relation, setRelation] = useState();

	// Fetches Auth0 token for axios call
	const [token] = useGetToken();

	// Fetches user information from Redux
	const loggedInUser = useSelector(state => state.userReducer.loggedInUser);

	useEffect(() => {
		// Fetch user type and groups_users id
		const fetchDataUserType = async () => {
			if (token) {
				const response = await axiosWithAuth([token]).post(
					`/groups_users/search`,
					{
						user_id: loggedInUser.id,
						group_id: props.group_id
					}
				);
				if (response.data.relationExists) {
					setUserType(response.data.relationExists[0].user_type);
					setRelation(response.data.relationExists[0].id);
				} else {
					setUserType("non-member");
				}
			}
		};
		fetchDataUserType();
	}, [token, props.group_id, loggedInUser, userType]);

	async function joinGroup(e) {
		e.preventDefault();
		// setLoading(true);
		if (token) {
			const result = await axiosWithAuth([token]).post(`/groups_users`, {
				user_id: loggedInUser.id,
				group_id: props.group_id,
				user_type: "member"
			});
			if (result.data.newGroupUsers) {
				setUserType("member");
			}
		}
		// setLoading(false);
	}

	async function joinGroupInvite(e) {
		e.preventDefault();
		// setLoading(true);
		if (token) {
			const result = await axiosWithAuth([token]).put(
				`/groups_users/${relation}`,
				{
					user_id: loggedInUser.id,
					group_id: props.group_id,
					user_type: "member"
				}
			);
			if (result.data.updated) {
				setUserType("member");
			}
		}
		// setLoading(false);
	}

	async function leaveGroup(e) {
		e.preventDefault();
		// setLoading(true);
		if (token) {
			const result = await axiosWithAuth([token]).delete(
				`/groups_users/${relation}`
			);
			if (
				result.data.message === "The user to group pairing has been deleted."
			) {
				setUserType("non-member");
			}
		}
		// setLoading(false);
	}

	// Test functions to change status to invite or admin
	// async function invite(e) {
	// 	e.preventDefault();
	// 	// setLoading(true);
	// 	if (token) {
	// 		const result = await axiosWithAuth([token]).put(
	// 			`/groups_users/${relation}`,
	// 			{
	// 				user_id: loggedInUser.id,
	// 				group_id: props.group_id,
	// 				user_type: "invited"
	// 			}
	// 		);
	// 		if (result.data.updated) {
	// 			setUserType("invited");
	// 		}
	// 	}
	// 	// setLoading(false);
	// }

	// async function admin(e) {
	// 	e.preventDefault();
	// 	// setLoading(true);
	// 	if (token) {
	// 		const result = await axiosWithAuth([token]).put(
	// 			`/groups_users/${relation}`,
	// 			{
	// 				user_id: loggedInUser.id,
	// 				group_id: props.group_id,
	// 				user_type: "admin"
	// 			}
	// 		);
	// 		if (result.data.updated) {
	// 			setUserType("admin");
	// 		}
	// 	}
	// 	// setLoading(false);
	// }

	return (
		<GroupMemberStatus>
			{userType && (
				<>
					{userType === "admin" && (
						<>
							<Membership>Admin</Membership>
							<Button onClick={e => leaveGroup(e)}>Leave</Button>
						</>
					)}
					{userType === "invited" && (
						<>
							<Membership>Invited</Membership>
							<Button onClick={e => joinGroupInvite(e)}>Join</Button>
						</>
					)}
					{userType === "member" && (
						<>
							<Membership>Member</Membership>
							<Button onClick={e => leaveGroup(e)}>Leave</Button>
							{/* Test buttons to change status to invite or admin */}
							{/* <button onClick={e => invite(e)}>Invite</button>
							<button onClick={e => admin(e)}>Admin</button> */}
						</>
					)}
				</>
			)}
			{userType === "non-member" && (
				<>
					<NotMember>Holder</NotMember>
					<Button onClick={e => joinGroup(e)}>Join</Button>
				</>
			)}
		</GroupMemberStatus>
	);
};

const GroupMemberStatus = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

const Membership = styled.div`
  margin: 4% auto;
  width: 80%;  
  color: grey;
  border: 1px solid grey
  border-radius: 10%;
`;

const NotMember = styled.div`
	margin: 4% auto;
	width: 80%;
	color: white;
`;

const Button = styled.div`
	margin: 4% auto;
	width: 80%;
	color: #f2f2f2;
	border-radius: 10%;
	background-color: #5eaeff;
	padding: 1% 0;
`;

export default MembershipStatus;
