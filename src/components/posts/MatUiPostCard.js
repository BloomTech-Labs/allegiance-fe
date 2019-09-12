import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import red from "@material-ui/core/colors/red";
import purple from "@material-ui/core/colors/purple";
import avi from "../../assets/walter-avi.png";
import {
  Favorite,
  ModeCommentOutlined,
  DeleteOutline,
  FavoriteBorder
} from "@material-ui/icons";

import { axiosWithAuth } from "../utils/axiosWithAuth";
import useGetToken from "../utils/useGetToken";

import { useSelector } from "react-redux";

export default function MatUiPostCard(props) {
  const {
    first_name,
    last_name,
    image,
    id,
    post_content,
    user_id,
    likes,
    replies
  } = props.post;
  const userId = useSelector(state => state.userReducer.loggedInUser.id);

  const [expanded, setExpanded] = React.useState(false);
  const [token] = useGetToken();
  const postLikeId = likes.find(like => like.user_id === userId);

  const primary = red[600];
  const accent = purple[500];
  const useStyles = makeStyles(theme => ({
    card: {
      width: 400,
      marginBottom: 20
    },
    cardHeader: {
      padding: 0,
      borderBottom: "1px solid lightgray"
    },
    likesCount: {
      paddingLeft: 0,
      paddingRight: 0
    },
    postActivity: {
      justifyContent: "space-between",
      borderTop: "1px solid lightgray",
      padding: 0,
      paddingLeft: 10,
      paddingRight: 20,
      alignItems: "center"
    },
    media: {
      height: 0,
      paddingTop: "56.25%" // 16:9
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest
      })
    },
    expandOpen: {
      transform: "rotate(180deg)"
    },
    avatar: {
      margin: 3,
      width: 60,
      height: 60
    },
    typography: {
      fontSize: 20,
      color: "black"
    },
    likedIcon: {
      margin: 0,
      marginBottom: 3,
      padding: 1,
      color: primary
    },
    unlikedIcon: {
      margin: 0,
      marginBottom: 3,
      padding: 1,
      color: primary
    },
    countIcon: {
      margin: 0,
      marginBottom: 3,
      padding: 1
    }
  }));

  const classes = useStyles();

  async function addLike(e) {
    e.preventDefault();
    const like = await axiosWithAuth([token]).post(`/posts_likes/post/${id}`, {
      user_id: userId,
      post_id: id
    });
    if (like.data.likeResult) {
      props.setSubmitted(true);
    }
  }

  async function unLike(e) {
    e.preventDefault();
    const unLike = await axiosWithAuth([token]).delete(
      `/posts_likes/${postLikeId.id}`
    );
    if (unLike) {
      props.setSubmitted(true);
    }
  }

  return (
    <Card raised className={classes.card}>
      <CardHeader
        className={classes.cardHeader}
        avatar={
          <Avatar src={!image ? avi : image} className={classes.avatar} />
        }
        action={
          userId === user_id && (
            <IconButton
              onClick={() => props.deletePost(id)}
              aria-label="settings"
            >
              <DeleteOutline />
            </IconButton>
          )
          //   CHECK ADMIN STATUS
        }
        title={`${first_name} ${last_name}`}
        titleTypographyProps={{ fontSize: 25 }}
        subheader="September 14, 2016"
      />
      {/* <CardMedia
        className={classes.media}
        image="/static/images/cards/paella.jpg"
        title="Paella dish"
      /> */}
      <CardContent>
        <Typography
          className={classes.typography}
          variant="body1"
          color="textSecondary"
          component="p"
        >
          {post_content}
        </Typography>
      </CardContent>
      <CardActions className={classes.postActivity} disableSpacing>
        {!postLikeId && (
          <div>
            <IconButton aria-label="add to favorites" onClick={addLike}>
              <FavoriteBorder className={classes.unlikedIcon} />
            </IconButton>
            <IconButton className={classes.likesCount}>
              <h4> {likes.length} </h4>
            </IconButton>
          </div>
        )}
        {postLikeId && (
          <div>
            <IconButton aria-label="add to favorites" onClick={unLike}>
              <Favorite className={classes.likedIcon} />
            </IconButton>
            <IconButton className={classes.likesCount}>
              <h4> {likes.length} </h4>
            </IconButton>
          </div>
        )}
        <div>
          <Link to={`/post/${id}`}>
            <IconButton aria-label="share">
              <ModeCommentOutlined />
            </IconButton>
          </Link>
          <IconButton className={classes.likesCount}>
            <h4> {replies.length} </h4>
          </IconButton>
        </div>
      </CardActions>
    </Card>
  );
}
