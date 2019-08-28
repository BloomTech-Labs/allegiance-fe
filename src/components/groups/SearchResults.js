import React from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";
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

          <Link to={`/group/${group.id}`}>
            <div key={group.id} className={`single-result ${className}`}>
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
  max-width: 15%;
  height: auto;
  border-radius: 50%;
`;

export default SearchResults;
