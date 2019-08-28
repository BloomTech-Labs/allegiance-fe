import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import useGetToken from "../utils/useGetToken";

import { useSelector } from "react-redux";

import GroupInfo from "./GroupInfo";
import MembershipStatus from "./MembershipStatus";
import GroupAllegiances from "./GroupAllegiances";

import styled from "styled-components";
import { Form, Button, TextArea, Divider } from "semantic-ui-react";

const GroupPage = props => {
	const [token] = useGetToken();
	const id = props.match.params.id;

	const [group, setGroup] = useState({});
	const [allegiances, setAllegiances] = useState([]);
	const [userType, setUserType] = useState();

	const loggedInUser = useSelector(state => state.userReducer.loggedInUser);

	useEffect(() => {
		const fetchData = async () => {
			const response = await axiosWithAuth([token]).get(`/groups/${id}`);
			setGroup(response.data.group);
			setAllegiances(response.data.allegiances);
			console.log("data:", response.data);
		};
		const fetchDataUserType = async () => {
			const response = await axiosWithAuth([token]).post(
				`/groups_users/search`,
				{
					user_id: loggedInUser.id,
					group_id: id
				}
			);
			if (response.data.relationExists) {
				setUserType(response.data.relationExists[0].user_type);
			} else {
				setUserType("non-member");
			}
		};
		fetchData();
		fetchDataUserType();
	}, [token, id, loggedInUser]);

	return (
		<GroupPageContainer>
			<GroupInfo group={group} />
			<MembershipStatus userType={userType} />
			<GroupAllegiances allegiances={allegiances} />
			<Divider />

			<PostsContainer>{/* posts go here */}</PostsContainer>

			{/* Form for adding posts to group */}
			<Form>
				<FormContainer>
					<Form.Field
						control={TextArea}
						label="Post"
						placeholder="write a post to the group..."
					/>
					<Form.Field control={Button}>Submitpost</Form.Field>
				</FormContainer>
			</Form>
		</GroupPageContainer>
	);
};

const GroupPageContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin-top: 5rem;
	width: 100%;
`;

const FormContainer = styled(Form)`
	margin-top: 5vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

const PostsContainer = styled.div`
	display: flex;
`;

export default GroupPage;
