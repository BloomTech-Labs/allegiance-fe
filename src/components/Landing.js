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

// const Landing = () => {
//   const { loginWithRedirect } = useAuth0()
//   return (
//     <LandingContainer>
//       <LogoHolder>
//         <Image src={Logo2} size='small' alt={'Logo'} />
//         <h1>ALLEGIANCE</h1>
//       </LogoHolder>
//       <Body>
//         <H1>The social network for sports fans</H1>
//       </Body>
//       <ButtonHolder>
//         <Button1 onClick={() => loginWithRedirect({})}>Sign In</Button1>
//       </ButtonHolder>
//     </LandingContainer>
//   )
// }

// const LandingContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: space-evenly;
//   background-size: cover;
//   color: white;
//   height: 100vh;
//   margin-top: -11%;
//   margin-bottom: -12%;
//   align-items: center;
//   border: 1px solid red;
// `

// const LogoHolder = styled.div`
//   margin-top: 100px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `

// const Body = styled.div`
//   background-image: linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.5)),
//     url(${LandingImage});
//   background-size: cover;
// `

// const H1 = styled.h1`
//   width: 75%;
//   font-size: 3rem;
// `

// const ButtonHolder = styled.div`
//   display: flex;
//   justify-content: center;
//   width: 50%;
// `

// const Button1 = styled.button`
//   background-color: #4267b2;
//   color: white;
//   width: 500px;
//   height: 60px;
//   border-radius: 20px;
//   font-size: 2rem;
//   margin: 3%;
// `

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
  height: 777px;
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
const GlobalStyles = createGlobalStyle`
body {
  <link href="https://fonts.googleapis.com/css?family=Roboto:700&display=swap" rel="stylesheet">
  font-family: 'Roboto', sans-serif;
}
`
const H1 = styled.h1`
  font-size: 1.9rem;
  color: black;
`
const H2 = styled.h2`
  font-size: 2rem;
  color: black;
`
const H3 = styled.h3`
  font-size: 32px;
  color: white;
`
const H4 = styled.h4`
  font-size: 25px;
  color: white;
`
const H5 = styled.h4`
  font-size: 15px;
  color: white;
`
const RegisterBtn = styled.button`
  height: 68px;
  z-index: 1
  width: 163px;
  color: white;
  background: #4483cd;
  font-size: 20px;
  font-family: 'Roboto', sans-serif;
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
