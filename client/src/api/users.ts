import axios from "axios";

export const fetchGroupUsers = (idgroup:string) => {
  try {
    return axios.get(`/api/${idgroup}/users`).then((response) => response.data.users)
  } catch (err) {
    console.error(err)
  }
}

export const fetchUserFromId = (idUser:number) => {
  try {
    return axios.get(`/api/users/${idUser}}`).then((response) => response.data.user)
  } catch (err) {
    console.error(err)
  }
}
export const fetchContributorsFromExpenseId = (idExpense:number) => {
  try {
    return axios.get(`/api/expenses/contributors/${idExpense}}`).then((response) => response.data.contributors)
  } catch (err) {
    console.error(err)
  }
}
export const fetchBeneficiariesFromExpenseId = (idExpense:number) => {
  try {
    return axios.get(`/api/expenses/beneficiaries/${idExpense}}`).then((response) => response.data.beneficiaries)
  } catch (err) {
    console.error(err)
  }
}