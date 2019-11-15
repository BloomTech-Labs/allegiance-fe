import React from 'react'
import { Image } from 'semantic-ui-react'
import styled from 'styled-components'
import { useAuth0 } from './auth/react-auth0-wrapper'
import { withRouter } from 'react-router-dom'
import NavSearch from './nav/NavSearch'
import Logo2 from '../assets/landing/Logo2.png'
import LandingImage from '../assets/landing/LandingImage.png'
import DoSportsTogether from '../assets/landing/DoSportsTogether.png'
import instagram from '../assets/landing/instagram.png'
import twitter from '../assets/landing/twitter.png'
import facebook from '../assets/landing/facebook.png'
import NewWay from '../assets/landing/NewWay.png'
import SportsBetter from '../assets/landing/SportsBetter.png'
import SportIcons from '../assets/landing/SportIcons.png'
import Baseball from '../assets/landing/Baseball.jpg'

const Landing = props => {
  const { loginWithRedirect } = useAuth0()
  return (
    <LandingDiv>
      <Top>
        <LeftTop>
          <Image src={Logo2} size='small' alt={'Logo'} />
          <Image src={DoSportsTogether} size='small' alt={'Do'} />
        </LeftTop>
        <RightTop>
          <ImageMini
            path='/instagram'
            onClick={() => {
              window.location.href = 'https://www.instagram.com/allegiance17'
            }}
            src={instagram}
            alt={'Insta'}
          />
          <ImageMini
            path='/twitter'
            onClick={() => {
              window.location.href = 'https://twitter.com/Allegiance_17'
            }}
            src={twitter}
            alt={'Twitter'}
          />
          <ImageMini
            path='/facebook'
            onClick={() => {
              window.location.href =
                'https://www.facebook.com/pg/Allegiance17-107082330737587/about/?ref=page_internal'
            }}
            src={facebook}
            alt={'Facebook'}
          />
        </RightTop>
      </Top>
      <Middle>
        <LeftMiddle>
          <NavSearch {...props} />
        </LeftMiddle>
        <RightMiddle>
          <RegisterBtn onClick={() => loginWithRedirect({})}>
            Register/Log In
          </RegisterBtn>
        </RightMiddle>
      </Middle>
      <Bottom>
        <LeftBottom1>
          <Image src={NewWay} size='large' alt={'New'} />
        </LeftBottom1>
        <LeftBottom2>
          <Image src={SportsBetter} size='large' alt={'Sports'} />
        </LeftBottom2>
        <LeftBottom3>
          <Image src={SportIcons} size='large' alt={'Sport_Icons'} />
        </LeftBottom3>
        <LeftBottom4>
          <JoinBtn onClick={() => loginWithRedirect({})}>
            Join a group today.
          </JoinBtn>
        </LeftBottom4>
      </Bottom>
      <Footer>
        <FooterLeft>
          <About
            onClick={() => {
              window.location.href =
                'https://github.com/Lambda-School-Labs/allegiance-fe'
            }}
          >
            About Us
          </About>
        </FooterLeft>
        <FooterRight>
          <H1>© 2019 Allegiance</H1>
        </FooterRight>
      </Footer>
    </LandingDiv>
  )
}

const LandingDiv = styled.div`
  background-color: white;
`
const Top = styled.div`
  display: flex;
  justify-content: space-between;
  height: 67px;
  @media (max-width: 470px) {
    flex-direction: column;
    height: 100px;
    margin-top: 10px;
  }
`

const LeftTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 400px;
  margin-left: 5px;
  @media (max-width: 470px) {
    flex-direction: column;
    width: 100%;
    margin-left: 0px;
    margin-right: 0px;
  }
`
const RightTop = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 26px;
  width: 190px;
  height: 15px;
`
const Middle = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 800px) {
    align-items: center;
    flex-direction: column-reverse;
    margin: 0px;
  }
`
const LeftMiddle = styled.div`
  display: flex;
  align-items: center;
  width: 480px;
  margin-left: 24px;
  @media (max-width: 800px) {
    justify-content: center;
    margin-left: 0px;
    width: 100%;
  }
  margin-top: 15px;
`
const RightMiddle = styled.div`
  display: flex;
`
const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  background-image: url(${LandingImage});
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  @media (max-width: 700px) {
    background-image: url(${Baseball});
  }
  @media (max-width: 500px) {
    align-items: center;
  }
`
const LeftBottom1 = styled.div`
  margin-top: 140px;
  margin-left: 49px;
  width: 400px;
  @media (max-width: 500px) {
    margin-left: 0px;
    width: 90%;
    margin-top: 100px;
  }
`
const LeftBottom2 = styled.div`
  margin-top: 34px;
  margin-left: 49px;
  width: 500px;
  @media (max-width: 535px) {
    width: 90%;
  }
  @media (max-width: 500px) {
    margin-left: 0px;
    width: 90%;
  }
`
const LeftBottom3 = styled.div`
  margin-top: 20px;
  margin-left: 49px;
  @media (max-width: 500px) {
    margin-left: 0px;
    width: 90%;
  }
`
const LeftBottom4 = styled.div`
  margin-top: 30px;
  margin-left: 49px;
  @media (max-width: 500px) {
    margin-left: 0px;
  }
`
const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 10vh;
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
const H1 = styled.h1`
  font-size: 1rem;
  color: grey;
`
const RegisterBtn = styled.button`
  &:hover {
    background: #ed5959;
    cursor: pointer;
  }

  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.5);
  z-index: 1;
  width: 163px;
  color: white;
  background: #4483cd;
  font-size: 20px;
  font-family: 'Roboto', sans-serif;
  @media (max-width: 800px) {
    width: 90vw;
    height: 45px;
  }
`
const JoinBtn = styled.button`
  &:hover {
    background: #4483cd;
    cursor: pointer;
  }
  height: 54px;
  width: 192px;
  border: none;
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.5);
  color: white;
  background: #ed5959;
  font-size: 16px;
  font-family: 'Roboto', sans-serif;
  @media (max-width: 500px) {
    width: 90%;
  }
`
const ImageMini = styled.img`
  &:hover {
    transition: all 0.2s ease-in-out;

     transform: scale(1.5);
    cursor: pointer;
  }
`
const About = styled.div`
  &:hover {
    transition: all 0.2s ease-in-out;
    transform: scale(1.5);
    cursor: pointer;
  }
`

export default withRouter(Landing)
