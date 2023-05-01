import React, { useEffect, useState } from "react";
import trigroupType                   from "../../types/trigroupType";
import { useParams }                  from "react-router-dom";
import { fetchOneGroup }              from "../../api/groups";
import ExpenseList                    from "./ExpenseList";
import "./groupDetails.css"
import { fetchGroupUsers }            from "../../api/users";
import userType                       from "../../types/userType";
import UserType                       from "../../types/userType";
import { Balance }                    from "./Balance";

const GroupDetail = () => {
  const [group, setGroup] = useState<trigroupType | null>(null)
  const [users, setUsers] = useState<userType[]>([]);
  const [isExpense, setIsExpense] = useState(true);

  let { id } = useParams()

  const getTheGroup = async () => {
    const group = await fetchOneGroup(id!)
    setGroup(group)
  }

  const getGroupUsers = async (id: string) => {
    const users = await fetchGroupUsers(id)
    setUsers(users)
  }

  useEffect(() => {
    getTheGroup()
    getGroupUsers(id!)
  }, [id]);

  const usersDict: { [id: number]: UserType } = {};
  users.forEach(user => {
    usersDict[user.id] = user;
  });



  if ( !group ) return <div>oops what the error</div>
  return (
      <div className="groupDetails__container">
        <p className="groupDetails__title">
          Voici toutes les hasba du groupe:<b className="groupDetails__span">{ group.name }</b>
          <br/>
          Et tous les impliqués: <span className="groupDetails__span">
          { users.length?
            users.map((user, index) => `${ user.name }${ index < users.length - 1? ", ": "" }`): "No users" }
        </span>

          <input type="checkbox" name={"isExpense"} onChange={()=>{setIsExpense(!isExpense)}} />

        </p>
        { isExpense && <ExpenseList idGroup={ id as string } usersDict={ usersDict }/> }
        { !isExpense && <Balance idGroup={ id as string } usersDict={ usersDict }/> }
      </div>
  );
};

export default GroupDetail;
