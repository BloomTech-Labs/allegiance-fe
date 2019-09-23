import React from "react";
import { Link } from "react-router-dom";

import Moment from "react-moment";
import moment from "moment";

import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";
import Tooltip from "@material-ui/core/Tooltip";

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
	},
	groupAvatar: {
		marginRight: 15,
		marginLeft: 0,
		height: 20,
		width: 20
	}
});

const LikeFeedCard = props => {
	const classes = useStyles();

	// Destructure props to gain access to keys
	const {
		// note: various other key/value pairs available, see postman documentation
		liker_name,
		liker_image,
		group_id,
		post_id,
		post_content,
		reply_content,
		created_at,
		tag,
		group_image,
		acronym
	} = props.activity;

	// Define moment display
	moment.updateLocale("en", {
		relativeTime: {
			future: "in %s",
			past: "%s ago",
			s: "seconds",
			ss: "%ss",
			m: "a minute",
			mm: "%dm",
			h: "an hour",
			hh: "%dh",
			d: "a day",
			dd: "%dd",
			M: "a month",
			MM: "%dM",
			y: "a year",
			yy: "%dY"
		}
	});

	return (
		<LikeCardDiv>
			<Card className={classes.card}>
				<HeaderDiv>
					<HeaderIcon>
						<ThumbUpOutlinedIcon className={classes.avatar} />
					</HeaderIcon>
					<HeaderContent>
						<Avatar className={classes.headerAvatar} src={liker_image} />
						<p>
							{liker_name} {tag === "postLike" && "liked a post..."}
							{tag === "replyLike" && "liked a reply..."}
						</p>
					</HeaderContent>
					<HeaderTimeStamp>
						<Tooltip title={<Moment format="LLLL">{created_at}</Moment>}>
							<Moment fromNow>{created_at}</Moment>
						</Tooltip>
					</HeaderTimeStamp>
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

const HeaderIcon = styled.div`
	width: 15%;
`;

const HeaderContent = styled.div`
	width: 67%;
	display: flex;
	margin-right: 2%;
	overflow: hidden;
`;

const HeaderTimeStamp = styled.div`
	width: 18%;
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
