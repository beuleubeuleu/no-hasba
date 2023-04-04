import axios from "axios";

export const getGroups = () => {
  try {
    return axios.get("/group/all").then((response) => response.data.groups)
  } catch (err) {
    console.error(err)
  }
}