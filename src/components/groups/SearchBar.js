import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import useGetToken from "../utils/useGetToken";
import useForm from "../utils/useForm";
import useDebounce from "../utils/useDebounce";

import "../../App.scss";

import SearchResults from "./SearchResults";

const SearchBar = () => {
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [token] = useGetToken();
  const { values, handleChange, handleSubmit } = useForm();
  const debouncedSearchTerm = useDebounce(values.group_name, 1000);

  useEffect(() => {
    const fetchData = async () => {
      const groups = await axiosWithAuth([token]).post(
        "https://labs15-allegiance-staging.herokuapp.com/api/groups",
        // "http://localhost:5000/api/groups",
        {
          column: "group_name",
          row: values.group_name
        }
      );
      return groups;
    };

    // Make sure we have a value (user has entered something in input)
    if (debouncedSearchTerm) {
      // Set isSearching state
      setIsSearching(true);
      // Fire off our API call
      fetchData().then(res => {
        // Set searching state
        setIsSearching(false);
        // Set results state
        setResults(res.data.groupByFilter);
      });
    } else setResults([]);
  }, [values, token, debouncedSearchTerm]);

  // const handleSubmit = (e, { result }) => {
  // 	e.preventDefault();
  // 	setValue({ value: result.group_name });
  // };

  console.log(values);
  console.log(results);
  console.log(isSearching);

  return (
    <div className="search-form">
      <form className="form-items" onSubmit={handleSubmit}>
        <label className="label">Search</label>
        <input
          onChange={handleChange}
          name="group_name"
          id="group_name"
          placeholder="Enter Group Name"
          value={values.group_name || ""}
          type="text"
        />
      </form>
      <SearchResults results={results} />
    </div>
  );
};

export default SearchBar;
