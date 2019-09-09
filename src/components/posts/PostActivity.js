import React from "react";

import styled from "styled-components";
import FavoriteRoundedIcon from "@material-ui/icons/FavoriteRounded";

const PostActivity = props => {
  console.log(props.post);
  return (
    <ActivityContainer>
      <FavoriteRoundedIcon />
      <h3>{props.post.user_id} Likes</h3>
    </ActivityContainer>
  );
};

const ActivityContainer = styled.div`
  //   display: flex;
  //   flex-direction: row;
  //   width: 100%;
`;

export default PostActivity;
