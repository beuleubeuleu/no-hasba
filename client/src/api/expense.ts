import axios from "axios";

export const fetchAllExpense = (idgroup:string) => {
  try {
    return axios.get(`/api/${idgroup}/expense`).then((response) => response.data.expenses)
  } catch (err) {
    console.error(err)
  }
}