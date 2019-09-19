import React from "react";
import styled from "styled-components";

const LikeFeedCard = props => {
  return (
    <LikeCardDiv>
      {props.activity.tag === "postLike" && <h1>hi</h1>}

      {props.activity.tag === "replyLike" && <h1>hi</h1>}
    </LikeCardDiv>
  );
};

const LikeCardDiv = styled.div``;

export default LikeFeedCard;
