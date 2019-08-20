import React, { useState, useEffect } from "react";
import axios from "axios";

import { Mixpanel } from "./analytics/Mixpanel";

const Test = () => {
	const [data, setData] = useState({ users: [] });

	useEffect(() => {
		Mixpanel.track("Hello mixpanel!");
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			const result = await axios(
				"https://labs15-allegiance.herokuapp.com/users"
			);
			console.log(result);
			setData(result.data);
		};

		fetchData();
	}, []);

	console.log(data);

	return (
		<div>
			{data.users.map(user => (
				<div key={user.id}>
					{user.username}, {user.email}, {user.location}
				</div>
			))}
		</div>
	);
};

export default Test;
