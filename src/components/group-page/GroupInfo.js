import React from "react";
import { Image, Icon } from "semantic-ui-react";
import styled from "styled-components";

import MembershipStatus from "./MembershipStatus";

const GroupInfo = props => {
	console.log("GROUP", props.group);

	// define privacy variable for reusable formatting
	const privacy = props.group.privacy_setting;

	return (
		<GroupInfoDiv>
			<ImageDiv>
				<GroupImage
					src={props.group.image}
					size="tiny"
					circular
					bordered
					style={{ borderColor: "black" }}
				/>
				<MembershipStatus userType={props.userType} />
			</ImageDiv>
			<InfoDiv>
				<h1>{props.group.group_name}</h1>
				<h2>{props.group.description}</h2>
				<h3>
					{props.group.privacy_setting === "private" ? (
						<Icon name="lock" />
					) : (
						<Icon name="unlock" />
					)}
					{privacy ? privacy.charAt(0).toUpperCase() + privacy.slice(1) : null}{" "}
					group - {props.members.length} fans
				</h3>
			</InfoDiv>
		</GroupInfoDiv>
	);
};

const GroupInfoDiv = styled.div`
	display: flex;
	flex-direction: row;
	margin: 0 4% 4% 4%;
	justify-content: space-around;
`;
const ImageDiv = styled.div`
	display: flex;
	flex-direction: column;
`;
const GroupImage = styled(Image)`
	align-self: center;
	width: 35%;
	margin: 0 0 1% 0;
`;
const InfoDiv = styled.div`
	display: flex;
	flex-direction: column;
	width: 57%;
	margin: 0 4% 4% 4%;
  justify-content: center;
	h1 {
		font-size: 1.45rem;
		text-align: left;
		margin: 0 0 2% 0;
  }
  h2 {
    font-size: 1.45rem;
    color: grey
		text-align: left;
		margin: 0 0 2% 0;
  }
	h3 {
		font-size: 1rem;
		text-align: left;
		margin: 0 0 2% 0;
	}
`;

export default GroupInfo;
