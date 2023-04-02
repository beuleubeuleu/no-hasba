import React            from "react";
import GroupCard        from "./GroupCard"

type groupListProps = {
  groups: any[]
}
const groupList = ({groups}: groupListProps) => {
  return (
      <div>
        {/*groups.map(group => <groupCard data={group} />)*/}
        <GroupCard data={groups[0]}/>
      </div>
  );
};

export default groupList;
