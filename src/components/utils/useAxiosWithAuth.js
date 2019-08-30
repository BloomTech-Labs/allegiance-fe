import axios from "axios";
import { useState } from "react"
import { useAuth0 } from "../auth/react-auth0-wrapper";

const useAxiosWithAuth = () => {

	const [token, setToken] = useState()
	const { getTokenSilently } = useAuth0();

	if (!token) {
		const fetchToken = async () => {
			const result = await getTokenSilently()
			setToken(result)
		}
		fetchToken()
	}

	const axiosWithAuth = () => {
		return axios.create({
			headers: {
				Authorization: `Bearer ${[token]}`
			},
			baseURL: process.env.REACT_APP_BASEURL
		});
	}

	return {
		axiosWithAuth
	}
};

export default useAxiosWithAuth