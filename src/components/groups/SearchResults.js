import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { device } from 'styled/device'

const SearchResults = props => {
  // filtering search results to not include hidden groups
  const filteredResults = props.results
  if (props.loading) {
    return <h1>Loading</h1>
  }
  if (filteredResults.length === 0) {
    return (
      <ResultsContainer>
        <h1>No results found</h1>
      </ResultsContainer>
    )
  }
  return (
    <ResultsContainer>
      {filteredResults.map((group, index) => {
        let className
        if (index === props.activeSuggestion) {
          className = 'suggestion-active'
        }
        return (
          <Link to={`/group/${group.id}`} key={group.id}>
            <div className={`single-result ${className}`}>
              <ResultImage src={group.image} alt={'Group Image'} />{' '}
              <ResultName className='result-info'>
                {group.group_name}
              </ResultName>
            </div>
          </Link>
        )
      })}
    </ResultsContainer>
  )
}

const ResultsContainer = styled.div`
  display: flex;
  width: 48.5vw;
  @media (max-width: 800px) {
    width: 89.4vw;
  }
  flex-direction: column;
  position: absolute;
  z-index: 1;
  background-color: white;
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.5);
  border-radius: 20px;
  margin-top: 65px;
  .suggestion-active {
    background-color: white;
  }
  .single-result {
    display: flex;
    align-self: center;
    align-items: center;
    justify-content: space-between;
    padding: 0 5%;
    text-decoration: none;
    width: 100%;
    height: 8vh;
    &:hover {
      background-color: #add8e6;
    }
  }
  .result-info {
    display: flex;
    align-self: center;
    font-size: 2vh;
  }
`
const ResultImage = styled.img`
  object-fit: cover;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  @media ${device.tablet} {
    max-width: 10%;
  }
`
const ResultName = styled.div`
  color: black;
`

export default SearchResults
