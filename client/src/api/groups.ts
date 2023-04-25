import axios from "axios";

export const getGroups = () => {
  try {
    return axios.get("/api/all").then((response) => response.data.groups)
  } catch (err) {
    console.error(err)
  }
}

export const getOneGroup = (id:string) => {
  try {
    return axios.get(`/api/${id}`).then((response) => response.data.group)
  } catch (err) {
    console.error(err)
  }
}

export const createGroup = (body:{name: string, username: string, description: string}) => {
  try {
    return axios.post("/api", body).then((response) => response.data)
  }catch (err) {
    console.error(err)
  }
}