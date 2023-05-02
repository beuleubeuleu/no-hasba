import userType                from "../../types/userType";
import { useEffect, useState } from "react";
import { fetchTotalGroupDebt } from "../../api/groups";

type balanceProps = {
  idGroup: string,
  usersDict: { [id: number]: userType }
}

export const Balance = ({ idGroup, usersDict }: balanceProps) => {
  const [totalGroupDebt, setTotalGroupDebt] = useState<{ user: number, debt: number }[]>([]);
  const [calculatedRefunds, setCalculatedRefunds] = useState<{ from: number, to: number, amount: number }[]>([]);

  const getTotalGroupDebt = async (id: string) => {
    try {
      const totalDebt = await fetchTotalGroupDebt(id)
      setTotalGroupDebt(totalDebt.usersDebt)
      setCalculatedRefunds(totalDebt.howToBalance)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getTotalGroupDebt(idGroup)
  }, []);

  return (
      <div>
        faut payer mtn
        <ul>
          { totalGroupDebt.map(debt =>
              <li key={ debt.user }>{ usersDict[debt.user].name } { debt.debt }€</li>)
          }
        </ul>
        c'est comment ca pour payer
        <ul>
          { calculatedRefunds.map(refund =>
              <li>{ usersDict[refund.from].name } donne { refund.amount }€ à { usersDict[refund.to].name }</li>)
          }
        </ul>
      </div>
  );
};