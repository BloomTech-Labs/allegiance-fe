import React from "react";
import { Link } from "react-router-dom";
import { Image, Popup, Icon } from "semantic-ui-react";
import styled from "styled-components";

const MyAllegianceGroups = props => {
	console.log(props);
	return (
		<LogoHolder>
			{props.name === "groups" && (
				<Link to="/creategroup">
					<Popup
						content="Create a Group"
						trigger={<Icon size="large" name="plus square" circular />}
					/>
				</Link>
			)}
			{props.content.map(item => (
				<LogoBox key={item.id}>
					<Popup
						content={item.name}
						trigger={<Image src={item.image} size="tiny" circular bordered />}
					/>
					<Nickname>{item.nickname ? item.nickname : null}</Nickname>
				</LogoBox>
			))}
		</LogoHolder>
	);
};

const LogoHolder = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
`;

const LogoBox = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 1%;
`;

const Nickname = styled.p`
	font-size: 0.8rem;
	font-weight: bold;
	margin-top: 10%;
`;

export default MyAllegianceGroups;
