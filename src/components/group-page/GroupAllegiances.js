import React from "react";
import { Image } from "semantic-ui-react";

import styled from "styled-components";

const GroupInfo = props => {
	return (
		<Allegiances>
			<h3>Groups Allegiances</h3>
			<LogoHolder>
				{props.allegiances.map(al => (
					<div key={al.id}>
						<Image src={al.image} size="tiny" circular />
						{al.name}
					</div>
				))}
			</LogoHolder>
		</Allegiances>
	);
};

const Allegiances = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
`;
const LogoHolder = styled.div`
	display: flex;
	flexdirection: row;
	justify-content: center;
`;

export default GroupInfo;
