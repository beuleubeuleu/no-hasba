import axios from "axios";

export const fetchGroupUsers = (idgroup:string) => {
  try {
    return axios.get(`/api/${idgroup}/users`).then((response) => response.data.users)
  } catch (err) {
    console.error(err)
  }
}