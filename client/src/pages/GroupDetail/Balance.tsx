import userType                from "../../types/userType";
import { useEffect, useState } from "react";
import { fetchTotalGroupDebt } from "../../api/groups";

type balanceProps = {
  idGroup: string,
  usersDict: { [id: number]: userType }
}

export const Balance = ({ idGroup, usersDict }: balanceProps) => {
  const [totalGroupDebt, setTotalGroupDebt] = useState<{ user: number, debt: number }[]>([]);

  const getTotalGroupDebt = async (id: string) => {
    try {
    const totalDebt = await fetchTotalGroupDebt(id)
    setTotalGroupDebt(totalDebt)
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
          {totalGroupDebt.map(debt => <li>{usersDict[debt.user].name} {debt.debt}€</li>)}
        </ul>
      </div>
  );
};