import React from "react";
import GroupCard    from "../../components/GroupCard"
import trigroupType from "../../types/trigroup";
import "./GroupList.css"
import { useTrigroupContext }         from "../../context/TrigroupContext";

const groupList = () => {
 const {trigroups} = useTrigroupContext()

  return (
      <ul className="trigroups--container">
        { trigroups.map((group: trigroupType) => <GroupCard data={ group } key={group.id}/>)}
      </ul>
  );
};

export default groupList;