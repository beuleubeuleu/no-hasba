import React, { useEffect, useState } from "react";
import trigroupType                   from "../../types/trigroupType";
import { useParams }                  from "react-router-dom";
import { getOneGroup }                from "../../api/groups";
import ExpenseList                    from "./ExpenseList";
import "./groupDetails.css"

const GroupDetail = () => {
  const [group, setGroup] = useState<trigroupType | null>(null)
  let { id } = useParams()

  const getTheGroup = async () => {
    if ( !id ) return null
    const group = await getOneGroup(id)
    setGroup(group)
  }

  useEffect(() => {
    return () => {
      getTheGroup()
    };
  }, []);


  if ( !group ) return null
  return (
      <div className="groupDetails__container">
        <p className="groupDetails__title">
          Voici toutes les hasba du trigroup:<span className="groupDetails__span">{ group.name }</span>
        </p>
        <ExpenseList idGroup={ id as string }/>
      </div>
  );
};

export default GroupDetail;
