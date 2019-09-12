import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import useGetToken from "../utils/useGetToken";

import PostCard from "./PostCard";
import PostForm from "./PostForm";

import styled from "styled-components";
import MatUiPostCard from "./MatUiPostCard";

const PostsContainer = props => {
  // Fetches Auth0 token for axios call
  const [token] = useGetToken();

  const loggedInPosts = useSelector(state => state.userReducer.loggedInPosts);
  const [posts, setPosts] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const id = props.groupId;
      if (token) {
        const posts = await axiosWithAuth([token]).get(`/posts/group/${id}`);
        console.log("%c Posts List", "color: orange; font-weight: bold;");
        console.log(posts.data);
        setPosts(posts.data.postsLoaded);
        setSubmitted(false);
      }
    };

    fetchData();
  }, [token, submitted]);

  const deletePost = async postId => {
    const post = await axiosWithAuth([token]).delete(`/posts/${postId}`);
    if (post) {
      setSubmitted(true);
    }
  };
  return (
    <PostsWrapper>
      <PostListContainer>
        {posts.map(post => {
          return (
            // <PostCard
            //   post={post}
            //   key={post.id}
            //   deletePost={deletePost}
            //   setSubmitted={setSubmitted}
            // />
            <MatUiPostCard
              post={post}
              key={post.id}
              deletePost={deletePost}
              setSubmitted={setSubmitted}
            />
          );
        })}
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
`;
const PostsWrapper = styled.div`
  background-color: #dee4e7;
`;

export default PostsContainer;
