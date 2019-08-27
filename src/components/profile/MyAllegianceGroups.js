import React from 'react'
import { Image, Popup } from 'semantic-ui-react'
import styled from "styled-components"


const MyAllegianceGroups = props => {

    return (
        <LogoHolder>
            {props.content.map(item => (
                <div key={item.id}>
                    <Popup content={item.name} trigger={<Image src={item.image} size="mini" circular />} />
                    {item.nickname}
                </div>
            ))}
        </LogoHolder>
    )
}

const LogoHolder = styled.div`
display: flex;
flexDirection: row;`

export default MyAllegianceGroups