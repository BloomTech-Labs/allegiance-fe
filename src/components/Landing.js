import React from 'react'
import { Image } from 'semantic-ui-react'
import styled from 'styled-components'
import { useAuth0 } from './auth/react-auth0-wrapper'
import { withRouter } from 'react-router-dom'
import NavSearch from './nav/NavSearch'
import LandingImage from '../assets/landing/LandingImage.png'
import Logo from '../assets/landing/allegiance-logo.svg'
import { Button } from 'semantic-ui-react'
import { Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const Landing = props => {
  const { loginWithRedirect } = useAuth0()
  return (
    <LandingDiv>
      <div style={{ height: '100%' }}>
        <Top>
          {/* <Title>ALLEGIANCE</Title> */}
          <LeftTop>
            <Image src={Logo} size='small' alt={'Logo'} />
            <TagLine>
              <p style={{ color: 'black' }}>
                Do Sports. <span style={{ fontWeight: 'bold' }}>Together</span>
              </p>
            </TagLine>
          </LeftTop>
          <RightTop>
            <Link to='https://www.instagram.com/allegiance17'>
              <Icon size='large' name='instagram' />
            </Link>
            <Link to='https://twitter.com/Allegiance_17'>
              <Icon size='large' name='twitter' />
            </Link>
            <Link to='https://www.facebook.com/pg/Allegiance17-10708230737587/about/?ref=page_internal'>
              <Icon size='large' name='facebook' />
            </Link>
          </RightTop>
        </Top>
        <Middle>
          <LeftMiddle>
            <NavSearch {...props} />
          </LeftMiddle>
          <RightMiddle>
            <LandingButton
              style={{ margin: '5px' }}
              onClick={() => loginWithRedirect({})}
            >
              Register/Log In
            </LandingButton>
          </RightMiddle>
        </Middle>
        <Bottom>
          <LeftBottom1>
            <P>
              A fresh and engaging way for you to connect with other fans
              because...
            </P>
          </LeftBottom1>
          <LeftBottom2>
            <PBold>SPORTS ARE BETTER TOGETHER!</PBold>
          </LeftBottom2>
          <LeftBottom3>
            <SportIconsWrapper>
              <Icon name='football ball' />
              <Icon name='soccer' />
              <Icon name='baseball ball' />
              <Icon name='basketball ball' />
              <Icon name='volleyball ball' />
              <Icon name='hockey puck' />
            </SportIconsWrapper>
            {/* <Image src={SportIcons} size='large' alt={'Sport_Icons'} /> */}
          </LeftBottom3>
          <LeftBottom4>
            <LandingButton onClick={() => loginWithRedirect({})}>
              Join a group today.
            </LandingButton>
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
      </div>
    </LandingDiv>
  )
}

const TagLine = styled.div`
  @media (max-width: 500px) {
    display: none;
  }
`

const SportIconsWrapper = styled.div`
  color: white;
  min-width: 325px;
  width: 50%;
  max-width: 400px;
  display: flex;
  justify-content: space-between;
  font-size: 1.8rem !important;
  @media (max-width: 500px) {
    margin: auto;
  }
`

const P = styled.p`
  color: white;
  font-size: 2.5rem;
  line-height: 3.5rem;
`
const PBold = styled.p`
  color: white;
  font-size: 3rem;
  font-weight: bold;
  line-height: 3.5rem;
`

const LandingDiv = styled.div`
  background-color: white;
  height: 100vh;
`
const Top = styled.div`
  display: flex;
  justify-content: space-between;
  height: 67px;
  @media (max-width: 470px) {
    margin-top: 10px;
    align-items: center;
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
  align-items: center;
  margin-top: 26px;
  width: 190px;
  height: 15px;
  @media (max-width: 470px) {
    width: 100%;
    margin-top: 0px;
    font-size: 1.5rem;
  }
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
  margin: 10x 0 5px 0;
`
const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  background-image: url(${LandingImage});
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  height: 80%;
  margin: 0 auto;
  @media (max-width: 500px) {
    text-align: center;
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
  height: 5%;
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

const About = styled.div`
  &:hover {
    transition: all 0.2s ease-in-out;
    transform: scale(1.5);
    cursor: pointer;
  }
`
const LandingButton = styled(Button)`
  color: white !important;
  margin-top: 10px !important;
  font-size: 1.8rem !important;
  background-color: #1a4570 !important;
  :hover {
    background-color: #4483cd !important;
    curser: pointer;
  }
`

export default withRouter(Landing)
