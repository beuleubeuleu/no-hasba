import React        from "react";
import GroupCard    from "./GroupCard"
import TrigroupType from "../types/Trigroup";
import "./GroupList.css"

type groupListProps = {
  groups: TrigroupType[]
}
const groupList = ({groups}: groupListProps) => {
  return (
      <ul className="trigroups--container">
        { groups.map((group: TrigroupType) => <GroupCard data={ group } key={group.id}/>)}
      </ul>
  );
};

export default groupList;