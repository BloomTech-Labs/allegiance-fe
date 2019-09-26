import React, { useState, useEffect, useRef, createRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { VIEW_REPLIES } from "../../reducers/navReducer";

import styled from "styled-components";
import { Loader } from "semantic-ui-react";
import { green } from "@material-ui/core/colors";
import { TextField, Fab } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import { Add, VerticalAlignBottom } from "@material-ui/icons/";
import { Mixpanel } from "../analytics/Mixpanel"


import { axiosWithAuth } from "../utils/axiosWithAuth";
import useGetToken from "../utils/useGetToken";
import useForm from "../utils/useForm";

import PostCard from "../posts/PostCard";
import ReplyCard from "./ReplyCard";

const ReplyContainer = props => {
	const [post, setPost] = useState();
	const [submitted, setSubmitted] = useState(false);
	const id = props.match.params.id;

	const userId = useSelector(state => state.userReducer.loggedInUser.id);

	const dispatch = useDispatch();

	// useForm custom hook and set timeout custom hook
	const { values, setValues, handleChange, handleSubmit } = useForm(
		submitReply
	);
	// Fetches Auth0 token for axios call
	const [token] = useGetToken();

	useEffect(() => {
		// Fetch group related data
		const fetchData = async () => {
			if (token) {
				try {
					const response = await axiosWithAuth([token]).get(`/posts/${id}`);
					setPost(response.data.postLoaded);
					const groupId = response.data.postLoaded.group_id;
					setSubmitted(false);
					dispatch({ type: VIEW_REPLIES, payload: groupId });
				} catch {
					dispatch({ type: VIEW_REPLIES, payload: 0 });
				}
			}
		};
		fetchData();
	}, [token, id, submitted, dispatch]);

	// callback function to handle submit
	async function submitReply(e) {
		const post = await axiosWithAuth([token]).post(`/replies/post/${id}`, {
			user_id: userId,
			post_id: id,
			reply_content: values.reply_content
		});
		if (post.data.reply) {
			setValues("");
			setSubmitted(true);
			Mixpanel.activity(userId, 'Reply Successfully Created.')
		}
	}

	// Material UI
	const primary = green[500];
	const useStyles = makeStyles(theme => ({
		textField: {
			marginLeft: theme.spacing(1),
			marginRight: theme.spacing(1),
			backgroundColor: "white"
		},
		root: {
			background: primary,
			margin: theme.spacing(1)
		},
		button: {
			marginTop: 10,
			height: 30,
			width: 30
		}
	}));

	const classes = useStyles();

	// CreateRef for scrolling from Links
	const replyRefs = post
		? post.replies.reduce((acc, value) => {
			acc[value.id] = createRef();
			return acc;
		}, {})
		: null;

	// On component mount, if a replyNumber is received from props, scroll the reply into view
	useEffect(
		() => {
			if (props.location.replyNumber && replyRefs !== null) {
				let yCoordinate;
				const scrollRef = () => {
					// Subtract 50 px to account for padding top from top nav bar
					const yOffset = -50;
					window.scrollTo({
						top: yCoordinate + yOffset,
						behavior: "smooth"
					});
				};

				// Set ycoord to position of reply using replyNumber from props
				yCoordinate =
					replyRefs[props.location.replyNumber].current.getBoundingClientRect()
						.top + window.pageYOffset;

				scrollRef();
				// Set replyNumber to null to prevent re-render and scrollRef() when typing
				props.location.replyNumber = null;
			}
		}
		// No dependency array included as scrollRef render should only occur once (upon navigation from feed or notification)
	);

	// Create ref and scrollToBottom function to allow scroll to bottom button
	const repliesEndRef = useRef(null);
	const scrollToBottom = () => {
		if (repliesEndRef.current)
			repliesEndRef.current.scrollIntoView({ behavior: "smooth" });
	};

	// Obtain groups the user has a relation to, check for membership after post is loaded
	const userGroups = useSelector(state => state.userReducer.loggedInGroups);

	if (!post) {
		return (
			<Loader active size="large">
				Loading
			</Loader>
		);
	}

	// Checking to see if current user is a member of current group
	const currentUserType = userGroups.find(group => group.id === post.group_id);
	// If they are undefined, we set membership to a string so we don't get an error
	let membership;
	if (currentUserType === undefined) {
		membership = "non-member";
	} else {
		membership = currentUserType.user_type;
	}

	// Sort replies by id (which is chronological)
	const sortedReplies = post.replies.sort((a, b) => a.id - b.id);

	return (
		<ReplyViewContainer>
			<PostCard post={post} setSubmitted={setSubmitted} />

			<ReplyCardsContainer>
				{sortedReplies.map(reply => {
					return (
						<div ref={replyRefs[reply.id]} key={reply.id}>
							<ReplyCard
								reply={reply}
								setSubmitted={setSubmitted}
								post={post}
							/>
						</div>
					);
				})}
			</ReplyCardsContainer>

			<div ref={repliesEndRef} />

			{(membership === "admin" || membership === "member") && (
				<ContainerBottom>
					<DownNav>
						<VerticalAlignBottom
							className={classes.button}
							onClick={scrollToBottom}
						/>
					</DownNav>
					<ReplyForm onSubmit={handleSubmit}>
						<InputDiv>
							<TextField
								id="outlined-textarea"
								required
								label="Reply to post"
								placeholder="Reply..."
								multiline
								fullWidth
								className={classes.textField}
								margin="normal"
								variant="outlined"
								onChange={handleChange}
								name="reply_content"
								value={values.reply_content || ""}
							/>
						</InputDiv>
						<Fab
							classes={{ root: classes.root }}
							type="submit"
							aria-label="Reply"
						>
							<Add />
						</Fab>
					</ReplyForm>
				</ContainerBottom>
			)}
		</ReplyViewContainer>
	);
};

const ReplyViewContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: #dee4e7;
	min-height: 87vh;
	justify-content: flex-start;
`;
const ReplyCardsContainer = styled.div`
	width: 100%;
	height: 100%;
	padding-bottom: 18%;
`;
const ContainerBottom = styled.div`
	display: flex;
	position: fixed;
	bottom: 6.5%;
	width: 100%;
	align-items: center;
	justify-content: center;
	background-color: #dee4e7;
`;
const DownNav = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	width: 10%;
`;

const ReplyForm = styled.form`
display: flex;
flex-direction: row;
justify-content: center;
width: 100%;
background-color: #dee4e7;
align-items: center;
`

const InputDiv = styled.div`
width: 75%;
margin-right: 10px;
`

export default ReplyContainer;
