import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Icon, Loader } from "semantic-ui-react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import MyAllegianceGroups from "./MyAllegianceGroups";
import axios from "axios"
import useGetToken from "../utils/useGetToken";
import { ENTER_PROFILE } from "../../reducers/userReducer";
import defaultBanner from "../../assets/defaultBanner.jpg";

const Profile = props => {
  const loggedInUser = useSelector(state => state.userReducer.loggedInUser);
  const loggedInGroups = useSelector(state => state.userReducer.loggedInGroups);
  const loggedInAllegiances = useSelector(state => state.userReducer.loggedInAllegiances);
  const loggedInPosts = useSelector(state => state.userReducer.loggedInPosts);
  const dispatch = useDispatch();

  //Fetches Auth0 token for axios call
  const [token] = useGetToken();

  useEffect(() => {
    if (loggedInUser && token) {
      const fetchData = async () => {
        try {
          const result = await axios.post(process.env.REACT_APP_AUTHURL, {
            email: loggedInUser.email
          });
          dispatch({ type: ENTER_PROFILE, payload: result.data.userInfo })
        } catch { console.log("There was an issue retrieving the user's profile.") }
      }

      fetchData();
    }
  }, [loggedInUser, token, dispatch]);

  if (!loggedInUser) {
    return (
      <Loader active size="large">
        Loading
      </Loader>
    );
  }

  return (
    <ProfileContainer>
      <div style={{ maxWidth: "100%" }}>
        <Banner>
          <BannerImage src={loggedInUser.banner_image || defaultBanner} />
        </Banner>
        <ImageCrop>
          {loggedInUser.image
            ? <ProfileImage src={loggedInUser.image} alt="Profile" />
            : <Icon
              name="football ball"
              size="huge"
              circular
              style={{ fontSize: "5.3rem" }} />}
        </ImageCrop>
        <InfoHolder>
          <Name>
            {loggedInUser.first_name && <h1>{`${loggedInUser.first_name} ${loggedInUser.last_name}`}</h1>}
            {props.match.url === "/profile" &&
              <Link to="/makeprofile">
                <Icon name="edit outline" />
              </Link>}
          </Name>
          <p>{loggedInUser.bio}</p>
          <>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
              <H3>MY ALLEGIANCES</H3>
              <Link to="/addallegiance">
                <Icon name="edit outline" color="blue" size="small" style={{ marginBottom: "1.5rem" }} />
              </Link>
            </div>
            <MyAllegianceGroups content={loggedInAllegiances || []} type="allegiance" />
          </>
          <>
            <H3>MY GROUPS</H3>
            <MyAllegianceGroups
              content={loggedInGroups || []}
              type="group" />
          </>
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
            {loggedInPosts ? loggedInPosts : <NoPosts>You haven't posted yet!</NoPosts>}
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
  margin-bottom: 10%;
`;

const Banner = styled.div``;

const BannerImage = styled.img`
width: 100%
border-bottom: 10px solid black;
max-height: 225px;
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
  max-width: none;
`;

const H3 = styled.h3`
  font-size: 1rem;
  font-weight: bold;
  margin-top: 0;
  margin-bottom: 0;
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

//Code for future release
/*					<ImageHolder>
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

						<div>
							<H3>MY ALLEGIANCES</H3>
							<AllegianceHolder>
								<MyAllegianceGroups content={loggedInAllegiances} type={'allegiances'} />
							</AllegianceHolder>
						</div>*/
