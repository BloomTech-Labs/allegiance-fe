import React from 'react'
import { useSelector } from 'react-redux'
import { Image } from 'semantic-ui-react'
import styled from "styled-components"
import MyAllegianceGroups from "./MyAllegianceGroups"

const Profile = () => {
	const loggedInUser = useSelector(state => state.userReducer.loggedInUser);
	const loggedInGroups = useSelector(state => state.userReducer.loggedInGroups);
	const loggedInAllegiances = useSelector(state => state.userReducer.loggedInAllegiances);

	return (
		<ProfileContainer>
			<div>
				<div>
					<Image src={loggedInUser.banner_image} fluid />
				</div>
				<ImageCrop>
					<ProfileImage src={loggedInUser.image} centered />
				</ImageCrop>
				<h1>{`${loggedInUser.first_name} ${loggedInUser.last_name}`}</h1>
				<p>{loggedInUser.bio}</p>
				<div>
					<div>
						<h3>My Allegiances</h3>
						<AllegianceHolder><MyAllegianceGroups content={loggedInAllegiances} /></AllegianceHolder>
					</div>
					<div>
						<h3>My Groups</h3>
						<div><MyAllegianceGroups content={loggedInGroups} /></div>
					</div>
				</div>
				<div>
					{/*Posts*/}
				</div>
			</div>
		</ProfileContainer>
	);
};

const ProfileContainer = styled.div`
display: flex;
justify-content: center;
margin-top: 5rem;
`

const ImageCrop = styled.div`
width: 150px;
height: 150px;
position: relative;
overflow: hidden;
border-radius: 50%;
margin-top: -15%;
margin-left: auto;
margin-right: auto;
`
const ProfileImage = styled(Image)`
display: inline;
margin: 0 auto;
margin-left: -25%; //centers the image
height: 100%;
width: auto;
`

const AllegianceHolder = styled.div`
display: flex;
justify-content: center;`

export default Profile;
