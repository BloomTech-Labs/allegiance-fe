import axios from "axios";

export const axiosWithAuth = token => {
    return axios.create({
        headers: {
            Authorization: `Bearer ${token}`
        },
        //baseURL: "http://localhost:5000/api"
        baseURL: "https://labs15-allegiance-staging.herokuapp.com/api"
        // baseURL: "https://labs15-allegiance.herokuapp.com/api"
    });
};
