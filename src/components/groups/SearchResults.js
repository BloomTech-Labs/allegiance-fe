import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Mixpanel } from "../analytics/Mixpanel";

import styled from "styled-components";
import { device } from "../../styled/device";
import "../../App.scss";

// Need to refine search so it doesn't return every result, cap at x number initially
const SearchResults = props => {
	// Fetches user information from Redux
	const loggedInUser = useSelector(state => state.userReducer.loggedInUser);
	const mixpanelCheck = () =>
		Mixpanel.activity(loggedInUser.id, "Visited Group Using Search");

	return (
		<ResultsContainer>
			{/* bring activeSuggestion number from SearchBar, format entry with suggestion-active class */}
			{props.results.map((group, index) => {
				let className;
				if (index === props.activeSuggestion) {
					className = "suggestion-active";
				}
				return (
					// onClick or enter key calls fillSearch from SearchBar

					<Link
						to={`/group/${group.id}`}
						key={group.id}
						onClick={() => mixpanelCheck()}
					>
						<div className={`single-result ${className}`}>
							<ResultImage src={group.image} />{" "}
							<ResultName className="result-info">
								{group.group_name}
							</ResultName>
						</div>
					</Link>
				);
			})}
		</ResultsContainer>
	);
};

const ResultsContainer = styled.div`
display: flex;
    width: 95.5%;
    flex-direction: column;
    position: absolute;
    z-index: 1;
    background-color: white;
    margin-top: 18.5%;
    .suggestion-active {
      background-color: lightgoldenrodyellow;
    }
    .single-result {
      display: flex;
      align-self: center;
      justify-content: space-between;
      padding: 0 5%;
      text-decoration: none;
      width: 100%;
      border: 1px solid black;
      height: 8vh;
      &:hover {
        background-color: lightgoldenrodyellow;
      }
      .result-info {
        display: flex;
        align-self: center;
        font-size: 2vh;
      }
`;
const ResultImage = styled.img`
	width: auto;
	height: 85%;
	border-radius: 50%;
	@media ${device.tablet} {
		max-width: 10%;
	}
`;
const ResultName = styled.div`
	color: black;
`;

export default SearchResults;
