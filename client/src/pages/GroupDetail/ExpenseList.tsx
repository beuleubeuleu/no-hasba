import React, { useEffect, useState } from "react";
import expenseType                    from "../../types/expenseType";
import { fetchAllExpense }            from "../../api/expense";

type expenseListProps = {
  idGroup: string
}
const ExpenseList = ({ idGroup }: expenseListProps) => {
  const [expenses, setExpenses] = useState<expenseType[]>([])

  const getAllExpenses = async (id: string) => {
    const expenses = await fetchAllExpense(id)
    setExpenses(expenses)
  }

  useEffect(() => {
    return () => {
      getAllExpenses(idGroup)
    };
  }, []);


  return (
      <ul>
        { expenses.map(exp => <li
            key={ exp.id }> { `${ exp.name } ${ exp.contributor } ${ exp.amount } ${ exp.beneficiaries.map(beneficary => beneficary) }` }</li>) }
      </ul>
  );
};

export default ExpenseList;
