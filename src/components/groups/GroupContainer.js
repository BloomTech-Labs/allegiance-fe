import React from "react";
import { useSelector } from "react-redux";
import { Icon, Popup, Divider } from "semantic-ui-react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import GroupList from "./GroupList";
import SearchBar from "./SearchBar";
import MyAllegianceGroups from "../profile/MyAllegianceGroups";
import NearbyGroups from "./NearbyGroups";

function GroupContainer() {
	const loggedInGroups = useSelector(state => state.userReducer.loggedInGroups);

	return (
		<div>
			<SearchBar />
			<Divider />
			<MyGroups>
				<GroupTitleHolder>
					<H3>MY GROUPS</H3>
					<Link to='/createGroup'  >
						<Popup
							content="Create a Group"
							trigger={<Icon name="plus square" size="small" />}
						/>
					</Link>
				</GroupTitleHolder>
				<>
					<MyAllegianceGroups content={loggedInGroups} />
				</>
			</MyGroups>
			<Divider />
			<NearbyGroups />
			<Divider />
			<GroupList />
		</div>
	);
}
export default GroupContainer;

const MyGroups = styled.div`
  margin: 2% 5%;
`;

const GroupTitleHolder = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  h3 {
    margin: 0 1%;
  }
`;

const H3 = styled.h3`
  font-size: 1rem;
  font-weight: bold;
  margin: 1% 0;
`;
