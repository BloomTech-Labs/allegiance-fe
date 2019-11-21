import React from 'react';
import styled from 'styled-components'

import NotFoundImage from '../assets/undraw/notFound.svg'

const NotFound = () => {
  return (
    <Wrapper>
      <Header>Oops! This page doesn't exist.</Header>
      <Img src={NotFoundImage} />
    </Wrapper>)
}

const Wrapper = styled.div`
  display: flex
  flex-direction: column;
  align-items: center;
  margin-top: 25px;
`

const Header = styled.h1`
  text-align: center
  margin-top: 25px
  margin-bottom: 25px
  font-size: 3.5rem;
  font-weight: 700;
`

const Img = styled.img`
  height: 50%;
`

export default NotFound;