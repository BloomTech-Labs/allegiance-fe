import React, { createRef } from "react";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import SmsOutlinedIcon from "@material-ui/icons/SmsOutlined";
import indigo from "@material-ui/core/colors/indigo";
import { Link } from "react-router-dom";

import "../../styled/Replies.scss";

const useStyles = makeStyles({
  card: {
    width: "80%",
    marginTop: 15,
    marginBottom: 15
  },
  footer: {
    flexDirection: "space-between"
  },
  groupHeader: {
    paddingLeft: 20,
    paddingRight: 20
  },
  avatar: {
    marginRight: 15,
    marginLeft: 15
  },
  groupAvatar: {
    marginRight: 15,
    marginLeft: 0,
    height: 20,
    width: 20
  },
  headerAvatar: {
    marginRight: 4,
    marginLeft: 0,
    height: 20,
    width: 20
  },
  button: {
    color: "white",
    backgroundColor: "#1B4570"
  },
  content: {
    color: "black",
    fontSize: 18
  }
});

const ContentFeedCard = props => {
  const primary = indigo[700];
  const classes = useStyles();
  const {
    id,
    user_id,
    group_name,
    group_id,
    post_id,
    post_content,
    reply_content,
    created_at,
    updated_at,
    first_name,
    last_name,
    image,
    tag,
    group_image,
    acronym
  } = props.activity;

  const fullName =
    first_name && last_name
      ? first_name.charAt(0).toUpperCase() +
        first_name.slice(1) +
        " " +
        last_name.charAt(0).toUpperCase() +
        last_name.slice(1)
      : null;

  // defining post id for conditional render
  let postId;
  if (tag === "post") {
    postId = id;
  }
  if (tag === "reply") {
    postId = post_id;
  }
  return (
    <CardDiv>
      <Card className={classes.card}>
        <HeaderDiv>
          <SmsOutlinedIcon className={classes.avatar} />
          <Avatar className={classes.headerAvatar} src={image} />
          <p>
            {fullName} {tag === "post" && "created a post..."}{" "}
            {tag === "reply" && "replied..."}{" "}
          </p>
        </HeaderDiv>

        <CardActionArea>
          <CardContent>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className={classes.content}
            >
              {tag === "post" && post_content}{" "}
              {tag === "reply" && reply_content}
            </Typography>
          </CardContent>
        </CardActionArea>
        <Footer>
          <Link to={`/post/${postId}`}>
            <Button variant="contained" size="small" className={classes.button}>
              {tag === "post" && "See Post"} {tag === "reply" && "See Reply"}
            </Button>
          </Link>
          <Link to={`/group/${group_id}`}>
            <GroupFooter>
              <Avatar
                aria-label="recipe"
                className={classes.groupAvatar}
                src={group_image}
              />
              <p>{acronym}</p>
            </GroupFooter>
          </Link>
        </Footer>
      </Card>
    </CardDiv>
  );
};

const CardDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const HeaderDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 0.4rem 0;
  text-align: left;
  p {
    color: gray;
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 6% 2% 4%;
`;

const GroupFooter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    color: black;
  }
`;

export default ContentFeedCard;
