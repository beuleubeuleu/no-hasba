import axios from "axios";

export const fetchOneGroup = (id:string) => {
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

export const fetchTotalGroupDebt = (id: string) => {
  try {
    return axios.get(`/api/${id}/debt`).then((response) => response.data.groupTotalDebt)
  } catch (err) {
    console.error(err)
  }
}