import axios from 'axios'

export const axiosWithoutAuth = token => {
  return axios.create({
    baseURL: process.env.REACT_APP_BASEURL,
  })
}
