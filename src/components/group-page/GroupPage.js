import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import useGetToken from "../utils/useGetToken";
import { useDispatch } from "react-redux";
import { VIEW_GROUP } from "../../reducers/navReducer";

import GroupInfo from "./GroupInfo";
import PostsContainer from "../posts/PostsContainer";

import styled from "styled-components";
import { Paper } from "@material-ui/core";

const GroupPage = props => {
	// Fetches Auth0 token for axios call
	const [token] = useGetToken();

	// Defines id to be group id from params
	const id = props.match.params.id;

	const [group, setGroup] = useState({});
	const [allegiances, setAllegiances] = useState([]);
	const [members, setMembers] = useState([]);

	const dispatch = useDispatch();

	useEffect(() => {
		// Fetch group related data
		const fetchData = async () => {
			if (token) {
				try {
					const response = await axiosWithAuth([token]).get(`/groups/${id}`);
					setGroup(response.data.group);
					setAllegiances(response.data.allegiances);
					setMembers(response.data.members);
					const groupId = response.data.group.id;
					dispatch({ type: VIEW_GROUP, payload: groupId });
				} catch {
					dispatch({ type: VIEW_GROUP, payload: 0 });
				}
			}
		};
		fetchData();
	}, [token, id, dispatch]);

	if (Object.keys(group).length === 0) {
		return <div>Loading Group...</div>;
	}

	return (
		<GroupPageContainer>
			<PaperContainer elevation={3}>
				<GroupInfo group={group} members={members} allegiances={allegiances} />
			</PaperContainer>
			<PostsContainer groupId={group.id} members={members} />
		</GroupPageContainer>
	);
};

const GroupPageContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 100%;
	background-color: #dee4e7;
	min-height: 87vh;
	justify-content: flex-start;
`;

const PaperContainer = styled(Paper)`
	margin-bottom: 5%;
`;

export default GroupPage;
