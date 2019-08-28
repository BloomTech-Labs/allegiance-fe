import React from "react";
import { Link } from "react-router-dom";

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
          <div key={group.id} className={`single-result ${className}`}>
            <Link to={`/group/${group.id}`}>
              {group.group_name} {group.location}
            </Link>
          </div>
        );
      })}
    </div>
  );
};
export default SearchResults;
