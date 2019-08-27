import React from "react";

import styled from "styled-components";

const GroupInfo = props => {
  return (
    <GroupInfoDiv>
      <h1 className="h1">{props.group.group_name}</h1>
      <h3>{props.group.privacy_setting}</h3>
    </GroupInfoDiv>
  );
};

const GroupInfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export default GroupInfo;
