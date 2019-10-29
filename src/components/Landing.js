import React from 'react'
import { Button, Image } from 'semantic-ui-react'
import styled from 'styled-components'
import { createGlobalStyle } from 'styled-components'
import { useAuth0 } from './auth/react-auth0-wrapper'
import { withRouter } from 'react-router-dom'

import SearchBar from './groups/SearchBar'

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import Logo2 from '../assets/landing/Logo2.png'
import LandingImage from '../assets/landing/LandingImage.png'
import DoSportsTogether from '../assets/landing/DoSportsTogether.png'
import instagram from '../assets/landing/instagram.png'
import twitter from '../assets/landing/twitter.png'
import facebook from '../assets/landing/facebook.png'
import NewWay from '../assets/landing/NewWay.png'
import SportsBetter from '../assets/landing/SportsBetter.png'
import SportIcons from '../assets/landing/SportIcons.png'

const Landing = props => {
  const { loginWithRedirect } = useAuth0()
  return (
    <LandingDiv>
      <Top>
        <LeftTop>
          <Image src={Logo2} size='110px' alt={'Logo'} />
          <Image src={DoSportsTogether} size='145px' alt={'Do'} />
        </LeftTop>
        <RightTop>
          <Image
            path='/instagram'
            onClick={() => {
              window.location.href = 'https://instagram.com'
            }}
            src={instagram}
            size='8px'
            alt={'Insta'}
          />
          <Image
            path='/twitter'
            onClick={() => {
              window.location.href = 'https://twitter.com'
            }}
            src={twitter}
            size='8px'
            alt={'Twitter'}
          />
          <Image
            path='/facebook'
            onClick={() => {
              window.location.href = 'https://facebook.com'
            }}
            src={facebook}
            size='8px'
            alt={'Facebook'}
          />
        </RightTop>
      </Top>
      <Middle>
        <LeftMiddle>
          <SearchBar {...props} />
        </LeftMiddle>
        <RightMiddle>
          <RegisterBtn onClick={() => loginWithRedirect({})}>
            Register/Log In
          </RegisterBtn>
        </RightMiddle>
      </Middle>
      <Bottom>
        <LeftBottom1>
          <Image src={NewWay} size='463px' alt={'New'} />
        </LeftBottom1>
        <LeftBottom2>
          <Image src={SportsBetter} size='391px' alt={'Sports'} />
        </LeftBottom2>
        <LeftBottom3>
          <Image src={SportIcons} size='383px' alt={'Sport_Icons'} />
        </LeftBottom3>
        <LeftBottom4>
          <JoinBtn onClick={() => loginWithRedirect({})}>
            Join a group today.
          </JoinBtn>
        </LeftBottom4>
      </Bottom>
      <Footer>
        <FooterLeft>
          <H1>About</H1>
        </FooterLeft>
        <FooterRight>
          <H1>© 2019 Allegiance</H1>
        </FooterRight>
      </Footer>
    </LandingDiv>
  )
}

const LandingDiv = styled.div`
  // border: 1px solid red;
  background-color: white;
  overflow: hidden;
`
const Top = styled.div`
  // border: 1px solid blue;
  display: flex;
  justify-content: space-between;
  height: 67px;
`
const LeftTop = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  // border: 1px solid purple;
  width: 400px;
  margin-left: 5px;
`
const RightTop = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 26px;
  // margin-right: 20px;
  width: 190px;
  height: 15px;
`
const Middle = styled.div`
  display: flex;
  justify-content: space-between;
  height: 67px;
  @media (max-width: 500px) {
    height: 100px;
    align-items: center;
    flex-direction: column-reverse;
  }
`
const LeftMiddle = styled.div`
  display: flex;
  align-items: center;
  width: 480px;
  height: 37px;
  margin-left: 24px;
  margin-top: 15px;
`
const RightMiddle = styled.div`
  display: flex;
  margin-right: 0px;
`
const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  background-image: url(${LandingImage});
  background-size: cover;
  max-height: 489px;
  @media (max-width: 500px) {
  }
`
const LeftBottom1 = styled.div`
  margin-top: 140px;
  margin-left: 49px;
  width: 463px;
`
const LeftBottom2 = styled.div`
  margin-top: 34px;
  margin-left: 49px;
  width: 500px;
`
const LeftBottom3 = styled.div`
  margin-top: 20px;
  margin-left: 49px;
`
const LeftBottom4 = styled.div`
  margin-top: 30px;
  margin-left: 49px;
`
const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 43px;
  align-items: center;
`
const FooterLeft = styled.div`
  display: flex;
  margin-left: 24px;
`
const FooterRight = styled.div`
  display: flex;
  margin-right: 24px;
`
const GlobalStyles = createGlobalStyle`
body {
  <link href="https://fonts.googleapis.com/css?family=Roboto:700&display=swap" rel="stylesheet">
  font-family: 'Roboto', sans-serif;
}
`
const H1 = styled.h1`
  font-size: 1rem;
  color: grey;
`
const RegisterBtn = styled.button`
  height: 68px;
  z-index: 1
  width: 163px;
  color: white;
  background: #4483cd;
  font-size: 20px;
  font-family: 'Roboto', sans-serif;
  @media (max-width: 500px) {
    width: 450px;
    height: 45px;
    margin-left: 25px;
    margin-right: 25px;
  }
`
const JoinBtn = styled.button`
  height: 54px;
  width: 192px;
  color: white;
  background: #ed5959;
  font-size: 16px;
  font-family: 'Roboto', sans-serif;
`
export default withRouter(Landing)
