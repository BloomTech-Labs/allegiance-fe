import axios from "axios";

export const axiosWithAuth = (token) => {
    return axios.create({
        headers: {
            Authorization: `Bearer ${token}`
        },
        baseURL: "https://labs15-allegiance.herokuapp.com/"
    })
}