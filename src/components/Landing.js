import React from 'react'
import { Button, Image } from 'semantic-ui-react'
import styled from 'styled-components'
import { useAuth0 } from './auth/react-auth0-wrapper'
import Logo2 from '../assets/Logo2.png'
import LandingImage from '../assets/LandingImage.jpg'

// const Landing = () => {
//   const { loginWithRedirect } = useAuth0()
//   return (
//     <LandingContainer>
//       <LogoHolder>
//         <Image src={Logo} size='small' alt={'Logo'} />
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

const Landing = () => {
  const { loginWithRedirect } = useAuth0()
  return (
    <LandingDiv>
      <Top>
        <LeftTop>
          <Image src={Logo2} size='small' alt={'Logo'} />
          <H1>Do Sports.</H1>
          <H2>Together.</H2>
        </LeftTop>
        <RightTop>
          <H1>twitter, fb, instagram</H1>
        </RightTop>
      </Top>
      <Middle>
        <LeftMiddle>
          <H2>Search</H2>
        </LeftMiddle>
        <RightMiddle>
          <RegisterBtn>Register/Log In</RegisterBtn>
        </RightMiddle>
      </Middle>
      <Bottom>
        <LeftBottom1>
          <H3>
            A new way for you to create communities around your favorite
            teamsand connect with other fans because...
          </H3>
        </LeftBottom1>
        <LeftBottom2>
          <H4>SPORTS ARE BETTER TOGETHER!</H4>
        </LeftBottom2>
        <LeftBottom3>
          <H5>basketball, baseball, soccer, football, hockey, volleyball</H5>
        </LeftBottom3>
        <LeftBottom4>
          <JoinBtn>Join a group today.</JoinBtn>
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
`
const LeftTop = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  // border: 1px solid purple;
  width: 400px;
  margin-top: 20px;
  margin-left: 34px;
`
const RightTop = styled.div`
  display: flex;
  margin-top: 20px;
  margin-right: 20px;
`
const Middle = styled.div`
  // border: 1px solid green;
  display: flex;
  justify-content: space-between;
`
const LeftMiddle = styled.div`
  display: flex;
  align-items: center;
  width: 480px;
  height: 37px
  margin-top: 15px;
  margin-left: 24px;
  border: 1px solid grey;
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
  height: 605px;
`
const LeftBottom1 = styled.div`
  margin-top: 284px;
  margin-left: 49px;
  width: 463px;
`
const LeftBottom2 = styled.div`
  margin-top: 24px;
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
  height: 67px;
  width: 163px;
  color: white;
  background: #4483cd;
`
const JoinBtn = styled.button`
  height: 54px;
  width: 192px;
  color: white;
  background: #ed5959;
  font-size: 15px;
`
export default Landing
