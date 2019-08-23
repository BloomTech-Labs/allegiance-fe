import React from "react";

import "../../App.scss";

const SearchResults = props => {
  return (
    <div className="results-container">
      {props.results.map(group => (
        <div key={group.id} className="single-result">
          {group.group_name} {group.location}
        </div>
      ))}
    </div>
  );
};
export default SearchResults;
