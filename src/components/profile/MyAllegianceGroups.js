import React from 'react'
import { Image, Popup } from 'semantic-ui-react'
import styled from "styled-components"


const MyAllegianceGroups = props => {

    return (
        <LogoHolder>
            {props.content.map(item => (
                <LogoBox key={item.id}>
                    <Popup content={item.name} trigger={<Image src={item.image} size="mini" circular bordered />} />
                    <Nickname>{item.nickname ? item.nickname : null}</Nickname>
                </LogoBox>
            ))}
        </LogoHolder>
    )
}

const LogoHolder = styled.div`
display: flex;
flex-direction: row;
justify-content: center;`

const LogoBox = styled.div`
display: flex;
flex-direction: column;
align-items: center;
margin: 1%;`

const Nickname = styled.p`
font-size: .8rem;
font-weight: bold;
margin-top: 10%;`

export default MyAllegianceGroups