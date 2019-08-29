import React from "react";
import { useSelector } from "react-redux";
import { Image, Icon, Modal, Popup } from "semantic-ui-react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import MyAllegianceGroups from "./MyAllegianceGroups";

const Profile = props => {
	const loggedInUser = useSelector(state => state.userReducer.loggedInUser);
	const loggedInGroups = useSelector(state => state.userReducer.loggedInGroups);
	const loggedInAllegiances = useSelector(
		state => state.userReducer.loggedInAllegiances
	);
	const loggedInPosts = useSelector(state => state.userReducer.loggedInPosts);

	return (
		<ProfileContainer>
			<div>
				<Banner>
					<BannerImage src={loggedInUser.banner_image} fluid />
				</Banner>
				<ImageCrop>
					<ProfileImage src={loggedInUser.image} alt="Profile" />
				</ImageCrop>
				<InfoHolder>
					<Name>
						<h1>{`${loggedInUser.first_name} ${loggedInUser.last_name}`}</h1>
						{props.match.url === "/profile" ? (
							<Link to="/makeprofile">
								<Icon name="edit outline" />
							</Link>
						) : null}
					</Name>
					<p>{loggedInUser.bio}</p>
					<div>
						<H3>MY ALLEGIANCES</H3>
						<AllegianceHolder>
							<MyAllegianceGroups content={loggedInAllegiances} />
						</AllegianceHolder>
					</div>
					<>
						<GroupTitleHolder>
							<H3>MY GROUPS</H3>
							<Link to="/creategroup">
								<Popup
									content="Create a Group"
									trigger={<Icon name="plus square" size="small" />}
								/>
							</Link>
						</GroupTitleHolder>
						<div>
							<MyAllegianceGroups content={loggedInGroups} />
						</div>
					</>
					<ImageHolder>
						<Modal
							closeIcon
							trigger={
								<UserImage
									src="https://react.semantic-ui.com/images/wireframe/image.png"
									rounded
									size="tiny"
								/>
							}
						>
							<Modal.Content image>
								<Image
									wrapped
									src="https://react.semantic-ui.com/images/wireframe/image.png"
								/>
							</Modal.Content>
						</Modal>
						<Modal
							closeIcon
							trigger={
								<UserImage
									src="https://react.semantic-ui.com/images/wireframe/image.png"
									rounded
									size="tiny"
								/>
							}
						>
							<Modal.Content image>
								<Image
									wrapped
									src="https://react.semantic-ui.com/images/wireframe/image.png"
								/>
							</Modal.Content>
						</Modal>
					</ImageHolder>
				</InfoHolder>
				<div>
					<PostHeader>
						<H3>POSTS</H3>
						<H3 style={{ color: "lightgrey" }} onClick={() => console.log(10)}>
							{" "}
							MANAGE POSTS
						</H3>
					</PostHeader>
					<div>
						{loggedInPosts ? (
							loggedInPosts
						) : (
							<NoPosts>You haven't posted yet!</NoPosts>
						)}
					</div>
				</div>
			</div>
		</ProfileContainer>
	);
};

const ProfileContainer = styled.div`
	display: flex;
	justify-content: center;
	margin-top: -4.5%;
`;

const Banner = styled.div`
	border-bottom: 10px solid black;
`;

const BannerImage = styled(Image)`
	height: 225px !important;
	object-fit: cover;
`;

const InfoHolder = styled.div`
	margin-top: 5%;
	padding-bottom: 1rem;
	border-bottom: 0.5px solid lightgray;
`;

const Name = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
`;

const ImageCrop = styled.div`
	width: 150px;
	height: 150px;
	position: relative;
	overflow: hidden;
	border-radius: 50%;
	border: 1px solid white;
	margin-top: -8rem;
	margin-left: auto;
	margin-right: auto;
	background-color: white;
`;
const ProfileImage = styled.img`
	display: inline;
	margin-left: -25%; //centers the image
	height: 100%;
	width: auto;
	max-width: none !important;
`;

const AllegianceHolder = styled.div`
	margin: auto;
`;

const GroupTitleHolder = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	h3 {
		margin: 0 1%;
	}
`;

const H3 = styled.h3`
	font-size: 1rem;
	font-weight: bold;
	margin-top: 0;
	margin-bottom: 0;
`;

const ImageHolder = styled.div`
	display: flex;
	flex-direction: row;
	margin-left: 3%;
`;

const UserImage = styled(Image)`
	margin-left: 1%;
`;

const PostHeader = styled.div`
				display: flex;
				flex-direction: row;
				justify-content: space-between
				align-items: center;
				margin-left: 5%;
				margin-right: 5%;
				margin-top: .5rem;`;

const NoPosts = styled.p`
	color: lightgrey;
	font-weight: bold;
	font-size: 1rem;
`;

export default Profile;
