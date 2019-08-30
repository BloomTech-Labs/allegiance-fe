import React from 'react'
import { Button } from 'semantic-ui-react'
import styled from 'styled-components'
import { useAuth0 } from "./auth/react-auth0-wrapper";

const Landing = () => {
    const { loginWithRedirect } = useAuth0();
    return (
        <LandingContainer>
            <Headers>Welcome to Allegiance</Headers>
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
        background-color: black;
        color: white;
        height: 100vh;
        margin-top: -15%;
        align-items: center;`

const Headers = styled.h1`
        width: 75%;
        font-size: 3rem;`

const ButtonHolder = styled.div`
        display: flex;
        flex-direction: column;
        width: 50%;`

export default Landing;