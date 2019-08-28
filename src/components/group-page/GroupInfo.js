import React from "react";
import { Image } from "semantic-ui-react";
import styled from "styled-components";

const GroupInfo = props => {
  console.log("GROUP", props.group);

  return (
    <GroupInfoDiv>
      <ImageDiv src={props.group.image} size="small" circular bordered />
      <h1 className="h1">{props.group.group_name}</h1>
      <h3>{props.group.privacy_setting}</h3>
    </GroupInfoDiv>
  );
};

const GroupInfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
`;
const ImageDiv = styled(Image)`
  align-self: center;
`;

export default GroupInfo;
