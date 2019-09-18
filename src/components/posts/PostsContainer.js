import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import useGetToken from "../utils/useGetToken";
import styled from "styled-components";
import { Paper } from "@material-ui/core";

import PostForm from "./PostForm";
import PostCard from "./PostCard";

const PostsContainer = props => {
  // Fetches Auth0 token for axios call
  const [token] = useGetToken();
  const [posts, setPosts] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const id = props.groupId;
      if (token)
        try {
          const posts = await axiosWithAuth([token]).get(`/posts/group/${id}`);
          setPosts(posts.data.postsLoaded.sort((a, b) => a.id - b.id));
          setSubmitted(false);
        } catch {
          setPosts([]);
          setSubmitted(false);
        }
    };
    fetchData();
  }, [token, submitted, props.groupId]);

  return (
    <PostsWrapper>
      <PostListContainer>
        {posts.length > 0 ? (
          posts.map(post => {
            return (
              <PostCard post={post} key={post.id} setSubmitted={setSubmitted} />
            );
          })
        ) : (
          <PaperContainer elevation={20}>
            <h2>Nobody has posted yet!</h2>
          </PaperContainer>
        )}
      </PostListContainer>
      <PostForm setSubmitted={setSubmitted} groupId={props.groupId} />
    </PostsWrapper>
  );
};

const PostListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #dee4e7;
  padding-bottom: 15%;
`;
const PostsWrapper = styled.div`
  background-color: #dee4e7;
`;
const PaperContainer = styled(Paper)`
  padding: 3.5rem;
`;

export default PostsContainer;
