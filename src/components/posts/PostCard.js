import React from "react";

import { Icon } from "semantic-ui-react";

const PostCard = props => {
  return (
    <div>
      {props.post.post_content}{" "}
      <Icon
        name="trash alternate"
        color="red"
        onClick={() => props.deletePost(props.post.id)}
      />
    </div>
  );
};

export default PostCard;
