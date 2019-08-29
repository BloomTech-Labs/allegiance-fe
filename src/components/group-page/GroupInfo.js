import React from "react";
import { Image, Icon } from "semantic-ui-react";
import styled from "styled-components";

import MembershipStatus from "./MembershipStatus";

const GroupInfo = props => {
  console.log("GROUP", props.group);

  return (
    <GroupInfoDiv>
      <ImageDiv src={props.group.image} size="tiny" circular bordered />
      <InfoDiv>
        <h1 className="h1">{props.group.group_name}</h1>
        <h3>
          {props.group.privacy_setting}
          {"   "}
          {props.group.privacy_setting === "private" ? (
            <Icon name="lock" />
          ) : (
            <Icon name="lock open" />
          )}{" "}
          {props.members.length} Members
        </h3>

        <MembershipStatus userType={props.userType} />
      </InfoDiv>
    </GroupInfoDiv>
  );
};

const GroupInfoDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 0 auto;
`;
const ImageDiv = styled(Image)`
  align-self: center;
`;
const InfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  h1 {
    font-size: 1.45rem;
    margin: 0 auto;
  }
  h3 {
    font-size: 1.2rem;
    margin 0 auto;
  }
`;

export default GroupInfo;
