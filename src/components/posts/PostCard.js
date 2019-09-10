import React from "react";
import { useSelector } from "react-redux";

import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import PostActivity from "./PostActivity";

const PostCard = props => {
  const { first_name, last_name, image, id } = useSelector(
    state => state.userReducer.loggedInUser
  );

  const useStyles = makeStyles({
    avatar: {},
    bigAvatar: {
      width: 60,
      height: 60
    }
  });
  const classes = useStyles();
  return (
    <CardContainer>
      <MemberDiv>
        <Avatar src={image} className={classes.avatar} />
        {/* <Image src={image} avatar /> */}
        <PostMember>
          {/* need to make image specific to poster */}
          <h3>
            {first_name} {last_name}
          </h3>
        </PostMember>
      </MemberDiv>

      <PostContent>
        <PostBubble
          className={props.post.user_id === id ? "my-post" : "your-post"}
        >
          <p>{props.post.post_content}</p>
        </PostBubble>
      </PostContent>
      <PostActivity
        post={props.post}
        setSubmitted={props.setSubmitted}
        deletePost={props.deletePost}
      />
    </CardContainer>
  );
};

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 90%;
  height: 23vh;
  border: 2px solid black;
  margin-bottom: 4%;
  border-radius: 2%;
`;

const MemberDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid black;
  height: 6vh;
  padding-left: 10px;
  h3 {
    padding-left: 10px;
  }
`;
const PostMember = styled.div`
  font-size: 1rem;
  color: black;
`;

const PostContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 9vh;
  p {
    word-break: break-all;
  }
`;

const PostBubble = styled.div``;

export default PostCard;
