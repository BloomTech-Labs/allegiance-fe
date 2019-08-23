import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import useGetToken from "../utils/useGetToken";
// import useForm from "../utils/useForm";
// import { Search, Grid } from "semantic-ui-react";

const SearchBar = () => {
    const [data, setData] = useState({ groups: [] });

    const [token] = useGetToken();

    useEffect(() => {
        const fetchData = async () => {
            const groups = await axiosWithAuth([token]).post(
                "https://labs15-allegiance-staging.herokuapp.com/api/groups",
                // "http://localhost:5000/api/groups",
                {
                    column: "group_name",
                    row: ""
                }
            );
            setData({ groups: groups.data.groupByFilter });
        };

        fetchData();
    }, [token]);

    // const [isLoading, setLoading] = useState(false);
    const [results, setResults] = useState([]);
    const [value, setValue] = useState("");
    // const { values, handleChange, handleSubmit } = useForm();

    useEffect(() => {
        const filtered = data.groups.filter(group =>
            group.group_name.toLowerCase().includes(value.toLowerCase())
        );
        setResults(filtered);
    }, [data.groups, value]);

    console.log(results);

    const handleSubmit = (e, { result }) => {
        e.preventDefault();
        setValue({ value: result.group_name });
    };

    const handleChange = e => {
        setValue(e.target.value);
    };

    if (!data.groups) {
        return <div>Loading Groups...</div>;
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Search</label>
                <input
                    onChange={handleChange}
                    name="group_name"
                    id="group_name"
                    placeholder="Enter Group Name"
                    value={value}
                    type="text"
                    required
                />
            </form>
            <div>{results.map(group => group.group_name)}</div>
        </div>
    );
};

export default SearchBar;