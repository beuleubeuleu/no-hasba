import React, { useEffect, useState }                                      from "react";
import ExpenseType                                                         from "../types/expenseType";
import { fetchBeneficiariesFromExpenseId, fetchContributorsFromExpenseId } from "../api/users";
import userType                                                            from "../types/userType";

type expenseProps = {
  exp: ExpenseType,
  usersDict: { [id: number]: userType }
}

const Expense = ({ exp, usersDict }: expenseProps) => {
  const [contributors, setContributors] = useState<number[]>([]);
  const [beneficiaries, setBeneficiaries] = useState<number[]>([]);

  const getContributors = async (id: number) => {
    const contributors = await fetchContributorsFromExpenseId(id)
    const listOfContributorsId = contributors.map((contributor: any) => contributor.user_id)
    setContributors(listOfContributorsId)
  }

  const getBeneficiaries = async (id: number) => {
    const beneficiaries = await fetchBeneficiariesFromExpenseId(id)
    const listOfBeneficiariesId = beneficiaries.map((bene: any) => bene.user_id)
    setBeneficiaries(listOfBeneficiariesId)
  }

  useEffect(() => {
    getContributors(exp.id)
    getBeneficiaries(exp.id)
  }, [exp.id]);

  return (
      <li className="table-row" key={ exp.id }>
        <div className="col col-1" data-label="Name">{ exp.name }</div>
        <div className="col col-2" data-label="Amount">{ exp.amount }€</div>
        <div className="col col-3" data-label="Contributors">
          { contributors.map(contributor => (
              <>
                { usersDict[contributor].name }
              </>
          )) }
        </div>
        <div className="col col-4" data-label="Beneficiaries">
          { beneficiaries.map(bene => (
              <>
                { usersDict[bene].name } <br/>
              </>
          )) }
        </div>
      </li>
  );
};

export default Expense