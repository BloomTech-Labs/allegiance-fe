import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import useGetToken from "../utils/useGetToken";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { Loader } from "semantic-ui-react";
import ContentFeedCard from "./ContentFeedCard";
import LikeFeedCard from "./LikeFeedCard";

const Feed = () => {
  const [feed, setFeed] = useState();
  const userGroups = useSelector(state => state.userReducer.loggedInGroups);

  // Fetches Auth0 token for axios call
  const [token] = useGetToken();

  useEffect(() => {
    // Fetch feed related data
    const mappedGroupIds = userGroups.map(group => {
      return group.id;
    });
    const fetchData = async () => {
      if (token) {
        try {
          const response = await axiosWithAuth([token]).post(`/feed`, {
            group_id: mappedGroupIds,
            interval: 48
          });
          console.log("res.data", response.data);
          setFeed(response.data.allActivity);
        } catch {}
      }
    };
    fetchData();
  }, [token, userGroups]);

  useEffect(() => {
    return () => {
      console.log("cleaned up");
    };
  }, []);

  if (!feed) {
    return (
      <Loader active size="large">
        Loading
      </Loader>
    );
  }

  return (
    <div>
      {feed.map(activity => {
        return (
          <FeedContainer>
            {(activity.tag === "post" || activity.tag === "reply") && (
              <ContentFeedCard activity={activity} />
            )}
            {(activity.tag === "postLike" || activity.tag === "replyLike") && (
              <LikeFeedCard activity={activity} />
            )}
          </FeedContainer>
        );
      })}
    </div>
  );
};

const FeedContainer = styled.div``;

export default Feed;
