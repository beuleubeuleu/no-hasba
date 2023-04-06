import React, { useEffect, useState } from "react";
import GroupCard                      from "../../components/GroupCard"
import TrigroupType                   from "../../types/Trigroup";
import "./GroupList.css"
import { getGroups }                  from "../../api/groups";

const groupList = () => {
  const [groups, setGroups] = useState<TrigroupType[]>([])

  const getAllGroups = async() => {
    const groups = await getGroups()
    setGroups(groups)
  }

  useEffect(() => {
    return () => {
      getAllGroups()
    };
  }, []);


  return (
      <ul className="trigroups--container">
        { groups.map((group: TrigroupType) => <GroupCard data={ group } key={group.id}/>)}
      </ul>
  );
};

export default groupList;