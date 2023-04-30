import React, { useEffect, useState } from "react";
import Expense                        from "./Expense"
import expenseType                    from "../../types/expenseType";
import { fetchAllExpense }            from "../../api/expense";
import "./ExpenseList.css"
import userType                       from "../../types/userType";
import UserType                       from "../../types/userType";

type expenseListProps = {
  idGroup: string,
  usersDict: {[id: number]: UserType}
}
const ExpenseList = ({ idGroup, usersDict }: expenseListProps) => {
  const [expenses, setExpenses] = useState<expenseType[]>([])
  const getAllExpenses = async (id: string) => {
    const expenses = await fetchAllExpense(id)
    setExpenses(() => expenses)
  }

  useEffect(() => {
    return () => {
      getAllExpenses(idGroup)
    };
  }, []);


  return (
      <ul className="responsive-table">
        <li className="table-header">
          <div className="col col-1">Nom</div>
          <div className="col col-2">Montant</div>
          <div className="col col-3">S'est fait Hasba</div>
          <div className="col col-4">Beneficiaires</div>
        </li>
        { expenses.map(exp => <Expense key={exp.id} exp={exp} usersDict={usersDict}/> ) }
      </ul>
  );
};

export default ExpenseList;
