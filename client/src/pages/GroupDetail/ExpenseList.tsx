import React, { useEffect, useState } from "react";
import expenseType                    from "../../types/expenseType";
import { fetchAllExpense }            from "../../api/expense";
import "./ExpenseList.css"

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
      <ul className="responsive-table">
        <li className="table-header">
          <div className="col col-1">Nom</div>
          <div className="col col-2">Montant</div>
          <div className="col col-3">S'est fait Hasba</div>
          <div className="col col-4">Beneficiaires</div>
        </li>
        { expenses.map(exp =>
            <li className="table-row" key={exp.id}>
              <div className="col col-1" data-label="Name">{ exp.name }</div>
              <div className="col col-2" data-label="Amount">{ exp.amount }€</div>
              <div className="col col-3" data-label="Contributors">To Do</div>
              <div className="col col-4" data-label="Beneficiaries">To Do</div>
            </li>
        ) }
      </ul>
  );
};

export default ExpenseList;
