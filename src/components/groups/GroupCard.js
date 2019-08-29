import React from "react";
import { Link } from "react-router-dom";
import { Divider, Icon } from "semantic-ui-react";

import styled from "styled-components";

const GroupCard = props => {
  return (
    <GroupInfoCard>
      <Link to={`/group/${props.group.id}`}>
        <CardImage src={props.group.image} alt="GroupAvatar" />
        <Divider />
        <h4>
          <b>{props.group.group_name}</b>
        </h4>
        <p>{props.group.privacy_setting.toUpperCase()}</p>
        <Divider />
        <p>
          <Icon name="users" /> {props.group.members.length} members
        </p>
      </Link>
    </GroupInfoCard>
  );
};

const GroupInfoCard = styled.div`
  display: flex;
  margin: 2%;
  max-width: 40%;
  box-shadow: 3px 4px 8px 3px rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  border-radius: 5%;
  &:hover {
    box-shadow: 5px 8px 16px 5px rgba(0, 0, 0, 0.2);
  }
`;

const CardImage = styled.img`
  max-width: 80%;
  height: auto;
`;

export default GroupCard;
