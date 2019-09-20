import React from "react";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";
import indigo from "@material-ui/core/colors/indigo";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  card: {
    width: "80%",
    marginTop: 15,
    marginBottom: 15
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
  button: {
    color: "white",
    backgroundColor: "#1B4570"
  },
  content: {
    color: "black",
    fontSize: 18
  },
  headerAvatar: {
    marginRight: 4,
    marginLeft: 0,
    height: 20,
    width: 20
  }
});

const LikeFeedCard = props => {
  const primary = indigo[700];
  const classes = useStyles();
  const {
    id,
    liker_id,
    poster_id,
    poster_name,
    liker_name,
    poster_image,
    liker_image,
    group_id,
    post_id,
    post_content,
    reply_content,
    created_at,
    tag,
    group_name,
    group_image,
    acronym
  } = props.activity;

  return (
    <LikeCardDiv>
      <Card className={classes.card}>
        <HeaderDiv>
          <ThumbUpOutlinedIcon className={classes.avatar} />
          <Avatar className={classes.headerAvatar} src={liker_image} />

          {tag === "postLike" && (
            <p>
              <span>{liker_name}</span> liked a post...
            </p>
          )}
          {tag === "replyLike" && (
            <p>
              <span>{liker_name}</span> liked a reply...
            </p>
          )}
        </HeaderDiv>

        <CardActionArea>
          <CardContent>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className={classes.content}
            >
              {tag === "postLike" && post_content}
              {tag === "replyLike" && reply_content}
            </Typography>
          </CardContent>
        </CardActionArea>
        <Footer>
          <Link to={`/post/${post_id}`}>
            <Button variant="contained" size="small" className={classes.button}>
              {tag === "postLike" && "See Post"}{" "}
              {tag === "replyLike" && "See Reply"}
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
    </LikeCardDiv>
  );
};

const LikeCardDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const HeaderDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  padding-top: 0.4rem;
  text-align: left;
  p {
    color: gray;
    span {
      text-transform: capitalize;
    }
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

export default LikeFeedCard;
