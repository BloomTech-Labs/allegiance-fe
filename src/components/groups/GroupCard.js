import React from "react";
import { Image, Card } from "semantic-ui-react";

import styled from "styled-components";

const GroupCard = props => {
  return (
    <GroupCardContainer>
      {/* <CardInfo>{props.group.group_name}</CardInfo> */}
      <Card
        size="small"
        header={props.group.group_name}
        meta="Group"
        image={props.group.image}
      />
      {/* <ImageCard src={props.group.image} /> */}
    </GroupCardContainer>
  );
};

const GroupCardContainer = styled.div`
  display: flex;
  justify-content: center;
  //   width: 65%;
  //   height: 6vh;
  margin-bottom: 3%;
`;

const ImageCard = styled(Image)`
  display: flex;
`;

// const CardInfo = styled.div`
//   display: flex;
//   align-content: center;
// `;

export default GroupCard;
