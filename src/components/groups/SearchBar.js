import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import useGetToken from "../utils/useGetToken";
import useForm from "../utils/useForm";
import useDebounce from "../utils/useDebounce";

import "../../App.scss";

import SearchResults from "./SearchResults";

const SearchBar = () => {
  // useStates for results and is searching status
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  // token for accessing authentication required backend routes
  const [token] = useGetToken();
  // useForm custom hook and set timeout custom hook
  const { values, setValues, handleChange, handleSubmit } = useForm(fillSearch);
  const debouncedSearchTerm = useDebounce(values.group_name, 1000);
  // useStates for handling up and down arrow key selections
  const [activeSuggestion, setSuggestion] = useState(0);

  // callback function to handle submit
  function fillSearch(e, group) {
    if (group) {
      setValues({ group_name: group.group_name });
    }
  }

  // Handle up and down arrow keys
  const onKeyDown = e => {
    // User pressed the enter key
    if (e.keyCode === 13) {
      setSuggestion(0);
      setValues(results[activeSuggestion]);
    }
    // User pressed the up arrow
    if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }
      setSuggestion(activeSuggestion - 1);
    }
    // User pressed the down arrow
    else if (e.keyCode === 40) {
      if (activeSuggestion + 1 === results.length) {
        return;
      }
      setSuggestion(activeSuggestion + 1);
    }
  };

  //useEffect to grab groups that are searched for from the backend (column and row filters for only group results that are being searched)
  useEffect(() => {
    const fetchData = async () => {
      const groups = await axiosWithAuth([token]).post(
        "/groups/search",
        // "http://localhost:5000/api/groups",
        {
          column: "group_name",
          row: values.group_name
        }
      );
      return groups;
    };
    // If empty string in search immediately set results array to blank
    if (values.group_name === "") setResults([]);
    // Make sure we have a value (user has entered something in input)
    else if (debouncedSearchTerm) {
      // Set isSearching state
      setIsSearching(true);
      // Fire off our API call
      fetchData().then(res => {
        // Set searching state
        setIsSearching(false);
        // Set results state
        setResults(res.data.groupByFilter);
      });
    }
  }, [values, token, debouncedSearchTerm]);

  console.log(values);
  console.log(results);
  console.log(isSearching); // Can use this to determine loading animations

  return (
    <div className="search-form">
      {/* form to handle group search text from user */}
      <form className="form-items" onSubmit={handleSubmit}>
        <label className="label">Search</label>
        <input
          onChange={handleChange}
          onKeyDown={onKeyDown}
          name="group_name"
          id="group_name"
          placeholder="Enter Group Name"
          value={values.group_name || ""}
          type="search"
        />
      </form>
      {/* search results component handles display of results */}
      <SearchResults
        results={results}
        fillSearch={fillSearch}
        activeSuggestion={activeSuggestion}
      />
    </div>
  );
};

export default SearchBar;
