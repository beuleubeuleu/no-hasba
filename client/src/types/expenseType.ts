import userType from "./userType";

type expenseType = {
  id: number,
  name: string,
  amount: number,
  contributor: userType,
  beneficiaries: userType[]
}

export default expenseType