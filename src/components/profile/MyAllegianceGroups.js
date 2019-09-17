import React from "react";
import { Popup, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Mixpanel } from "../analytics/Mixpanel"

const MyAllegianceGroups = props => {

	const mixpanelCheck = () => props.type === "group" ? Mixpanel.activity(props.userId, 'Visited Group From Profile Page') : null

	return (
		<LogoHolder>
			{props.type === "group" && (
				<div style={{ margin: "1%" }}>
					<Link to={`/creategroup`}>
						<Popup content={"Create a Group"}
							trigger={
								<Icon
									name="plus"
									size="big"
									circular
									inverted
									color="blue"
									style={{ fontSize: "2.86rem" }} />} />
					</Link>
				</div>
			)}
			{props.content.map(item => (
				<div key={item.id} style={{ margin: "1%" }}>
					<Link to={`/${props.type}/${item.id}`} onClick={() => mixpanelCheck()}>
						<Popup
							content={item.name}
							trigger={<GroupLogo src={item.image} />}
						/>
					</Link>
					<Nickname>{item.acronym && item.acronym}</Nickname>
				</div>
			))}
		</LogoHolder>
	);
};

const LogoHolder = styled.div`
	width: 98%;
	display: flex;
	flex-wrap: nowrap;
	overflow-x: auto;
	margin-left: 1%;
	&::-webkit-scrollbar {
		display: none;
	}
`;

const Nickname = styled.p`
	font-size: 0.8rem;
	font-weight: bold;
	margin-top: 10%;
`;

const GroupLogo = styled.img`
	border-color: black;
	object-fit: cover;
	width: 80px;
	height: 80px;
	border-radius: 50%;
	border: 1px solid black;
	flex: 0 0 auto;
	box-shadow: 3px 4px 8px 3px rgba(0, 0, 0, 0.2);
`;

export default MyAllegianceGroups;
