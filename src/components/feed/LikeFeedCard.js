import React from "react";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  card: {
    width: "80%",
    marginTop: 15,
    marginBottom: 15
  }
});

const LikeFeedCard = props => {
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
    tag
  } = props.activity;

  return (
    <LikeCardDiv>
      {props.activity.tag === "postLike" && (
        <Card className={classes.card}>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {liker_name} liked {poster_name}'s post...
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {post_content}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              See Post
            </Button>
            <Button size="small" color="primary">
              Learn More
            </Button>
          </CardActions>
        </Card>
      )}

      {props.activity.tag === "replyLike" && (
        <Card className={classes.card}>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {liker_name} liked {poster_name}'s reply...
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {post_content}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              See Post
            </Button>
            <Button size="small" color="primary">
              Learn More
            </Button>
          </CardActions>
        </Card>
      )}
    </LikeCardDiv>
  );
};

const LikeCardDiv = styled.div`
  display: flex;
  justify-content: center;
`;

export default LikeFeedCard;
