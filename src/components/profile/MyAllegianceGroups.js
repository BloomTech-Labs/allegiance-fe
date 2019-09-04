import React from "react";
import { Popup, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const MyAllegianceGroups = props => {
	return (
		<LogoHolder>
			{props.type === 'groups'
				? <div style={{ margin: '1%' }}>
					<Link to={`/creategroup`}>
						<Popup
							content={'Create a Group'}
							trigger={<Icon name='plus' size='big' circular inverted color='blue' style={{ fontSize: '2.86rem' }} />}
						/>
					</Link>
				</div>
				: null}
			{props.content.map(item => (
				<div key={item.id} style={{ margin: '1%' }}>
					<Link to={`/group/${item.id}`}>
						<Popup
							content={item.name}
							trigger={<GroupLogo src={item.image} />}
						/>
					</Link>
					<Nickname>{item.acronym ? item.acronym : null}</Nickname>
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
	  };
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
	`

export default MyAllegianceGroups;
