import React, { useEffect, useState } from "react";
import trigroupType                   from "../../types/trigroupType";
import { useParams }                  from "react-router-dom";
import { getOneGroup }                from "../../api/groups";
import ExpenseList                    from "./ExpenseList";
import "./groupDetails.css"
import { fetchGroupUsers }            from "../../api/users";
import userType                       from "../../types/userType";

const GroupDetail = () => {
  const [group, setGroup] = useState<trigroupType | null>(null)
  const [users, setUsers] = useState<userType[]>([]);

  let { id } = useParams()

  const getTheGroup = async () => {
    if ( !id ) return null
    const group = await getOneGroup(id)
    setGroup(group)
  }

  const getGroupUsers = async (id: string) => {
    const users = await fetchGroupUsers(id)
    setUsers(()=>users)
  }

  useEffect(() => {
    return () => {
      getTheGroup()
      getGroupUsers(id!)
    };
  }, []);


  if ( !group ) return null
  return (
      <div className="groupDetails__container">
        <p className="groupDetails__title">
          Voici toutes les hasba du groupe:<h2 className="groupDetails__span">{ group.name }</h2>
          <br/>
          Et tous les impliqués: <span className="groupDetails__span">{ users.map(user => `-${user.name}`) }</span>
        </p>
        <ExpenseList idGroup={ id as string }/>
      </div>
  );
};

export default GroupDetail;
