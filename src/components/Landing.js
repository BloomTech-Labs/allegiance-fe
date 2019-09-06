import React from 'react'
import { Button, Image } from 'semantic-ui-react'
import styled from 'styled-components'
import { useAuth0 } from "./auth/react-auth0-wrapper";
import Logo from "../assets/Logo.png"
import LandingImage from "../assets/LandingImage.jpg"

const Landing = () => {
    const { loginWithRedirect } = useAuth0();
    return (
        <LandingContainer>
            <LogoHolder>
                <Image src={Logo} size='small' />
                <h1>ALLEGIANCE</h1>
            </LogoHolder>
            <Headers>The social network for sports fans</Headers>
            <ButtonHolder>
                <Button
                    color='red'
                    content='Get Started' />
                <Button
                    content='Sign In'
                    onClick={() => loginWithRedirect({})}
                    style={{ border: 'none', backgroundColor: 'black', color: 'white' }} />
            </ButtonHolder>
        </LandingContainer>
    )
}

const LandingContainer = styled.div`
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        background-image: linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.5)), url(${LandingImage});
        background-size: cover;
        color: white;
        height: 100vh;
        margin-top: -15%;
        margin-bottom: -15%;
        align-items: center;`

const LogoHolder = styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;`


const Headers = styled.h1`
        width: 75%;
        font-size: 3rem;`

const ButtonHolder = styled.div`
        display: flex;
        flex-direction: column;
        width: 50%;`

export default Landing;