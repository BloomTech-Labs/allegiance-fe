import React from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";
import { device } from "../../styled/device";
import "../../App.scss";

// Need to refine search so it doesn't return every result, cap at x number initially
const SearchResults = props => {
  return (
    <div className="results-container">
      {/* bring activeSuggestion number from SearchBar, format entry with suggestion-active class */}
      {props.results.map((group, index) => {
        let className;
        if (index === props.activeSuggestion) {
          className = "suggestion-active";
        }
        return (
          // onClick or enter key calls fillSearch from SearchBar

          <Link to={`/group/${group.id}`} key={group.id}>
            <div className={`single-result ${className}`}>
              <ResultImage src={group.image} />{" "}
              <div className="result-info">{group.group_name}</div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

const ResultImage = styled.img`
  width: auto;
  height: 85%;
  border-radius: 50%;
  @media ${device.tablet} {
    max-width: 10%;
  }
`;

export default SearchResults;
